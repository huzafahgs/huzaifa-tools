import documentImageTools from './data/documentImageTools.js';
import aiTools from './data/aiTools.js';
const tools = [
  // Text Tools
  {
    name: "Word Counter",
    slug: "word-counter",
    icon: "📄",
    description: "Count words, characters, and sentences instantly.",
    category: "Text"
  },
  {
    name: "Character Counter",
    slug: "character-counter",
    icon: "🔤",
    description: "Count characters with and without spaces.",
    category: "Text"
  },
  {
    name: "Text Case Converter",
    slug: "text-case-converter",
    icon: "🔠",
    description: "Convert text between different cases.",
    category: "Text"
  },
  {
    name: "Text Reverser",
    slug: "text-reverser",
    icon: "↩️",
    description: "Reverse text instantly.",
    category: "Text"
  },
  {
    name: "JSON Formatter",
    slug: "json-formatter",
    icon: "{ }",
    description: "Format and validate JSON code.",
    category: "Text"
  },
  {
    name: "Base64 Encoder/Decoder",
    slug: "base64-converter",
    icon: "🔐",
    description: "Encode and decode Base64 strings.",
    category: "Text"
  },
  {
    name: "URL Encoder/Decoder",
    slug: "url-encoder",
    icon: "🔗",
    description: "Encode and decode URLs.",
    category: "Text"
  },
  {
    name: "URL Slug Generator",
    slug: "url-slug-generator",
    icon: "📎",
    description: "Generate URL-friendly slugs.",
    category: "Text"
  },
  {
    name: "Morse Code Converter",
    slug: "morse-code-converter",
    icon: "📡",
    description: "Convert text to Morse code.",
    category: "Text"
  },
  {
    name: "CSV to JSON",
    slug: "csv-to-json",
    icon: "📊",
    description: "Convert CSV data to JSON format.",
    category: "Text"
  },

  // Password & Security
  {
    name: "Password Generator",
    slug: "password-generator",
    icon: "🔑",
    description: "Generate a random password with selectable character sets.",
    category: "Security"
  },
  {
    name: "MD5 Hash Generator",
    slug: "md5-hash",
    icon: "🔒",
    description: "Generate MD5 hashes.",
    category: "Security"
  },
  {
    name: "SHA256 Hash Generator",
    slug: "sha256-hash",
    icon: "🔐",
    description: "Generate SHA256 hashes.",
    category: "Security"
  },
  {
    name: "UUID Generator",
    slug: "uuid-generator",
    icon: "🆔",
    description: "Generate unique UUIDs.",
    category: "Security"
  },

  // Generators
  {
    name: "QR Code Generator",
    slug: "qr-code-generator",
    icon: "📱",
    description: "Create QR codes instantly.",
    category: "Generator"
  },
  {
    name: "QR Code Scanner",
    slug: "qr-code-scanner",
    icon: "📸",
    description: "Scan QR codes with your camera.",
    category: "Generator"
  },
  {
    name: "Color Picker",
    slug: "color-picker",
    icon: "🎨",
    description: "Pick and convert colors.",
    category: "Generator"
  },
  {
    name: "Gradient Generator",
    slug: "gradient-generator",
    icon: "🌈",
    description: "Create beautiful CSS gradients.",
    category: "Generator"
  },

  // Calculators
  {
    name: "BMI Calculator",
    slug: "bmi-calculator",
    icon: "⚖️",
    description: "Calculate BMI instantly.",
    category: "Calculator"
  },
  {
    name: "Age Calculator",
    slug: "age-calculator",
    icon: "🎂",
    description: "Calculate age from date of birth.",
    category: "Calculator"
  },
  {
    name: "Loan Calculator",
    slug: "loan-calculator",
    icon: "💰",
    description: "Calculate loan payments.",
    category: "Calculator"
  },
  {
    name: "EMI Calculator",
    slug: "emi-calculator",
    icon: "🏦",
    description: "Calculate monthly installments.",
    category: "Calculator"
  },
  {
    name: "Percentage Calculator",
    slug: "percentage-calculator",
    icon: "📊",
    description: "Calculate percentages quickly.",
    category: "Calculator"
  },
  {
    name: "Simple Interest Calculator",
    slug: "simple-interest",
    icon: "💵",
    description: "Calculate simple interest.",
    category: "Calculator"
  },
  {
    name: "Compound Interest Calculator",
    slug: "compound-interest",
    icon: "📈",
    description: "Calculate compound interest.",
    category: "Calculator"
  },
  {
    name: "Tip Calculator",
    slug: "tip-calculator",
    icon: "💸",
    description: "Calculate tips easily.",
    category: "Calculator"
  },
  {
    name: "Discount Calculator",
    slug: "discount-calculator",
    icon: "🏷️",
    description: "Calculate discounts and final price.",
    category: "Calculator"
  },
  {
    name: "Markup Calculator",
    slug: "markup-calculator",
    icon: "📍",
    description: "Calculate markup pricing.",
    category: "Calculator"
  },
  {
    name: "VAT Calculator",
    slug: "vat-calculator",
    icon: "🧾",
    description: "Calculate VAT and taxes.",
    category: "Calculator"
  },
  {
    name: "GPA Calculator",
    slug: "gpa-calculator",
    icon: "🎓",
    description: "Calculate your GPA.",
    category: "Calculator"
  },
  {
    name: "Factorial Calculator",
    slug: "factorial-calculator",
    icon: "🔢",
    description: "Calculate factorials.",
    category: "Calculator"
  },

  // Unit Converters
  {
    name: "Unit Converter",
    slug: "unit-converter",
    icon: "📏",
    description: "Convert units instantly.",
    category: "Converter"
  },
  {
    name: "Temperature Converter",
    slug: "temperature-converter",
    icon: "🌡️",
    description: "Convert between C, F, K.",
    category: "Converter"
  },
  {
    name: "Weight Converter",
    slug: "weight-converter",
    icon: "⚡",
    description: "Convert between weight units.",
    category: "Converter"
  },
  {
    name: "Length Converter",
    slug: "length-converter",
    icon: "📐",
    description: "Convert between length units.",
    category: "Converter"
  },
  {
    name: "Volume Converter",
    slug: "volume-converter",
    icon: "🥤",
    description: "Convert between volume units.",
    category: "Converter"
  },
  {
    name: "Area Converter",
    slug: "area-converter",
    icon: "🔲",
    description: "Convert between area units.",
    category: "Converter"
  },
  {
    name: "Speed Converter",
    slug: "speed-converter",
    icon: "🚗",
    description: "Convert between speed units.",
    category: "Converter"
  },
  {
    name: "Energy Converter",
    slug: "energy-converter",
    icon: "⚡",
    description: "Convert between energy units.",
    category: "Converter"
  },
  {
    name: "Currency Converter",
    slug: "currency-converter",
    icon: "💱",
    description: "Convert between currencies.",
    category: "Converter"
  },

  // Time Tools
  {
    name: "Stopwatch",
    slug: "stopwatch",
    icon: "⏱️",
    description: "A simple stopwatch timer.",
    category: "Time"
  },
  {
    name: "Timer",
    slug: "timer",
    icon: "⏲️",
    description: "Set a countdown timer.",
    category: "Time"
  },
  {
    name: "Time Calculator",
    slug: "time-calculator",
    icon: "🕐",
    description: "Calculate time differences.",
    category: "Time"
  },
  {
    name: "Uptime Calculator",
    slug: "uptime-calculator",
    icon: "📡",
    description: "Calculate system uptime.",
    category: "Time"
  },

  // Number Tools
  {
    name: "Prime Number Checker",
    slug: "prime-checker",
    icon: "🔢",
    description: "Check if a number is prime.",
    category: "Number"
  },
  {
    name: "Fibonacci Generator",
    slug: "fibonacci-generator",
    icon: "🌀",
    description: "Generate Fibonacci sequence.",
    category: "Number"
  },
  {
    name: "Roman Numeral Converter",
    slug: "roman-numeral",
    icon: "🏛️",
    description: "Convert to Roman numerals.",
    category: "Number"
  },
  {
    name: "Hex to Decimal",
    slug: "hex-to-decimal",
    icon: "🔀",
    description: "Convert hexadecimal to decimal.",
    category: "Number"
  },
  {
    name: "Decimal to Binary",
    slug: "decimal-to-binary",
    icon: "01️⃣",
    description: "Convert decimal to binary.",
    category: "Number"
  },
  {
    name: "Binary to Decimal",
    slug: "binary-to-decimal",
    icon: "⚙️",
    description: "Convert binary to decimal.",
    category: "Number"
  },
  {
    name: "Hex to RGB Converter",
    slug: "hex-to-rgb",
    icon: "🎨",
    description: "Convert hex colors to RGB.",
    category: "Number"
  },
  {
    name: "RGB to Hex Converter",
    slug: "rgb-to-hex",
    icon: "🖌️",
    description: "Convert RGB colors to hex.",
    category: "Number"
  },

  // Misc Tools
  {
    name: "Distance Calculator",
    slug: "distance-calculator",
    icon: "📍",
    description: "Calculate distance between coordinates.",
    category: "Utility"
  },
  {
    name: "Text to Speech",
    slug: "text-to-speech",
    icon: "🔊",
    description: "Convert text to speech.",
    category: "Utility"
  },
  {
    name: "Screen Resolution Tester",
    slug: "screen-resolution",
    icon: "📺",
    description: "Check your screen resolution.",
    category: "Utility"
  },
  {
    name: "Image Compressor",
    slug: "image-compressor",
    icon: "🖼️",
    description: "Compress images online.",
    category: "Utility"
  },
  {
    name: "Regex Tester",
    slug: "regex-tester",
    icon: ".*",
    description: "Test regular expressions with flags, matches, and groups.",
    category: "Developer"
  },
  {
    name: "JWT Decoder",
    slug: "jwt-decoder",
    icon: "🔓",
    description: "Decode JWT headers and payloads safely in your browser.",
    category: "Developer"
  },
  {
    name: "Unix Timestamp Converter",
    slug: "unix-timestamp-converter",
    icon: "⏳",
    description: "Convert Unix timestamps to readable dates and back.",
    category: "Developer"
  },
  {
    name: "HTML Entity Encoder/Decoder",
    slug: "html-entity-converter",
    icon: "&;",
    description: "Encode and decode HTML entities instantly.",
    category: "Developer"
  },
  {
    name: "Lorem Ipsum Generator",
    slug: "lorem-ipsum-generator",
    icon: "¶",
    description: "Generate clean placeholder text for designs and drafts.",
    category: "Text"
  },
  {
    name: "Password Strength Checker",
    slug: "password-strength-checker",
    icon: "🛡️",
    description: "Check password strength and get security suggestions.",
    category: "Security"
  },
  {
    name: "CSS Minifier",
    slug: "css-minifier",
    icon: "{}",
    description: "Minify CSS by removing comments and extra whitespace.",
    category: "Developer"
  },
  {
    name: "JavaScript Minifier",
    slug: "javascript-minifier",
    icon: "JS",
    description: "Minify JavaScript safely for simple production snippets.",
    category: "Developer"
  },
  {
    name: "Meta Tag Generator",
    slug: "meta-tag-generator",
    icon: "🏷️",
    description: "Generate SEO, Open Graph, and Twitter meta tags.",
    category: "SEO"
  },
  {
    name: "Robots.txt Generator",
    slug: "robots-txt-generator",
    icon: "🤖",
    description: "Create clean robots.txt rules for search engines.",
    category: "SEO"
  },
  {
    name: "XML Formatter",
    slug: "xml-formatter",
    icon: "XML",
    description: "Format and validate XML with readable indentation.",
    category: "Developer"
  },
  {
    name: "XML to JSON Converter",
    slug: "xml-to-json",
    icon: "↔",
    description: "Convert XML documents into structured JSON.",
    category: "Developer"
  },
  {
    name: "JSON to XML Converter",
    slug: "json-to-xml",
    icon: "↕",
    description: "Convert JSON objects and arrays into XML.",
    category: "Developer"
  },
  {
    name: "HTML Formatter",
    slug: "html-formatter",
    icon: "HTML",
    description: "Beautify HTML markup for easier reading.",
    category: "Developer"
  },
  {
    name: "SQL Formatter",
    slug: "sql-formatter",
    icon: "SQL",
    description: "Format SQL queries with readable keyword breaks.",
    category: "Developer"
  },
  {
    name: "URL Parser",
    slug: "url-parser",
    icon: "🔎",
    description: "Parse URLs into protocol, host, path, and parameters.",
    category: "Developer"
  },
  {
    name: "Cron Expression Generator",
    slug: "cron-expression-generator",
    icon: "⏰",
    description: "Build common cron expressions and readable schedules.",
    category: "Developer"
  },
  {
    name: "HMAC Generator",
    slug: "hmac-generator",
    icon: "🔏",
    description: "Generate HMAC signatures using Web Crypto.",
    category: "Security"
  },
  {
    name: "Text Diff Checker",
    slug: "text-diff-checker",
    icon: "≠",
    description: "Compare two text blocks line by line.",
    category: "Text"
  },
  {
    name: "Color Contrast Checker",
    slug: "color-contrast-checker",
    icon: "◐",
    description: "Check WCAG contrast ratios for text and backgrounds.",
    category: "Developer"
  },
  {
    name: "Mortgage Calculator",
    slug: "mortgage-calculator",
    icon: "🏠",
    description: "Estimate monthly mortgage payments and total interest.",
    category: "Calculator"
  },
  {
    name: "ROI Calculator",
    slug: "roi-calculator",
    icon: "📈",
    description: "Calculate return on investment and net profit.",
    category: "Business"
  },
  {
    name: "Budget Calculator",
    slug: "budget-calculator",
    icon: "📒",
    description: "Compare income, expenses, and monthly savings.",
    category: "Business"
  },
  {
    name: "Commission Calculator",
    slug: "commission-calculator",
    icon: "💼",
    description: "Calculate sales commission and total payout.",
    category: "Business"
  },
  {
    name: "Retirement Calculator",
    slug: "retirement-calculator",
    icon: "🌅",
    description: "Estimate future retirement savings from monthly deposits.",
    category: "Finance"
  },
  {
    name: "BMR Calculator",
    slug: "bmr-calculator",
    icon: "🔥",
    description: "Estimate basal metabolic rate using standard formulas.",
    category: "Health"
  },
  {
    name: "Calorie Calculator",
    slug: "calorie-calculator",
    icon: "🍽️",
    description: "Estimate daily calories based on activity level.",
    category: "Health"
  },
  {
    name: "Ideal Weight Calculator",
    slug: "ideal-weight-calculator",
    icon: "⚖",
    description: "Estimate ideal body weight ranges by height and gender.",
    category: "Health"
  },
  {
    name: "Grade Calculator",
    slug: "grade-calculator",
    icon: "📝",
    description: "Calculate weighted grade scores for students.",
    category: "Student"
  },
  {
    name: "Pace Calculator",
    slug: "pace-calculator",
    icon: "🏃",
    description: "Calculate running pace, time, and speed.",
    category: "Health"
  }
];

export default [...tools, ...documentImageTools, ...aiTools];
