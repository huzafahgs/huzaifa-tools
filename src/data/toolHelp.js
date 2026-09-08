import { expandedGuideTopics } from './expandedToolGuides.js';
import { toolGuideTopics } from './toolGuideSeries.js';
const guidesByTool = Object.fromEntries([...toolGuideTopics, ...expandedGuideTopics].map(topic => [topic.toolSlug, topic]));
const help = {
 "md5-hash": { steps: ["Enter the exact text, including any intended whitespace.", "Generate the digest and compare or copy the 32-character hexadecimal output."], note: "Empty input is supported. This hashes UTF-8 text locally, not file bytes. MD5 is unsuitable for passwords and collision-resistant security checks." },
 "sha256-hash": { steps: ["Enter the exact text to hash.", "Generate and copy the 64-character hexadecimal digest."], note: "Uses Web Crypto over UTF-8 text locally. Whitespace matters and empty input is supported. A plain digest does not authenticate a sender and is not a password-storage scheme." },
 "word-counter": { steps: ["Paste or type text; counts update automatically.", "Compare words, characters, and sentence estimates in the statistics below the input."], note: "Words are split by whitespace. Sentences are estimated from punctuation; abbreviations and languages without spaces can produce different counts from another editor." },
 "json-formatter": { steps: ["Paste JSON with quoted property names and valid values.", "Format it, then inspect any validation error before copying the output."], note: "Formatting changes presentation, not meaning. Keep a source copy and do not paste credentials or tokens into shared screenshots." },
 "image-compressor": { steps: ["Select an image your browser can decode.", "Choose JPEG quality, compress, and compare the displayed output size.", "Download the JPEG and inspect it before replacing your original."], note: "Exports a lossy JPEG at the source dimensions. Transparency becomes white; animation and original metadata are not preserved. An already optimized source may be smaller than the output.", guide: "/blog/image-compression-guide-2026", guideLabel: "Read the image compression workflow" },
 "qr-code-generator": { steps: ["Enter the text or destination URL.", "Generate the code, then scan it with another device to verify the result."], note: "Generation sends your input to api.qrserver.com. Avoid sensitive information. Your browser may open the image instead of saving it because it is hosted on another domain." },
 "jwt-decoder": { steps: ["Paste a token only if it is safe to inspect on this device.", "Review decoded claims and expiry fields."], note: "Decoding is not signature verification and does not prove that a token is authentic." },
 "currency-converter": { steps: ["Enter an amount and select the source and destination currencies.", "Review the displayed rate and converted amount."], note: "Verify rates with your provider before a transaction. Fees, spreads, and rate updates can change the amount you receive." },
 "password-generator": { steps: ["Choose length and the character options required by the destination service.", "Generate a password and store it in a password manager."], note: "Use a unique password for each account. Avoid sharing generated passwords in screenshots or messages." }
};
const categories = {
 Text: "Check how whitespace, punctuation, and non-Latin characters are handled before using the output in another application.",
 Converter: "Check the direction and units of conversion. Rounding can affect results when values are converted repeatedly.",
 Finance: "Results are estimates from the supplied values. Provider fees, rate changes, and local rules may affect actual amounts.",
 Health: "These estimates are for general information and do not assess an individual's medical needs.",
 Security: "Understand what the output verifies before relying on it. Avoid entering live secrets on shared devices.",
 Developer: "Validate the output against a small known example and keep the original before using it in a project.",
 Calculator: "Check units, input ranges, and rounding against a known example before relying on a result.",
 SEO: "Review generated output against your actual pages and settings. Metadata alone cannot guarantee indexing or rankings."
};
export function getToolHelp(tool) {
 const content = tool.help || help[tool.slug] || { note: categories[tool.category] || "Check the options and review the output against your intended use before saving it." };
 const guide = guidesByTool[tool.slug];
 return guide ? { ...content, guide: `/blog/${guide.articleSlug}`, guideLabel: guide.title } : content;
}
