# RAA Travel — Booking & Payments Solution Guide

An interactive current-state analysis of RAA Travel's booking and payments process: business
capability map, personas, challenges and system architecture.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173 — Vite dev server
npm run build    # static bundle into dist/
npm run preview  # Vite's preview server
npm start        # production server (server.js), serves dist/ on $PORT or 8080
```

## Deployment — Azure App Service (Linux, Node)

The app is a static Vite build, but App Service expects a Node process listening on `$PORT`.
`server.js` is that process: a zero-dependency static server for `dist/` with SPA fallback,
gzip, long-lived caching on fingerprinted assets, and a `/healthz` endpoint. Because it has no
npm dependencies, nothing needs installing on the server.

`.github/workflows/main_raaaiautomation.yml` builds on the runner and deploys **only**
`dist/`, `server.js` and `package.json` (~980 KB). It does not ship `node_modules`, `src/`, or
the source PDFs and DOCX that live in this repo.

App Service settings to match:

| Setting | Value |
|---|---|
| Runtime stack | Node 22 LTS (must match `node-version` in the workflow) |
| Startup command | leave blank — App Service runs `npm start` |
| `SCM_DO_BUILD_DURING_DEPLOYMENT` | `false` — the build already happened on the runner |
| Health check path | `/healthz` (optional) |

Routing is hash-based (`#process/pay-bpay`), so no rewrite rules are needed; `server.js` falls
back to `index.html` for any extensionless path anyway. A request for a missing file under
`/assets/` returns 404 rather than falling back to HTML, so a broken asset fails loudly.

## Sign in

| Field | Value |
|---|---|
| Email | `user@raa.demo` |
| Password | `123456` |

> **This is a presentation gate, not security.** The credentials are compiled into the client
> bundle and are visible to anyone who opens devtools — there is no server and no real
> authentication. It exists so the guide opens on a branded screen during a demo. Do not put
> anything genuinely confidential behind it.

The signed-in flag is held in `sessionStorage`, so a reload keeps you in but a fresh browser
session shows the sign-in screen again. **Sign out** is in the top-right of the header. The
credentials live in `src/components/Login.jsx` as `DEMO_EMAIL` / `DEMO_PASSWORD`; the email match
is case-insensitive. The demo credentials are also printed under the form — delete the
`.login-hint` block in that file to hide them.

## Source documents

| File | What was drawn from it |
|---|---|
| `booking proccess.pdf` | 15 AS-IS process diagrams (v0.3, 23-Feb-2026) — Create Travel Booking, Search/Add Client, Issue Client Itinerary, Search/Add Hotels, Accept Client Payment, Pay Suppliers, Debtor Payment Receipt, Agency CC Debtor Receipt, Creditor Payment, Debtor Invoice, and four client-payment-method sub-flows |
| `proccess challenge.pdf` | Current-state service blueprint — front stage / backstage, systems, friction points, risks and RAA's stated automation priorities |
| `Tramada demo.docx` | Recorded SME session with Megan Gray (Training & Development Consultant, RAA Travel) |

## Structure

```
src/
  data/
    capabilities.js   5 domains · 23 groups · 128 capabilities, each with its systems and notes
    personas.js       5 personas with Today/Tomorrow framing and 9-stage journeys
    challenges.js     35 challenges with evidence, source, theme, severity and capability links
    processes.js      14 AS-IS process flows · 241 steps · 252 transitions, as a grid model
    architecture.js   NOT RENDERED — retained analysis from the removed Architecture tab
  assets/
    sarah-journey.jpeg  Journey map slide shown on Sarah's Journeys tab
    raa-login.jpg       Login panel photo (compnow.com.au/wp-content/uploads/CS-RAA.jpg)
  components/
    Login.jsx         Branded demo sign-in gate
    Personas.jsx      Overview cards + Today-vs-Tomorrow journey diagrams
    Processes.jsx     Process picker, Current/Future switch, step detail, source annotations
    ProcessFlow.jsx   React Flow renderer — swimlanes and custom BPMN-style nodes
    CapabilityMap.jsx Filterable, searchable, zoomable capability map with a detail drawer
    Challenges.jsx    Filterable challenge register + cross-cutting theme summary
  App.jsx             Header, tab navigation, hash routing
  styles.css          RAA brand tokens and all component styling
server.js             Production static server for Azure App Service (no dependencies)
```

The `status` field and `STATUS` export remain in `capabilities.js` unused, so per-capability
horizon status can be reinstated without redoing the data.

The **Journeys** view shows a prepared journey-map image per persona, via the optional
`journeyImage` / `journeyImageCaption` fields on the persona record. Clicking opens it
full-screen. Only Sarah has an image today; the other four show a "not yet produced" placeholder
until one is added.

The built-in journey diagram that used to render this from data has been removed. The per-stage
`journey` array (stage, today, tomorrow, emotion, mood) is still on every persona in
`personas.js` — unused by the UI, but retained as the source for producing the remaining images.

## Process flows

The Process tab renders each AS-IS diagram from the pack with [React Flow](https://reactflow.dev)
(`@xyflow/react`). Every process has a **Current process** view and a **Future process** view; the
future views are deliberately blank placeholders until the target state is designed.

Flows are authored in `processes.js` as a grid — each step declares `{lane, col, row}` and
`ProcessFlow.jsx` converts that to pixel positions, so the data stays readable and diffable rather
than being a dump of coordinates. Node kinds are `start`, `end`, `task`, `decision` and
`subprocess`; sub-process nodes are clickable and navigate to the process they call. Steps carrying
an amber dot have an annotation from the source diagram — click for the detail.

Because the flows are wide (BP001 runs 19 columns), the canvas opens at a fixed readable zoom and
pans, rather than using `fitView` which would shrink them to an illegible strip.

## Branding

Palette sampled from the live `raa.com.au` theme stylesheet:

| Token | Value |
|---|---|
| Primary / ink | `#130064` |
| Signature accent | `#FFE600` |
| Link / secondary blue | `#00349F` |
| Sand surfaces | `#E8E2D3`, `#F9F7F4` |
| Teal | `#15909C`, `#89C6CC` |
| Purple | `#533F8C`, `#7266A2` |
| Burgundy | `#9F2241` |

RAA's site uses the licensed **National** typeface. It is not bundled here — the CSS falls back to a
visually close grotesque stack. Drop the licensed web fonts in and the `--font` token will pick them up.

## Routing

Views are addressable by hash, so links can be shared:

- `#personas/overview`, `#personas/journeys`
- `#process/<id>` — e.g. `#process/bp001`, `#process/pay-suppliers`, `#process/pay-bpay`
- `#capabilities`
- `#challenges`
