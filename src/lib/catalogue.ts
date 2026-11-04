export const PRODUCTS = [
  { id: "prompt-pack-starter", name: "AI Prompt Pack — Starter", category: "Prompt Packs", price: 15, type: "Digital Download" },
  { id: "microstock-metadata-pro", name: "AI Microstock Metadata Generator Pro", category: "AI Tools", price: 0, type: "AI Tool" },
  { id: "english-grammar-foundations", name: "English Grammar Foundations", category: "Online Courses", price: 0, type: "Online Course" },
  { id: "canva-template-bundle", name: "Canva Template Bundle", category: "Templates", price: 25, type: "Template" },
  { id: "kdp-starter-guide", name: "Amazon KDP Starter Guide", category: "eBooks", price: 12, type: "eBook" },
];
export const CATALOGUE_PRICES: Record<string, number> = Object.fromEntries(PRODUCTS.map((p) => [p.id, p.price]));
export const COURSES = [
  { id: "english-grammar", name: "English Grammar Foundations", division: "SONET ACADEMY" },
  { id: "spoken-english", name: "Spoken English", division: "SONET ACADEMY" },
  { id: "ielts-foundations", name: "IELTS Foundations", division: "SONET ACADEMY" },
  { id: "adobe-stock-training", name: "Adobe Stock Contributor Training", division: "SONET MICROSTOCK" },
  { id: "freelancing-foundations", name: "Freelancing Foundations", division: "SONET SKILLS" },
];
export const FAQS = [
  { q: "Do I need a separate account for each division?", a: "No. One SONET account works across AI, Academy, Microstock, Studio, Skills and Lab." },
  { q: "How are payments verified?", a: "By manual payment verification in the admin panel until a gateway is configured and tested. Access is granted only after verified payment." },
  { q: "Is SONET Academy aligned to the Bangladesh curriculum?", a: "Yes — NCTB-aligned structure with education boards, academic years, groups, subjects, chapters, topics and curriculum versions. No copyrighted textbook is reproduced in full." },
  { q: "Which AI providers are live?", a: "None by default. Gemini, Groq and Mistral are shown as Not Configured until valid credentials are added server-side and tested." },
];
