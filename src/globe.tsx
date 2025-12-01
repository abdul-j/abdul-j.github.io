import { useEffect, useRef } from "react";

export default function GlobePage() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    import("globe.gl").then((module) => {
      // In your version, Globe is a class, not a factory function:
      const Globe = module.default;

      const arcsData = [
        {
          startLat: 40.0024,
          startLng: -75.1180,
          endLat: 40.6275,
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

      // ✔ Correct instantiation for constructor-type default export
      const globe = new Globe(containerRef.current!);

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
        .pointAltitude(() => 0)
        // ✔ Correctly typed accessor for Globe.gl
        .pointLabel((d: object) => (d as { label: string }).label);

      // Controls
      globe.controls().autoRotate = true;
      globe.controls().autoRotateSpeed = 1;

      // Resize behavior
      const resizeObserver = new ResizeObserver(() => {
        if (!containerRef.current) return;
        globe.width(containerRef.current.clientWidth);
        globe.height(containerRef.current.clientHeight);
        globe.backgroundColor("black");
      });

      resizeObserver.observe(containerRef.current!);
    });
  }, []);

  return (
    <div className="flex items-center justify-center">
      <div ref={containerRef} className="w-[400px] h-[400px]" />
    </div>
  );
}
