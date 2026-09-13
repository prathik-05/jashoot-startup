"use client";

import { useEffect, useRef, useState } from "react";

export function MapSection() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<unknown>(null);
  const [, setLoaded] = useState(false);

  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return;

    let cancelled = false;

    async function init() {
      let maplibre: typeof import("maplibre-gl");
      try {
        maplibre = await import("maplibre-gl");
      } catch {
        return;
      }

      if (cancelled || !mapContainer.current) return;

      const map = new maplibre.Map({
        container: mapContainer.current,
        style: {
          version: 8,
          sources: {
            osm: {
              type: "raster",
              tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
              tileSize: 256,
              attribution: "&copy; OpenStreetMap contributors",
            },
          },
          layers: [
            {
              id: "osm",
              type: "raster",
              source: "osm",
              minzoom: 0,
              maxzoom: 19,
            },
          ],
        },
        center: [78.4708, 17.3949],
        zoom: 12.5,
        pitch: 40,
        bearing: -20,
        attributionControl: false,
      });

      map.addControl(new maplibre.NavigationControl({ showCompass: false }), "top-right");

      const marker = new maplibre.Marker({ color: "#E30613" })
        .setLngLat([78.4708, 17.3949])
        .setPopup(
          new maplibre.Popup({ offset: 25, closeButton: false, maxWidth: "220px" }).setHTML(
            '<div style="font-family:Barlow Condensed,sans-serif;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;padding:2px 0"><strong>JASHOOTS</strong><br><span style="font-size:10px;opacity:0.6">Hyderabad · Pan-India</span></div>'
          )
        )
        .addTo(map);

      marker.togglePopup();

      map.on("load", () => {
        if (!cancelled) setLoaded(true);
      });

      map.on("error", () => {
        // Silently handle tile/network errors — map degrades to black background
      });

      mapRef.current = map;
    }

    init();

    return () => {
      cancelled = true;
      if (mapRef.current) {
        (mapRef.current as { remove: () => void }).remove();
        mapRef.current = null;
      }
    };
  }, []);

  return (
    <section id="map" className="bg-panel/30 border-y border-white/[0.04]">
      <div className="mx-auto max-w-[1280px] px-4 md:px-6 py-12 md:py-20">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 rounded-full bg-red grid place-items-center">
            <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
          </div>
          <h3 className="font-display text-[20px] md:text-[36px] uppercase tracking-[0.02em] leading-tight">
            Based in Hyderabad — Serving Pan-India
          </h3>
        </div>

        {/* Map Container */}
        <div className="relative rounded-2xl overflow-hidden border border-white/[0.06]">
          <div ref={mapContainer} className="h-[420px] bg-canvas" />

          {/* Overlay info bar */}
          <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center justify-between glass-strong">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-red animate-pulse" />
              <div>
                <div className="font-ui font-semibold text-[11px] tracking-[0.14em] uppercase text-white/70">
                  JASHOOTS Studio
                </div>
                <div className="font-body text-[10px] text-white/35">
                  Hyderabad · Pan-India Coverage
                </div>
              </div>
            </div>
            <a
              href="https://maps.app.goo.gl/jashoots"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 text-white/60 text-[10px] font-ui font-semibold tracking-[0.14em] uppercase hover:bg-white/15 transition-colors duration-200"
            >
              OPEN IN MAPS
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </a>
          </div>
        </div>

        {/* Location tags */}
        <div className="mt-5 flex flex-wrap gap-2">
          {["Dhoolpet", "Ramanthapur", "Ram Nagar", "Tarnaka", "Secunderabad", "Kondapur", "Jubilee Hills", "Pan-India"].map(
            (loc) => (
              <span
                key={loc}
                className="px-3 py-1 rounded-full glass-subtle text-[10px] font-body text-white/35 hover:text-white/50 hover:border-white/10 transition-all duration-200 cursor-default"
              >
                {loc}
              </span>
            )
          )}
        </div>
      </div>
    </section>
  );
}
