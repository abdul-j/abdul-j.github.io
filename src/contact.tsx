import NavBar from "./navbar";
import { Application, extend, useTick } from "@pixi/react";
import { useEffect, useState, useRef } from "react";
import { Assets, Sprite, Text, Container } from "pixi.js";
import { Howl } from "howler";
import Rain from "./rain";
import SEO from "./seo";
import mFont from "/assets/Minecraft.ttf";

extend({ Sprite, Container, Text });

const appHeight = window.innerHeight * 0.8;
const screenRatio = window.innerWidth / appHeight;
const startX = window.innerWidth * 0.5;
const startY = appHeight * 0.9 - Math.random() * appHeight * 0.5;

const links = [
  { id: "contact", text: "Contact Me", color: 0xff0000, y: screenRatio + appHeight * 0.1, url: "" },
  { id: "linkedin", text: "LinkedIn", color: 0x3b82f6, y: screenRatio * 100 + appHeight * 0.1, url: "https://www.linkedin.com/in/abdul-aziz-jeter-3315251b1" },
  { id: "instagram", text: "Instagram", color: 0x10b981, y: screenRatio * 200 + appHeight * 0.1, url: "https://www.instagram.com/abdul.7z/" },
  { id: "email", text: "E-Mail", color: 0x00ffcc, y: screenRatio * 300 + appHeight * 0.1, url: "abdulazizjtr@gmail.com" },
];

interface MovingBunnyProps {
  score: number;
  setScore: (score: number | ((prev: number) => number)) => void;
  setFall: (fall: boolean) => void;
} 

const MovingBunny = ({ score, setScore, setFall }: MovingBunnyProps) => {
  const [texture, setTexture] = useState(null);
  const [rotation, setRotation] = useState(0);
  const [gameStart, setGameStart] = useState(false);
  const [bunnyPos, setBunnyPos] = useState({ x: startX, y: startY, vx: 3, vy: 3});
  const [scale, setScale] = useState(2);
  const [crazy, setCrazy] = useState(false);
  const [bunnies, setBunnies] = useState(0);
  const [bunniesArray, setBunniesArray] = useState<any[]>([]);

  const blipSound = new Howl({
    src: ["/assets/bunnyBlip.wav"]
  });

  const crazySound = new Howl({
    src: ["/assets/crazy.wav"]
  });
  const bounceBunny = ({x, y, vx, vy}: {x: number, y: number, vx: number, vy: number}) => {

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

    return { x, y, vx, vy};

  };

  const handleClick = () => {
    blipSound.play();
    if (!gameStart) {
      setGameStart(true);
      setFall(true);

    }
    setScale(Math.random() + 3);

    setBunnyPos({
      x: Math.random() * window.innerWidth,
      y: Math.random() * appHeight,
      vx: bunnyPos.vx,
      vy: bunnyPos.vy,
    });

    setScore((prev) => prev + 1);
    if (score >= 10) {
      if (score >= 20) {
      console.log("crazy mode!");
      // Add new bunny
      setBunniesArray(prev => {
        return [
          ...prev,
          {
            x: Math.random() * window.innerWidth,
            y: Math.random() * appHeight,
            vx: bunnyPos.vx,
            vy: bunnyPos.vy,
            id: bunnies
          },
        ];
      });
      setBunnies((prev) => prev + 1);
      } else {
        setBunnyPos(prev => ({
          ...prev,
          vx: prev.vx * 1.1,
          vy: prev.vy * 1.1,
        }));
      }
    }
  };
  
  const bunnyClick = () => {
    blipSound.play();

  }

    // Load texture
  useEffect(() => {
    Assets.load("https://pixijs.com/assets/bunny.png").then((tex) => setTexture(tex));
  }, []);
  
  useEffect(() => {
    if (score >= 20) {
      if (crazy) return;
      crazySound.play();
      setCrazy(true);
    }
  }, [score]); 

  // Rotate bunny only when NOT playing
  useTick(() => {
    setRotation(Math.sin(Date.now() / 200) * 0.2)
    if (gameStart) {
      setBunnyPos(bounceBunny(bunnyPos));
      if (crazy) {
        setBunniesArray((prevBunnies) => {
          return prevBunnies.map((bunny) => {
            const newPos = bounceBunny(bunny);
            return {
              ...bunny,
              x: newPos.x,
              y: newPos.y,
              vx: newPos.vx,
              vy: newPos.vy,
            };
          });
        }
        );
      }

    } 
    
  });

  if (!texture) return null;

  return (
    <>
      <pixiContainer
        x={bunnyPos.x}
        y={bunnyPos.y}
        interactive
        cursor="pointer"
        onPointerDown={handleClick}
      >
        <pixiSprite texture={texture} rotation={rotation} scale={scale} />
      </pixiContainer>
      {crazy && bunniesArray.map((bunny: any) => (
        <pixiContainer
          key={bunny.id}
          x={bunny.x}
          y={bunny.y}
          interactive
          cursor="pointer"
          onPointerDown={() => bunnyClick()}
        >
          <pixiSprite texture={texture} rotation={rotation} scale={scale} />
        </pixiContainer>
      ))}
    </>
    
  );
};

const ContactLinks = () => {
  const [font, setFont] = useState(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const blipSound = new Howl({
    src: ["/assets/bunnyBlip.wav"]
  });

  useEffect(() => {
    Assets.load(mFont).then((tex) => setFont(tex));
  }, []);

  const linkClick = (link: string) => {
    blipSound.play();
    if (link.startsWith("a")) {
      navigator.clipboard.writeText(link).then(() => {
        alert("I just copied my email to clipboard!");
      }).catch((error) => {
        alert("Failed to copy my email noooo: " + error);
        window.open(link, "_blank");
      });
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
  const sound = new Howl({
    src: ["/assets/bunnyBlip.wav"]
  });
  if (score == 0) return null;
  return (
    <pixiText
      text={`Score: ${score}`}
      x={startX}
      y={startY}
      style={{
        fontFamily: "Minecraft",
        fontSize: 36,
        fill: 0xffffff,
      }}
      interactive
      cursor="pointer"
      onPointerDown={() => sound.play()}
    />
  );
};

const Animation = () => {
  const divRef = useRef<HTMLDivElement>(null);
  const [score, setScore] = useState(0);
  const [fall, setFall] = useState(false);

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
      {fall && <audio className="hidden" src="/assets/noise.wav" autoPlay loop preload="auto" />}
      <div ref={divRef} className="relative mx-auto rounded-lg overflow-hidden">
        <Application 
          resizeTo={divRef} 
          preference="webgl" 
          autoStart 
          sharedTicker
          height={appHeight}
        >
          <MovingBunny score={score} setScore={setScore} setFall={setFall} />
          {fall && <Rain />}
          <Score score={score} />
          <ContactLinks />
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
