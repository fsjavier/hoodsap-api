import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import CustomButton from "../components/CustomButton";
import styles from "../styles/ProfileEditForm.module.css";
import appStyles from "../App.module.css";
import { useHistory } from "react-router-dom";
import LocationPicker from "../components/LocationPicker";
import { axiosReq } from "../api/axiosDefault";
import { useCurrentUser } from "../context/CurrentUserContext";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { useRedirect } from "../hooks/useRedirect";

const AddProfileLocation = () => {
  useRedirect("loggedOut");
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id;
  const history = useHistory();

  const [location, setLocation] = useState({
    location: "",
  });

  const locationTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      <p>Your chosen location will be used to show you relevant content.</p>
      <p>In your profile we won't show your exact location.</p>
    </Tooltip>
  );

  const handleLocationChange = (newLocation) => {
    setLocation((prevLocation) => ({
      ...prevLocation,
      location: newLocation,
    }));
  };

  const [errors, setErrors] = useState({});

  const createLocation = async (location) => {
    try {
      const locationData = {
        latitude: location.lat,
        longitude: location.lng,
      };
      const response = await axiosReq.post("/locations/", locationData);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    try {
      if (location) {
        const locationResponse = await createLocation(location);
        formData.append("location", locationResponse.id);
      }

      await axiosReq.put(`/profiles/${profile_id}/`, formData);
      history.goBack();
    } catch (error) {
      setErrors(error.response.data);
    }
  };

  return (
    <Container className="mt-4">
      <Form onSubmit={handleSubmit} className={styles.Form}>
        <>
          <h2>Update your prefered location</h2>
          <Row className={styles.AvatarLocation__Container}>
            <Col md={10} className={styles.Map__Container}>
              <Form.Group controlId="location">
                <Form.Label>
                  Select your location
                  <OverlayTrigger
                    placement="right"
                    delay={{ show: 250, hide: 400 }}
                    overlay={locationTooltip}
                  >
                    <InformationCircleIcon className={appStyles.Icon} />
                  </OverlayTrigger>
                </Form.Label>
                <LocationPicker handleLocationChange={handleLocationChange} />
                <Form.Control
                  name="location"
                  value={location}
                  disabled
                  className="d-none"
                />
              </Form.Group>
              {!location &&
                errors.location?.map((message, idx) => (
                  <Alert variant="warning" key={idx}>
                    {message}
                  </Alert>
                ))}
            </Col>
          </Row>

          <Row className={styles.Buttons__Container}>
            <Col className="my-3">
              <CustomButton
                type="button"
                variant="Secondary"
                onClick={() => history.goBack()}
              >
                Cancel
              </CustomButton>
              <CustomButton variant="Primary" type="submit">
                Save location
              </CustomButton>
            </Col>
          </Row>
        </>
      </Form>
    </Container>
  );
};

export default AddProfileLocation;
