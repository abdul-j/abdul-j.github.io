import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";
import { Suspense, useRef, useState } from "react";

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


export default function Scene() {
  const controls = useRef<any>(null);
  const [isInteracting, setIsInteracting] = useState(false);

  return (
    <div className="relative w-full h-screen">
      <Canvas
        camera={{ position: [0, 400, 100], fov: 50 }} 
        resize={{ scroll: false , debounce: 0, offsetSize: false}}
        style={{ width: "100%", height: "100%" }}
      >
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
    </div>
  );
}
