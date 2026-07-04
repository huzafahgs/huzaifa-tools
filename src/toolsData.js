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
    description: "Generate secure passwords instantly.",
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

  // Placeholder tools for scalability (up to 600+)
  ...Array.from({ length: 600 - 61 }, (_, i) => ({
    name: `Tool ${i + 62}`,
    slug: `tool-${i + 62}`,
    icon: "🛠️",
    description: `A placeholder tool ${i + 62}.`,
    category: "Placeholder"
  }))
];

export default tools;
