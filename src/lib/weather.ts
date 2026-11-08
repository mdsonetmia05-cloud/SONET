// Live weather via Open-Meteo — free, no API key, no sign-up.
// All requests run from the visitor's browser; nothing is sent to a SONET server.

export type Place = {
  name: string;
  country?: string;
  latitude: number;
  longitude: number;
};

export const DHAKA: Place = {
  name: "Dhaka",
  country: "Bangladesh",
  latitude: 23.81,
  longitude: 90.41,
};

export type CurrentWeather = {
  temperature: number;
  apparentTemperature: number;
  humidity: number;
  weatherCode: number;
  windSpeed: number;
  windDirection: number;
  time: string;
};

export type DailyForecast = {
  date: string;
  weatherCode: number;
  max: number;
  min: number;
  precipitationProbability: number | null;
};

export type WeatherData = {
  place: Place;
  current: CurrentWeather;
  daily: DailyForecast[];
  timezone: string;
};

/** Human-readable label for a WMO weather code (see https://open-meteo.com/). */
export function describeWeatherCode(code: number): string {
  if (code === 0) return "Clear sky";
  if (code === 1) return "Mainly clear";
  if (code === 2) return "Partly cloudy";
  if (code === 3) return "Overcast";
  if (code === 45 || code === 48) return "Fog";
  if (code >= 51 && code <= 55) return "Drizzle";
  if (code === 56 || code === 57) return "Freezing drizzle";
  if (code >= 61 && code <= 65) return "Rain";
  if (code === 66 || code === 67) return "Freezing rain";
  if (code >= 71 && code <= 75) return "Snow";
  if (code === 77) return "Snow grains";
  if (code >= 80 && code <= 82) return "Rain showers";
  if (code === 85 || code === 86) return "Snow showers";
  if (code === 95) return "Thunderstorm";
  if (code === 96 || code === 99) return "Thunderstorm with hail";
  return "Unknown conditions";
}

/** "2026-11-08" -> "Sun, 8 Nov" (locale-independent, no timezone shift). */
export function formatDay(isoDate: string): string {
  const [y, m, d] = isoDate.split("-").map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${days[date.getUTCDay()]}, ${date.getUTCDate()} ${months[date.getUTCMonth()]}`;
}

type OpenMeteoForecastResponse = {
  timezone?: string;
  current?: {
    time?: string;
    temperature_2m?: number;
    apparent_temperature?: number;
    relative_humidity_2m?: number;
    weather_code?: number;
    wind_speed_10m?: number;
    wind_direction_10m?: number;
  };
  daily?: {
    time?: string[];
    weather_code?: number[];
    temperature_2m_max?: number[];
    temperature_2m_min?: number[];
    precipitation_probability_max?: Array<number | null>;
  };
};

export async function fetchWeather(place: Place): Promise<WeatherData> {
  const url =
    "https://api.open-meteo.com/v1/forecast" +
    `?latitude=${place.latitude}&longitude=${place.longitude}` +
    "&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,wind_direction_10m" +
    "&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max" +
    "&timezone=auto&forecast_days=7";
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Open-Meteo returned ${res.status}.`);
  const data = (await res.json()) as OpenMeteoForecastResponse;
  if (!data.current || !data.daily || !data.daily.time) {
    throw new Error("Open-Meteo returned an unexpected response.");
  }
  const daily: DailyForecast[] = data.daily.time.map((date, i) => ({
    date,
    weatherCode: data.daily?.weather_code?.[i] ?? 0,
    max: data.daily?.temperature_2m_max?.[i] ?? 0,
    min: data.daily?.temperature_2m_min?.[i] ?? 0,
    precipitationProbability: data.daily?.precipitation_probability_max?.[i] ?? null,
  }));
  return {
    place,
    current: {
      temperature: data.current.temperature_2m ?? 0,
      apparentTemperature: data.current.apparent_temperature ?? 0,
      humidity: data.current.relative_humidity_2m ?? 0,
      weatherCode: data.current.weather_code ?? 0,
      windSpeed: data.current.wind_speed_10m ?? 0,
      windDirection: data.current.wind_direction_10m ?? 0,
      time: data.current.time ?? "",
    },
    daily,
    timezone: data.timezone ?? "",
  };
}

type GeocodingResponse = {
  results?: Array<{
    name?: string;
    country?: string;
    admin1?: string;
    latitude?: number;
    longitude?: number;
  }>;
};

export async function searchPlaces(query: string): Promise<Place[]> {
  const url =
    "https://geocoding-api.open-meteo.com/v1/search" +
    `?name=${encodeURIComponent(query)}&count=5&language=en&format=json`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Place search returned ${res.status}.`);
  const data = (await res.json()) as GeocodingResponse;
  return (data.results ?? [])
    .filter((r) => r.latitude !== undefined && r.longitude !== undefined)
    .map((r) => ({
      name: r.admin1 && r.admin1 !== r.name ? `${r.name}, ${r.admin1}` : (r.name ?? "Unknown place"),
      country: r.country,
      latitude: r.latitude as number,
      longitude: r.longitude as number,
    }));
}
