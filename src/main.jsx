import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./index.css";
import App from "./App.jsx";
import ToolPage from "./pages/ToolPage.jsx";
import Blog from "./pages/Blog.jsx";
import Favorites from "./pages/Favorites.jsx";
import History from "./pages/History.jsx";
import Pricing from "./pages/Pricing.jsx";
import Contact from "./pages/Contact.jsx";
import AllTools from "./pages/AllTools.jsx";
import Chat from "./pages/Chat.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/all-tools" element={<AllTools />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/history" element={<History />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/:slug" element={<ToolPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);