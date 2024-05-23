/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
import React from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

const apiKey = 'AIzaSyB0JVSJZnON4cflS83KpNDum6PzQvBL35c';

const containerStyle = {
  width: '400px',
  height: '400px',
};

const center = {
  lat: 36.2562002,
  lng: -86.7143516,
};

export default function Map() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey,
  });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback((map) => {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = React.useCallback((map) => {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      { /* Child components, such as markers, info windows, etc. */ }
      <></>
    </GoogleMap>
  ) : <></>;
}
