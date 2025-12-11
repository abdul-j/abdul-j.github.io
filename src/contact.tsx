import NavBar from "./navbar";
import { Application, extend, useTick } from "@pixi/react";
import { useEffect, useState, useRef } from "react";
import { Assets, Sprite, Text, Container } from "pixi.js";
import Rain from "./rain";
import SEO from "./seo";
import mFont from "/assets/Minecraft.ttf";

extend({ Sprite, Container, Text });

const screenRatio = window.innerWidth / window.innerHeight;
const scorePosition = window.innerHeight * 0.05;

const links = [
  { id: "contact", text: "Contact Me", color: 0xff0000, y: screenRatio * 100, url: "" },
  { id: "linkedin", text: "LinkedIn", color: 0xffa500, y: screenRatio * 200, url: "https://www.linkedin.com/in/abdul-aziz-jeter-3315251b1" },
  { id: "instagram", text: "Instagram", color: 0xffff00, y: screenRatio * 300, url: "https://www.instagram.com/abdul.7z/" },
  { id: "email", text: "E-Mail", color: 0x008000, y: screenRatio * 400, url: "mailto:abdulazizjtr@gmail.com" },
];

interface MovingBunnyProps {
  score: number;
  setScore: (score: number | ((prev: number) => number)) => void;
} 

const MovingBunny = ({ score, setScore }: MovingBunnyProps) => {
  const [texture, setTexture] = useState(null);
  const [rotation, setRotation] = useState(0);
  const [gameStart, setGameStart] = useState(false);
  const [bunnyPos, setBunnyPos] = useState({ x: scorePosition, y: scorePosition });
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
      alert(`Congrats! You tapped the bunny ${score} times!`);
    } 
  };

  if (!texture) return null;

  return (
    <pixiContainer
      x={bunnyPos.x}
      y={bunnyPos.y}
      interactive
      cursor="pointer"
      onPointerDown={handleClick}
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
          x={screenRatio * 100}
          y={link.y}
          interactive
          eventMode="dynamic"
          cursor="pointer"
          onPointerOver={() => setHoveredId(link.id)}
          onPointerOut={() => setHoveredId(null)}
          onPointerDown={() => linkClick(link.url)}
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
  if (score== 0) return null;
  return (
    <pixiText
      text={`Score: ${score}`}
      x={scorePosition}
      y={scorePosition}
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
  const [score, setScore] = useState(0);

  return (
    <div className="relative p-[3px] rounded-xl">
      <div
        className={`
          absolute inset-0 rounded-xl
          bg-[conic-gradient(from_var(--angle),var(--tw-gradient-from),var(--tw-gradient-via),var(--tw-gradient-to))]
          from-my-emerald-500 via-my-blue to-blue-500
          animate-tracer
          ${score > 0 ? 'opacity-100' : 'opacity-0'}
        `}
      ></div>


      <div ref={divRef} className="relative mx-auto rounded-lg overflow-hidden">
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
