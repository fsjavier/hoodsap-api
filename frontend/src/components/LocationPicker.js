import React, { useEffect, useState } from "react";
import styles from "../styles/LocationPicker.module.css";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import Alert from "react-bootstrap/esm/Alert";

const LocationMarker = ({
  setPosition,
  position,
  setLocationError,
  handleLocationChange,
}) => {
  const map = useMapEvents({
    click(e) {
      setPosition(e.latlng);
      handleLocationChange(e.latlng);
    },
    locationfound(e) {
      map.flyTo(e.latlng, 13);
      setPosition(e.latlng);
      handleLocationChange(e.latlng);
    },
    locationerror(error) {
      setLocationError(error.message);
    },
  });

  useEffect(() => {
    map.locate();
  }, []);

  return position ? <Marker position={position}></Marker> : null;
};

const LocationPicker = ({ initialPosition, handleLocationChange }) => {
  const [position, setPosition] = useState(initialPosition);
  const [locationError, setLocationError] = useState("");

  useEffect(() => {
    if (initialPosition) {
      setPosition(initialPosition);
      handleLocationChange(initialPosition);
    }
  }, [initialPosition]);

  return (
    <>
      {!position &&
      locationError === "Geolocation error: User denied Geolocation." ? (
        <Alert variant="warning">
          Location denied, plase select a location manually
        </Alert>
      ) : null}
      <MapContainer
        className={styles.Map__Container}
        center={{ lat: 53, lng: 14 }}
        zoom={3}
        style={{ height: "300px", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <LocationMarker
          setPosition={setPosition}
          position={position}
          setLocationError={setLocationError}
          locationError={locationError}
          handleLocationChange={handleLocationChange}
        />
      </MapContainer>
    </>
  );
};

export default LocationPicker;
