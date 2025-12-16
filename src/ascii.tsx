import { useEffect, useState } from "react";

interface ASCIIProps {
    slug: string;
}

interface imageData {
    ascii: string;
    debug: {
        image: string;
        ascii: string;
    }
}

export function ASCIIArt({ slug }: ASCIIProps) {
  const [image, setImage] = useState<imageData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImage = async () => {
      setLoading(true); 
      setError(null); 
      try {
        const response = await fetch(`https://api-2xrb.onrender.com/api/images/${slug}`);
        if (!response.ok) {
          throw new Error("Image not found or error occurred");
        }
        const data = await response.json();
        setImage(data);
      } catch (err: any) {
        setError(err.message); // Handle any errors here
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchImage();
  }, [slug]);

  if (loading) {
    return (
      <div className="text-center">
        <pre>Loading...</pre>
        {/* Optionally, show a spinner */}
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  if (!image) {
    return <p>Image not found</p>;
  }

  return (
    <pre className="leading-none whitespace-pre">{image.ascii}</pre>
  );
}