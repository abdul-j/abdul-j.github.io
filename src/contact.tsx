import NavBar from "./navbar";
import { Application, extend, useTick } from "@pixi/react";
import { useEffect, useState, useRef } from "react";
import { Assets, Sprite, Text, Container } from "pixi.js";
import Rain from "./rain";
import SEO from "./seo";
import mFont from "/assets/Minecraft.ttf";

extend({ Sprite, Container, Text });

const links = [
  { id: "contact", text: "Contact Me", color: 0xff0000, y: 100, url: "" },
  { id: "linkedin", text: "LinkedIn", color: 0xffa500, y: 200, url: "https://www.linkedin.com/in/abdul-aziz-jeter-3315251b1" },
  { id: "instagram", text: "Instagram", color: 0xffff00, y: 300, url: "https://www.instagram.com/abdul.7z/" },
  { id: "email", text: "E-Mail", color: 0x008000, y: 400, url: "mailto:abdulazizjtr@gmail.com" },
];

interface MovingBunnyProps {
  score: number;
  setScore: (score: number | ((prev: number) => number)) => void;
} 

const MovingBunny = ({ score, setScore }: MovingBunnyProps) => {
  const [texture, setTexture] = useState(null);
  const [rotation, setRotation] = useState(0);
  const [gameStart, setGameStart] = useState(false);
  const [bunnyPos, setBunnyPos] = useState({ x: 100, y: 100 });
  const [velocity, setVelocity] = useState({ vx: 3, vy: 3 });
  const [scale, setScale] = useState(2);

  const bounceBunny = () => {
    setBunnyPos(prev => {
    let { x, y } = prev;
    let { vx, vy } = velocity;

    // Update position
    x += vx;
    y += vy;

    // Bounce off walls
    if (x < 0 || x > window.innerWidth - 60) {
      vx = -vx; // reverse X direction
      x = Math.max(0, Math.min(window.innerWidth - 60, x)); // clamp within bounds
    }

    if (y < 0 || y > (window.innerHeight * 0.8 - 120)) {
      vy = -vy; // reverse Y direction
      y = Math.max(0, Math.min(window.innerHeight * 0.8 - 120, y)); // clamp within bounds
    }

    // Update velocity state only when changed
    setVelocity({ vx, vy });

    return { x, y };
  });
  };

  // Rotate bunny only when NOT playing
  useTick(() => {
    if (!gameStart) {
      setRotation(Math.sin(Date.now() / 200) * 0.2)
    } else {
      setRotation(0);
      bounceBunny();
    };
  });

  // Load texture
  useEffect(() => {
    Assets.load("https://pixijs.com/assets/bunny.png").then((tex) => setTexture(tex));
  }, []);

  const handleClick = () => {
    setGameStart(true);
    setScale(3 + Math.random() * 0.5);
    // Move bunny regardless of start/stop
    setBunnyPos({
      x: Math.random() * 800,
      y: Math.random() * 600,
    });

    // UPDATE SCORE (reactive)
    setScore((prev) => prev + 1);
    if (score + 1 >= 10) {
      alert("Congrats! You clicked the bunny 10 times!");
    } 
  };

  if (!texture) return null;

  return (
    <pixiContainer
      x={bunnyPos.x}
      y={bunnyPos.y}
      interactive
      cursor="pointer"
      onClick={handleClick}
    >
      <pixiSprite texture={texture} rotation={rotation} scale={scale} />
    </pixiContainer>
  );
};

const ContactLinks = () => {
  const [font, setFont] = useState(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useEffect(() => {
    Assets.load(mFont).then((tex) => setFont(tex));
  }, []);

  const linkClick = (link: string) => {
    if (link.startsWith("m")) {
      alert("My E-Mail is " + link.slice(7));
    } else if (link === "") {
      alert("You can contact me through any of the other links!");
    } else {
      window.open(link, "_blank");
    }
  };

  if (!font) return null;

  return (
    <>
      {links.map((link) => (
        <pixiContainer
          key={link.id}
          x={300}
          y={link.y}
          interactive
          eventMode="static"
          cursor="pointer"
          onMouseOver={() => setHoveredId(link.id)}
          onMouseOut={() => setHoveredId(null)}
          onClick={() => linkClick(link.url)}
        >
          <pixiText
            text={link.text}
            style={{
              fontFamily: "Minecraft",
              fontSize: 48,
              fill: hoveredId === link.id ? link.color : 0xffffff,
            }}
          />
        </pixiContainer>
      ))}
    </>
  );
};

const Score = ({ score }: { score: number }) => {
  return (
    <pixiText
      text={`Score: ${score}`}
      x={10}
      y={10}
      style={{
        fontFamily: "Minecraft",
        fontSize: 36,
        fill: 0xffffff,
      }}
    />
  );
};

const Animation = () => {
  const divRef = useRef<HTMLDivElement>(null);

  // Score MUST be inside a component to re-render
  const [score, setScore] = useState(0);

  return (
    <div ref={divRef}>
      <Application 
        resizeTo={divRef} 
        preference="webgl" 
        autoStart 
        sharedTicker
        height={window.innerHeight * 0.8}
        >
        <MovingBunny score={score} setScore={setScore} />
        <ContactLinks />
        <Score score={score} />
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
