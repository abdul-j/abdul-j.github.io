import { useEffect, useRef } from "react";
import Globe from "react-globe.gl";

const GlobePage = () => {
  const globeEl = useRef();
  const arcData = [
    {
      startLat: 40.0024, // Philly
      startLng: -75.1180,
      endLat: 40.6275, // Oirase
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
    const controls = globeEl.current.controls();
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1;
  }, [globeEl.current]);


  return (
    <div className="flex items-center justify-center cursor-grab">
        <Globe
          ref={globeEl}
          backgroundColor="rgba(0,0,0,0)"
          globeImageUrl={"//unpkg.com/three-globe/example/img/earth-dark.jpg"}
          bumpImageUrl={"//unpkg.com/three-globe/example/img/earth-water.png"}
          pointsData={pointsData}
          pointColor="color"
          pointRadius="size"
          pointAltitude="alt"
          pointLabel="label"
          arcsData={arcData}
          arcColor="color"
          arcDashLength={Math.random()}
          arcDashGap={Math.random()}
          arcDashAnimateTime={Math.random() * 4000 + 400}
          width={400}
          height={400}
        />
      </div>
  );
}

export default GlobePage; 