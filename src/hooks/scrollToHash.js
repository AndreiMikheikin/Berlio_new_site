import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function useScrollToHash() {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;

    // чуть подождём, пока страница смонтируется
    const timer = setTimeout(() => {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [hash]);
}

export default useScrollToHash;