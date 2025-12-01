import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations, OrbitControls } from "@react-three/drei";
import { Suspense, useRef, useEffect } from "react";
import noteSvg from "/src/assets/note.svg";
import { gsap } from "gsap";

/* --------------------
   Load + Animate Model
--------------------- */
function Model() {
  const { scene, animations } = useGLTF("/src/assets/resume.glb");
  const { actions } = useAnimations(animations, scene);

  useEffect(() => {
    actions["Unfold"]?.play();
  }, [actions]);

  return <primitive object={scene} />;
}

/* --------------------
      AutoPan
--------------------- */
interface AutoPanProps {
  baseSpeed?: number;
  isInteracting: React.RefObject<boolean>;
}

function AutoPan({ baseSpeed = 0.001, isInteracting }: AutoPanProps) {
  const { camera } = useThree();
  const angle = useRef(0);
  const radius = useRef(
    Math.sqrt(camera.position.x ** 2 + camera.position.z ** 2)
  );

  useFrame(() => {
    if (isInteracting.current) return;

    angle.current += baseSpeed;
    camera.position.x = radius.current * Math.sin(angle.current);
    camera.position.z = radius.current * Math.cos(angle.current);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

/* --------------------
      Handwrite
--------------------- */
interface HandwriteProps {
  svg: string;
  duration?: number;
  width?: number;
  height?: number;
  delay?: number;
}

function Handwrite({
  svg,
  duration = 4,
  width = 500,
  height = 200,
  delay = 1000,
}: HandwriteProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!svg || !containerRef.current) return;

    const timeout = setTimeout(async () => {
      let svgText = svg;

      try {
        svgText = await fetch(svg).then((r) => r.text());
      } catch {}

      // containerRef is now typed
      containerRef.current!.innerHTML = svgText;

      const svgEl = containerRef.current!.querySelector("svg") as
        | SVGSVGElement
        | null;
      if (!svgEl) return;

      svgEl.setAttribute("width", String(width));
      svgEl.setAttribute("height", String(height));

      if (!svgEl.hasAttribute("viewBox")) {
        svgEl.setAttribute("viewBox", `0 0 ${width} ${height}`);
      }

      const paths = Array.from(
        svgEl.querySelectorAll("path")
      ) as SVGPathElement[];

      const total = paths.reduce(
        (sum, p) => sum + p.getTotalLength(),
        0
      );

      let pathDelay = 0;
      paths.forEach((p) => {
        const len = p.getTotalLength();
        if (len < 0.5) return;

        p.style.stroke = "white";
        p.style.strokeWidth = "2";
        p.style.fill = "none";
        p.style.strokeDasharray = String(len);
        p.style.strokeDashoffset = String(len);

        const seg = (len / total) * duration;

        gsap.to(p, {
          strokeDashoffset: 0,
          duration: seg,
          delay: pathDelay,
          ease: "power1.inOut",
        });

        pathDelay += seg;
      });
    }, delay);

    return () => clearTimeout(timeout);
  }, [svg, duration, width, height, delay]);

  return (
    <div ref={containerRef} className="absolute top-0 right-0" />
  );
}

/* --------------------
       Main Scene
--------------------- */
export default function Scene() {
  const controls = useRef<any>(null);
  const isInteracting = useRef<boolean>(false);

  return (
    <div className="relative w-full h-screen">
      <Canvas
        camera={{ position: [0, 400, 100], fov: 50 }}
        style={{ width: "100%", height: "100%" }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[500, 500, 500]}
          intensity={1}
        />

        <Suspense fallback={null}>
          <Model />
        </Suspense>

        <OrbitControls
          ref={controls}
          enablePan
          enableRotate
          enableZoom
          onStart={() => (isInteracting.current = true)}
          onEnd={() => (isInteracting.current = true)}
        />

        <AutoPan
          baseSpeed={0.001}
          isInteracting={isInteracting}
        />
      </Canvas>

      <Handwrite
        svg={noteSvg}
        duration={4}
        width={500}
        delay={1000}
      />
    </div>
  );
}
