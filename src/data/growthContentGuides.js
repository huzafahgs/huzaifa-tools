export const growthContentGuideTopics = [
  {
    toolSlug: "zakat-calculator",
    articleSlug: "calculate-zakat-gold-silver-nisab",
    wordCount: 1289,
    title: "Calculate Zakat with Gold or Silver Nisab: A Transparent Worksheet",
    metaTitle: "Calculate Zakat with Gold or Silver Nisab | Huzaifa Tools",
    metaDescription: "Build a transparent Zakat estimate from assets, permitted liabilities, gold or silver nisab and a verified metal price, with method differences clearly identified.",
    primaryKeyword: "calculate Zakat with gold or silver nisab",
    searchIntent: "Understand the calculator inputs, reproduce the estimate and identify questions that require qualified religious guidance.",
    secondaryTopics: [
      "Zakat calculation worksheet",
      "gold nisab versus silver nisab",
      "Zakat on cash and jewellery",
      "Zakat debt deductions",
      "Zakat calculator Pakistan",
    ],
    longTailQuestions: [
      "How is gold or silver nisab converted into a currency amount?",
      "Which debts can be deducted before calculating Zakat?",
      "Does personal jewellery count toward Zakat?",
    ],
    category: "Islamic Guides",
    tags: ["zakat-calculator", "zakat", "nisab", "Islamic finance"],
    relatedTools: [
      "zakat-calculator",
      "percentage-calculator",
      "currency-converter",
      "budget-calculator",
    ],
    relatedArticles: [
      "percentage-base-increase-and-decrease",
      "monthly-budget-income-expenses-and-remainder",
      "fixed-rate-currency-conversion-example",
    ],
    faq: [
      {
        question: "Why does the calculator offer both gold and silver nisab?",
        answer: "Published Zakat guidance commonly states nisab as the value of 87.48 grams of gold or 612.36 grams of silver. Those thresholds can differ greatly in currency terms. The appropriate standard can depend on the method you follow, so the calculator makes the choice visible rather than silently selecting one.",
      },
      {
        question: "Does the calculator fetch today's gold or silver price?",
        answer: "No. Enter a current, verified price per gram from a source suitable for your location and calculation method. The tool displays the supplied price and the resulting threshold so you can check the arithmetic.",
      },
      {
        question: "Can every debt be subtracted from zakatable assets?",
        answer: "No universal rule is built into the tool. Guidance differs on which immediate liabilities may be deducted and how longer-term debt is treated. Enter only the amount permitted by the qualified method you follow.",
      },
      {
        question: "Is the result a religious ruling?",
        answer: "No. It is an educational arithmetic estimate based on your inputs and selected assumptions. Questions about jewellery, investments, debts, business assets, the lunar-year condition or your personal circumstances should be taken to a qualified scholar or trusted Zakat adviser.",
      },
    ],
    content: () =>
      import("./blogPosts/calculate-zakat-gold-silver-nisab.js").then(
        (module) => module.default,
      ),
  },
  {
    toolSlug: "ai-text-summarizer",
    guideToolSlugs: ["ai-study-notes-generator"],
    articleSlug: "verify-ai-summary-against-source",
    wordCount: 1280,
    title: "How to Verify an AI Summary Against the Original Source",
    metaTitle: "How to Verify an AI Summary Against Its Source",
    metaDescription: "Check an AI summary for unsupported claims, changed numbers, missing exceptions and misleading emphasis with a practical source-to-summary review workflow.",
    primaryKeyword: "how to verify an AI summary",
    searchIntent: "Review an AI-generated summary or set of study notes against the supplied source before relying on or sharing it.",
    secondaryTopics: [
      "AI summary fact checking",
      "check AI study notes",
      "summary hallucination checklist",
      "verify names dates and numbers",
    ],
    longTailQuestions: [
      "How do I check whether an AI summary is accurate?",
      "What facts should I compare with the original source?",
      "Can a fluent summary leave out an important exception?",
    ],
    category: "AI Guides",
    tags: ["AI summarization", "fact checking", "study notes", "AI safety"],
    relatedTools: [
      "ai-text-summarizer",
      "ai-study-notes-generator",
      "text-diff-checker",
      "word-counter",
    ],
    relatedArticles: [
      "compare-text-at-matching-line-positions",
      "count-words-for-a-writing-limit",
      "character-count-spaces-emoji-and-lines",
    ],
    faq: [
      {
        question: "Does a clear, fluent summary mean it is accurate?",
        answer: "No. Fluency is a presentation quality, not evidence that each claim follows from the source. Check claims, entities, numbers, relationships, uncertainty and omissions against the original text.",
      },
      {
        question: "Can I ask the same AI to fact-check its own summary?",
        answer: "A second AI pass can help identify review candidates, but it is not independent proof. The decisive comparison is still between each important summary claim and the original source or an authoritative reference.",
      },
      {
        question: "What should I do when the source itself may be wrong?",
        answer: "Separate faithfulness from truth. First record whether the summary represents the source accurately. Then verify the source's important claims with suitable primary or authoritative evidence before relying on them.",
      },
      {
        question: "Are AI-generated study notes safe to use for an exam?",
        answer: "Treat them as a draft revision aid. Compare definitions, formulas, exceptions and required terminology with your course material, and follow your institution's rules on permitted AI use.",
      },
    ],
    content: () =>
      import("./blogPosts/verify-ai-summary-against-source.js").then(
        (module) => module.default,
      ),
  },
];

export default growthContentGuideTopics.map((topic, index) => ({
  ...topic,
  id: 1000 + index,
  slug: topic.articleSlug,
  author: "Huzaifa Group of Software",
  date: "2026-10-02",
  updated: "2026-10-02",
  tags: topic.tags || [topic.toolSlug, "practical guide", topic.category],
  keywords: [topic.primaryKeyword, ...topic.secondaryTopics],
  ogTitle: topic.title,
  ogDescription: topic.metaDescription,
  featuredImage: "/logo.png",
  readingGuide: true,
  recommendedTools: topic.relatedTools,
  relatedSlugs: topic.relatedArticles,
  readingTime: `${Math.ceil(topic.wordCount / 200)} min read`,
}));
