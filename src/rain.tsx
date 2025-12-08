import { useEffect, useRef, useState } from "react";
import { extend, useApplication, useTick } from "@pixi/react";
import { Container, Assets, BitmapText, Graphics } from "pixi.js";
import mFont from "/assets/Minecraft.ttf";

extend({ Container, BitmapText });

const numDrops = 200;
const dropSpeed = 4;
const links = [
  { id: "contact", text: "Contact Me", color: "red", y: 100, url: "/contact" },
  { id: "linkedin", text: "LinkedIn", color: "orange", y: 200, url: "https://www.linkedin.com/in/abdul-aziz-jeter-3315251b1" },
  { id: "instagram", text: "Instagram", color: "yellow", y: 300, url: "https://www.instagram.com/abdul.7z/" },
  { id: "email", text: "E-Mail", color: "green", y: 400, url: "mailto:abdulazizjtr@gmail.com" },
];

function handleClick(link: string) {
  window.open( link, "_blank");
}


export default function Rain() {
  const { app } = useApplication();
  const [font, setFont] = useState(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Store raindrop Graphics instances without causing re-renders
  const raindrops = useRef<any[]>([]);

  useEffect(() => {
    Assets.load(mFont).then((tex) => setFont(tex));
  }, []);

  useEffect(() => {
    if (!app || !app.renderer) return;

    // Create raindrops once
    for (let i = 0; i < numDrops; i++) {
      const drop = new Graphics();

      const screen = app.renderer.screen;
      drop.setFillStyle({ color: 0xADD8E6 });
      drop.rect(0, 0, 2, 15);

      drop.x = Math.random() * screen.width;
      drop.y = Math.random() * screen.height;

      
      raindrops.current.push(drop);
      app.stage.addChild(drop);
    }
  }, [app]);

  // Animation loop
  useTick(() => {
    if (!app || !app.renderer) return;

    raindrops.current.forEach((drop) => {

      const screen = app.renderer.screen;
      drop.y += dropSpeed;

      if (drop.y > screen.height) {
        drop.y = -20;
        drop.x = Math.random() * screen.width;
      }
    });
  });

  if (!font) return null;

  return (
    <pixiContainer>
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
          onClick={() => handleClick(link.url)}
        >
          <pixiBitmapText
            text={link.text}
            tint={hoveredId === link.id ? link.color : "white"}
          />
        </pixiContainer>
      ))}
    </pixiContainer>

  );
}
