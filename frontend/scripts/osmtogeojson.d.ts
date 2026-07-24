declare module 'osmtogeojson' {
  import type { FeatureCollection } from 'geojson';
  const osmtogeojson: (data: unknown) => FeatureCollection;
  export default osmtogeojson;
}
