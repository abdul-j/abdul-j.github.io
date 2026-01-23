import { useState, useRef, useEffect } from "react";
import {Howl} from "howler";
import NavBar from "./navbar";
import GlobeComponent from "./globe";
import SEO from "./seo";

function Home() {
  const start = useRef(0);
  const [play, setPlay] = useState(false);
  const bgRef = useRef<Howl | null>(null);
  
  useEffect(() => {
    bgRef.current = new Howl({
      src: ["/assets/home.mp3"],
      loop: true,
      volume: 0.5,
    });
    if (play) {
      bgRef.current?.play();
    }
    return () => {
      bgRef.current?.stop();
      bgRef.current?.unload();
    };
  }, [play]);

  const checkDrag = () => {
    if (performance.now() - start.current < 100) return;
    setPlay(true);
  };

  return (
    <>
      <SEO 
        title="Abdul's Site"
        description="Welcome to my personal website."
        keywords={["Abdul", "Aziz", "Jeter", "Portfolio", "Personal Site"]}
        author="Abdul Aziz Jeter"
        canonical="https://abdulisabroad.com"
      />
      <div className="mx-auto">
        <NavBar />
        <div className="mx-auto justify-center text-center">
          <h2 className="h-pad">Welcome.</h2>
          <div className="select-none" onPointerUp={checkDrag} onPointerDown={() => (start.current = performance.now())}>
            <GlobeComponent />
          </div>
          <p className="h-pad">I am working on adding some new features at the moment.</p>
          <p className="h-pad">Please make yourself at home.</p>
        </div>
      </div>
    </>
  );
}

export default Home