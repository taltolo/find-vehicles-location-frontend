import logo from './logo.svg';
import MapContainer from './components/MapContainer';
import MapView from './components/MapView';
import Map from './components/Map';
import MapDiv from './components/MapDiv';
import { withScriptjs } from 'react-google-maps';
import './App.css';

function App() {
  const MapLoader = withScriptjs(MapDiv);
  return (
    <div className="App">
      <MapLoader
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyA_BwmDUw9--wceNDCYBH2Dr8gjvI7E9aM&libraries=drawing"
        loadingElement={<div style={{ height: `100%` }} />}
      />
    </div>
  );
}

export default App;
