/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { useRouter } from 'next/router';

const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

const containerStyle = {
  width: '100%',
  height: '400px',
};

const center = {
  lat: 36.2562002,
  lng: -86.7143516,
};

function Map({ onLocationSelect, posts }) {
  const { isLoaded } = useJsApiLoader({
    id: process.env.NEXT_PUBLIC_GOOGLE_MAP_ID,
    googleMapsApiKey: apiKey,
  });

  const [map, setMap] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(center);
  const router = useRouter();

  const onLoad = useCallback((map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback((map) => {
    setMap(null);
  }, []);

  const handleMapClick = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    const location = { lat, lng };
    setSelectedLocation(location);
    if (onLocationSelect) {
      onLocationSelect(location);
    }
  };
  const handleMarkerClick = (postId) => {
    router.push(`/post/${postId}`);
  };

  return isLoaded ? (
    <GoogleMap
      mapContainerClassName="map-container"
      mapContainerStyle={containerStyle}
      center={selectedLocation}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
      onClick={onLocationSelect ? handleMapClick : undefined}
      options={{ disableDefaultUI: true, hover: false, selected: false }}
      className="map"
    >
      {onLocationSelect && (
        <Marker
          position={selectedLocation}
          draggable
        />
      )}
      {posts && posts.map((post) => (
        <Marker
          key={post.id}
          position={{ lat: post.latitude, lng: post.longitude }}
          title={post.description}
          onClick={() => handleMarkerClick(post.id)}
          icon={{
            url: post.image,
            scaledSize: new window.google.maps.Size(50, 50),
          }}

        />
      ))}
    </GoogleMap>
  ) : <></>;
}

Map.propTypes = {
  onLocationSelect: PropTypes.func,
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      latitude: PropTypes.number,
      longitude: PropTypes.number,
      image: PropTypes.string,
      description: PropTypes.string,
    }),
  ),
};

Map.defaultProps = {
  onLocationSelect: null,
  posts: null,
};

export default Map;
