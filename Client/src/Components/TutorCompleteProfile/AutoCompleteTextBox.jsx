import React, { useState } from 'react';
import { GoogleMap, useLoadScript, StandaloneSearchBox } from '@react-google-maps/api';


const libraries = ['places'];
const mapContainerStyle = {
  width: '100%',
  height: '400px'
};
const center = {
  lat: 37.7749,
  lng: -122.4194
};

const AutocompleteTextBox = () => {
  const [searchBox, setSearchBox] = useState(null);
  const [places, setPlaces] = useState([]);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyBJzSzjjU1rNZmI2Xp1bHcpzvpGMKEnZ7w",
    libraries
  });

  const onPlacesChanged = () => {
    const newPlaces = searchBox.getPlaces();
    setPlaces(newPlaces);
  };

  const onLoad = (ref) => {
    setSearchBox(ref);
  };

  if (loadError) return 'Error loading maps';
  if (!isLoaded) return 'Loading Maps...';

  return (
    // <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={10}>
     <>
      <StandaloneSearchBox onLoad={onLoad} onPlacesChanged={onPlacesChanged}>
        <input type="text" placeholder="Enter a location" />
      </StandaloneSearchBox>
      <ul>
        {places.map((place) => (
          <li key={place.place_id}>{place.formatted_address}</li>
        ))}
      </ul>
     </>
  );
};

export default AutocompleteTextBox;
