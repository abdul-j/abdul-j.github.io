import { useEffect, useState } from "react";

export function Welcome(key = "welcomed") {
  const [isFirstVisit, setIsFirstVisit] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const seen = localStorage.getItem(key);

    if (!seen) {
      setIsFirstVisit(true);
    }

    setReady(true);
  }, [key]);

  const markAsSeen = () => {
    localStorage.setItem(key, "true");
    setIsFirstVisit(false);
  };

  return { isFirstVisit, markAsSeen, ready };
}
