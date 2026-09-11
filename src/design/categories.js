// Extend the visual registry for future areas without adding empty routes.
export const categoryDesign = {
  AI: { tone: "general", mark: "✦", label: "AI studio" },
  PDF: { tone: "document", mark: "▤", label: "Document desk" },
  Image: { tone: "canvas", mark: "◈", label: "Image studio" },
  Developer: { tone: "code", mark: "{ }", label: "Developer bench" },
  SEO: { tone: "network", mark: "⌕", label: "Search essentials" },
  Text: { tone: "editorial", mark: "Aa", label: "Writing desk" },
  Security: { tone: "secure", mark: "◇", label: "Security utilities" },
  Calculator: { tone: "precision", mark: "±", label: "Everyday calculations" },
  Finance: { tone: "precision", mark: "%", label: "Financial estimates" },
  Business: { tone: "precision", mark: "↗", label: "Business calculations" },
  Health: { tone: "canvas", mark: "+", label: "Health estimates" },
};
export const getCategoryDesign = (category) =>
  categoryDesign[category] || {
    tone: "general",
    mark: "✳",
    label: category + " tools",
  };
