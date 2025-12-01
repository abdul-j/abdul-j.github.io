import { useEffect, useRef } from "react";

export default function GlobePage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    import("globe.gl").then((Globe) => {
      const arcsData = [
        {
          startLat: 40.0024, // Philly
          startLng: -75.1180,
          endLat: 40.6275,   // Oirase
          endLng: 141.3621,
          color: "red",
        },
      ];

      const pointsData = [
        {
          lat: 40.0024,
          lng: -75.1180,
          size: 1,
          color: "cyan",
          label: "Philly",
        },
      ];

      const globe = Globe.default()(containerRef.current);

      globe
        .globeImageUrl("//unpkg.com/three-globe/example/img/earth-dark.jpg")
        .bumpImageUrl("//unpkg.com/three-globe/example/img/earth-water.png");

      globe
        .arcsData(arcsData)
        .arcColor("color")
        .arcDashLength(() => Math.random())
        .arcDashGap(() => Math.random())
        .arcDashAnimateTime(() => Math.random() * 4000 + 400);

      globe
        .pointsData(pointsData)
        .pointColor("color")
        .pointRadius("size")
        .pointAltitude((d) => 0)
        .pointLabel((d) => d.label); // <-- This is REQUIRED for hover labels

      globe.controls().autoRotate = true;
      globe.controls().autoRotateSpeed = 1;

      // Resize observer
      const resizeObserver = new ResizeObserver(() => {
        globe.width(containerRef.current!.clientWidth);
        globe.height(containerRef.current!.clientHeight);
        globe.backgroundColor("black");
      });
      resizeObserver.observe(containerRef.current);

    });
  }, []);

  return (
    <div className="flex items-center justify-center">
      <div
        ref={containerRef}
        className="w-[400px] h-[400px]"
      />
    </div>
  );
}
