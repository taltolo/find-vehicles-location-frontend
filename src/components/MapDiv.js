/*global google*/
import React, { Component } from 'react';
import {
  withGoogleMap,
  GoogleMap,
  Marker,
  Polyline,
  Circle,
  Rectangle,
  Polygon,
} from 'react-google-maps';
import { DrawingManager } from 'react-google-maps/lib/components/drawing/DrawingManager';

class MapDiv extends Component {
  constructor(props) {
    super(props);

    this.state = {
      drawingControlEnabled: true,
      marker: null,
      polyline: null,
      circleRadius: null,
      circleCenter: null,
      rectangle: null,
      polygon: null,
      visible: true,
    };
  }

  overlay = (e) => {
    this.setState({
      drawingControlEnabled: false,
    });
    console.log(e);
    switch (e.type) {
      case 'marker':
        this.setState({
          marker: {
            lat: e.overlay.getPosition().lat(),
            lng: e.overlay.getPosition().lng(),
          },
        });
        break;
      case 'polyline':
        this.setState({
          polyline: e.overlay.getPath(),
        });
        break;
      case 'circle':
        this.setState({
          circleRadius: e.overlay.getRadius(),
          circleCenter: e.overlay.getCenter(),
        });
        break;
      case 'rectangle':
        this.setState({
          rectangle: e.overlay.getBounds(),
        });

        break;
      case 'polygon':
        console.log(e.overlay.getPaths().getArray());
        this.setState({
          polygon: e.overlay.getPaths().getArray(),
        });
        console.log(this.state.polygon);

        break;
    }
  };
  render() {
    const GoogleMapExample = withGoogleMap((props) => (
      <GoogleMap
        defaultCenter={{ lat: 51.4694976807, lng: -0.0493916683 }}
        defaultZoom={10}
      >
        <DrawingManager
          onOverlayComplete={this.overlay}
          defaultOptions={{
            drawingControlOptions: {
              position: window.google.maps.ControlPosition.TOP_CENTER,
              drawingModes: [
                // window.google.maps.drawing.OverlayType.CIRCLE,
                google.maps.drawing.OverlayType.POLYGON,
                // window.google.maps.drawing.OverlayType.POLYLINE,
                // window.google.maps.drawing.OverlayType.RECTANGLE,
              ],
            },
          }}
          //   options={{
          //     drawingControl: this.state.drawingControlEnabled,
          //   }}
        />

        {this.state.marker !== null && <Marker position={this.state.marker} />}

        {this.state.polyline !== null && (
          <Polyline path={this.state.polyline} />
        )}
        {this.state.circleRadius !== null && (
          <Circle
            radius={this.state.circleRadius}
            center={this.state.circleCenter}
            visible={this.state.visible}
          />
        )}

        {this.state.rectangle !== null && (
          <Rectangle bounds={this.state.rectangle} />
        )}
        {this.state.polygon !== null && <Polygon paths={this.state.polygon} />}
      </GoogleMap>
    ));

    return (
      <div>
        <GoogleMapExample
          containerElement={<div style={{ height: `500px`, width: '500px' }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    );
  }
}

export default MapDiv;
