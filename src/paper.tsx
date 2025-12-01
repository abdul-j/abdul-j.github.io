import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";
import { Suspense, useRef, useEffect, useState } from "react";
import noteSvg from "/assets/note.svg";
import { gsap } from "gsap";

function Model() {
  const scene = useGLTF("/assets/resume.glb");
  return <primitive object={scene.scene || scene} />;
}

function AutoPan({ isInteracting }: { isInteracting: boolean }) {
  const { camera } = useThree();
  const angle = useRef(0);
  const radius = Math.sqrt(camera.position.x ** 2 + camera.position.z ** 2);

  useFrame(() => {
    if (isInteracting) return; 
    angle.current += 0.0005; 
    camera.position.x = radius * Math.sin(angle.current);
    camera.position.z = radius * Math.cos(angle.current);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

function Handwrite() {
  const containerRef = useRef<HTMLDivElement>(null);
  const duration = 4; 
  const width = 200;
  const height = 200;
  const delay = 1000; 

  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (!containerRef.current) return;

      let svgText = "";
      try {
        svgText = await fetch(noteSvg).then((r) => r.text());
      } catch (err) {
        console.error("Failed to load SVG:", err);
        return;
      }

      containerRef.current.innerHTML = svgText;
      const svgEl = containerRef.current.querySelector("svg");
      if (!svgEl) return;

      svgEl.setAttribute("width", `${width}`);
      svgEl.setAttribute("height", `${height}`);
      if (!svgEl.hasAttribute("viewBox")) {
        svgEl.setAttribute("viewBox", `0 0 ${width} ${height}`);
      }

      const paths = Array.from(svgEl.querySelectorAll("path"));
      const totalLength = paths.reduce((sum, p) => sum + p.getTotalLength(), 0);

      let pathDelay = 0;
      paths.forEach((p) => {
        const len = p.getTotalLength();
        if (len < 0.5) return;

        Object.assign(p.style, {
          stroke: "white",
          strokeWidth: "2",
          fill: "none",
          strokeDasharray: `${len}`,
          strokeDashoffset: `${len}`,
        });

        const segDuration = (len / totalLength) * duration;
        gsap.to(p, {
          strokeDashoffset: 0,
          duration: segDuration,
          delay: pathDelay,
          ease: "power1.inOut",
        });
        pathDelay += segDuration;
      });
    }, delay);

    return () => clearTimeout(timeout);
  }, []);

  return <div ref={containerRef} className="absolute top-0 right-0" />;
}

export default function Scene() {
  const controls = useRef<any>(null);
  const [isInteracting, setIsInteracting] = useState(false);

  return (
    <div className="relative w-full h-screen">
      <Canvas camera={{ position: [0, 400, 100], fov: 50 }} style={{ width: "100%", height: "100%" }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[500, 500, 500]} intensity={1} />

        <Suspense fallback={null}>
          <Model />
        </Suspense>

        <OrbitControls
          ref={controls}
          enablePan
          enableRotate
          enableZoom
          onStart={() => setIsInteracting(true)}
        />

        <AutoPan isInteracting={isInteracting} />
      </Canvas>

      <Handwrite />
    </div>
  );
}
