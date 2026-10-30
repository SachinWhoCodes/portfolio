import { useEffect, type RefObject } from "react";

// Writes the pointer position to --px/--py (-1..1) on the element so CSS can
// shift layered images. Off on touch screens and under reduced motion.
export function useParallax(ref: RefObject<HTMLElement>) {
  useEffect(() => {
    const el = ref.current;
    const allowed =
      window.matchMedia("(pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!el || !allowed) return;

    const onMove = (event: PointerEvent) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 2;
      const y = (event.clientY / window.innerHeight - 0.5) * 2;
      el.style.setProperty("--px", String(+x.toFixed(3)));
      el.style.setProperty("--py", String(+y.toFixed(3)));
    };

    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [ref]);
}
