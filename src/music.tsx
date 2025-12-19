import { useEffect, useState } from "react";
import SEO from "./seo";
import NavBar from "./navbar";

interface TypingEffectProps {
  texts: string[];
  swing: boolean;
}

export function TypingEffect({ texts = [""], swing = false }: TypingEffectProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);
  const [textIndex, setTextIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const time = 100;
  useEffect(() => {
    const headers = document.querySelectorAll("h2");
    if (!headers.length) return;
    const randomHeader = headers[Math.floor(Math.random() * headers.length)];
    const randomRed = `rgb(${Math.floor(Math.random() * 156)}, 0, 0)`;
    randomHeader.style.color = randomRed;
    const timeout = setTimeout(() => {
        const text = texts[textIndex];
        randomHeader.style.color = "white";
        if (direction === 0) {
            setDisplayedText(text.slice(0, index + 1));
            if (index + 1 === text.length) {
                setTimeout(() => setDirection(1), 200);
            }
            setIndex(index + 1);
        } else {
            if (!swing) return;
            setDisplayedText(text.slice(0, index - 1));
            if (index - 1 <= 0) {
                setDirection(0);
                setTextIndex((textIndex + 1) % texts.length);
                setIndex(0);
            } else {
                setIndex(index - 1);
            }
        }
    }, time); 
    return () => clearTimeout(timeout);
  }, [index, textIndex, direction]);    
  return (
    <div className="pointer-events-none select-none">
        <div className="fixed bold top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"> 
            <h1 className="text-[10vh] text-shadow-lg tracking-widest blur-xs scale-x-200 ">{displayedText}</h1>
        </div>
        <div className="skew-6 transform-flat z-10 max-w-1/2 skew-x-50 blur-xs">
            <h2 className="text-[10vh] text-shadow-lg tracking-widest opacity-0">{displayedText}</h2>
            <h2 className="text-[10vh] text-shadow-lg tracking-widest opacity-80">{displayedText}</h2>
            <h2 className="text-[10vh] text-shadow-lg tracking-widest opacity-60">{displayedText}</h2>
            <h2 className="text-[10vh] text-shadow-lg tracking-widest opacity-40">{displayedText}</h2>
            <h2 className="text-[10vh] text-shadow-lg tracking-widest opacity-20">{displayedText}</h2>
            <h2 className="text-[10vh] text-shadow-lg tracking-widest opacity-10">{displayedText}</h2>
            <h2 className="text-[10vh] text-shadow-lg tracking-widest opacity-1">{displayedText}</h2>
        </div>
        <div className="fixed bold top-0 left-0 z-0 text-nowrap blur-sm"> 
            <h3 className="text-[10vh] text-shadow-lg tracking-widest opacity-10">{displayedText}</h3>
            <h3 className="text-[10vh] text-shadow-lg tracking-widest opacity-8">{displayedText}</h3>
            <h3 className="text-[10vh] text-shadow-lg tracking-widest opacity-6">{displayedText}</h3>
            <h3 className="text-[10vh] text-shadow-lg tracking-widest opacity-4">{displayedText}</h3>
            <h3 className="text-[10vh] text-shadow-lg tracking-widest opacity-2">{displayedText}</h3>
        </div>
    </div>
    );
}

export function Beat() {
  const [song, setSong] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState<string>("null");

  useEffect(() => {
    const fetchBeat = async () => {
      setLoading(true); // Start loading when new poem is being fetched
      setError(null); // Reset error on every new fetch
      try {
        const response = await fetch(`https://api-2xrb.onrender.com/api/music/song`);
        if (!response.ok) {
          throw new Error("Poem not found or error occurred");
        }
        const data = await response.blob();
        const contentDisposition = response.headers.get("Content-Disposition") || "";
        const match = contentDisposition.match(/filename="?(.+?)"?($|;)/);
        const filename = match ? match[1] : "an mp3 file";
        console.log("Filename:", filename);
        setSong(data);
        setName(filename.split(".mp3")[0]);
      } catch (err: any) {
        setError(err.message); // Handle any errors here
      } finally {
        setLoading(false); // Stop loading
      }
    };
    fetchBeat();
  }, []);

  if (loading) {
    return (
      <TypingEffect texts={["Loading..."]} swing={false} />
    );
  }

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  if (!song) {
    return <p>Song not found</p>;
  }

  return (
    <div>
        <div className="mt-4">
        <TypingEffect texts={["You are now listening to...",name]} swing={true} />
        <audio controls autoPlay loop className="mt-4 w-full hidden">
            <source src={URL.createObjectURL(song)} type="audio/mpeg" />
            Your browser does not support the audio element.
        </audio>
        </div>
    </div>
  );
}

export default function () {
    const random = Math.random() * 4 + 1;
    const duration = `${random}s`;
    const [clicked, setClicked] = useState(false);
    const [bgColor, setBgColor] = useState('');
    const handleClick = () => {
        setClicked(true);
        document.documentElement.style.overflow = 'hidden';
    };
    setTimeout(() => {
        const randomColor = Math.floor(Math.random() * 256);
        if (Math.random() < 0.25) {
            setBgColor(`rgb(${Math.floor(Math.random() * 256)}, 0, ${Math.floor(Math.random() * 256)})`);
        } else {
            setBgColor(`rgb(${randomColor}, ${randomColor}, ${randomColor})`);
        }
        
    }, 3000); // Change color within 1 second of click

    return (
        <>
        <SEO 
            title="Headphones not included"
            description="beats songs etc"
            keywords={["Abdul", "Aziz", "Jeter", "Portfolio", "Works", "Music"]}
            author="Abdul Aziz Jeter"
            canonical="https://abdulisabroad.com/works/music"
        />
        <div className="relative">
            <NavBar />
            {!clicked ? (
                <h1 onClick={handleClick} className="text-6xl text-center hover:cursor-pointer hover:blur-xs hover:text-7xl hover:text-my-blue hover:scale-y-300 mb-6">Click me to play a song</h1>
            ) : (
                <div className="p-4 max-w-screen mx-auto">
                    <Beat />
                    <div
                        className="fixed top-0 left-0 inset-0 z-0 w-screen h-screen bg-white opacity-0 animate-fadee transition-colors pointer-events-none"
                        style={{
                            backgroundColor: bgColor,
                            animationDuration: duration,
                        }}
                    />

                </div>
            )}
            
        </div>
        </>
    );
}
