import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://sonet.example";
  const paths = ["", "/about", "/divisions", "/ai-tools", "/academy", "/marketplace", "/skills", "/blog", "/contact", "/pricing", "/faq"];
  return paths.map((p) => ({ url: base + p, lastModified: new Date() }));
}
