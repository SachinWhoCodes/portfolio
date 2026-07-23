import { useEffect, useState } from "react";

export function KbdHint() {
  const [visible, setVisible] = useState(true);
  const [isMac, setIsMac] = useState(false);

  useEffect(() => {
    setIsMac(navigator.platform?.toLowerCase().includes("mac"));

    const timer = setTimeout(() => setVisible(false), 8000);
    return () => clearTimeout(timer);
  }, []);

  // Hide on mobile
  if (typeof window !== "undefined" && window.innerWidth < 768) return null;

  return (
    <div
      className={`kbd-hint ${visible ? "kbd-hint-visible" : "kbd-hint-hidden"}`}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      <span className="font-mono text-xs text-muted-foreground">
        <kbd className="cmd-kbd">{isMac ? "⌘" : "Ctrl"}</kbd>
        <span className="mx-1">+</span>
        <kbd className="cmd-kbd">K</kbd>
        <span className="ml-2">to search</span>
      </span>
    </div>
  );
}
