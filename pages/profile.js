import React from 'react';
import Map from '../components/Map';

function Profile() {
  return (
    <Map zoom={10} center={{ lat: 36, lng: -86 }} mapContainerClassName="map-container" />
  );
}
export default Profile();
