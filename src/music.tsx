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
    const timeout = setTimeout(() => {
        const text = texts[textIndex];
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
            <h2 className="text-[10vh] text-shadow-lg backdrop-saturate-50 scale-x-200 ">{displayedText}</h2>
        </div>
        <div className="skew-6 transform-flat z-10 max-w-1/2 skew-x-50">
            <h2 className="text-[10vh] text-shadow-lg tracking-widest opacity-0">{displayedText}</h2>
            <h2 className="text-[10vh] text-shadow-lg tracking-widest opacity-80">{displayedText}</h2>
            <h2 className="text-[10vh] text-shadow-lg tracking-widest opacity-60">{displayedText}</h2>
            <h2 className="text-[10vh] text-shadow-lg tracking-widest opacity-40">{displayedText}</h2>
            <h2 className="text-[10vh] text-shadow-lg tracking-widest opacity-20">{displayedText}</h2>
            <h2 className="text-[10vh] text-shadow-lg tracking-widest opacity-10">{displayedText}</h2>
            <h2 className="text-[10vh] text-shadow-lg tracking-widest opacity-1">{displayedText}</h2>
        </div>
        <div className="fixed bold top-0 left-0 z-0 text-nowrap blur-md"> 
            <h2 className="text-[10vh] text-shadow-lg tracking-widest opacity-5">{displayedText}</h2>
            <h2 className="text-[10vh] text-shadow-lg tracking-widest opacity-4">{displayedText}</h2>
            <h2 className="text-[10vh] text-shadow-lg tracking-widest opacity-3">{displayedText}</h2>
            <h2 className="text-[10vh] text-shadow-lg tracking-widest opacity-2">{displayedText}</h2>
            <h2 className="text-[10vh] text-shadow-lg tracking-widest opacity-1">{displayedText}</h2>
        </div>
        
    </div>
    );
}

export function Beat() {
  const [song, setSong] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState<string>("null");
  const [get, setGet] = useState<boolean>(false);

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
        setName(filename);
      } catch (err: any) {
        setError(err.message); // Handle any errors here
      } finally {
        setLoading(false); // Stop loading
      }
    };
    if (!get) {
        fetchBeat();
        setGet(true);
    }
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
    const duration = `${Math.random() * 4 + 1}s`; // 1s–5s
    const [clicked, setClicked] = useState(false);
    const handleClick = () => {
        setClicked(true);
        document.documentElement.style.overflow = 'hidden';
    };

    return (
        <>
        <SEO 
            title="Headphones not included"
            description="beats songs etc"
            keywords={["Abdul", "Aziz", "Jeter", "Portfolio", "Works", "Music"]}
            author="Abdul Aziz Jeter"
            canonical="https://abdulisabroad.com/works/music"
        />
        <div className="">
            <NavBar />
            {!clicked ? (
                <h1 onClick={handleClick} className="text-6xl hover:cursor-pointer hover:text-7xl hover:text-my-blue mb-6">Click me to play a song</h1>
            ) : (
                <div className="p-4 max-w-screen mx-auto">
                    <Beat />
                    <div className="w-screen h-screen fixed top-0 left-0 z-0 bg-white opacity-0 animate-fadee" style={{animationDuration: duration}} />
                </div>
            )}
            
        </div>
        </>
    );
}
