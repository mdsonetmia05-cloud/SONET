// Live book data via Open Library — free, no API key, no sign-up.
// All requests run from the visitor's browser; nothing is sent to a SONET server.
// Docs: https://openlibrary.org/dev/docs/api/search

export type SearchMode = "all" | "title" | "author" | "subject";

export type Book = {
  key: string;
  title: string;
  authors: string[];
  year: number | null;
  coverId: number | null;
  subjects: string[];
};

export type BookSearchResult = {
  total: number;
  books: Book[];
};

export type WorkDetail = {
  description: string;
  subjects: string[];
};

export const SEARCH_FIELDS = "key,title,author_name,first_publish_year,cover_i,subject";
export const PAGE_SIZE = 12;

export function buildSearchUrl(query: string, mode: SearchMode, limit: number, offset: number): string {
  const q =
    mode === "title"
      ? `title:${query}`
      : mode === "author"
        ? `author:${query}`
        : mode === "subject"
          ? `subject:${query}`
          : query;
  const params = new URLSearchParams({
    q,
    fields: SEARCH_FIELDS,
    limit: String(limit),
    offset: String(offset),
  });
  return `https://openlibrary.org/search.json?${params.toString()}`;
}

export function coverUrl(coverId: number | null, size: "S" | "M" | "L" = "M"): string | null {
  if (!coverId) return null;
  return `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`;
}

export function workUrl(key: string): string {
  return `https://openlibrary.org${key}`;
}

function asStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.map((v) => String(v).trim()).filter(Boolean);
}

export function parseSearchResponse(json: unknown): BookSearchResult {
  const data = (json ?? {}) as Record<string, unknown>;
  const docs = Array.isArray(data.docs) ? data.docs : [];
  const books: Book[] = docs.map((doc) => {
    const d = (doc ?? {}) as Record<string, unknown>;
    const year = typeof d.first_publish_year === "number" ? d.first_publish_year : null;
    const coverId = typeof d.cover_i === "number" ? d.cover_i : null;
    return {
      key: typeof d.key === "string" ? d.key : "",
      title: typeof d.title === "string" ? d.title : "Untitled",
      authors: asStringArray(d.author_name),
      year,
      coverId,
      subjects: asStringArray(d.subject).slice(0, 5),
    };
  });
  return {
    total: typeof data.numFound === "number" ? data.numFound : 0,
    books: books.filter((b) => b.key !== ""),
  };
}

export function parseWorkResponse(json: unknown): WorkDetail {
  const data = (json ?? {}) as Record<string, unknown>;
  const raw = data.description;
  const description =
    typeof raw === "string" ? raw : raw && typeof raw === "object" && typeof (raw as Record<string, unknown>).value === "string"
      ? String((raw as Record<string, unknown>).value)
      : "";
  return {
    description: description.trim(),
    subjects: asStringArray(data.subjects).slice(0, 10),
  };
}

export async function searchBooks(
  query: string,
  mode: SearchMode,
  limit: number = PAGE_SIZE,
  offset: number = 0
): Promise<BookSearchResult> {
  const res = await fetch(buildSearchUrl(query, mode, limit, offset));
  if (!res.ok) throw new Error(`Open Library returned ${res.status}.`);
  return parseSearchResponse(await res.json());
}

export async function fetchWork(key: string): Promise<WorkDetail> {
  const res = await fetch(`https://openlibrary.org${key}.json`);
  if (!res.ok) throw new Error(`Open Library returned ${res.status}.`);
  return parseWorkResponse(await res.json());
}
