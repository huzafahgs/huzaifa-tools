import { useParams } from "react-router-dom";
import tools from "../toolsData";
import Layout from "../components/Layout";
import { lazy, Suspense } from "react";

const toolComponents = {
  "word-counter": lazy(() => import("../tools/WordCounter")),
  "character-counter": lazy(() => import("../tools/CharacterCounter")),
  "text-case-converter": lazy(() => import("../tools/TextCaseConverter")),
  "text-reverser": lazy(() => import("../tools/TextReverser")),
  "json-formatter": lazy(() => import("../tools/JSONFormatter")),
  "base64-converter": lazy(() => import("../tools/Base64Converter")),
  "url-encoder": lazy(() => import("../tools/URLEncoder")),
  "url-slug-generator": lazy(() => import("../tools/URLSlugGenerator")),
  "morse-code-converter": lazy(() => import("../tools/MorseCodeConverter")),
  "csv-to-json": lazy(() => import("../tools/CSVToJSON")),
  "password-generator": lazy(() => import("../tools/PasswordGenerator")),
  "md5-hash": lazy(() => import("../tools/MD5Hash")),
  "sha256-hash": lazy(() => import("../tools/SHA256Hash")),
  "uuid-generator": lazy(() => import("../tools/UUIDGenerator")),
  "qr-code-generator": lazy(() => import("../tools/QRCodeGenerator")),
  "qr-code-scanner": lazy(() => import("../tools/QRCodeScanner")),
  "color-picker": lazy(() => import("../tools/ColorPicker")),
  "gradient-generator": lazy(() => import("../tools/GradientGenerator")),
  "bmi-calculator": lazy(() => import("../tools/BMICalculator")),
  "age-calculator": lazy(() => import("../tools/AgeCalculator")),
  "loan-calculator": lazy(() => import("../tools/LoanCalculator")),
  "emi-calculator": lazy(() => import("../tools/EMICalculator")),
  "percentage-calculator": lazy(() => import("../tools/PercentageCalculator")),
  "simple-interest": lazy(() => import("../tools/SimpleInterestCalculator")),
  "compound-interest": lazy(() => import("../tools/CompoundInterestCalculator")),
  "tip-calculator": lazy(() => import("../tools/TipCalculator")),
  "discount-calculator": lazy(() => import("../tools/DiscountCalculator")),
  "markup-calculator": lazy(() => import("../tools/MarkupCalculator")),
  "vat-calculator": lazy(() => import("../tools/VATCalculator")),
  "gpa-calculator": lazy(() => import("../tools/GPACalculator")),
  "factorial-calculator": lazy(() => import("../tools/FactorialCalculator")),
  "unit-converter": lazy(() => import("../tools/UnitConverter")),
  "temperature-converter": lazy(() => import("../tools/TemperatureConverter")),
  "weight-converter": lazy(() => import("../tools/WeightConverter")),
  "length-converter": lazy(() => import("../tools/LengthConverter")),
  "volume-converter": lazy(() => import("../tools/VolumeConverter")),
  "area-converter": lazy(() => import("../tools/AreaConverter")),
  "speed-converter": lazy(() => import("../tools/SpeedConverter")),
  "energy-converter": lazy(() => import("../tools/EnergyConverter")),
  "currency-converter": lazy(() => import("../tools/CurrencyConverter")),
  "stopwatch": lazy(() => import("../tools/Stopwatch")),
  "timer": lazy(() => import("../tools/Timer")),
  "time-calculator": lazy(() => import("../tools/TimeCalculator")),
  "uptime-calculator": lazy(() => import("../tools/UptimeCalculator")),
  "prime-checker": lazy(() => import("../tools/PrimeChecker")),
  "fibonacci-generator": lazy(() => import("../tools/FibonacciGenerator")),
  "roman-numeral": lazy(() => import("../tools/RomanNumeralConverter")),
  "hex-to-decimal": lazy(() => import("../tools/HexToDecimal")),
  "decimal-to-binary": lazy(() => import("../tools/DecimalToBinary")),
  "binary-to-decimal": lazy(() => import("../tools/BinaryToDecimal")),
  "hex-to-rgb": lazy(() => import("../tools/HexToRGB")),
  "rgb-to-hex": lazy(() => import("../tools/RGBToHex")),
  "distance-calculator": lazy(() => import("../tools/DistanceCalculator")),
  "text-to-speech": lazy(() => import("../tools/TextToSpeech")),
  "screen-resolution": lazy(() => import("../tools/ScreenResolution")),
  "image-compressor": lazy(() => import("../tools/ImageCompressor")),
};

function ToolPage() {
  const { slug } = useParams();
  const tool = tools.find(t => t.slug === slug);
  const Component = toolComponents[slug];

  if (!tool) {
    return (
      <Layout title="Tool Not Found">
        <div style={{ padding: "40px", color: "white", textAlign: "center" }}>
          <h1 style={{ color: "gold" }}>Tool Not Found</h1>
          <p>The tool you're looking for doesn't exist.</p>
          <a href="/" style={{ color: "gold", textDecoration: "none", marginTop: "20px", display: "inline-block" }}>← Back to Home</a>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title={tool.name}>
      <Suspense fallback={<div style={{ padding: "40px", color: "white", textAlign: "center" }}>Loading...</div>}>
        {Component ? <Component /> : <div style={{ padding: "40px", color: "white" }}>Tool component not found</div>}
      </Suspense>
    </Layout>
  );
}

export default ToolPage;