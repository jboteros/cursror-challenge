/** Rich copy for map tooltips: Cursor “deep” topics + community-style events (demo data). */

type TopicBlock = {
  title: string;
  detail: string;
};

const DEEP_TOPICS: TopicBlock[] = [
  {
    title: "Agents & background tasks",
    detail:
      "Run longer jobs in the background while you keep coding; review plans before files change.",
  },
  {
    title: "Rules, AGENTS.md & memory",
    detail:
      "Project rules and agent files steer behavior—stack conventions, APIs, and what to avoid.",
  },
  {
    title: "Composer vs Chat",
    detail:
      "Composer for multi-file edits with a clear diff; Chat for Q&A and quick iterations.",
  },
  {
    title: "MCP & tool use",
    detail:
      "Model Context Protocol connects editors to databases, docs, and custom tools securely.",
  },
  {
    title: "Codebase indexing",
    detail:
      "@-mentions and semantic search help the model ground answers in your real files.",
  },
  {
    title: "Diff-first workflow",
    detail:
      "Treat AI output like a PR: read hunks, reject noise, keep tests and types honest.",
  },
  {
    title: "Prompts & slash commands",
    detail:
      "Reusable prompts and commands encode your team’s review checklist and architecture notes.",
  },
  {
    title: "Privacy & context windows",
    detail:
      "Know what leaves the machine: pick files, redact secrets, and scope context on purpose.",
  },
  {
    title: "Debugging with the model",
    detail:
      "Share stack traces and repro steps; ask for hypotheses, not blind patches.",
  },
  {
    title: "Docs mode & @Docs",
    detail:
      "Ground answers in vendor docs or internal wikis so API usage stays current.",
  },
  {
    title: "Team workflows",
    detail:
      "Share rules, snippets, and review habits so everyone gets consistent AI assistance.",
  },
  {
    title: "Performance & large repos",
    detail:
      "Narrow context to folders and symbols; avoid pasting whole trees into the prompt.",
  },
];

const EVENTS = [
  "Cursor Challenge · build sprint check-in",
  "Community · Cursor × LATAM office hours",
  "Deep dive · `.cursor/rules` patterns",
  "Workshop · MCP servers in practice",
  "Live · Composer multi-file refactor",
  "Panel · AI code review in production",
  "Meetup · Bogotá / Medellín hybrid",
  "Hack night · ship a feature with Agents",
  "AMA · security & data residency",
  "Study group · TypeScript + AI refactors",
  "Showcase · rules that saved a migration",
  "Open floor · debugging with stack traces",
] as const;

/** One event type per row in `EVENTS`; used for map color + filter keys. */
export const EVENT_TYPE_ORDER = [
  "challenge",
  "community",
  "deep_dive",
  "workshop",
  "live",
  "panel",
  "meetup",
  "hack",
  "ama",
  "study",
  "showcase",
  "open_floor",
] as const;

export type EventTypeId = (typeof EVENT_TYPE_ORDER)[number];

/** Stroke + fill for Leaflet circle markers (distinct per type). */
export const EVENT_TYPE_COLORS: Record<
  EventTypeId,
  { color: string; fillColor: string }
> = {
  challenge: { color: "#be123c", fillColor: "#f43f5e" },
  community: { color: "#6d28d9", fillColor: "#a78bfa" },
  deep_dive: { color: "#3730a3", fillColor: "#6366f1" },
  workshop: { color: "#b45309", fillColor: "#f59e0b" },
  live: { color: "#b91c1c", fillColor: "#f87171" },
  panel: { color: "#0f766e", fillColor: "#2dd4bf" },
  meetup: { color: "#166534", fillColor: "#4ade80" },
  hack: { color: "#c2410c", fillColor: "#fb923c" },
  ama: { color: "#0369a1", fillColor: "#38bdf8" },
  study: { color: "#1d4ed8", fillColor: "#60a5fa" },
  showcase: { color: "#7c3aed", fillColor: "#c4b5fd" },
  open_floor: { color: "#475569", fillColor: "#94a3b8" },
};

export const EVENT_TYPE_LABELS: Record<EventTypeId, string> = {
  challenge: "Challenge",
  community: "Community",
  deep_dive: "Deep dive",
  workshop: "Workshop",
  live: "Live",
  panel: "Panel",
  meetup: "Meetup",
  hack: "Hack night",
  ama: "AMA",
  study: "Study group",
  showcase: "Showcase",
  open_floor: "Open floor",
};

export type MarkerNarrative = TopicBlock & {
  event: string;
  eventType: EventTypeId;
};

/** Event type for a marker id (1-based), aligned with `EVENTS` modulo. */
export function getEventTypeForMarkerId(id: number): EventTypeId {
  return EVENT_TYPE_ORDER[(id - 1) % EVENT_TYPE_ORDER.length];
}

/** Deterministic topic + event for each marker id (1-based). */
export function getMarkerNarrative(id: number): MarkerNarrative {
  const topic = DEEP_TOPICS[(id - 1) % DEEP_TOPICS.length];
  const event = EVENTS[(id - 1) % EVENTS.length];
  const eventType = getEventTypeForMarkerId(id);
  return { ...topic, event, eventType };
}
