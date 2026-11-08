"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Page, Grid, Card } from "@/components/ui";
import {
  PAGE_SIZE,
  coverUrl,
  fetchWork,
  searchBooks,
  workUrl,
} from "@/lib/books";
import type { Book, SearchMode, WorkDetail } from "@/lib/books";

const SUGGESTIONS: Array<{ label: string; query: string; mode: SearchMode }> = [
  { label: "Bangladesh", query: "bangladesh", mode: "all" },
  { label: "Humayun Ahmed", query: "Humayun Ahmed", mode: "author" },
  { label: "Python", query: "python programming", mode: "title" },
  { label: "Science", query: "science", mode: "subject" },
  { label: "Mathematics", query: "mathematics", mode: "subject" },
];

type LoadState = "idle" | "loading" | "ready" | "error";

export default function BookFinder() {
  const [query, setQuery] = useState("bangladesh");
  const [mode, setMode] = useState<SearchMode>("all");
  const [books, setBooks] = useState<Book[]>([]);
  const [total, setTotal] = useState(0);
  const [state, setState] = useState<LoadState>("idle");
  const [error, setError] = useState("");
  const [offset, setOffset] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);
  const [selected, setSelected] = useState<Book | null>(null);
  const [detail, setDetail] = useState<WorkDetail | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState("");
  const startedRef = useRef(false);

  const runSearch = useCallback(async (q: string, m: SearchMode, append: boolean) => {
    const trimmed = q.trim();
    if (!trimmed) return;
    if (append) {
      setLoadingMore(true);
    } else {
      setState("loading");
      setError("");
      setSelected(null);
      setDetail(null);
    }
    try {
      const result = await searchBooks(trimmed, m, PAGE_SIZE, append ? offset : 0);
      if (append) {
        setBooks((prev) => [...prev, ...result.books]);
        setOffset((o) => o + result.books.length);
      } else {
        setBooks(result.books);
        setTotal(result.total);
        setOffset(result.books.length);
      }
      setState("ready");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not search books.");
      if (!append) setState("error");
    } finally {
      setLoadingMore(false);
    }
  }, [offset]);

  // Default search on first open: books about Bangladesh.
  // Deferred out of the effect body so mount does not set state synchronously.
  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;
    const timer = setTimeout(() => void runSearch("bangladesh", "all", false), 0);
    return () => clearTimeout(timer);
  }, [runSearch]);

  function submitSearch(e: React.FormEvent) {
    e.preventDefault();
    void runSearch(query, mode, false);
  }

  function pickSuggestion(s: { query: string; mode: SearchMode }) {
    setQuery(s.query);
    setMode(s.mode);
    void runSearch(s.query, s.mode, false);
  }

  async function showDetails(book: Book) {
    setSelected(book);
    setDetail(null);
    setDetailError("");
    setDetailLoading(true);
    try {
      setDetail(await fetchWork(book.key));
    } catch (err) {
      setDetailError(err instanceof Error ? err.message : "Could not load the details.");
    } finally {
      setDetailLoading(false);
    }
  }

  return (
    <Page
      title="Book Finder"
      eyebrow="SONET Academy library"
      intro="Search millions of books from Open Library — by title, author or subject. See the cover, author and first published year, then read the details or open the book on Open Library. Free, no account needed."
    >
      <form onSubmit={submitSearch}>
        <label>
          Search books
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Try a title, author or subject…"
            autoComplete="off"
          />
        </label>
        <div style={{ display: "flex", gap: 8, marginTop: 8, flexWrap: "wrap" }}>
          <select value={mode} onChange={(e) => setMode(e.target.value as SearchMode)} aria-label="Search by">
            <option value="all">Everything</option>
            <option value="title">Title</option>
            <option value="author">Author</option>
            <option value="subject">Subject</option>
          </select>
          <button type="submit" className="btn">Search →</button>
        </div>
      </form>
      <p className="muted">
        Try:{" "}
        {SUGGESTIONS.map((s, i) => (
          <span key={s.label}>
            {i > 0 ? " · " : ""}
            <button
              type="button"
              onClick={() => pickSuggestion(s)}
              style={{ background: "none", border: "none", padding: 0, color: "#315CBA", cursor: "pointer", font: "inherit", textDecoration: "underline" }}
            >
              {s.label}
            </button>
          </span>
        ))}
      </p>

      {state === "loading" && <p className="muted">Searching books…</p>}
      {state === "error" && (
        <Card title="Search unavailable">
          <p className="muted">Could not search right now ({error}). Check your connection and try again.</p>
          <p>
            <button type="button" className="btn" onClick={() => void runSearch(query, mode, false)}>
              Try again
            </button>
          </p>
        </Card>
      )}
      {state === "ready" && books.length === 0 && (
        <Card title="No books found">
          <p className="muted">Nothing matched that search. Try a different title, author or subject.</p>
        </Card>
      )}
      {state === "ready" && books.length > 0 && (
        <>
          <p className="muted">
            {total.toLocaleString("en-US")} books found — showing {books.length}.
          </p>
          {selected && (
            <Card title={selected.title}>
              <p className="muted" style={{ marginTop: 0 }}>
                {selected.authors.join(", ") || "Unknown author"}
                {selected.year ? ` · First published ${selected.year}` : ""}
              </p>
              {detailLoading && <p className="muted">Loading details…</p>}
              {detailError && <p className="muted">{detailError}</p>}
              {detail && detail.description && <p>{detail.description.slice(0, 600)}{detail.description.length > 600 ? "…" : ""}</p>}
              {detail && !detail.description && !detailLoading && (
                <p className="muted">No description is listed for this book on Open Library.</p>
              )}
              {detail && detail.subjects.length > 0 && (
                <p className="muted">Subjects: {detail.subjects.join(", ")}</p>
              )}
              <p>
                <a className="btn" href={workUrl(selected.key)} target="_blank" rel="noreferrer">
                  Open on Open Library →
                </a>{" "}
                <button type="button" className="btn" onClick={() => setSelected(null)}>
                  Close details
                </button>
              </p>
            </Card>
          )}
          <Grid>
            {books.map((book) => {
              const cover = coverUrl(book.coverId, "M");
              return (
                <Card key={book.key} title={book.title}>
                  {cover ? (
                    <Image
                      src={cover}
                      alt={`Cover of ${book.title}`}
                      width={160}
                      height={240}
                      loading="lazy"
                      style={{ width: "100%", maxWidth: 160, height: "auto", display: "block", borderRadius: 6, marginBottom: 8 }}
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                  ) : (
                    <p className="muted">No cover image listed.</p>
                  )}
                  <p className="muted" style={{ marginTop: 0 }}>
                    {book.authors.join(", ") || "Unknown author"}
                    {book.year ? ` · ${book.year}` : ""}
                  </p>
                  {book.subjects.length > 0 && (
                    <p className="muted">{book.subjects.slice(0, 3).join(", ")}</p>
                  )}
                  <p>
                    <button type="button" className="btn" onClick={() => void showDetails(book)}>
                      Details
                    </button>{" "}
                    <a className="btn" href={workUrl(book.key)} target="_blank" rel="noreferrer">
                      Open Library →
                    </a>
                  </p>
                </Card>
              );
            })}
          </Grid>
          {books.length < total && (
            <p>
              <button type="button" className="btn" disabled={loadingMore} onClick={() => void runSearch(query, mode, true)}>
                {loadingMore ? "Loading…" : "Load more books"}
              </button>
            </p>
          )}
        </>
      )}
      <p className="muted" style={{ marginTop: 24 }}>
        Live data from Open Library (openlibrary.org) — free, no API key. Book covers
        and descriptions come from Open Library; the books themselves open on
        openlibrary.org. Nothing is sent to a SONET server.
      </p>
    </Page>
  );
}
