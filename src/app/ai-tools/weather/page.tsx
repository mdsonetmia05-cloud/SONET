"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { Page, Grid, Card } from "@/components/ui";
import {
  DHAKA,
  describeWeatherCode,
  fetchWeather,
  formatDay,
  searchPlaces,
} from "@/lib/weather";
import type { Place, WeatherData } from "@/lib/weather";

type LoadState = "loading" | "ready" | "error";

export default function Weather() {
  const [place, setPlace] = useState<Place>(DHAKA);
  const [data, setData] = useState<WeatherData | null>(null);
  const [state, setState] = useState<LoadState>("loading");
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Place[]>([]);
  const [searching, setSearching] = useState(false);
  const [searchError, setSearchError] = useState("");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const latestQueryRef = useRef("");

  // Fetches weather and stores the result. All setState calls happen after
  // an await, so the mount effect below does not update state synchronously.
  const fetchIntoState = useCallback(async (p: Place) => {
    try {
      const weather = await fetchWeather(p);
      setData(weather);
      setState("ready");
    } catch (err) {
      setData(null);
      setState("error");
      setError(err instanceof Error ? err.message : "Could not load the weather.");
    }
  }, []);

  const load = useCallback(
    (p: Place) => {
      setState("loading");
      setError("");
      void fetchIntoState(p);
    },
    [fetchIntoState],
  );

  // Kick the first fetch off after mount, not synchronously inside the
  // effect body (react-hooks/set-state-in-effect forbids that).
  useEffect(() => {
    const timer = setTimeout(() => void fetchIntoState(DHAKA), 0);
    return () => clearTimeout(timer);
  }, [fetchIntoState]);

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  function onQueryChange(value: string) {
    setQuery(value);
    setSearchError("");
    if (debounceRef.current) clearTimeout(debounceRef.current);
    const trimmed = value.trim();
    if (trimmed.length < 2) {
      setResults([]);
      setSearching(false);
      return;
    }
    setSearching(true);
    latestQueryRef.current = trimmed;
    debounceRef.current = setTimeout(async () => {
      try {
        const places = await searchPlaces(trimmed);
        if (latestQueryRef.current !== trimmed) return;
        setResults(places);
        if (places.length === 0) setSearchError("No place found with that name.");
      } catch {
        if (latestQueryRef.current !== trimmed) return;
        setResults([]);
        setSearchError("Place search failed. Check your connection and try again.");
      } finally {
        if (latestQueryRef.current === trimmed) setSearching(false);
      }
    }, 400);
  }

  function choosePlace(p: Place) {
    setPlace(p);
    setQuery("");
    setResults([]);
    setSearchError("");
    load(p);
  }

  return (
    <Page
      title="Weather"
      eyebrow="Live weather"
      intro="Current conditions and a 7-day forecast for any city, live from Open-Meteo. Dhaka is shown by default — search for another city below. No API key and no account needed."
    >
      <label>
        Search a city
        <input
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Try Chittagong, London, Tokyo…"
          autoComplete="off"
        />
      </label>
      {searching && <p className="muted">Searching places…</p>}
      {searchError && <p className="muted">{searchError}</p>}
      {results.length > 0 && (
        <Grid>
          {results.map((r) => (
            <Card key={`${r.latitude},${r.longitude}`} title={r.name}>
              <p className="muted">{r.country ?? ""}</p>
              <p>
                <button type="button" className="btn" onClick={() => choosePlace(r)}>
                  Show weather →
                </button>
              </p>
            </Card>
          ))}
        </Grid>
      )}

      {state === "loading" && <p className="muted">Loading weather for {place.name}…</p>}
      {state === "error" && (
        <Card title="Weather unavailable">
          <p className="muted">
            Could not load the weather right now ({error}). Check your connection and try again.
          </p>
          <p>
            <button type="button" className="btn" onClick={() => load(place)}>
              Try again
            </button>
          </p>
        </Card>
      )}
      {state === "ready" && data && (
        <>
          <Card title={`${data.place.name}${data.place.country ? `, ${data.place.country}` : ""}`}>
            <p style={{ fontSize: 44, lineHeight: 1.1, margin: "8px 0" }}>
              {Math.round(data.current.temperature)}°C
            </p>
            <p className="muted" style={{ marginTop: 0 }}>
              {describeWeatherCode(data.current.weatherCode)} · Feels like{" "}
              {Math.round(data.current.apparentTemperature)}°C
            </p>
            <p>
              Humidity {data.current.humidity}% · Wind {Math.round(data.current.windSpeed)} km/h
            </p>
            <p className="muted">
              Updated {data.current.time.replace("T", " ")}
              {data.timezone ? ` (${data.timezone})` : ""}
            </p>
          </Card>
          <h2 style={{ marginTop: 28 }}>7-day forecast</h2>
          <Grid>
            {data.daily.map((day) => (
              <Card key={day.date} title={formatDay(day.date)}>
                <p className="muted" style={{ marginTop: 0 }}>
                  {describeWeatherCode(day.weatherCode)}
                </p>
                <p>
                  {Math.round(day.max)}° / {Math.round(day.min)}°C
                </p>
                <p className="muted">
                  {day.precipitationProbability === null
                    ? "Rain chance —"
                    : `Rain chance ${day.precipitationProbability}%`}
                </p>
              </Card>
            ))}
          </Grid>
        </>
      )}
      <p className="muted" style={{ marginTop: 24 }}>
        Live data from Open-Meteo (open-meteo.com) — free, no API key. Your search and location
        stay in your browser; nothing is sent to a SONET server.
      </p>
    </Page>
  );
}
