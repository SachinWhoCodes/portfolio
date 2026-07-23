import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

interface PageTransitionProps {
  children: React.ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  const location = useLocation();
  const [displayChildren, setDisplayChildren] = useState(children);
  const [phase, setPhase] = useState<"enter" | "idle">("enter");

  useEffect(() => {
    setPhase("enter");
    setDisplayChildren(children);

    const timer = setTimeout(() => setPhase("idle"), 300);
    return () => clearTimeout(timer);
  }, [location.pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={`page-transition page-transition-${phase}`}>
      {displayChildren}
    </div>
  );
}
