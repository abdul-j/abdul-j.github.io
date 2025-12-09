import NavBar from "./navbar";
import { Application, extend, useTick} from "@pixi/react";
import { useEffect, useCallback, useState, useRef} from "react";
import { Assets, Sprite, Container} from "pixi.js";
import Rain from "./rain";
import SEO from "./seo";

extend( { Sprite, Container } );

const MovingBunny = () => {
  const [texture, setTexture] = useState(null);
  const [rotation, setRotation] = useState(0);

  const animateRotation = useCallback(() => setRotation(previousState => previousState + 0.01), []);
  useTick(animateRotation);
  useEffect(() => {
    Assets.load("https://pixijs.com/assets/bunny.png").then((tex) => {
      setTexture(tex);
    });
  }, []);

  if (!texture) return null;

  return (
    <pixiContainer x={100} y={100}>
      <pixiSprite texture={texture} rotation={rotation}/>
  </pixiContainer>
  );
};

const Animation = () => {
  const divRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={divRef}>
      <Application resizeTo={divRef} preference= 'webgl' autoStart sharedTicker>
        <MovingBunny />
        <Rain />
      </Application>
    </div>
  );
};

export default function App() {
  return (
    <>
      <SEO 
        title="Click those links!"
        description="This is the contact page."
        keywords={["Abdul", "Aziz", "Jeter", "Portfolio", "Personal Site"]}
        author="Abdul Aziz Jeter"
        canonical="https://abdulisabroad.com/contact"
      />
      <div className="mx-auto">
        <NavBar />
        <Animation />
      </div>
    </>
  );
}
