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
];

export default growthContentGuideTopics.map((topic, index) => ({
  ...topic,
  id: 1000 + index,
  slug: topic.articleSlug,
  author: "Huzaifa Group of Software",
  date: "2026-10-02",
  updated: "2026-10-02",
  tags: [topic.toolSlug, "zakat", "nisab", "Islamic finance"],
  keywords: [topic.primaryKeyword, ...topic.secondaryTopics],
  ogTitle: topic.title,
  ogDescription: topic.metaDescription,
  featuredImage: "/logo.png",
  readingGuide: true,
  recommendedTools: topic.relatedTools,
  relatedSlugs: topic.relatedArticles,
  readingTime: `${Math.ceil(topic.wordCount / 200)} min read`,
}));
