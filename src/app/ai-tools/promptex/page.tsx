"use client";
import { useEffect, useRef, useState } from "react";
import { Page, Grid, Card, NotConfigured } from "@/components/ui";
import {
  DEFAULT_SETTINGS,
  PROMPTEX_PLATFORMS,
  applyKeywordRules,
  applyTitleRules,
  buildCsv,
  buildGeminiPrompt,
  parseMetadataResponse,
} from "@/lib/promptex";
import type { CsvRow, PromptexMode, PromptexPlatform, PromptexSettings } from "@/lib/promptex";

const STORAGE_KEY = "sonet-promptex-gemini-key";
const GEMINI_MODEL = "gemini-2.0-flash";
const ACCEPTED = ".jpg,.jpeg,.png,.webp,.svg,.eps";

type ItemStatus = "ready" | "eps" | "generating" | "done" | "error";
type ItemResult = { title: string; keywords: string[]; caption: string; prompt: string };
type UploadItem = {
  id: string;
  filename: string;
  previewUrl: string | null;
  dataBase64: string | null;
  dataMime: string;
  status: ItemStatus;
  error: string;
  result: ItemResult | null;
};

type GeminiResponse = {
  candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
  error?: { message?: string };
};

function uid(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function readAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("Could not read file."));
    reader.readAsDataURL(file);
  });
}

function svgToPngDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth || 1024;
        canvas.height = img.naturalHeight || 1024;
        const ctx = canvas.getContext("2d");
        if (!ctx) throw new Error("Canvas is not available in this browser.");
        ctx.drawImage(img, 0, 0);
        URL.revokeObjectURL(url);
        resolve(canvas.toDataURL("image/png"));
      } catch (err) {
        URL.revokeObjectURL(url);
        reject(err instanceof Error ? err : new Error("Could not convert SVG."));
      }
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Could not render this SVG file."));
    };
    img.src = url;
  });
}

const CREATIVITY_LABELS: Array<{ value: PromptexSettings["creativity"]; label: string }> = [
  { value: "precise", label: "Precise" },
  { value: "balanced", label: "Balanced" },
  { value: "creative", label: "Creative" },
];

const DETAIL_LABELS: Array<{ value: PromptexSettings["promptDetail"]; label: string }> = [
  { value: "concise", label: "Concise" },
  { value: "detailed", label: "Detailed" },
  { value: "ultra", label: "Ultra" },
];

export default function PromptExPage() {
  const [settings, setSettings] = useState<PromptexSettings>(DEFAULT_SETTINGS);
  const [keyInput, setKeyInput] = useState("");
  const [showKey, setShowKey] = useState(false);
  const [savedKey, setSavedKey] = useState("");
  const [keyTesting, setKeyTesting] = useState(false);
  const [keyMessage, setKeyMessage] = useState("");
  const [keyError, setKeyError] = useState("");
  const [items, setItems] = useState<UploadItem[]>([]);
  const [generating, setGenerating] = useState(false);
  const [generateError, setGenerateError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setSavedKey(stored);
      setKeyMessage("A tested Gemini key is saved in this browser.");
    }
  }, []);

  function updateSettings(patch: Partial<PromptexSettings>) {
    setSettings((prev) => ({ ...prev, ...patch }));
  }

  function setMode(mode: PromptexMode) {
    updateSettings({ mode });
  }

  function setPlatform(platform: PromptexPlatform) {
    updateSettings({ platform });
  }

  async function testAndSaveKey() {
    const key = keyInput.trim();
    if (!key) return;
    setKeyTesting(true);
    setKeyError("");
    setKeyMessage("");
    try {
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${encodeURIComponent(key)}`);
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as GeminiResponse | null;
        throw new Error(data?.error?.message ?? `Gemini returned status ${res.status}. Check the key and try again.`);
      }
      window.localStorage.setItem(STORAGE_KEY, key);
      setSavedKey(key);
      setKeyMessage("Key tested and saved in this browser only. It is never sent to any SONET server.");
    } catch (err) {
      setKeyError(err instanceof Error ? err.message : "The key could not be tested.");
    } finally {
      setKeyTesting(false);
    }
  }

  function removeKey() {
    window.localStorage.removeItem(STORAGE_KEY);
    setSavedKey("");
    setKeyInput("");
    setKeyMessage("");
    setKeyError("");
  }

  function addFiles(list: FileList | File[]) {
    const files = Array.from(list);
    if (!files.length) return;
    for (const file of files) {
      const id = uid();
      const lower = file.name.toLowerCase();
      const isEps = lower.endsWith(".eps") || file.type === "application/postscript";
      const base: UploadItem = {
        id,
        filename: file.name,
        previewUrl: null,
        dataBase64: null,
        dataMime: file.type || "image/png",
        status: isEps ? "eps" : "ready",
        error: "",
        result: null,
      };
      setItems((prev) => [...prev, base]);
      if (isEps) continue;
      const isSvg = lower.endsWith(".svg") || file.type === "image/svg+xml";
      (async () => {
        try {
          const dataUrl = isSvg ? await svgToPngDataUrl(file) : await readAsDataUrl(file);
          const comma = dataUrl.indexOf(",");
          setItems((prev) =>
            prev.map((item) =>
              item.id === id
                ? { ...item, previewUrl: dataUrl, dataBase64: comma >= 0 ? dataUrl.slice(comma + 1) : "", dataMime: isSvg ? "image/png" : file.type || "image/png" }
                : item,
            ),
          );
        } catch (err) {
          setItems((prev) =>
            prev.map((item) =>
              item.id === id ? { ...item, status: "error", error: err instanceof Error ? err.message : "Could not read this file." } : item,
            ),
          );
        }
      })();
    }
  }

  function removeItem(id: string) {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  function updateResult(id: string, patch: Partial<ItemResult>) {
    setItems((prev) =>
      prev.map((item) => (item.id === id && item.result ? { ...item, result: { ...item.result, ...patch } } : item)),
    );
  }

  async function generateAll() {
    if (!savedKey) {
      setGenerateError("Add your Gemini API key and press TEST & SAVE first. Generation never runs without a tested key, and no output is faked.");
      return;
    }
    const ready = items.filter((item) => item.status === "ready" || item.status === "error");
    if (!ready.length) {
      setGenerateError("Upload at least one JPG, PNG, WEBP, or SVG image first. EPS files need a JPG/PNG preview of the same artwork.");
      return;
    }
    setGenerateError("");
    setGenerating(true);
    const promptText = buildGeminiPrompt(settings, settings.mode, settings.platform);
    const temperature = settings.creativity === "precise" ? 0.2 : settings.creativity === "creative" ? 1.0 : 0.7;
    for (const item of ready) {
      if (!item.dataBase64) continue;
      setItems((prev) => prev.map((it) => (it.id === item.id ? { ...it, status: "generating", error: "" } : it)));
      try {
        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${encodeURIComponent(savedKey)}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: promptText }, { inlineData: { mimeType: item.dataMime, data: item.dataBase64 } }] }],
            generationConfig: { temperature, responseMimeType: "application/json" },
          }),
        });
        if (!res.ok) {
          const data = (await res.json().catch(() => null)) as GeminiResponse | null;
          throw new Error(data?.error?.message ?? `Gemini returned status ${res.status}.`);
        }
        const data = (await res.json()) as GeminiResponse;
        const text = (data.candidates?.[0]?.content?.parts ?? []).map((part) => part.text ?? "").join("").trim();
        if (!text) throw new Error("Gemini returned an empty response.");
        const parsed = parseMetadataResponse(text);
        const result: ItemResult = {
          title: parsed.title ? applyTitleRules(parsed.title, settings) : "",
          keywords: parsed.keywords ? applyKeywordRules(parsed.keywords, settings) : [],
          caption: parsed.caption ?? "",
          prompt: parsed.prompt ?? parsed.caption ?? "",
        };
        if (settings.mode === "prompt" && !result.prompt) result.prompt = text;
        if (settings.mode === "metadata" && !result.title && !result.keywords.length && !result.caption) {
          throw new Error("Gemini returned a response that could not be parsed as metadata.");
        }
        setItems((prev) => prev.map((it) => (it.id === item.id ? { ...it, status: "done", result } : it)));
      } catch (err) {
        setItems((prev) =>
          prev.map((it) => (it.id === item.id ? { ...it, status: "error", error: err instanceof Error ? err.message : "Generation failed." } : it)),
        );
      }
    }
    setGenerating(false);
  }

  function downloadCsv() {
    const rows: CsvRow[] = items
      .filter((item) => item.result)
      .map((item) => ({
        filename: item.filename,
        title: item.result?.title ?? "",
        keywords: item.result?.keywords ?? [],
        caption: item.result?.caption ?? "",
        prompt: item.result?.prompt ?? "",
      }));
    if (!rows.length) return;
    const blob = new Blob([buildCsv(rows)], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "promptex-metadata.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  const readyCount = items.filter((item) => item.status === "ready" || item.status === "error").length;
  const doneCount = items.filter((item) => item.status === "done").length;
  const results = items.filter((item) => item.result);

  return (
    <Page
      title="PromptEx"
      eyebrow="SONET AI • Microstock metadata"
      intro="Turn images into sell-ready metadata. Upload your artwork, add your own free Gemini key, and get stock titles, keywords, captions — or detailed image-generation prompts — ready to download as CSV."
    >
      <p className="muted">বাংলা: নিজের ছবি আপলোড করুন, নিজের Gemini API key দিন, আর AI দিয়ে stock-এর জন্য title, keyword ও caption তৈরি করুন।</p>
      <NotConfigured name="SONET server AI provider (Gemini / Groq / Mistral)" />
      <p className="card card-soft">
        <span className="badge">Your key, your browser</span> PromptEx does not use a SONET server key. Your Gemini key is stored only in this
        browser (localStorage) after it passes a real test, and it is sent only to Google&apos;s Gemini API when you generate. No image is ever
        uploaded to a SONET server.
      </p>

      <h2>How it works</h2>
      <Grid>
        <Card title="1. Get a free Gemini key"><p className="muted">Create a free API key in Google AI Studio. The free tier applies; Google&apos;s own limits decide how much you can process per day.</p></Card>
        <Card title="2. Test & save the key"><p className="muted">Paste the key below and press TEST &amp; SAVE. It is saved only after Gemini accepts it.</p></Card>
        <Card title="3. Upload images"><p className="muted">Drag and drop, browse, or paste (Ctrl+V). Batch upload JPG, PNG, WEBP, SVG, and EPS.</p></Card>
        <Card title="4. Generate & download CSV"><p className="muted">Generate metadata or prompts for each image, edit the results, then download them as CSV.</p></Card>
      </Grid>

      <h2>Mode &amp; platform</h2>
      <div className="card">
        <p><strong>Mode</strong></p>
        <p>
          <button type="button" className={settings.mode === "metadata" ? "btn" : "btn btn-secondary"} onClick={() => setMode("metadata")}>Metadata mode</button>{" "}
          <button type="button" className={settings.mode === "prompt" ? "btn" : "btn btn-secondary"} onClick={() => setMode("prompt")}>Image to Prompt mode</button>
        </p>
        <p className="muted">{settings.mode === "metadata" ? "SEO title, keywords, and a one-line caption per image." : "A detailed image-generation prompt per image."}</p>
        <label>
          Stock platform
          <select value={settings.platform} onChange={(e) => setPlatform(e.target.value as PromptexPlatform)}>
            {PROMPTEX_PLATFORMS.map((platform) => (
              <option key={platform} value={platform}>{platform}</option>
            ))}
          </select>
        </label>
        <p className="muted">The platform only changes the wording of the prompt sent to Gemini. It is not a connection to that stock site.</p>
      </div>

      <h2>Your Gemini API key</h2>
      <div className="card">
        <p>
          <a href="https://aistudio.google.com/apikey" target="_blank" rel="noreferrer">Get a free key at Google AI Studio →</a>
        </p>
        <label>
          Gemini API key
          <input
            type={showKey ? "text" : "password"}
            value={keyInput}
            onChange={(e) => setKeyInput(e.target.value)}
            placeholder="Paste your Gemini API key here"
            autoComplete="off"
          />
        </label>
        <p>
          <button type="button" className="btn btn-secondary" onClick={() => setShowKey((v) => !v)}>{showKey ? "Hide key" : "Show key"}</button>{" "}
          <button type="button" className="btn" onClick={testAndSaveKey} disabled={!keyInput.trim() || keyTesting}>
            {keyTesting ? "Testing…" : "TEST & SAVE"}
          </button>{" "}
          {savedKey && (
            <button type="button" className="btn btn-secondary" onClick={removeKey}>Remove saved key</button>
          )}
        </p>
        {keyMessage && <p>{keyMessage}</p>}
        {keyError && <p style={{ color: "#b42318" }}>{keyError}</p>}
        <p className="muted">Other providers are not available here: Groq, OpenRouter, Together, Mistral, and HuggingFace are Not Configured — they are listed honestly instead of being shown as working.</p>
      </div>

      <h2>Settings</h2>
      <div className="card">
        <label>
          Title length (words, min)
          <input type="number" min={1} max={50} value={settings.titleMinWords} onChange={(e) => updateSettings({ titleMinWords: Number(e.target.value) || 4 })} />
        </label>
        <label>
          Title length (words, max)
          <input type="number" min={1} max={50} value={settings.titleMaxWords} onChange={(e) => updateSettings({ titleMaxWords: Number(e.target.value) || 12 })} />
        </label>
        <label>
          Keywords (min)
          <input type="number" min={1} max={100} value={settings.keywordMin} onChange={(e) => updateSettings({ keywordMin: Number(e.target.value) || 15 })} />
        </label>
        <label>
          Keywords (max)
          <input type="number" min={1} max={100} value={settings.keywordMax} onChange={(e) => updateSettings({ keywordMax: Number(e.target.value) || 49 })} />
        </label>
        <label>
          Custom instructions
          <textarea value={settings.customInstructions} onChange={(e) => updateSettings({ customInstructions: e.target.value })} placeholder="e.g. Focus on the flat vector style and keep titles simple." />
        </label>
        <label>
          Title prefix
          <input type="text" value={settings.titlePrefix} onChange={(e) => updateSettings({ titlePrefix: e.target.value })} placeholder="Optional text added before each title" />
        </label>
        <label>
          Title suffix
          <input type="text" value={settings.titleSuffix} onChange={(e) => updateSettings({ titleSuffix: e.target.value })} placeholder="Optional text added after each title" />
        </label>
        <details>
          <summary>Advanced settings</summary>
          <label>
            Title case
            <select value={settings.titleCase} onChange={(e) => updateSettings({ titleCase: e.target.value as PromptexSettings["titleCase"] })}>
              <option value="title">Title Case</option>
              <option value="sentence">Sentence case</option>
              <option value="upper">UPPERCASE</option>
              <option value="lower">lowercase</option>
            </select>
          </label>
          <label>
            Max title length (characters)
            <input type="number" min={20} max={500} value={settings.maxTitleLength} onChange={(e) => updateSettings({ maxTitleLength: Number(e.target.value) || 200 })} />
          </label>
          <label>
            Banned words (comma-separated)
            <input type="text" value={settings.bannedWords} onChange={(e) => updateSettings({ bannedWords: e.target.value })} placeholder="e.g. ai, generated, illustration" />
          </label>
          <label>
            AI creativity
            <select value={settings.creativity} onChange={(e) => updateSettings({ creativity: e.target.value as PromptexSettings["creativity"] })}>
              {CREATIVITY_LABELS.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </label>
          <label>
            Prompt detail
            <select value={settings.promptDetail} onChange={(e) => updateSettings({ promptDetail: e.target.value as PromptexSettings["promptDetail"] })}>
              {DETAIL_LABELS.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </label>
          <label>
            <input
              type="checkbox"
              checked={settings.singleWordKeywords}
              onChange={(e) => updateSettings({ singleWordKeywords: e.target.checked })}
              style={{ width: "auto", marginRight: 8 }}
            />
            Single-word keywords only (Adobe Stock compliant)
          </label>
        </details>
      </div>

      <h2>Upload images</h2>
      <div
        className="card"
        tabIndex={0}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          addFiles(e.dataTransfer.files);
        }}
        onPaste={(e) => {
          if (e.clipboardData.files.length) addFiles(e.clipboardData.files);
        }}
      >
        <p>Drag and drop images here, paste with Ctrl+V, or browse. Accepted: JPG, PNG, WEBP, SVG, EPS.</p>
        <p>
          <button type="button" className="btn" onClick={() => fileInputRef.current?.click()}>Browse images</button>
        </p>
        <input
          ref={fileInputRef}
          type="file"
          accept={ACCEPTED}
          multiple
          style={{ display: "none" }}
          onChange={(e) => {
            if (e.target.files) addFiles(e.target.files);
            e.target.value = "";
          }}
        />
        <p className="muted">Files stay in your browser. EPS files are listed but cannot be previewed or read by Gemini vision — add a JPG/PNG preview of the same artwork to generate its metadata.</p>
      </div>

      {items.length > 0 && (
        <>
          <h2>Images ({items.length})</h2>
          <Grid>
            {items.map((item) => (
              <Card key={item.id} title={item.filename}>
                {/* eslint-disable-next-line @next/next/no-img-element -- user-uploaded blob/data-URL previews cannot use next/image */}
                {item.previewUrl && <img src={item.previewUrl} alt={item.filename} style={{ maxWidth: "100%", borderRadius: 8 }} />}
                <p className="muted">Status: {item.status}{item.status === "done" ? ` — ${doneCount} of ${items.length} done` : ""}</p>
                {item.status === "eps" && <p>EPS preview is not available in the browser, and Gemini vision cannot read EPS binary. Upload a JPG/PNG preview of this artwork to generate metadata for it.</p>}
                {item.error && <p style={{ color: "#b42318" }}>{item.error}</p>}
                <p><button type="button" className="btn btn-secondary" onClick={() => removeItem(item.id)}>Remove</button></p>
              </Card>
            ))}
          </Grid>
          <p>
            <button type="button" className="btn" onClick={generateAll} disabled={generating || !readyCount}>
              {generating ? "Generating…" : `Generate ${settings.mode === "metadata" ? "metadata" : "prompts"} (${readyCount} image${readyCount === 1 ? "" : "s"})`}
            </button>{" "}
            <button type="button" className="btn btn-secondary" onClick={() => setItems([])} disabled={generating}>Clear all</button>
          </p>
          {generateError && <p style={{ color: "#b42318" }}>{generateError}</p>}
          {!savedKey && <p>Generation needs a tested Gemini key — see the API key section above.</p>}
        </>
      )}

      {results.length > 0 && (
        <>
          <h2>Results ({results.length})</h2>
          <p className="muted">Edit any field before downloading — the CSV uses exactly what is shown here.</p>
          <div style={{ overflowX: "auto" }}>
            <table>
              <thead>
                <tr><th>File</th><th>Title</th><th>Keywords</th><th>{settings.mode === "metadata" ? "Caption" : "Prompt"}</th></tr>
              </thead>
              <tbody>
                {results.map((item) => (
                  <tr key={item.id}>
                    <td>{item.filename}</td>
                    <td>
                      <input type="text" value={item.result?.title ?? ""} onChange={(e) => updateResult(item.id, { title: e.target.value })} />
                    </td>
                    <td>
                      <textarea
                        value={(item.result?.keywords ?? []).join(", ")}
                        onChange={(e) => updateResult(item.id, { keywords: e.target.value.split(",").map((k) => k.trim()).filter(Boolean) })}
                        rows={3}
                      />
                    </td>
                    <td>
                      <textarea
                        value={settings.mode === "metadata" ? (item.result?.caption ?? "") : (item.result?.prompt ?? "")}
                        onChange={(e) => updateResult(item.id, settings.mode === "metadata" ? { caption: e.target.value } : { prompt: e.target.value })}
                        rows={3}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            <button type="button" className="btn" onClick={downloadCsv} disabled={!results.length}>Download CSV</button>
          </p>
          <p className="muted">CSV columns: Filename, Title, Keywords, Caption, Prompt. Keywords are joined with &quot;, &quot; inside one quoted field.</p>
        </>
      )}

      <h2>Frequently asked questions</h2>
      <details>
        <summary>Where do I get a Gemini API key?</summary>
        <p>Free from Google AI Studio — follow the &quot;Get a free key&quot; link above. No payment is needed for a key; Google&apos;s free-tier limits apply.</p>
      </details>
      <details>
        <summary>Is my API key safe here?</summary>
        <p>Your key is saved only in this browser after it passes a real test with Google, and it is sent only to Google&apos;s Gemini API when you generate. It is never sent to, or stored on, any SONET server.</p>
      </details>
      <details>
        <summary>Does PromptEx cost anything?</summary>
        <p>The tool itself is free. You use your own Gemini key, so Google&apos;s free-tier limits apply — heavy use may need a paid Google plan, which is between you and Google.</p>
      </details>
      <details>
        <summary>Is an API key really required?</summary>
        <p>Yes. Generation does not run without a tested, saved key, and PromptEx never shows faked metadata in its place.</p>
      </details>
      <details>
        <summary>Which image formats are accepted?</summary>
        <p>JPG, PNG, WEBP, SVG, and EPS. SVG files are rendered to PNG in your browser before being sent to Gemini. EPS files are listed but cannot be previewed or read by Gemini vision — upload a JPG/PNG preview of the same artwork to generate its metadata.</p>
      </details>
    </Page>
  );
}
