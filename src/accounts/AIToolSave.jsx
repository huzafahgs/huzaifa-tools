import { useEffect, useState } from "react";
import ToolSave from "./ToolSave";

// The additive catalog migration can be applied independently of the web release.
// Avoid failed cloud writes until this new slug exists; existing tools are untouched.
export default function AIToolSave({ slug }) {
  const [available, setAvailable] = useState(false);
  useEffect(() => {
    let active = true;
    fetch("/api/ai", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (active) setAvailable(data?.catalogReady === true);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);
  if (!available)
    return (
      <p className="tool-save">
        Saving and visit history for this new tool will be available when its
        service setup is complete.
      </p>
    );
  return <ToolSave slug={slug} />;
}
