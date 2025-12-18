import { useApplication } from "@pixi/react";
import { ParticleContainer, Particle, Texture } from "pixi.js";

export default function Rain() {
  const raindrops = 500;
  const {app} = useApplication();
  const texture = Texture.WHITE;
  const drops: Particle[] = [];
  const rainContainer = new ParticleContainer({
    dynamicProperties: {
      position: true,
      rotation: false,
      scale: true,
      alpha: false,
  } });
  if (!app.stage || !app.renderer) return null;
  for (let i = 0; i < raindrops; i++) {
    const drop = new Particle(texture);
    drop.tint = 0x66ccff;
    drop.x = Math.random() * app.renderer.width;
    drop.y = Math.random() * app.renderer.height;
    drop.scaleX = Math.random() * 2;
    drop.scaleY = 4 + Math.random() * 2;
    rainContainer.addParticle(drop);
    drops.push(drop);
  }
  app.ticker.add(() => {
    if (!app.renderer) return;
    drops.forEach((drop) => {
      drop.y += 10 + drop.scaleY * 0.5;
      if (drop.y > app.renderer.height) {
        drop.y = -10;
        drop.x = Math.random() * app.renderer.width;
      }
    });
  });
  app.stage.addChild(rainContainer);
  return null;
}
