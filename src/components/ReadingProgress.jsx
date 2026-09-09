import { useEffect, useRef } from "react";
export default function ReadingProgress({ contentKey }) {
  const bar = useRef(null);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const article = document.querySelector(".blog-content");
      if (!article || !bar.current) return;
      const rect = article.getBoundingClientRect();
      const amount = Math.max(
        0,
        Math.min(1, -rect.top / Math.max(1, rect.height - innerHeight)),
      );
      bar.current.style.transform = `scaleX(${amount})`;
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    addEventListener("scroll", schedule, { passive: true });
    addEventListener("resize", schedule);
    const observer = new ResizeObserver(schedule);
    const article = document.querySelector(".blog-content");
    if (article) observer.observe(article);
    update();
    return () => {
      removeEventListener("scroll", schedule);
      removeEventListener("resize", schedule);
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [contentKey]);
  return <div ref={bar} className="reading-progress" aria-hidden="true" />;
}
