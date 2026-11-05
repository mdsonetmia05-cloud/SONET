// PromptEx helpers — pure functions, no DOM, no network.
// The page calls Gemini directly from the browser with the user's own
// key; nothing here ever touches a SONET server or stores a key.
export type PromptexMode = "metadata" | "prompt";
export type PromptexPlatform = "Adobe Stock" | "Shutterstock" | "Freepik" | "Pond5" | "Vecteezy";
export type TitleCaseOption = "title" | "sentence" | "upper" | "lower";
export type CreativityOption = "precise" | "balanced" | "creative";
export type PromptDetailOption = "concise" | "detailed" | "ultra";

export type PromptexSettings = {
  mode: PromptexMode;
  platform: PromptexPlatform;
  titleMinWords: number;
  titleMaxWords: number;
  keywordMin: number;
  keywordMax: number;
  customInstructions: string;
  titlePrefix: string;
  titleSuffix: string;
  titleCase: TitleCaseOption;
  maxTitleLength: number;
  bannedWords: string;
  creativity: CreativityOption;
  promptDetail: PromptDetailOption;
  singleWordKeywords: boolean;
};

export const DEFAULT_SETTINGS: PromptexSettings = {
  mode: "metadata",
  platform: "Adobe Stock",
  titleMinWords: 4,
  titleMaxWords: 12,
  keywordMin: 15,
  keywordMax: 49,
  customInstructions: "",
  titlePrefix: "",
  titleSuffix: "",
  titleCase: "title",
  maxTitleLength: 200,
  bannedWords: "",
  creativity: "balanced",
  promptDetail: "detailed",
  singleWordKeywords: true,
};

export const PROMPTEX_PLATFORMS: PromptexPlatform[] = [
  "Adobe Stock",
  "Shutterstock",
  "Freepik",
  "Pond5",
  "Vecteezy",
];

export type ParsedMetadata = {
  title?: string;
  keywords?: string[];
  caption?: string;
  prompt?: string;
};

export type CsvRow = {
  filename: string;
  title: string;
  keywords: string[];
  caption: string;
  prompt: string;
};

const CREATIVITY_TEXT: Record<CreativityOption, string> = {
  precise: "Be precise and factual. Do not invent objects, people, text, or details that are not visible in the image.",
  balanced: "Be accurate but natural. Describe only what is visible in the image.",
  creative: "Be vivid and expressive while staying true to what is visible in the image.",
};

const DETAIL_TEXT: Record<PromptDetailOption, string> = {
  concise: "Keep the prompt short: subject, style, and mood in one or two sentences.",
  detailed: "Write a detailed prompt covering subject, composition, colours, lighting, style, and mood.",
  ultra: "Write a very detailed prompt covering subject, composition, colours, lighting, textures, background, style, camera feel, and mood.",
};

export function buildGeminiPrompt(settings: PromptexSettings, mode: PromptexMode, platform: PromptexPlatform): string {
  const lines: string[] = [
    `You are a microstock metadata assistant. The image will be used on ${platform}.`,
    CREATIVITY_TEXT[settings.creativity],
    settings.customInstructions.trim() ? `Extra instructions from the contributor: ${settings.customInstructions.trim()}` : "",
  ];
  if (mode === "metadata") {
    lines.push(
      `Write a search-friendly stock title of ${settings.titleMinWords} to ${settings.titleMaxWords} words,`,
      `between ${settings.keywordMin} and ${settings.keywordMax} single-word, lowercase, comma-separated keywords (no phrases, no duplicates),`,
      `and one short caption sentence describing the image.`,
      `Reply with strict JSON only, no markdown, no extra text: {"title": "...", "keywords": ["...", "..."], "caption": "..."}`,
    );
  } else {
    lines.push(
      DETAIL_TEXT[settings.promptDetail],
      `Write one image-generation prompt that could recreate an image like this one.`,
      `Reply with strict JSON only, no markdown, no extra text: {"prompt": "..."}`,
    );
  }
  return lines.filter(Boolean).join(" ");
}

function stripCodeFences(text: string): string {
  return text.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "").trim();
}

function normaliseKeywords(value: unknown): string[] {
  if (Array.isArray(value)) return value.map((v) => String(v).trim()).filter(Boolean);
  if (typeof value === "string") return value.split(",").map((v) => v.trim()).filter(Boolean);
  return [];
}

export function parseMetadataResponse(text: string): ParsedMetadata {
  const cleaned = stripCodeFences(text);
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");
  if (start === -1 || end === -1 || end <= start) {
    // No JSON at all: keep the raw text instead of inventing structured data.
    return { caption: cleaned };
  }
  try {
    const parsed = JSON.parse(cleaned.slice(start, end + 1)) as Record<string, unknown>;
    const out: ParsedMetadata = {};
    if (typeof parsed.title === "string" && parsed.title.trim()) out.title = parsed.title.trim();
    const keywords = normaliseKeywords(parsed.keywords);
    if (keywords.length) out.keywords = keywords;
    if (typeof parsed.caption === "string" && parsed.caption.trim()) out.caption = parsed.caption.trim();
    if (typeof parsed.prompt === "string" && parsed.prompt.trim()) out.prompt = parsed.prompt.trim();
    if (!out.title && !out.keywords && !out.caption && !out.prompt) return { caption: cleaned };
    return out;
  } catch {
    return { caption: cleaned };
  }
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function toTitleCase(value: string): string {
  return value
    .split(" ")
    .map((word) => (word ? word.charAt(0).toUpperCase() + word.slice(1) : word))
    .join(" ");
}

export function applyTitleRules(title: string, settings: PromptexSettings): string {
  let out = title.replace(/\s+/g, " ").trim();
  const banned = settings.bannedWords
    .split(",")
    .map((w) => w.trim())
    .filter(Boolean);
  for (const word of banned) {
    out = out.replace(new RegExp(`\\b${escapeRegExp(word)}\\b`, "gi"), "").replace(/\s+/g, " ").trim();
  }
  if (settings.titlePrefix.trim()) out = `${settings.titlePrefix.trim()} ${out}`.trim();
  if (settings.titleSuffix.trim()) out = `${out} ${settings.titleSuffix.trim()}`.trim();
  if (settings.titleCase === "title") out = toTitleCase(out);
  else if (settings.titleCase === "sentence") out = out ? out.charAt(0).toUpperCase() + out.slice(1).toLowerCase() : out;
  else if (settings.titleCase === "upper") out = out.toUpperCase();
  else if (settings.titleCase === "lower") out = out.toLowerCase();
  const maxLength = Math.max(1, settings.maxTitleLength || 200);
  if (out.length > maxLength) {
    const cut = out.slice(0, maxLength);
    const lastSpace = cut.lastIndexOf(" ");
    out = (lastSpace > 0 ? cut.slice(0, lastSpace) : cut).trim();
  }
  const words = out.split(" ").filter(Boolean);
  const maxWords = Math.max(1, settings.titleMaxWords || 12);
  if (words.length > maxWords) out = words.slice(0, maxWords).join(" ");
  // Minimum word count cannot be met by inventing words, so a short
  // title is left as it is rather than padded with filler.
  return out;
}

export function applyKeywordRules(keywords: string[], settings: PromptexSettings): string[] {
  const banned = new Set(
    settings.bannedWords
      .split(",")
      .map((w) => w.trim().toLowerCase())
      .filter(Boolean),
  );
  const seen = new Set<string>();
  const out: string[] = [];
  for (const raw of keywords) {
    const keyword = raw.trim().toLowerCase();
    if (!keyword) continue;
    if (banned.has(keyword)) continue;
    if (settings.singleWordKeywords && keyword.includes(" ")) continue;
    if (seen.has(keyword)) continue;
    seen.add(keyword);
    out.push(keyword);
  }
  const max = Math.max(1, settings.keywordMax || 49);
  return out.slice(0, max);
}

export function csvEscape(value: string): string {
  if (/[",\n\r]/.test(value)) return `"${value.replace(/"/g, '""')}"`;
  return value;
}

export function buildCsv(rows: CsvRow[]): string {
  const header = ["Filename", "Title", "Keywords", "Caption", "Prompt"].map(csvEscape).join(",");
  const lines = rows.map((row) =>
    [row.filename, row.title, row.keywords.join(", "), row.caption, row.prompt].map(csvEscape).join(","),
  );
  return [header, ...lines].join("\r\n");
}
