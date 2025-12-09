import NavBar from "./navbar";
import aj from "/assets/aj.jpeg";
import Paper from "./paper";
import { useRef, useEffect, useState } from "react";
import noteSvg from "/assets/note.svg";
import returnSvg from "/assets/return.svg";
import { gsap } from "gsap";
import SEO from "./seo";

function Handwrite({ svgFile }: { svgFile: string }) {
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

export default function Home() {
  const [width, setWidth] = useState("w-1/2");

  const handleClick = () => {
    // on every click push a new coordinate to the boxes array
    setWidth((width) => (width === "w-1/2" ? "w-full" : "w-1/2"));
  };
  return (
    <>
      <SEO 
        title="All about me"
        description="This is the about page."
        keywords={["Abdul", "Aziz", "Jeter", "Portfolio", "Personal Site"]}
        author="Abdul Aziz Jeter"
        canonical="https://abdulisabroad.com"
      />
      <NavBar />
      <div className="flex md:flex-row items-center justify-center">

        {/* LEFT: Image */}
        <div
          className={`
            flex flex-col items-center justify-center 
            transition-all duration-500 overflow-hidden
            ${width === "w-1/2" ? "w-1/2 opacity-100" : "w-0 opacity-0"}
          `}
        >


          <h1 className="mb-4 text-4xl font-bold tracking-tight text-heading md:text-5xl lg:text-6xl">
          About Me
          </h1>
          <img
            className="w-1/3 overflow-hidden"
            src={aj}
            alt="abdul"
          />
          <p className="mt-6 mb-6 text-lg font-normal text-body lg:text-xl sm:px-16 xl:px-48">
            Yeah.
          </p>
        </div>
        <div className={`${width} transition-all duration-500 relative`}>
          <Paper />
          {width === "w-1/2" && (
            <div
              className="absolute top-0 right-20 hover:cursor-pointer"
              onClick={handleClick}
            >
              <Handwrite key="note" svgFile={noteSvg} />
            </div>
          )}

          {width === "w-full" && (
            <div
              className="absolute top-0 left-20 hover:cursor-pointer"
              onClick={handleClick}
            >
              <Handwrite key="return" svgFile={returnSvg} />
            </div>
          )}

        </div>
      </div>
    </>
  );
}
