import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function Handwrite({ svgFile }: { svgFile: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shakes, setShakes] = useState("");
  const duration = 4; 
  const width = 200;
  const height = 200;
  const delay = 1000; 

  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (!containerRef.current) return;

      let svgText = "";
      try {
        svgText = await fetch(svgFile).then((r) => r.text());
      } catch (err) {
        console.error("Failed to load SVG:", err);
        return;
      }

      containerRef.current.innerHTML = svgText;
      const svgEl = containerRef.current.querySelector("svg");
      if (!svgEl) return;

      svgEl.setAttribute("width", `${width}`);
      svgEl.setAttribute("height", `${height}`);
      if (!svgEl.hasAttribute("viewBox")) {
        svgEl.setAttribute("viewBox", `0 0 ${width} ${height}`);
      }

      const paths = Array.from(svgEl.querySelectorAll("path"));
      const totalLength = paths.reduce((sum, p) => sum + p.getTotalLength(), 0);

      let pathDelay = 0;
      
      paths.forEach((p) => {
        const len = p.getTotalLength();
        if (len < 0.5) return;

        Object.assign(p.style, {
          stroke: "white",
          strokeWidth: "2",
          fill: "none",
          strokeDasharray: `${len}`,
          strokeDashoffset: `${len}`,
        });

        const segDuration = (len / totalLength) * duration;
        gsap.to(p, {
          strokeDashoffset: 0,
          duration: segDuration,
          delay: pathDelay,
          ease: "power1.inOut",
        });
        pathDelay += segDuration;
      });
      setTimeout(() => {
        setShakes("animate-shake");
      }, pathDelay * 1000);

    }, delay);

    return () => clearTimeout(timeout);
  }, [svgFile]);

  return <div ref={containerRef} className={`${shakes}`}/>;
}