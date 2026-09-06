import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./index.css";
import App from "./App.jsx";
import ToolPage from "./pages/ToolPage.jsx";
import Blog from "./pages/Blog.jsx";
import BlogPost from "./pages/BlogPost.jsx";
import Favorites from "./pages/Favorites.jsx";
import History from "./pages/History.jsx";
import Pricing from "./pages/Pricing.jsx";
import Contact from "./pages/Contact.jsx";
import AllTools from "./pages/AllTools.jsx";
import Chat from "./pages/Chat.jsx";
import SeoHead from "./components/SeoHead.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx";
import TermsConditions from "./pages/TermsConditions.jsx";
import Disclaimer from "./pages/Disclaimer.jsx";
import "./tools"; // This import ensures all tools are registered

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <SeoHead />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/all-tools" element={<AllTools />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/history" element={<History />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-conditions" element={<TermsConditions />} />
        <Route path="/disclaimer" element={<Disclaimer />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/:slug" element={<ToolPage />} />
        <Route path="*" element={<ToolPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
