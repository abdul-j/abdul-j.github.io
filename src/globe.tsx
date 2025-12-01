import { useEffect, useRef } from "react";
import Globe from "react-globe.gl";

const GlobePage = () => {
  const globeEl = useRef<any>(null);

  const arcData = [
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
      size: 2,
      color: "cyan",
      label: "Philly",
      alt: 0,
    },
  ];

  useEffect(() => {
    if (!globeEl.current) return;
    globeEl.current.controls().autoRotate = true;
    globeEl.current.controls().autoRotateSpeed = 1;
  }, []);

  return (
    <div className="flex items-center justify-center cursor-grab">
      <Globe
        ref={globeEl}
        backgroundColor="rgba(0,0,0,0)"
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-water.png"
        pointsData={pointsData}
        pointColor="color"
        pointRadius="size"
        pointAltitude="alt"
        pointLabel="label"
        arcsData={arcData}
        arcColor="color"
        arcDashLength={0.3}
        arcDashGap={0.5}
        arcDashAnimateTime={2000}
        width={400}
        height={400}
      />
    </div>
  );
};

export default GlobePage;
