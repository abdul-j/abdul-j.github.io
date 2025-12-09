import { useEffect, useRef } from "react";
import { extend, useApplication, useTick } from "@pixi/react";
import { Container, Graphics } from "pixi.js";

extend({ Container, Text });

const numDrops = 200;
const dropSpeed = 4;

export default function Rain() {
  const { app } = useApplication();

  // Store raindrop Graphics instances without causing re-renders
  const raindrops = useRef<any[]>([]);

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

  return (
    <pixiContainer>
    </pixiContainer>

  );
}
