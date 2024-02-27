import React, { useEffect, useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import Image from "react-bootstrap/Image";
import FormText from "react-bootstrap/FormText";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import CustomButton from "../../components/CustomButton";
import styles from "../../styles/ProfileEditForm.module.css";
import buttonStyles from "../../styles/CustomButton.module.css";
import appStyles from "../../App.module.css";
import { useHistory, useParams } from "react-router-dom";
import LocationPicker from "../../components/LocationPicker";
import { axiosReq } from "../../api/axiosDefault";
import Asset from "../../components/Asset";
import { useCurrentUser } from "../../context/CurrentUserContext";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

const ProfileEditForm = () => {
  const currentUser = useCurrentUser();
  const history = useHistory();

  const [userData, setUserData] = useState({
    display_name: "",
    bio: "",
    location: "",
    avatar: null,
  });
  const { display_name, bio, location, avatar } = userData;

  const { id } = useParams();
  const [initialPosition, setInitialPosition] = useState(null);
  const [hasLoaded, setHasLoaded] = useState(false);
  const locationTooltip = () => (
    <Tooltip id="button-tooltip">
      <p>Your location will be used to show you relevant content.</p>
      <p>In your profile we won't show your exact location.</p>
    </Tooltip>
  );

  useEffect(() => {
    const fetchUser = async () => {
      if (currentUser?.profile_id?.toString() === id) {
        try {
          const { data } = await axiosReq.get(`/profiles/${id}`);
          const { display_name, bio, location, avatar } = data;

          if (location) {
            const { data: locationDetails } = await axiosReq.get(
              `/locations/${location}`
            );
            setInitialPosition({
              lat: locationDetails.latitude,
              lng: locationDetails.longitude,
            });
          }

          setUserData((prevData) => ({
            ...prevData,
            display_name,
            bio,
            avatar,
          }));

          setHasLoaded(true);
        } catch (error) {
          console.log(error);
          history.push("/");
        }
      } else {
        history.push("/");
      }
    };

    setHasLoaded(false);

    fetchUser();
  }, [currentUser, id, history]);

  const handleLocationChange = (newLocation) => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      location: newLocation,
    }));
  };

  const [errors, setErrors] = useState({});

  const imageInputRef = useRef(null);

  const handleChangeField = (event) => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });
  };

  const textFields = (
    <>
      <Form.Group controlId="display_name">
        <Form.Label className="mb-0">Display name</Form.Label>
        <FormText className="mb-2">
          Set your display name. It won't change your username.
        </FormText>
        <Form.Control
          type="text"
          placeholder="Display name"
          name="display_name"
          value={display_name}
          onChange={handleChangeField}
        />
      </Form.Group>
      {!display_name &&
        errors.display_name?.map((message, idx) => (
          <Alert variant="warning" key={idx}>
            {message}
          </Alert>
        ))}
      <Form.Group controlId="bio">
        <Form.Label className="mb-0">Bio</Form.Label>
        <FormText className="mb-2">Tell something about yourself.</FormText>
        <Form.Control
          as="textarea"
          placeholder="Bio (Optional)"
          name="bio"
          value={bio}
          rows={5}
          onChange={handleChangeField}
        />
      </Form.Group>
      {errors.bio?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
    </>
  );

  const handleChangeImage = (event) => {
    URL.revokeObjectURL(avatar);
    setUserData({
      ...userData,
      avatar: URL.createObjectURL(event.target.files[0]),
    });
  };

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
    formData.append("display_name", display_name);
    formData.append("bio", bio);

    if (imageInputRef?.current?.files[0]) {
      formData.append("avatar", imageInputRef.current.files[0]);
    }

    try {
      if (location) {
        const locationResponse = await createLocation(location);
        formData.append("location", locationResponse.id);
      }

      await axiosReq.put(`/profiles/${id}`, formData);
      history.push(`/profiles/${id}`);
    } catch (error) {
      setErrors(error.response.data);
    }
  };

  return (
    <Container className="mt-4">
      <Form onSubmit={handleSubmit} className={styles.Form}>
        {hasLoaded ? (
          <>
            <h2>Customize your profile</h2>
            <Row className={styles.AvatarLocation__Container}>
              <Col md={6} className={styles.Image__Container}>
                <Form.Group>
                  <figure className={styles.Image__Wrapper}>
                    <Image src={avatar} className={styles.Image} />
                  </figure>
                  <div>
                    <Form.Label
                      htmlFor="image-upload"
                      className={`${buttonStyles.Button} ${buttonStyles.Primary}`}
                    >
                      Change the image
                    </Form.Label>
                  </div>
                  <Form.File
                    ref={imageInputRef}
                    className="d-none"
                    id="image-upload"
                    accept="image/*"
                    onChange={handleChangeImage}
                  />
                </Form.Group>
              </Col>
              <Col md={6} className={styles.Map__Container}>
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
                  <LocationPicker
                    initialPosition={initialPosition}
                    handleLocationChange={handleLocationChange}
                  />
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
            <Row className="align-items-center justify-content-center w-100">
              <Col md={6}>{textFields}</Col>
            </Row>

            <Row className={styles.Buttons__Container}>
              <Col className="my-3">
                <CustomButton
                  variant="Secondary"
                  onClick={() => history.goBack()}
                >
                  Cancel
                </CustomButton>
                <CustomButton variant="Primary" type="submit">
                  Edit profile
                </CustomButton>
              </Col>
            </Row>

            <Row className={styles.AccountSettings__Container}>
              <Col md={6} className="text-center">
                <h3 className="mb-4">Account settings</h3>
                <Row className="align-items-center my-4">
                  <Col>Change username</Col>
                  <Col>
                    <CustomButton>Change</CustomButton>
                  </Col>
                </Row>
                <Row className="align-items-center my-4">
                  <Col>Change password</Col>
                  <Col>
                    <CustomButton>Change</CustomButton>
                  </Col>
                </Row>
              </Col>
            </Row>
          </>
        ) : (
          <Asset spinner />
        )}
      </Form>
    </Container>
  );
};

export default ProfileEditForm;
