import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

type HandwriteProps = {
  svgFile: string;
  animate?: boolean;
  duration?: number;
  width?: number;
  height?: number;
  delay?: number;
  finished?: (status:boolean) => void;
};

export default function Handwrite({
  svgFile,
  animate,
  duration = 4,
  width = 200,
  height = 200,
  delay = 1000,
  finished = () => {},
}: HandwriteProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shakes, setShakes] = useState("");

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

      const totalDuration = pathDelay;
      setTimeout(() => {
        if (animate) {
          setShakes("animate-shake");
        }
        if (finished) finished(true);
      }, totalDuration * 1000);

    }, delay);

    return () => clearTimeout(timeout);
  }, [svgFile, animate, delay, width, height, duration]);

  return <div ref={containerRef} className={shakes} />;
}
