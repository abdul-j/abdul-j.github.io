import SEO from "./seo";
import NavBar from "./navbar";
import { useEffect, useState } from "react";
import { NavLink } from "react-router";
import { ASCIIArt } from "./ascii";

export function usePoems() {
  const [poemList, setPoemList] = useState<string[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPoems = async () => {
      try {
        const response = await fetch("https://api-2xrb.onrender.com/api/poems/");
        if (!response.ok) {
          throw new Error("Poem list not found");
        }
        const data = await response.json();
        setPoemList(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPoems();
  }, []);
  if (loading || error) {
    return { poemList: null };
  }
  return { poemList };
}


export default function Archive() {
    const poemList = usePoems();
    return (
        <>
            <SEO 
                title="Poem Archive"
                description="archive of my poems"
                keywords={["Abdul", "Aziz", "Jeter", "Portfolio", "Works", "Poems"]}
                author="Abdul Aziz Jeter"
                canonical="https://abdulisabroad.com/poems"
            />
            <div className="mx-auto z-10 text-center">
                <NavBar />
            </div>
            <div className="mx-auto z-10">
                <h1 className="text-4xl font-bold mb-4 text-center">Poem Archive</h1>
                <div className="max-w-3xl mx-auto p-4">
                    {poemList.poemList ? (
                        <nav className="flex flex-col space-y-2">
                            {poemList.poemList.map((slug) => (
                                <NavLink
                                    key={slug}
                                    to={`/works/poems/archive/${slug}`}
                                    className="hover:underline"
                                    end 
                                    prefetch="intent"
                                >
                                    {slug}
                                </NavLink>
                            ))}
                        </nav>
                    ) : (
                        <p>Loading poems...</p>
                    )}
                </div>
            </div>
            <div
                className="
                bg-blue-100
                text-black
                fixed
                z-0
                inset-0
                w-screen
                h-screen
                flex
                items-center
                justify-center
                opacity-25
                select-none
                pointer-events-none
                overflow-hidden
                "
            >
                <ASCIIArt slug={"aj.jpeg"} />
            </div>
        </>
    );
}