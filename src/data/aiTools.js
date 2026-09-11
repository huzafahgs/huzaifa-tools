const tone = {
  key: "tone",
  label: "Tone",
  values: ["Professional", "Friendly", "Direct", "Academic"],
};
const length = {
  key: "length",
  label: "Approximate length",
  values: ["Short", "Medium", "Detailed"],
};

const aiTools = [
  {
    name: "AI Text Summarizer",
    slug: "ai-text-summarizer",
    icon: "✦",
    description:
      "Turn supplied text into a focused summary with key points and important qualifications. AI generation requires sign-in and service availability.",
    seoDescription:
      "Summarize supplied text into short, medium or detailed notes. Review key facts, preserve qualifications, and understand AI privacy and accuracy limits.",
    intro:
      "Find the signal in a long passage. Get a focused overview and key points, grounded in the text you provide.",
    inputLabel: "Text to summarize",
    placeholder:
      "Paste the passage you have permission to share. Include the context needed to understand its claims.",
    fields: [length],
    action: "Summarize text",
    example:
      "The library will extend weekday opening hours from 6 pm to 8 pm for a four-week trial starting October 1. Weekend hours stay the same. Staff will review attendance before deciding whether to continue.",
    tips: [
      "Include the complete passage rather than isolated quotes so exceptions are not lost.",
      "Choose Short for a quick overview, Medium for key points, or Detailed for a more complete outline.",
      "Compare names, dates, numbers and uncertainty against the original before sharing.",
    ],
    faq: [
      {
        question: "Does it search the web or check the source?",
        answer:
          "No. It works from the text you submit and does not browse links. A concise summary can still contain mistakes or leave out an important qualification; check it against the source.",
      },
      {
        question: "Can I summarize a PDF?",
        answer:
          "This tool accepts pasted text, not file uploads. Extract the passage yourself and submit only material you are allowed to share with an external AI service.",
      },
    ],
  },
  {
    name: "AI Writing Assistant",
    slug: "ai-writing-assistant",
    icon: "✧",
    description:
      "Draft clear writing from your brief, with tone and approximate length controls. AI generation requires sign-in and service availability.",
    seoDescription:
      "Create a draft from your topic, audience and instructions. Choose tone and length, refine the result, and review claims before publishing.",
    intro:
      "Start with a clear brief, leave with an editable draft. Set your audience, purpose and constraints before you generate.",
    inputLabel: "Topic and writing instructions",
    placeholder:
      "Describe the audience, purpose, facts to include and desired format. For example: write a short welcome note for a community reading group.",
    fields: [tone, length],
    action: "Create draft",
    refine: true,
    example:
      "Write a welcoming introduction for a community reading group. The audience is first-time attendees. Mention that people can listen without speaking, and ask them to bring a book they enjoyed. Do not invent a meeting date or address.",
    tips: [
      "Tell the assistant who will read the draft and what they should understand or do.",
      "Supply facts you want included. Missing dates, evidence or credentials should not be invented.",
      "Use Refine this result to bring the draft back into the editor with a new instruction. Each generation uses a request.",
    ],
    faq: [
      {
        question: "Is the draft ready to publish?",
        answer:
          "Treat it as a starting point. Check factual claims, names, permissions and tone, then edit it in your own voice. This tool does not establish originality or verify citations.",
      },
      {
        question: "Is the length exact?",
        answer:
          "No. Short, Medium and Detailed guide approximate length. Use Word Counter if your final text must meet an exact limit.",
      },
    ],
  },
  {
    name: "AI Grammar & Rewrite Assistant",
    slug: "ai-grammar-rewrite",
    icon: "Aa",
    description:
      "Revise grammar, clarity or tone while aiming to preserve your meaning. AI generation requires sign-in and service availability.",
    seoDescription:
      "Fix grammar, improve clarity, simplify wording or rewrite professionally. Compare revised text with your original and keep control of meaning.",
    intro:
      "Make your meaning easier to read. Choose a light grammar edit or a more purposeful rewrite, then compare the result with your original.",
    inputLabel: "Text to revise",
    placeholder:
      "Paste your own draft. Remove private details before sharing it.",
    fields: [
      {
        key: "mode",
        label: "Editing mode",
        values: ["Fix Grammar", "Improve Clarity", "Professional", "Simplify"],
      },
    ],
    action: "Revise text",
    refine: true,
    example:
      "We has reviewed the proposal and would like discuss the next steps. Please let us know which time works for you next week.",
    tips: [
      "Use Fix Grammar when the voice and structure already work.",
      "Use Simplify for shorter, more familiar wording; keep essential technical terms in the source.",
      "Compare commitments, negations and qualifications carefully: a fluent rewrite can still change meaning.",
    ],
    faq: [
      {
        question: "Will my meaning stay exactly the same?",
        answer:
          "The assistant is instructed to preserve it, but this is not guaranteed. Check changes to promises, quantities, dates and technical language before replacing the original.",
      },
      {
        question: "Does it score my writing?",
        answer:
          "No. It returns revised text rather than an invented quality score, plagiarism result or guarantee of error-free writing.",
      },
    ],
  },
  {
    name: "AI Email Generator",
    slug: "ai-email-generator",
    icon: "↗",
    description:
      "Draft an email from your purpose and context, with tone and optional subject. AI generation requires sign-in and service availability.",
    seoDescription:
      "Draft a professional or friendly email from your context. Add an optional subject, review the message, and copy it into your email application.",
    intro:
      "Say what matters, with the right tone. Turn a few useful details into an email draft you can review before sending.",
    inputLabel: "Purpose and key details",
    placeholder:
      "What should the email accomplish? Include relevant facts and the next step. Use roles instead of real personal details.",
    fields: [
      tone,
      {
        key: "subject",
        label: "Subject line",
        values: ["Include subject", "Body only"],
      },
    ],
    action: "Draft email",
    example:
      "Politely follow up on a proposal sent last week. Ask whether the recipient has questions and suggest a brief call. Do not invent a deadline or claim that they agreed to anything.",
    tips: [
      "Describe the relationship and purpose: a colleague, customer or course tutor is enough.",
      "Include the specific action you want, but leave out account numbers and confidential correspondence.",
      "Review recipients, dates, attachments and commitments in your email application before sending.",
    ],
    faq: [
      {
        question: "Will this send an email?",
        answer:
          "No. It creates text only. Copy the reviewed draft into your own email application and decide whether to send it.",
      },
      {
        question: "Do I have to provide an email address?",
        answer:
          "No. Use a recipient role or general context. Real names, addresses and other personal details are not required to create a useful draft.",
      },
    ],
  },
  {
    name: "AI Prompt Generator & Improver",
    slug: "ai-prompt-generator",
    icon: "⌘",
    description:
      "Turn a rough goal into a structured prompt with context and constraints. AI generation requires sign-in and service availability.",
    seoDescription:
      "Improve a rough AI prompt with a clear task, context, constraints and output format. Choose writing, coding, research or general use without model guarantees.",
    intro:
      "A useful answer starts with a useful brief. Turn your goal into a prompt that makes the task, boundaries and output clearer.",
    inputLabel: "Your goal or rough prompt",
    placeholder:
      "Describe the result you want, the information available and what the answer should avoid.",
    fields: [
      {
        key: "target",
        label: "Target task",
        values: ["General", "Writing", "Coding", "Research", "Planning"],
      },
    ],
    action: "Improve prompt",
    refine: true,
    example:
      "Help me plan a beginner-friendly workshop about spreadsheets. I have 45 minutes and want practical exercises. Improve this prompt so the response includes a schedule, materials and ways to check understanding.",
    tips: [
      "Give the actual goal rather than asking the model to act as an impressive expert.",
      "Name the output format and constraints you can verify.",
      "Use the result as a brief in your preferred assistant. Different models and available features can produce different answers.",
    ],
    faq: [
      {
        question: "Is this optimized for a particular model?",
        answer:
          "The task categories guide the prompt structure, not a provider-specific performance guarantee. Review whether your chosen assistant supports the requested features.",
      },
      {
        question: "Does it run the improved prompt?",
        answer:
          "No. It returns the improved prompt itself. It does not execute code, browse sources or carry out the task described inside it.",
      },
    ],
  },
].map((tool) => ({
  ...tool,
  category: "AI",
  ai: true,
  help: {
    steps: tool.tips,
    note: "AI can make mistakes. Inputs are sent through our server to OpenAI when you generate; they are not saved in account history. Never submit secrets or confidential material.",
  },
}));

export default aiTools;
