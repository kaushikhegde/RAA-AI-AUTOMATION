import React, { useCallback, useMemo } from 'react'
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  Handle,
  Position,
  MarkerType,
  useNodesState,
  useEdgesState,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { LANE_COLOURS } from '../data/processes.js'

// Grid geometry — the data files author steps as {lane, col, row}; this converts to pixels.
const LANE_LABEL_W = 168
const COL_W = 218
const LANE_H = 208
const ROW_Y = [26, 116]
const NODE_W = 168
const DEC_W = 156

// These flows are very wide (BP001 runs 19 columns). fitView would shrink them to an unreadable
// strip, so the canvas opens at a fixed readable zoom and pans horizontally instead.
const ZOOM0 = 0.8
const CANVAS_MIN = 420
const CANVAS_MAX = 1100 // tallest flow is 6 lanes (Pay Suppliers) — sized so no lane is clipped

const HANDLE_POS = { t: Position.Top, r: Position.Right, b: Position.Bottom, l: Position.Left }

// Every node exposes a source and a target handle on all four sides, so the flow data can route
// edges the way the original swimlane diagram does.
function Handles({ colour }) {
  return (
    <>
      {Object.entries(HANDLE_POS).map(([id, pos]) => (
        <React.Fragment key={id}>
          <Handle type="target" position={pos} id={id} className="pf-handle" style={{ background: colour }} />
          <Handle type="source" position={pos} id={id} className="pf-handle" style={{ background: colour }} />
        </React.Fragment>
      ))}
    </>
  )
}

function LaneNode({ data }) {
  return (
    <div className="pf-lane" style={{ width: data.width, height: LANE_H }}>
      <div className="pf-lane-label" style={{ width: LANE_LABEL_W, borderLeftColor: data.colour }}>
        <span style={{ color: data.colour }}>{data.label}</span>
      </div>
    </div>
  )
}

function TerminalNode({ data }) {
  return (
    <div className={`pf-node pf-${data.kind}`} style={{ width: NODE_W }}>
      <Handles colour={data.colour} />
      <span>{data.label}</span>
    </div>
  )
}

function TaskNode({ data }) {
  return (
    <div
      className={`pf-node pf-task${data.hasNote ? ' has-note' : ''}`}
      style={{ width: NODE_W, borderLeftColor: data.colour }}
    >
      <Handles colour={data.colour} />
      <span>{data.label}</span>
      {data.hasNote && <i className="pf-note-dot" title="Has a source annotation" />}
    </div>
  )
}

function SubprocessNode({ data }) {
  return (
    <div className="pf-node pf-subprocess" style={{ width: NODE_W, borderLeftColor: data.colour }}>
      <Handles colour={data.colour} />
      <span className="pf-sub-mark">▤</span>
      <span>{data.label}</span>
      {data.link && <i className="pf-link-dot" title="Opens the linked process" />}
    </div>
  )
}

function DecisionNode({ data }) {
  return (
    <div className="pf-decision-wrap" style={{ width: DEC_W }}>
      <Handles colour={data.colour} />
      <div className="pf-decision-shape" />
      <span className="pf-decision-label">{data.label}</span>
    </div>
  )
}

const nodeTypes = {
  lane: LaneNode,
  start: TerminalNode,
  end: TerminalNode,
  task: TaskNode,
  subprocess: SubprocessNode,
  decision: DecisionNode,
}

function build(process) {
  const maxCol = process.nodes.reduce((m, n) => Math.max(m, n.col), 0)
  const width = LANE_LABEL_W + (maxCol + 1) * COL_W + 60

  const laneNodes = process.lanes.map((name, i) => ({
    id: `lane-${i}`,
    type: 'lane',
    position: { x: 0, y: i * LANE_H },
    data: { label: name, width, colour: LANE_COLOURS[i % LANE_COLOURS.length] },
    draggable: false,
    selectable: false,
    zIndex: 0,
    style: { width, height: LANE_H },
  }))

  const stepNodes = process.nodes.map((n) => {
    const colour = LANE_COLOURS[n.lane % LANE_COLOURS.length]
    const w = n.kind === 'decision' ? DEC_W : NODE_W
    return {
      id: n.id,
      type: n.kind,
      position: {
        x: LANE_LABEL_W + n.col * COL_W + (COL_W - w) / 2,
        y: n.lane * LANE_H + ROW_Y[n.row || 0],
      },
      data: {
        label: n.label,
        kind: n.kind,
        colour,
        note: n.note,
        hasNote: Boolean(n.note),
        link: n.link,
        lane: process.lanes[n.lane],
      },
      draggable: false,
      zIndex: 2,
    }
  })

  const edges = process.edges.map((e, i) => ({
    id: `e${i}-${e.s}-${e.t}`,
    source: e.s,
    target: e.t,
    sourceHandle: e.sh || 'r',
    targetHandle: e.th || 'l',
    label: e.label,
    type: 'smoothstep',
    markerEnd: { type: MarkerType.ArrowClosed, width: 15, height: 15, color: '#7f7f7f' },
    style: { stroke: '#7f7f7f', strokeWidth: 1.4 },
    labelBgPadding: [5, 2],
    labelBgBorderRadius: 4,
    labelBgStyle: { fill: '#ffffff', fillOpacity: 0.95, stroke: '#e0e0e0' },
    labelStyle: { fontSize: 10, fontWeight: 700, fill: '#130064' },
    zIndex: 1,
  }))

  return {
    nodes: [...laneNodes, ...stepNodes],
    edges,
    height: process.lanes.length * LANE_H,
  }
}

export default function ProcessFlow({ process, onSelectNode, onOpenLink }) {
  const built = useMemo(() => build(process), [process])
  const [nodes, , onNodesChange] = useNodesState(built.nodes)
  const [edges, , onEdgesChange] = useEdgesState(built.edges)

  const handleNodeClick = useCallback(
    (_, node) => {
      if (node.type === 'lane') return
      if (node.data.link && onOpenLink) return onOpenLink(node.data.link)
      onSelectNode?.({ id: node.id, ...node.data })
    },
    [onSelectNode, onOpenLink]
  )

  const canvasH = Math.min(CANVAS_MAX, Math.max(CANVAS_MIN, built.height * ZOOM0 + 74))

  return (
    <div className="pf-canvas" style={{ height: canvasH }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        onNodeClick={handleNodeClick}
        defaultViewport={{ x: 18, y: 18, zoom: ZOOM0 }}
        minZoom={0.15}
        maxZoom={1.6}
        nodesConnectable={false}
        nodesDraggable={false}
        proOptions={{ hideAttribution: false }}
      >
        <Background color="#d2d2d2" gap={22} size={1} />
        <Controls showInteractive={false} />
        <MiniMap
          pannable
          zoomable
          // MiniMap sizes its own svg, so width/height must come through style, not CSS.
          style={{ width: 172, height: 98 }}
          nodeColor={(n) => (n.type === 'lane' ? '#eceaf3' : n.data?.colour || '#130064')}
          nodeStrokeWidth={3}
          maskColor="rgba(19,0,100,.07)"
        />
      </ReactFlow>
    </div>
  )
}
