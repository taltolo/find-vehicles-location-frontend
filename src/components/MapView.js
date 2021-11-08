import React, { useState, useRef, useCallback } from 'react';
import {
  LoadScript,
  GoogleMap,
  Polygon,
  DrawingManager,
} from '@react-google-maps/api';
import DrawingManagerWrapper from './Map';
import './styles.css';

function MapView() {
  // const map = (
  //   <GoogleMap
  //     defaultZoom={12}
  //     defaultCenter={new window.google.maps.LatLng(51.509865, -0.118092)}
  //   />
  // );

  // const drawingManager = new window.google.maps.drawing.DrawingManager({
  //   drawingMode: window.google.maps.drawing.OverlayType.MARKER,
  //   drawingControl: true,

  //   drawingControlOptions: {
  //     position: window.google.maps.ControlPosition.TOP_CENTER,
  //     drawingModes: [
  //       window.google.maps.drawing.OverlayType.MARKER,
  //       window.google.maps.drawing.OverlayType.POLYGON,
  //     ],
  //   },
  //   polygonOptions: { editable: true },
  // });
  // drawingManager.setMap(map);

  // window.google.maps.event.addListener(
  //   drawingManager,
  //   'polygoncomplete',
  //   function (polygon) {
  //     let polygonCoordsArray = [];
  //     let coords = polygon.getPath().getArray();

  //     for (let i = 0; i < coords.length; i++) {
  //       // console.log(coords[i].lat() + "," + coords[i].lng());
  //       polygonCoordsArray.push(coords[i].lat() + ',' + coords[i].lng());
  //     }
  //     console.log(polygonCoordsArray);
  //   }
  // );

  // Store Polygon path in state
  const [path, setPath] = useState([
    { lat: 52.52549080781086, lng: 13.398118538856465 },
    { lat: 52.48578559055679, lng: 13.36653284549709 },
    { lat: 52.48871246221608, lng: 13.44618372440334 },
  ]);

  // Define refs for Polygon instance and listeners
  const polygonRef = useRef(null);
  const listenersRef = useRef([]);

  // Call setPath with new edited path
  const onEdit = useCallback(() => {
    if (polygonRef.current) {
      const nextPath = polygonRef.current
        .getPath()
        .getArray()
        .map((latLng) => {
          return { lat: latLng.lat(), lng: latLng.lng() };
        });
      setPath(nextPath);
    }
  }, [setPath]);

  // Bind refs to current Polygon and listeners
  const onLoad = useCallback(
    (polygon) => {
      polygonRef.current = polygon;
      const path = polygon.getPath();
      listenersRef.current.push(
        path.addListener('set_at', onEdit),
        path.addListener('insert_at', onEdit),
        path.addListener('remove_at', onEdit)
      );
    },
    [onEdit]
  );

  // Clean up refs
  const onUnmount = useCallback(() => {
    listenersRef.current.forEach((lis) => lis.remove());
    polygonRef.current = null;
  }, []);

  console.log('The path state is', path);

  return (
    <div className="App">
      <LoadScript
        id="script-loader"
        googleMapsApiKey="AIzaSyA_BwmDUw9--wceNDCYBH2Dr8gjvI7E9aM"
        language="en"
        region="us"
      >
        {/* <GoogleMap
          // mapContainerClassName="App-map"
          // center={{ lat: 52.52047739093263, lng: 13.36653284549709 }}
          // zoom={12}
          // version="weekly"
          // on
        > */}
        {/* <drawingManager /> */}
        <DrawingManagerWrapper />
        {/* </GoogleMap> */}
      </LoadScript>
    </div>
  );
}

export default MapView;
