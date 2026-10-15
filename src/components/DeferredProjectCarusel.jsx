import { lazy, Suspense, useEffect, useRef, useState } from "react";

const ProjectCarusel = lazy(() => import("./ProjectCarusel.jsx"));

const DeferredProjectCarusel = () => {
  const [isReady, setIsReady] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || typeof IntersectionObserver === "undefined") {
      setIsReady(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setIsReady(true);
        observer.disconnect();
      },
      { rootMargin: "600px 0px" }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef}>
      {isReady ? (
        <Suspense fallback={<div className="min-h-[28rem]" aria-hidden="true" />}>
          <ProjectCarusel variant="home" />
        </Suspense>
      ) : (
        <div className="min-h-[28rem]" aria-hidden="true" />
      )}
    </div>
  );
};

export default DeferredProjectCarusel;
