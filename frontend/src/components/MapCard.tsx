import { useState } from 'react';
import CampusMap from './CampusMap';


interface MapCardProps {
  selectedId: number | null;
  setSelectedId: (id: number | null) => void;
}

function MapCard({ selectedId, setSelectedId }: MapCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'absolute',
        bottom: 16,
        left: 16,
        width: 525,
        height: 375,
        transform: `scale(${hovered ? 1 : 350 / 525})`,
        transformOrigin: 'bottom left',
        transition: 'transform 0.2s ease',
      }}
    >
      <CampusMap selectedId={selectedId} setSelectedId={setSelectedId} />
    </div>
  );
}

export default MapCard;
