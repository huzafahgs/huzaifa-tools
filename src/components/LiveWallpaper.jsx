import { useEffect, useRef } from "react";
export default function LiveWallpaper() {
  const glow = useRef(null);
  useEffect(() => {
    const capable = matchMedia(
      "(min-width: 1000px) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    );
    let frame = 0;
    const move = (event) => {
      if (!capable.matches || document.hidden || frame) return;
      const { clientX, clientY } = event;
      frame = requestAnimationFrame(() => {
        if (glow.current)
          glow.current.style.transform = `translate3d(${clientX - 200}px,${clientY - 200}px,0)`;
        frame = 0;
      });
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(frame);
    };
  }, []);
  return (
    <div className="live-wallpaper" aria-hidden="true">
      <div className="ambient-base" />
      <div className="ambient-aurora ambient-aurora--one" />
      <div className="ambient-aurora ambient-aurora--two" />
      <div className="ambient-grid" />
      <div className="ambient-beam" />
      <div ref={glow} className="ambient-cursor" />
      <div className="ambient-stars">
        {Array.from({ length: 12 }, (_, i) => (
          <i
            key={i}
            style={{
              "--i": i,
              left: `${(i * 31 + 7) % 100}%`,
              top: `${(i * 17 + 9) % 100}%`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
