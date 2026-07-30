import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getPageSeoData } from "../seo/seoData";

export default function SeoHead({ title }) {
  const location = useLocation();
  const seo = getPageSeoData(location.pathname, title);

  useEffect(() => {
    document.title = seo.title;
    document.documentElement.lang = "en";

    const setMeta = (name, content, attr = "name") => {
      const tag = document.querySelector(`meta[${attr}="${name}"]`);
      if (tag) {
        tag.setAttribute("content", content);
      } else {
        const newTag = document.createElement("meta");
        newTag.setAttribute(attr, name);
        newTag.setAttribute("content", content);
        document.head.appendChild(newTag);
      }
    };

    const setLink = (rel, href) => {
      let tag = document.querySelector(`link[rel="${rel}"]`);
      if (tag) {
        tag.setAttribute("href", href);
      } else {
        tag = document.createElement("link");
        tag.setAttribute("rel", rel);
        tag.setAttribute("href", href);
        document.head.appendChild(tag);
      }
    };

    const removeTag = (selector) => {
      document.querySelectorAll(selector).forEach((node) => node.remove());
    };

    removeTag('meta[property^="og:"]');
    removeTag('meta[name^="twitter:"]');
    removeTag('meta[name="description"]');
    removeTag('meta[name="robots"]');
    removeTag('link[rel="canonical"]');

    setMeta("description", seo.description);
    setMeta("robots", "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1");
    setLink("canonical", seo.canonicalUrl);

    setMeta("og:title", seo.ogTitle, "property");
    setMeta("og:description", seo.ogDescription, "property");
    setMeta("og:url", seo.ogUrl, "property");
    setMeta("og:type", "website", "property");
    setMeta("og:site_name", "Huzaifa Group of Software", "property");
    setMeta("og:image", seo.ogImage, "property");

    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", seo.twitterTitle);
    setMeta("twitter:description", seo.twitterDescription);
    setMeta("twitter:image", seo.twitterImage);

    // Ensure browser icons use the official Huzaifa favicon on every route.
    setLink("icon", "/favicon.ico");
    setLink("shortcut icon", "/favicon.ico");
    setLink("apple-touch-icon", "/favicon.png");

    const existingScript = document.getElementById("app-jsonld");
    if (existingScript) existingScript.remove();

    if (seo.jsonLd) {
      const script = document.createElement("script");
      script.id = "app-jsonld";
      script.type = "application/ld+json";
      script.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          seo.jsonLd.webpage,
          seo.jsonLd.breadcrumb,
          seo.jsonLd.tool,
        ].filter(Boolean),
      });
      document.head.appendChild(script);
    }
  }, [location.pathname, seo.title, seo.description, seo.canonicalUrl]);

  return null;
}
