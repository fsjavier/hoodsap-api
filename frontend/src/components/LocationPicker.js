import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import Alert from "react-bootstrap/esm/Alert";

const LocationMarker = ({ setPosition, position }) => {
  const map = useMapEvents({
    click(e) {
      setPosition(e.latlng);
    },
    locationfound(e) {
      map.flyTo(e.latlng, 13);
      setPosition(e.latlng);
    },
    locationerror(error) {
      console.log(error.message);
    },
  });

  useEffect(() => {
    map.locate();
  }, []);

  return position ? <Marker position={position}></Marker> : null;
};

const LocationPicker = () => {
  const [position, setPosition] = useState({ lat: "", lng: "" });
  const { lat, lng } = position;
  const [locationInfo, setLocationInfo] = useState({
    country: "",
    city: "",
    town: "",
    village: "",
    postcode: "",
    locality: "",
    suburb: "",
    city_district: "",
    neighbourhood: "",
  });

  const handleReverseGeocode = async (lat, lng) => {
    try {
      axios.defaults.withCredentials = false;

      const nominatimUrl = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}&addressdetails=1`;
      const response = await axios.get(nominatimUrl);
      const data = response.data;
      setLocationInfo({
        country: data.address.country,
        city: data.address.city,
        town: data.address.town,
        village: data.address.village,
        postcode: data.address.postcode,
        city_district: data.address.city_district,
        suburb: data.address.suburb,
        locality: data.address.locality,
      });

      console.log(data);
    } catch (error) {
      console.error("Error during reverse geocoding", error);
      setLocationInfo(null);
    }
  };

  useEffect(() => {
    lat && lng && handleReverseGeocode(lat, lng);
  }, [position]);

  return (
    <>
      {/* {lat && <p>{`Latitue: ${lat}`}</p>}
      {lng && <p>{`Longitude: ${lng}`}</p>}
      {locationInfo.country && <p>{`Country: ${locationInfo.country}`}</p>}
      {locationInfo.city && <p>{`City: ${locationInfo.city}`}</p>}
      {locationInfo.town && <p>{`Town: ${locationInfo.town}`}</p>}
      {locationInfo.village && <p>{`Village: ${locationInfo.village}`}</p>}
      {locationInfo.postcode && <p>{`Postcode: ${locationInfo.postcode}`}</p>}
      {locationInfo.city_district && (
        <p>{`City District: ${locationInfo.city_district}`}</p>
      )}
      {locationInfo.suburb && <p>{`Suburb: ${locationInfo.suburb}`}</p>}
      {locationInfo.locality && <p>{`Locality: ${locationInfo.locality}`}</p>} */}

      <MapContainer
        center={{ lat: 57, lng: 20 }}
        zoom={3}
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <LocationMarker setPosition={setPosition} position={position} />
      </MapContainer>
    </>
  );
};

export default LocationPicker;
