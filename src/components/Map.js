import React from 'react';
import './styles.css';
import { compose, withProps } from 'recompose';
import { withScriptjs, withGoogleMap, GoogleMap } from 'react-google-maps';
const center = {
  lat: 48.866667,
  lng: 2.333333,
};
function getPaths(polygon) {
  var polygonBounds = polygon.getPath();
  var bounds = [];
  for (var i = 0; i < polygonBounds.length; i++) {
    var point = {
      lat: polygonBounds.getAt(i).lat(),
      lng: polygonBounds.getAt(i).lng(),
    };
    bounds.push(point);
  }
  console.log(bounds);
}

const {
  DrawingManager,
} = require('react-google-maps/lib/components/drawing/DrawingManager');

const DrawingManagerWrapper = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=AIzaSyA_BwmDUw9--wceNDCYBH2Dr8gjvI7E9aM&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) => (
  <GoogleMap
    defaultZoom={12}
    defaultCenter={new window.google.maps.LatLng(51.509865, -0.118092)}
  >
    <DrawingManager
      setMap={GoogleMap}
      overlaycomplete={props.onComplete}
      defaultDrawingMode={window.google.maps.drawing.OverlayType}
      drawingMode={'polygon'}
      onPolygonComplete={(value) => console.log(getPaths(value))}
      defaultOptions={{
        drawingControl: true,
        drawingControlOptions: {
          style: window.google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
          position: window.google.maps.ControlPosition.TOP_CENTER,
          drawingModes: [window.google.maps.drawing.OverlayType.POLYGON],
        },
        polygonOptions: {
          fillColor: '#199ee0',
          fillOpacity: 0.2,
          strokeWeight: 2,
          strokeColor: '#113460',
          clickable: true,
          editable: true,
          geodesic: false,
          visible: true,
          zIndex: 1,
        },
      }}
    />
  </GoogleMap>
));

export default DrawingManagerWrapper;
