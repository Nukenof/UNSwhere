import Map, { Source, Layer, type LayerProps, type MapLayerMouseEvent } from 'react-map-gl/maplibre';
import type { StyleSpecification } from 'maplibre-gl';
import type { FeatureCollection } from 'geojson';
import 'maplibre-gl/dist/maplibre-gl.css';
import geojson from '../data/buildings.json';
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

function CampusMap() {
  const [selectedId, setSelectedId] = useState(null);

  const onBuildingClick = (e) => {
    const building = e.features?.[0].properties;
    if (!building) return;
    console.log(building.id);
    if (selectedId == null) {
      setSelectedId(building.id);
    } else {
      setSelectedId(null);
    }
    
  }

  const layerStyle: LayerProps = {
  id: 'buildings',
  type: 'fill',
  paint: {
    'fill-color': [
      'case',
      ['==', ['get', 'id'], selectedId ?? -1],
      '#eb5757',   // selected  (red)
      '#f2c94c',   // default   (yellow)
    ],
    'fill-opacity': 0.5,
  },
};

  return (
    <Map
      initialViewState={{
        longitude: 151.2313,
        latitude: -33.9173,
        zoom: 15,
      }}
      style={{ width: '100%', height: '100%' }}
      mapStyle={BASE_STYLE}
      interactiveLayerIds={['buildings']}
      onClick={onBuildingClick}
    >
      <Source id="my-data" type="geojson" data={geojson as FeatureCollection}>
        <Layer {...layerStyle} />
      </Source>
    </Map>
  );
}

export default CampusMap;
