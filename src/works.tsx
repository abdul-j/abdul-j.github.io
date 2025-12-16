import NavBar from "./navbar";
import SEO from "./seo";
import { Canvas, useFrame } from "@react-three/fiber";
import { Decal, useTexture } from "@react-three/drei";
import { useRef, useState } from "react";
import { gsap } from "gsap";
import { Link } from "react-router";

function PaintSplat() {
  const texture = useTexture("/assets/aj.jpeg")

  return (
    <mesh position={[0, 0, 0.01]}>
      <planeGeometry args={[4, 3]} />

      <Decal
        position={[0, 0, 0]}
        rotation={[0, 0, 0]}
        scale={1}
        map={texture}
        depthTest={false}
      />
    </mesh>
  )
}
function Wall() {
  return (
    <mesh position={[0, 0, 0]}>
      <planeGeometry args={[4, 3]} />
      <meshStandardMaterial color="#00f" />
    </mesh>
  )
}

function PaintBalloon() {
  const mesh = useRef<any>(null);
  const [hit, setHit] = useState(false);

  useFrame((_, delta) => {
    if (!hit) {
      mesh.current.position.z -= delta * 3

      if (mesh.current.position.z < 0.2) {
        setHit(true)
        explode()
      }
    }
  })

  const explode = () => {
    gsap.to(mesh.current.scale, {
      x: 2,
      y: 0.3,
      z: 2,
      duration: 0.15,
      ease: "power2.out",
      onComplete: () => {mesh.current.visible = false}
    })
  }

  return (
    <>
      <mesh ref={mesh} position={[0, 0, 4]}>
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshStandardMaterial color="hotpink" />
      </mesh>

      {hit && <PaintSplat />}
    </>
  )
}


export default function () {
  return (
    <>      
      <SEO 
        title="Some Stuff"
        description="These are my works and projects."
        keywords={["Abdul", "Aziz", "Jeter", "Portfolio", "Works", "Projects"]}
        author="Abdul Aziz Jeter"
        canonical="https://abdulisabroad.com/works"
      />
      <div className="mx-auto">
        <NavBar />
        {/* this is hidden rn bc it looks bad */}
        <div className="hidden"> 
          <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} />
            <Wall />
            <PaintBalloon />
          </Canvas>
        </div>
        <div className="flex flex-col items-center justify-center space-y-6 my-12">
          <Link to="/works/poems" className="text-7xl hover:underline" prefetch="viewport">Poems</Link>
        </div>
      </div>
    </>
  );
}