import test from "node:test";
import assert from "node:assert/strict";
// Pure-function tests for the Open Library helpers in src/lib/books.ts.
// The helpers below mirror the library. Run: npm test
const SEARCH_FIELDS = "key,title,author_name,first_publish_year,cover_i,subject";
function buildSearchUrl(query, mode, limit, offset) {
  const q = mode === "title" ? `title:${query}` : mode === "author" ? `author:${query}` : mode === "subject" ? `subject:${query}` : query;
  const params = new URLSearchParams({ q, fields: SEARCH_FIELDS, limit: String(limit), offset: String(offset) });
  return `https://openlibrary.org/search.json?${params.toString()}`;
}
function coverUrl(coverId, size = "M") {
  if (!coverId) return null;
  return `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`;
}
function workUrl(key) {
  return `https://openlibrary.org${key}`;
}
function asStringArray(value) {
  if (!Array.isArray(value)) return [];
  return value.map((v) => String(v).trim()).filter(Boolean);
}
function parseSearchResponse(json) {
  const data = json ?? {};
  const docs = Array.isArray(data.docs) ? data.docs : [];
  const books = docs.map((doc) => {
    const d = doc ?? {};
    return {
      key: typeof d.key === "string" ? d.key : "",
      title: typeof d.title === "string" ? d.title : "Untitled",
      authors: asStringArray(d.author_name),
      year: typeof d.first_publish_year === "number" ? d.first_publish_year : null,
      coverId: typeof d.cover_i === "number" ? d.cover_i : null,
      subjects: asStringArray(d.subject).slice(0, 5),
    };
  });
  return { total: typeof data.numFound === "number" ? data.numFound : 0, books: books.filter((b) => b.key !== "") };
}
function parseWorkResponse(json) {
  const data = json ?? {};
  const raw = data.description;
  const description = typeof raw === "string" ? raw : raw && typeof raw === "object" && typeof raw.value === "string" ? String(raw.value) : "";
  return { description: description.trim(), subjects: asStringArray(data.subjects).slice(0, 10) };
}
test("search URL encodes the query and the field search", () => {
  const url = buildSearchUrl("Humayun Ahmed", "author", 12, 0);
  assert.ok(url.startsWith("https://openlibrary.org/search.json?"));
  assert.ok(url.includes("q=author%3AHumayun+Ahmed"));
  assert.ok(url.includes("limit=12"));
  const titleUrl = buildSearchUrl("python", "title", 12, 24);
  assert.ok(titleUrl.includes("q=title%3Apython"));
  assert.ok(titleUrl.includes("offset=24"));
});
test("cover URL is null without a cover id, else the covers host", () => {
  assert.equal(coverUrl(null), null);
  assert.equal(coverUrl(8513526, "M"), "https://covers.openlibrary.org/b/id/8513526-M.jpg");
});
test("work URL is the Open Library page for the work key", () => {
  assert.equal(workUrl("/works/OL19547345W"), "https://openlibrary.org/works/OL19547345W");
});
test("search results parse titles, authors, year, cover and subjects", () => {
  const parsed = parseSearchResponse({
    numFound: 2,
    docs: [
      { key: "/works/OL1W", title: "Core Python Programming", author_name: ["R. Nageswara Rao"], first_publish_year: 2016, cover_i: 13192647, subject: ["Python", "Programming"] },
      { key: "", title: "No key book" },
      { key: "/works/OL2W", title: "No Author Book", first_publish_year: "2014" },
    ],
  });
  assert.equal(parsed.total, 2);
  assert.equal(parsed.books.length, 2);
  assert.deepEqual(parsed.books[0], {
    key: "/works/OL1W",
    title: "Core Python Programming",
    authors: ["R. Nageswara Rao"],
    year: 2016,
    coverId: 13192647,
    subjects: ["Python", "Programming"],
  });
  assert.deepEqual(parsed.books[1].authors, []);
  assert.equal(parsed.books[1].year, null);
});
test("work description accepts a string or an object with a value", () => {
  assert.equal(parseWorkResponse({ description: "  A great book. " }).description, "A great book.");
  assert.equal(parseWorkResponse({ description: { value: "From the object." } }).description, "From the object.");
  assert.equal(parseWorkResponse({}).description, "");
  assert.deepEqual(parseWorkResponse({ subjects: ["A", "B"] }).subjects, ["A", "B"]);
});
