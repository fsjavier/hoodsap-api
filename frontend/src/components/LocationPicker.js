import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import Alert from "react-bootstrap/esm/Alert";

const LocationMarker = ({
  setPosition,
  position,
  setLocationError,
  setLocationInput,
}) => {
  const map = useMapEvents({
    click(e) {
      setPosition(e.latlng);
      setLocationInput(e.latlng);
    },
    locationfound(e) {
      map.flyTo(e.latlng, 13);
      setPosition(e.latlng);
      setLocationInput(e.latlng);
    },
    locationerror(error) {
      setLocationError(error.message);
      console.log(error.message);
    },
  });

  useEffect(() => {
    map.locate();
  }, []);

  return position ? <Marker position={position}></Marker> : null;
};

const LocationPicker = ({ setLocationInput }) => {
  const [position, setPosition] = useState(null);
  const [locationError, setLocationError] = useState("");

  return (
    <>
      {!position &&
      locationError === "Geolocation error: User denied Geolocation." ? (
        <Alert variant="warning">
          Location denied, plase select a location manually
        </Alert>
      ) : null}
      <MapContainer
        center={{ lat: 53, lng: 14 }}
        zoom={3}
        style={{ height: "300px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <LocationMarker
          setPosition={setPosition}
          position={position}
          setLocationError={setLocationError}
          locationError={locationError}
          setLocationInput={setLocationInput}
        />
      </MapContainer>
    </>
  );
};

export default LocationPicker;
