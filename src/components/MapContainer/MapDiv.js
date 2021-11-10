/*global google*/
import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Marker, Polygon } from 'react-google-maps';
import { DrawingManager } from 'react-google-maps/lib/components/drawing/DrawingManager';
import pointInPolygon from 'point-in-polygon';
import List from '../ListCard/List';
import './MapDiv.css';

class MapDiv extends Component {
  constructor(props) {
    super(props);
    this.googleMap = React.createRef();
    this.state = {
      vehicles: '',
      vehicles_data: '',
      drawingControlEnabled: true,
      polygon: null,
      insidePolygon: [],
      zoom: 10,
      center: {
        latitude: 51.5142089,
        longitude: -0.1275862,
      },
    };
  }

  componentDidMount() {
    if (!this.state.vehicles) this.vehicles_location_list();
    if (this.state.insidePolygon.length !== 0)
      this.displayMarkers(this.state.insidePolygon);
  }

  //After drawing the polygon fetching the coordinates
  overlay = (e) => {
    this.setState({
      drawingControlEnabled: false,
    });
    this.setState({
      polygon: e.overlay.getPaths().getArray(),
    });
    this.isInsaidPolygon();
  };

  //Fetch all vehicles location from the backend
  async vehicles_location_list() {
    try {
      const response = await fetch('http://localhost:3000/vehicles');
      if (response) {
        const data = await response.json();
        this.setState({ vehicles: data });
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  //Fetch the data of the vehicles in the polygon
  async vehicles_list_in_polygon() {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ location: this.state.insidePolygon }),
    };
    try {
      const response = await fetch(
        'http://localhost:3000/vehicles',
        requestOptions
      );
      if (response) {
        const data = await response.json();
        this.setState({ vehicles_data: data });
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  //Check which vehicle loction in in the polygon
  isInsaidPolygon = () => {
    let inPoloygon = [];
    let polygoncoord = this.buildPolygonCoord();
    this.state.vehicles.map((vehicle, index) => {
      let pair = this.buildPoint(index);
      var isInPolo = pointInPolygon(pair, polygoncoord);
      if (isInPolo) {
        inPoloygon.push(vehicle);
      }
    });
    this.setState({ insidePolygon: inPoloygon });
    this.vehicles_list_in_polygon();
  };

  buildPoint = (i) => {
    let lat = this.state.vehicles[i].lat;
    let lng = this.state.vehicles[i].lng;
    return [lat, lng];
  };

  buildPolygonCoord = () => {
    let polygoncoord = [];
    for (let i = 0; i < this.state.polygon[0].td.length; i++) {
      let lat = this.state.polygon[0].td[i].lat();
      let lng = this.state.polygon[0].td[i].lng();
      polygoncoord.push([lat, lng]);
    }
    return polygoncoord;
  };

  displayMarkers = (vehicles) => {
    return vehicles.map((vehicle, index) => {
      return (
        <Marker
          key={index}
          id={index}
          position={{
            lat: vehicle.lat,
            lng: vehicle.lng,
          }}
        />
      );
    });
  };

  // Updata and save the center
  onIdle = () => {
    const center = this.state.center;
    const newCenter = this.googleMap.current.getCenter();
    const centerLng = newCenter.lng();
    const centerLat = newCenter.lat();
    if (center.latitude !== centerLat || center.longitude !== centerLng) {
      this.setState({
        center: {
          latitude: centerLat,
          longitude: centerLng,
        },
      });
    }
  };

  onZoomChanged = () => {
    const newCenter = this.googleMap.current.getCenter();
    this.setState({
      zoom: this.googleMap.current.getZoom(),
      center: {
        latitude: newCenter.lat(),
        longitude: newCenter.lng(),
      },
    });
  };
  render() {
    const GoogleMapContainer = withGoogleMap((props) => (
      <GoogleMap
        defaultCenter={{
          lat: this.state.center.latitude,
          lng: this.state.center.longitude,
        }}
        onIdle={this.onIdle}
        zoom={this.state.zoom}
        ref={this.googleMap}
        onZoomChanged={this.onZoomChanged}
        defaultOptions={{
          mapTypeControl: true,
          mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
            mapTypeIds: ['roadmap', 'terrain'],
          },

          streetViewControl: false,
        }}
      >
        {this.state.vehicles.length > 0
          ? this.displayMarkers(this.state.insidePolygon)
          : null}
        <DrawingManager
          onOverlayComplete={this.overlay}
          defaultOptions={{
            drawingControlOptions: {
              position: window.google.maps.ControlPosition.TOP_CENTER,
              drawingModes: [google.maps.drawing.OverlayType.POLYGON],
            },
          }}
        />

        {this.state.polygon !== null && <Polygon paths={this.state.polygon} />}
      </GoogleMap>
    ));

    return (
      <div>
        <GoogleMapContainer
          containerElement={<div className="div_map" />}
          mapElement={<div style={{ height: `100%` }} />}
        />
        {this.state.vehicles_data.length !== 0 ? (
          <List data={this.state.vehicles_data} />
        ) : (
          <div className="divP">
            <p className="pData">
              Draw a polygon on the map to see the vehicles locations
            </p>
          </div>
        )}
      </div>
    );
  }
}

export default MapDiv;
