import React, { Component, useState, useRef, useCallback } from 'react';
import { Map, GoogleApiWrapper, Marker, Polygon } from 'google-maps-react';
import vehicles from '../assets/vehicles-location.json';
class MapContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      vehicles: vehicles,
    };
  }

  displayMarkers = () => {
    console.log(this.state.vehicles[0].location.lat);
    return this.state.vehicles.map((vehicle, index) => {
      return (
        <Marker
          key={index}
          id={index}
          position={{
            lat: vehicle.location.lat,
            lng: vehicle.location.lng,
          }}
          onClick={() => console.log('You clicked me!')}
        />
      );
    });
  };

  render() {
    const mapStyles = {
      width: '100%',
      height: '100%',
    };

    const triangleCoords = [
      { lat: 51.4694976807, lng: -0.0493916683 },
      { lat: 51.600112915, lng: -0.0382433347 },
      { lat: 51.4427490234, lng: 0.0197566673 },
      { lat: 51.4793624878, lng: -0.1798316687 },
    ];

    return (
      <Map
        google={this.props.google}
        zoom={10}
        style={mapStyles}
        initialCenter={{ lat: 51.4694976807, lng: -0.0493916683 }}
      >
        {this.displayMarkers()}
        {/* <Polygon
          paths={triangleCoords}
          strokeColor="#0000FF"
          strokeOpacity={0.8}
          strokeWeight={2}
          fillColor="#0000FF"
          fillOpacity={0.35}
        /> */}
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyA_BwmDUw9--wceNDCYBH2Dr8gjvI7E9aM',
})(MapContainer);
