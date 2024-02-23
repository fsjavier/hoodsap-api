import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { MapContainer, TileLayer, Circle } from "react-leaflet";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefault";
import {
  useProfileData,
  useSetProfileData,
} from "../../context/ProfileDataContext";
import Asset from "../../components/Asset";

const ProfilePage = () => {
  const { id } = useParams();
  const setProfileData = useSetProfileData();
  const { pageProfile } = useProfileData();
  const [profile] = pageProfile.results;
  const [hasLoaded, setHasLoaded] = useState(false);

  const [locationPosition, setLocationPosition] = useState();
  const [locationLocality, setLocationLocality] = useState();
  const fillRedOptions = { fillColor: "red" };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const [{ data: pageProfile }] = await Promise.all([
          axiosReq.get(`/profiles/${id}`),
        ]);

        const { data: locationDetails } = await axiosReq.get(
          `/locations/${pageProfile.location}`
        );

        setProfileData((prevProfileData) => ({
          ...prevProfileData,
          pageProfile: { results: [pageProfile] },
        }));

        setLocationPosition([
          locationDetails.latitude,
          locationDetails.longitude,
        ]);

        console.log(pageProfile);
        setHasLoaded(true);
      } catch (error) {
        console.log(error);
      }
    };

    setLocationPosition(null)
    setHasLoaded(false);
    fetchProfile();
  }, [id, setProfileData]);

  return (
    <Container>
      <Row>
        <Col>
          <h2>Profiles Page</h2>
          {hasLoaded ? profile.owner : <Asset spinner />}
          {hasLoaded && console.log(profile)}
        </Col>

        <Col>
          <Card className="my-2">
            <Card.Body>
              <Card.Text>
                {locationLocality &&
                  `${
                    locationLocality?.city
                  }, ${locationLocality?.country.toUpperCase()}`}
              </Card.Text>
              {locationPosition && (
                <MapContainer
                  center={locationPosition}
                  zoom={13}
                  style={{ height: "300px", width: "100%" }}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Circle
                    center={locationPosition}
                    pathOptions={fillRedOptions}
                    radius={800}
                    stroke={false}
                  />
                </MapContainer>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfilePage;
