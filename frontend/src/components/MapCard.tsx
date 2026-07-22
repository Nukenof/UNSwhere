import { useState } from 'react';
import CampusMap from './CampusMap';


function MapCard() {
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
      <CampusMap/>
    </div>
  );
}

export default MapCard;
