import { useState } from 'react';
import MapCard from './components/MapCard';
import Button from './components/Button';
import { rounds } from './data/rounds';

function App() {
  const [current, setCurrent] = useState(0);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const round = rounds[current];

  return (
    <>
      <img
        src={round.image}
        alt="Guess the building"
        style={{ width: '100vw', height: '100vh', position: 'absolute' }}
      />
      <MapCard selectedId={selectedId} setSelectedId={setSelectedId} />
      <div style={{ position: 'absolute', bottom: 16, right: 16 }}>
        <Button selectedId={selectedId} answerId={round.answerId}>
          Guess
        </Button>
      </div>
    </>
  );
}

export default App;