import Header from './components/Header/Header';
import MapDiv from './components/MapContainer/MapDiv';
import { withScriptjs } from 'react-google-maps';
import './App.css';

function App() {
  const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
  const googleScript =
    'https://maps.googleapis.com/maps/api/js?key=' +
    API_KEY +
    '&libraries=drawing';
  const MapLoader = withScriptjs(MapDiv);
  return (
    <div className="App">
      <Header />
      <MapLoader
        googleMapURL={googleScript}
        loadingElement={<div style={{ height: `100%` }} />}
      />
    </div>
  );
}

export default App;
