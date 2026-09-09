import { useEffect, useRef } from "react";
// Always visible: the observer adds a one-time movement, never a content gate.
export default function Reveal({ children, className = "" }) {
  const ref = useRef(null);
  useEffect(() => {
    if (
      !("IntersectionObserver" in window) ||
      matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          ref.current?.classList.add("has-entered");
          observer.disconnect();
        }
      },
      { threshold: 0.08 },
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} className={`v2-reveal ${className}`}>
      {children}
    </div>
  );
}
