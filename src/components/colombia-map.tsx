"use client";

import {
  EVENT_TYPE_COLORS,
  EVENT_TYPE_LABELS,
  EVENT_TYPE_ORDER,
  getEventTypeForMarkerId,
  getMarkerNarrative,
  type EventTypeId,
} from "@/lib/cursor-map-content";
import { COLOMBIA_CENTER, COLOMBIA_MARKERS, type MapPoint } from "@/lib/colombia-points";
import { useEffect, useMemo, useState } from "react";
import {
  CircleMarker,
  MapContainer,
  Popup,
  TileLayer,
  Tooltip,
  useMap,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

function MapResize() {
  const map = useMap();
  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      map.invalidateSize();
    });
    const onResize = () => map.invalidateSize();
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, [map]);
  return null;
}

function MarkerView({
  point,
  hovered,
  selected,
  onHover,
  onSelect,
}: {
  point: MapPoint;
  hovered: boolean;
  selected: boolean;
  onHover: (id: number | null) => void;
  onSelect: (id: number | null) => void;
}) {
  const radius = selected ? 11 : hovered ? 9 : 6;
  const narrative = getMarkerNarrative(point.id);
  const base = EVENT_TYPE_COLORS[narrative.eventType];

  return (
    <CircleMarker
      center={[point.lat, point.lng]}
      radius={radius}
      pathOptions={{
        color: selected ? "#0f172a" : hovered ? "#334155" : base.color,
        fillColor: base.fillColor,
        fillOpacity: selected ? 0.98 : hovered ? 0.92 : 0.88,
        weight: selected ? 3 : hovered ? 2.5 : 2,
        className: "cursor-pointer",
      }}
      eventHandlers={{
        click: () => onSelect(selected ? null : point.id),
        mouseover: () => onHover(point.id),
        mouseout: () => onHover(null),
      }}
    >
      <Tooltip
        direction="top"
        offset={[0, -8]}
        opacity={0.98}
        className="cursor-map-tooltip text-zinc-900!"
      >
        <div className="text-left text-xs leading-snug">
          <p className="font-semibold text-zinc-950">{narrative.title}</p>
          <p className="mt-1.5 text-[11px] text-zinc-700">{narrative.detail}</p>
          <p className="mt-1.5 text-[10px] font-medium uppercase tracking-wide text-zinc-600">
            {EVENT_TYPE_LABELS[narrative.eventType]}
          </p>
          <p className="mt-2 border-t border-zinc-200 pt-2 text-[11px] font-medium text-zinc-800">
            {narrative.event}
          </p>
          <p className="mt-2 text-[10px] text-zinc-500">
            #{point.id} · {point.lat.toFixed(2)}°, {point.lng.toFixed(2)}°
          </p>
        </div>
      </Tooltip>
      <Popup>
        <div className="min-w-56 max-w-[18rem] text-sm text-zinc-800">
          <p className="font-semibold text-zinc-900">{narrative.title}</p>
          <p className="mt-2 text-xs leading-relaxed text-zinc-600">{narrative.detail}</p>
          <p className="mt-2 text-[11px] font-medium text-zinc-700">
            <span
              className="mr-1.5 inline-block h-2 w-2 rounded-full align-middle"
              style={{ backgroundColor: base.fillColor }}
            />
            {EVENT_TYPE_LABELS[narrative.eventType]}
          </p>
          <p className="mt-3 text-xs font-medium text-zinc-800">{narrative.event}</p>
          <p className="mt-3 border-t border-zinc-200 pt-2 text-[11px] text-zinc-500">
            Lat {point.lat.toFixed(5)} · Lng {point.lng.toFixed(5)}
          </p>
        </div>
      </Popup>
    </CircleMarker>
  );
}

export function ColombiaMap() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [visibleTypes, setVisibleTypes] = useState<Set<EventTypeId>>(
    () => new Set(EVENT_TYPE_ORDER),
  );

  const markersOnMap = useMemo(
    () =>
      COLOMBIA_MARKERS.filter((p) =>
        visibleTypes.has(getEventTypeForMarkerId(p.id)),
      ),
    [visibleTypes],
  );

  function toggleEventType(type: EventTypeId) {
    setVisibleTypes((prev) => {
      const next = new Set(prev);
      if (next.has(type)) next.delete(type);
      else next.add(type);
      return next;
    });
    setSelectedId((id) => {
      if (id == null) return null;
      if (getEventTypeForMarkerId(id) !== type) return id;
      return visibleTypes.has(type) ? null : id;
    });
  }

  function showAllTypes() {
    setVisibleTypes(new Set(EVENT_TYPE_ORDER));
  }

  function hideAllTypes() {
    setVisibleTypes(new Set());
    setSelectedId(null);
  }

  return (
    <div className="flex w-full flex-col gap-3">
      <div
        className="flex flex-col gap-2 rounded-xl border border-zinc-200 bg-white p-3 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
        role="group"
        aria-label="Filter events by type"
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
            Event types
          </p>
          <div className="flex gap-2 text-[11px]">
            <button
              type="button"
              onClick={showAllTypes}
              className="rounded-md px-2 py-1 text-zinc-600 underline-offset-2 hover:underline dark:text-zinc-400"
            >
              All
            </button>
            <button
              type="button"
              onClick={hideAllTypes}
              className="rounded-md px-2 py-1 text-zinc-600 underline-offset-2 hover:underline dark:text-zinc-400"
            >
              None
            </button>
          </div>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {EVENT_TYPE_ORDER.map((type) => {
            const on = visibleTypes.has(type);
            const swatch = EVENT_TYPE_COLORS[type];
            return (
              <button
                key={type}
                type="button"
                aria-pressed={on}
                onClick={() => toggleEventType(type)}
                className={`inline-flex max-w-full items-center gap-1.5 rounded-full border px-2.5 py-1 text-left text-[11px] font-medium transition ${
                  on
                    ? "border-zinc-300 bg-zinc-50 text-zinc-900 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100"
                    : "border-zinc-200 bg-zinc-100/80 text-zinc-400 line-through opacity-70 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-500"
                }`}
              >
                <span
                  className="h-2.5 w-2.5 shrink-0 rounded-full ring-1 ring-black/10"
                  style={{ backgroundColor: swatch.fillColor }}
                />
                {EVENT_TYPE_LABELS[type]}
              </button>
            );
          })}
        </div>
        <p className="text-[11px] text-zinc-500 dark:text-zinc-500">
          Showing {markersOnMap.length} of {COLOMBIA_MARKERS.length} points
        </p>
      </div>

      <div className="h-[min(68vh,720px)] min-h-[280px] w-full overflow-hidden rounded-xl border border-zinc-200 bg-zinc-100 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 [&_.leaflet-container]:z-0">
        <MapContainer
          center={COLOMBIA_CENTER}
          zoom={6}
          minZoom={5}
          maxZoom={12}
          className="h-full w-full [&_.leaflet-control-attribution]:text-[10px]"
          scrollWheelZoom
        >
          <MapResize />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {markersOnMap.map((point) => (
            <MarkerView
              key={point.id}
              point={point}
              hovered={hoveredId === point.id}
              selected={selectedId === point.id}
              onHover={setHoveredId}
              onSelect={setSelectedId}
            />
          ))}
        </MapContainer>
      </div>
      <p className="text-center text-xs text-zinc-500 dark:text-zinc-500">
        {COLOMBIA_MARKERS.length} points · filter by event type · hover for details · click for popup
      </p>
    </div>
  );
}
