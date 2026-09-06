/**
 * Subtle CSS-only ambient background. pointer-events:none keeps UI usable.
 */
export default function LiveWallpaper() {
  return (
    <div className="live-wallpaper" aria-hidden="true">
      <div className="live-wallpaper__base" />
      <div className="live-wallpaper__glow live-wallpaper__glow--a" />
      <div className="live-wallpaper__glow live-wallpaper__glow--b" />
      <div className="live-wallpaper__sheen" />
    </div>
  );
}
