import { useEffect, useRef } from "react";

export default function GlobePage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    import("globe.gl").then((GlobeModule) => {
      if (!containerRef.current) return;

      // ---------------------------
      // FIX #1 — import the class correctly
      // ---------------------------
      const Globe = GlobeModule.default;
      const globe = new Globe(containerRef.current); // no error

      globe
        .globeImageUrl("//unpkg.com/three-globe/example/img/earth-dark.jpg")
        .bumpImageUrl("//unpkg.com/three-globe/example/img/earth-water.png");

      // ---------------------------
      // FIX #2 — remove callback params that TS complains about
      // ---------------------------
      globe
        .arcsData([
          {
            startLat: 40.0024,
            startLng: -75.118,
            endLat: 40.6275,
            endLng: 141.3621,
            color: "red",
          },
        ])
        .arcColor("color")
        .arcDashLength(Math.random())
        .arcDashGap(Math.random())
        .arcDashAnimateTime(Math.random() * 4000 + 400);

      globe
        .pointsData([
          {
            lat: 40.0024,
            lng: -75.118,
            size: 2,
            color: "cyan",
            label: "Philly",
            alt: 0,
          },
        ])
        .pointColor("color")
        .pointRadius("size")
        .pointAltitude("alt")
        .pointLabel("label");

      globe.controls().autoRotate = true;
      globe.controls().autoRotateSpeed = 1;

      // ---------------------------
      // FIX #3 — non-null observe argument
      // ---------------------------
      const resizeObserver = new ResizeObserver(() => {
        if (!containerRef.current) return;
        globe.width(containerRef.current.clientWidth);
        globe.height(containerRef.current.clientHeight);
        globe.backgroundColor("black");
      });

      resizeObserver.observe(containerRef.current);
    });
  }, []);

  return (
    <div className="flex items-center justify-center">
      <div ref={containerRef} className="w-[400px] h-[400px]" />
    </div>
  );
}
