import test from "node:test";
import assert from "node:assert/strict";
// Pure-function test for the WMO weather-code labels used by the Weather tool.
// Mirrors describeWeatherCode in src/lib/weather.ts. Run: npm test
function describeWeatherCode(code) {
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
test("code 0 is Clear sky and code 61 is Rain", () => {
  assert.equal(describeWeatherCode(0), "Clear sky");
  assert.equal(describeWeatherCode(61), "Rain");
});
test("code 95 is Thunderstorm and unknown codes are not invented", () => {
  assert.equal(describeWeatherCode(95), "Thunderstorm");
  assert.equal(describeWeatherCode(999), "Unknown conditions");
});
