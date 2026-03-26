# Data Storytelling Website — Full Plan

## Core Philosophy

> Content is authored in a CMS. Visualization components live in code. The website is just a renderer.

This means: adding, editing, or deleting a story requires zero code changes. Writers and analysts work in the CMS; developers work on components. The two never block each other.

---

## Tech Stack

| Layer | Tool | Why |
|---|---|---|
| **CMS** | Sanity.io | Structured content, real-time collaboration, GROQ queries, free tier |
| **Frontend** | Next.js (App Router) | File-based routing, server components, ISR, great DX |
| **Visualization** | Observable Plot + D3.js | Observable for speed, D3 for custom/complex charts |
| **Styling** | Tailwind CSS | Utility-first, consistent spacing, easy dark mode |
| **Hosting** | Vercel | Native Next.js support, edge CDN, auto-deploy on push |
| **Data** | CSV/JSON in Sanity or external APIs | Stories reference data; data is not baked into code |

---

## Content Architecture

A **Story** is the primary unit. Each story is composed of **Sections** (blocks) that content authors arrange in Sanity Studio.

### Story Schema (in Sanity)
```
Story
├── title: string
├── slug: string (auto-generated)
├── publishedAt: datetime
├── summary: text (for cards/previews)
├── coverImage: image
├── tags: array of strings
└── sections: array of blocks
    ├── TextBlock       → rich text (portable text)
    ├── ChartBlock      → chart type + data source + config
    ├── MapBlock        → GeoJSON data + map config
    ├── TableBlock      → structured tabular data
    ├── CalloutBlock    → highlighted stat or quote
    └── DividerBlock    → visual separator
```

### ChartBlock Schema
```
ChartBlock
├── chartType: "bar" | "line" | "area" | "scatter" | "pie" | "heatmap"
├── title: string
├── caption: string
├── dataSource
│   ├── inline: JSON array (pasted directly in CMS)
│   └── url: string (external CSV/JSON endpoint)
├── xField: string
├── yField: string
└── colorField?: string
```

This means changing a bar chart to a line chart = **one dropdown change in Sanity Studio.**

---

## Project Structure (Next.js)

```
/
├── app/
│   ├── page.tsx              ← Homepage: story listing
│   ├── stories/
│   │   └── [slug]/page.tsx   ← Individual story renderer
│   └── layout.tsx
├── components/
│   ├── blocks/
│   │   ├── TextBlock.tsx
│   │   ├── ChartBlock.tsx    ← renders the right chart from config
│   │   ├── MapBlock.tsx
│   │   ├── TableBlock.tsx
│   │   └── CalloutBlock.tsx
│   ├── charts/
│   │   ├── BarChart.tsx
│   │   ├── LineChart.tsx
│   │   └── ScatterPlot.tsx
│   └── ui/
│       ├── StoryCard.tsx
│       └── Header.tsx
├── lib/
│   ├── sanity.ts             ← Sanity client setup
│   └── queries.ts            ← GROQ queries
└── sanity/
    └── schemas/              ← Content type definitions
```

The `ChartBlock` component reads the `chartType` from Sanity and renders the matching chart component. Adding a new chart type = add a new component + one entry in a switch statement.

---

## Content Workflow

```
Author opens Sanity Studio
    → Creates new Story
    → Adds sections (text, charts, maps, etc.)
    → Pastes data inline or links an external URL
    → Hits Publish
        → Vercel gets a webhook
        → Next.js page regenerates (ISR, ~10 seconds)
        → Live on site ✓
```

No Git commits. No deployments. No developer involvement.

---

## Data Handling Strategy

| Scenario | Approach |
|---|---|
| Small datasets (< 500 rows) | Paste as JSON inline in Sanity ChartBlock |
| Medium datasets | Upload CSV to Sanity's asset pipeline; fetch at render time |
| Live/changing data | Store a URL in ChartBlock; Next.js fetches and caches |
| Complex analysis | Pre-process in Python/R → export JSON → paste into Sanity |

**The key rule**: data is always referenced by stories, never hardcoded into component files.

---

## Visualization Library Choice

- **Observable Plot** — default choice. Minimal config, handles most chart types, renders fast in React.
- **D3.js** — for custom/unique visualizations that Plot can't express. Heavier but fully flexible.
- **React Simple Maps** — for choropleth and geographic stories.
- **Avoid** chart libraries that require data baked at build time (static JSON imports in component files).

---

## Development Phases

### Phase 1 — Foundation (Week 1–2)
- Set up Next.js + Sanity project
- Define core schemas: Story, TextBlock, ChartBlock
- Build StoryCard + story listing page
- Build TextBlock and one chart type (BarChart)
- Deploy to Vercel + connect Sanity webhook

### Phase 2 — Block Library (Week 3–4)
- Add LineChart, ScatterPlot, TableBlock
- Add CalloutBlock (big numbers, pull quotes)
- Add MapBlock (basic choropleth)
- Build story archive / tag filtering

### Phase 3 — Polish (Week 5–6)
- Dark mode
- Responsive layouts
- Social sharing metadata (OG images)
- Reading progress indicator
- Story search

### Phase 4 — Content Author Experience
- Custom Sanity Studio layout
- Live preview in Studio
- Content guidelines documentation for authors

---

## Key Decisions & Tradeoffs

| Decision | Choice | Alternative | Reason |
|---|---|---|---|
| CMS | Sanity | Contentful, Notion | Sanity's block-level schema fits data stories best |
| Rendering | ISR (incremental static) | SSR, full static | Fast pages + near-real-time updates without full redeploy |
| Visualization | Observable Plot | Recharts, Victory | Plot is more expressive for analytical charts |
| Styling | Tailwind | CSS Modules, Styled Components | Fastest iteration, easy theming |

---

## What You Get

- Authors can publish a fully interactive data story in ~15 minutes
- Adding a new chart type requires changing ~2 files
- The same story content could be exported to PDF, email, or a different frontend with no changes to content
- Stories are version-controlled in Sanity (full history + rollback)
