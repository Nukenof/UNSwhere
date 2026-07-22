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
      <MapCard/>
    </>
  );
}

export default App;