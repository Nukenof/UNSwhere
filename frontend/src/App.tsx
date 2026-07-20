import Map, { Source, Layer, type LayerProps, type MapLayerMouseEvent } from 'react-map-gl/maplibre';
import type { StyleSpecification } from 'maplibre-gl';
import type { FeatureCollection } from 'geojson';
import 'maplibre-gl/dist/maplibre-gl.css';
import geojson from './data/buildings.json';
import { useState } from 'react';

const BASE_STYLE: StyleSpecification = {
  version: 8,
  sources: {
    basemap: {
      type: 'raster',
      tiles: [
        'https://a.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png',
        'https://b.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png',
        'https://c.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png',
      ],
      tileSize: 256,
      attribution: '© OpenStreetMap contributors © CARTO',
    },
  },
  layers: [{ id: 'basemap', type: 'raster', source: 'basemap' }],
};

const layerStyle: LayerProps = {
  id: 'buildings',
  type: 'fill',
  paint: {
    'fill-color': '#f2c94c',
    'fill-opacity': 0.5,
  },
};

function App() {
  const handleClick = (e: MapLayerMouseEvent) => {
    const feature = e.features?.[0];
    console.log(e.features)
    if (!feature) return; 
    console.log('clicked building:', feature.properties);
  };

  const [hovered, setHovered] = useState(false);

  return (
    <>
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "absolute",
        bottom: 16,
        left: 16,
        width: hovered ? 525 : 350,
        height: hovered ? 375 : 250,
        transition: 'width 0.2s ease, height 0.2s ease',
      }}
    >
        <Map
          initialViewState={{
            longitude: 151.2313,
            latitude: -33.9173,
            zoom: 15
          }}
          style={{ width: '100%', height: '100%' }}
          mapStyle={BASE_STYLE}
          interactiveLayerIds={['buildings']}
          onClick={handleClick}
        >
          <Source id="my-data" type="geojson" data={geojson as FeatureCollection}>
            <Layer {...layerStyle} />
          </Source>
        </Map>
      </div>
      
      </>
  );
}

export default App