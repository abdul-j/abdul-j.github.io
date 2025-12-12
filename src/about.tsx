import NavBar from "./navbar";
import aj from "/assets/aj.jpeg";
import Paper from "./paper";
import { useRef, useState } from "react";
import noteSvg from "/assets/note.svg";
import returnSvg from "/assets/return.svg";
import SEO from "./seo";
import Handwrite from "./handwrite";

export default function Home() {
  const [open, setOpen] = useState(true);
  const start = useRef(0);
  const handleClick = () => {
    // on every click push a new coordinate to the boxes array
    if (performance.now() - start.current > 200) return;
    setOpen(!open);
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
        <div //left side
          className="
            flex flex-col items-center justify-center 
            transition-all duration-500 ease-in-out overflow-hidden
          "
          style={{
            width: open ? "50%" : "0",
            opacity: open ? 1 : 0,
          }}
        >


          <h1 className="mb-4 text-4xl font-bold tracking-tight text-heading md:text-5xl lg:text-6xl">
          About Me
          </h1>
          <img
            className="w-1/3 "
            src={aj}
            alt="abdul"
          />
          <p className="mt-6 mb-6 text-lg font-normal text-body lg:text-xl sm:px-16 xl:px-48">
            Yeah.
          </p>
        </div>
        <div //right side
          className="flex flex-col items-center justify-center transition-all duration-500 ease-in-out overflow-hidden relative" 
          onPointerDown={() => (start.current = performance.now())}
          onPointerUp={handleClick}
          style={{ width: open ? "50%" : "100%" }}
        >
          <Paper />
          {open && (
            <div className="absolute top-0 right-0 hover:cursor-pointer">
              <Handwrite key="note" svgFile={noteSvg} />
            </div>
          )}

          {!open && (
            <div className="absolute top-0 left-20 hover:cursor-pointer">
              <Handwrite key="return" svgFile={returnSvg} />
            </div>
          )}

        </div>
      </div>
    </>
  );
}
