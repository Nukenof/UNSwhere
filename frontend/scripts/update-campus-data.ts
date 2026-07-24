/**
 * Fetches UNSW campus building footprints from OpenStreetMap (via the Overpass
 * API), converts them to GeoJSON, strips them down to what the app needs, and
 * writes a static file to public/data/unsw-buildings.geojson.
 *
 * Run manually / on deploy / on a schedule — campus geometry rarely changes:
 *   npm run update-campus
 *
 * Do NOT call Overpass from the browser at runtime; load the generated file.
 */
import { mkdir, writeFile } from 'node:fs/promises';
import process from 'node:process';
import osmtogeojson from 'osmtogeojson';
import type { Feature, FeatureCollection, Polygon, MultiPolygon } from 'geojson';

// Restrict to buildings inside the UNSW Kensington campus polygons (the campus
// is mapped in OSM as two adjacent `amenity=university` areas both named
// "University of New South Wales" — upper and lower campus). This excludes the
// surrounding suburb, NIDA, and the separate Randwick campus.
const OVERPASS_URL = 'https://overpass-api.de/api/interpreter';
const OVERPASS_QUERY = `
[out:json][timeout:60];
area["amenity"="university"]["name"="University of New South Wales"]->.unsw;
(
  way["building"](area.unsw);
  relation["building"](area.unsw);
);
out body;
>;
out skel qt;
`;

const OUTPUT_URL = new URL('../public/data/unsw-buildings.geojson', import.meta.url);

interface CleanProps {
  id: number;
  name: string;
  building: string;
  osmId: string | null;
}
type BuildingFeature = Feature<Polygon | MultiPolygon, CleanProps>;

async function fetchOverpass(): Promise<unknown> {
  const response = await fetch(OVERPASS_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'User-Agent': 'UNSWhere/1.0 (campus map import script)',
    },
    body: `data=${encodeURIComponent(OVERPASS_QUERY)}`,
  });
  if (!response.ok) {
    throw new Error(`Overpass request failed: ${response.status} ${response.statusText}`);
  }
  return response.json();
}

/** Turn "way/123456" into a stable numeric id for the app's selection logic. */
function numericId(rawId: string | number | undefined): number {
  const digits = String(rawId ?? '').replace(/\D/g, '');
  return digits ? Number(digits) : 0;
}

function clean(geojson: FeatureCollection): FeatureCollection<Polygon | MultiPolygon, CleanProps> {
  const features = geojson.features
    .filter(
      (f): f is Feature<Polygon | MultiPolygon> =>
        f.geometry?.type === 'Polygon' || f.geometry?.type === 'MultiPolygon',
    )
    .map((f): BuildingFeature => {
      const osmId = (f.properties?.['@id'] ?? f.id ?? null) as string | null;
      return {
        type: 'Feature',
        id: numericId(osmId ?? undefined),
        geometry: f.geometry,
        properties: {
          id: numericId(osmId ?? undefined),
          name: f.properties?.name ?? 'Unknown building',
          building: f.properties?.building ?? 'yes',
          osmId: osmId ? String(osmId) : null,
        },
      };
    })
    // Drop anything we couldn't assign a stable id to.
    .filter((f) => f.properties.id !== 0);

  return { type: 'FeatureCollection', features };
}

async function main(): Promise<void> {
  console.log('Fetching UNSW buildings from Overpass...');
  const osmData = await fetchOverpass();

  const raw = osmtogeojson(osmData as never) as FeatureCollection;
  const cleaned = clean(raw);
  console.log(`Kept ${cleaned.features.length} building polygons.`);

  await mkdir(new URL('.', OUTPUT_URL), { recursive: true });
  await writeFile(OUTPUT_URL, JSON.stringify(cleaned));
  console.log(`Wrote ${OUTPUT_URL.pathname}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
