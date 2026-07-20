import sebLowerGround from './assets/SEBLowerGround.jpg';
import MapCard from './components/MapCard';

function App() {
  return (
    <>
      <img
        src={sebLowerGround}
        alt="SEB Lower Ground"
        style={{ width: '100vw', height: '100vh', position: 'absolute' }}
      />
      <MapCard
        onBuildingClick={(properties) => {
          if (!properties) return;
          console.log('clicked building ', properties);
        }}
      />
    </>
  );
}

export default App;