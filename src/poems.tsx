import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import SEO from "./seo";
import NavBar from "./navbar";

interface PoemProps {
  slug: string;
}

interface PoemData {
  title: string;
  content: string;
  date?: string;
  tags?: string[];
}

export function Poem({ slug }: PoemProps) {
  const [poem, setPoem] = useState<PoemData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPoem = async () => {
      setLoading(true); // Start loading when new poem is being fetched
      setError(null); // Reset error on every new fetch
      try {
        const response = await fetch(`https://api-2xrb.onrender.com/api/poems/${slug}`);
        if (!response.ok) {
          throw new Error("Poem not found or error occurred");
        }
        const data = await response.json();
        setPoem(data);
      } catch (err: any) {
        setError(err.message); // Handle any errors here
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchPoem();
  }, [slug]);

  if (loading) {
    return (
      <div className="text-center">
        <p>Loading...</p>
        {/* Optionally, show a spinner */}
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  if (!poem) {
    return <p>Poem not found</p>;
  }

  return (
    <article className="mx-auto max-w-prose px-4">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-semibold">{poem.title}</h1>
        {poem.date && <p className="text-sm">{new Date(poem.date).toLocaleDateString()}</p>}
        {poem.tags && (
          <div className="mt-2">
            {poem.tags.map((tag: string) => (
              <span
                key={tag}
                className="inline-block bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded-full mr-2"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </header>
      <div className="text-justify space-y-4 text-lg leading-relaxed">
        <ReactMarkdown remarkPlugins={[remarkBreaks]}>{poem.content}</ReactMarkdown>
      </div>
    </article>
  );
}

export default function () {
  const month = new Date().toLocaleString("en-US", { month: "long" });

  return (
    <>
      <SEO 
        title="My Poems"
        description="poemssss"
        keywords={["Abdul", "Aziz", "Jeter", "Portfolio", "Works", "Poems"]}
        author="Abdul Aziz Jeter"
        canonical="https://abdulisabroad.com/poems"
      />
      <div className="mx-auto text-center">
        <NavBar />
        <div className="p-4 max-w-3xl mx-auto">
          <h2 className="text-2xl">Check out my {month} poem!</h2>
          <div className="p-4">
            Haven't written it yet oops.
          </div>
          <h1 className="text-3xl"><a className="hover:border-4" href="/works/poems/archive">Archive</a></h1>
        </div>
      </div>
    </>
  );
}
