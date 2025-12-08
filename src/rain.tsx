import { useEffect, useRef, useState } from "react";
import { extend, useApplication, useTick } from "@pixi/react";
import { Container, Assets, BitmapText, Graphics } from "pixi.js";
import mFont from "/assets/Minecraft.ttf";

extend({ Container, BitmapText });

const numDrops = 200;
const dropSpeed = 4;

export default function Rain() {
  const { app } = useApplication();
  const [font, setFont] = useState(null);
  const [color, setColor] = useState("white");

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
        <pixiContainer 
            x={300} 
            y={100}
            interactive={true}
            eventMode="static"
            cursor="pointer"
            onMouseOver= {() => { setColor("red"); }}
            onClick = {() => { alert("You clicked me!"); }}
        >
            <pixiBitmapText text="Contact Me" tint={color}/>
        </pixiContainer>
        <pixiContainer 
            x={300} 
            y={200}
            interactive={true}
            eventMode="static"
            cursor="pointer"
            onClick = {() => { window.location.href = "https://www.linkedin.com/in/abdul-aziz-jeter-3315251b1"; }}
        >
            <pixiBitmapText text="LinkedIn" />
        </pixiContainer>
        <pixiContainer 
            x={300} 
            y={300}
            interactive={true}
            eventMode="static"
            cursor="pointer"
            onClick = {() => { window.location.href = "https://www.instagram.com/abdul.7z/"; }}
        >
            <pixiBitmapText text="Instagram" />
        </pixiContainer>
        <pixiContainer 
            x={300} 
            y={400}
            interactive={true}
            eventMode="static"
            cursor="pointer"
            onClick = {() => { window.location.href = "mailto:abdulazizjtr@gmail.com"; }}
        >
            <pixiBitmapText text="E-Mail" />
        </pixiContainer>
    </pixiContainer>

  );
}
