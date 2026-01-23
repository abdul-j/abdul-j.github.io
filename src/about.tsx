import NavBar from "./navbar";
import aj from "/assets/me.jpg";
import Paper from "./paper";
import { useEffect, useRef, useState } from "react";
import { Howl } from "howler";
import noteSvg from "/assets/note.svg";
import returnSvg from "/assets/return.svg";
import SEO from "./seo";
import Handwrite from "./handwrite";

export default function Home() {
  const [open, setOpen] = useState(true);
  const start = useRef(0);
  const [play, setPlay] = useState(false);
  const bgRef = useRef<Howl | null>(null);
  const handleClick = () => {
    if (performance.now() - start.current > 150) return;
    setOpen(!open);
    setPlay(!play);
  };

  useEffect(() => {
    bgRef.current = new Howl({
      src: ["/assets/about that.mp3"],
      loop: true,
      volume: 0.5,
    });
    if (play) {
      bgRef.current?.play();
    } else {
      bgRef.current?.stop();
    }
    return () => {
      bgRef.current?.stop();
      bgRef.current?.unload();
    };
  }, [play]);
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
            className="w-1/2"
            src={aj}
            alt="abdul"
          />
          <p className="m-8 text-lg font-normal text-body lg:text-xl sm:px-16 xl:px-48">
            Hi, my name is Abdul. <br /> Yeah, I like blueberries.
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
              <Handwrite key="note" svgFile={noteSvg} animate={true} />
            </div>
          )}

          {!open && (
            <div className="absolute top-0 left-20 hover:cursor-pointer">
              <Handwrite key="return" svgFile={returnSvg} animate={false} />
            </div>
          )}

        </div>
      </div>
    </>
  );
}
