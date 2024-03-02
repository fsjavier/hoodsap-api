import React, { useEffect, useRef, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { useParams, useHistory } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefault";
import CustomButton from "../../components/CustomButton";
import { useRedirect } from "../../hooks/useRedirect";
import LocationPicker from "../../components/LocationPicker";
import FormImageField from "../../components/FormImageField";
import FormTagsField from "../../components/FormTagsField";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "../../styles/PostEventCreateForm.module.css";
import Asset from "../../components/Asset";

const EventEditForm = () => {
  useRedirect("loggedOut");
  const history = useHistory();
  const { id } = useParams();
  const [startDate, setStartDate] = useState(null);
  const [initialPosition, setInitialPosition] = useState(null);
  const [initialTags, setInitialTags] = useState(null);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [errors, setErrors] = useState({});

  const [eventData, setEventData] = useState({
    title: "",
    content: "",
    location: "",
    image: null,
    event_date: null,
    event_category: "",
    indoor_outdoor: "",
    event_registration: false,
    tags: [],
  });
  const {
    title,
    content,
    location,
    image,
    event_date,
    event_category,
    indoor_outdoor,
    event_registration,
    tags,
  } = eventData;

  const handleLocationChange = (newLocation) => {
    setEventData((prevEventData) => ({
      ...prevEventData,
      location: newLocation,
    }));
  };
  const handleTagsChange = (newTags) => {
    setEventData((prevEventData) => ({
      ...prevEventData,
      tags: newTags,
    }));
  };

  const imageInputRef = useRef(null);

  const handleChangeField = (event) => {
    setEventData({
      ...eventData,
      [event.target.name]: event.target.value,
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

  const createTags = async (tags) => {
    const userAddedTags = [];

    for (let tag of tags) {
      try {
        const response = await axiosReq.get(`/tags/?search=${tag}`);

        if (response.data.results && response.data.results.length > 0) {
          const exactMatch = response.data.results.find(
            (foundTag) => foundTag.name === tag
          );

          if (exactMatch) {
            userAddedTags.push(exactMatch);
          } else {
            const response = await axiosReq.post("/tags/", { name: tag });
            userAddedTags.push(response.data);
          }
        } else {
          const response = await axiosReq.post("/tags/", { name: tag });
          userAddedTags.push(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    }

    return userAddedTags;
  };

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axiosReq.get(`/events/${id}`);
        const data = response.data;
        const {
          title,
          content,
          location_data,
          image,
          event_date,
          event_category,
          indoor_outdoor,
          event_registration,
          tags_data,
          is_owner,
        } = data;

        if (!is_owner) {
          history.push("/");
          return;
        }

        setInitialPosition({
          lat: location_data.latitude,
          lng: location_data.longitude,
        });

        if (tags_data.length > 0) {
          const fetchedTags = [];
          for (let tag of tags_data) {
            fetchedTags.push(tag.name);
          }
          setInitialTags(fetchedTags);
        }


        setStartDate(new Date(event_date));
        const formattedDate = new Date(event_date).toISOString();

        setEventData((prevData) => ({
          ...prevData,
          title,
          content,
          image,
          event_date: formattedDate,
          event_category,
          indoor_outdoor,
          event_registration,
        }));

        setHasLoaded(true);
      } catch (error) {
        console.log(error);
      }
    };

    setHasLoaded(false);

    fetchEvent();
  }, [id, history]);

  const textFields = (
    <>
      <Form.Group controlId="title">
        <Form.Label className="d-none">Title</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter title"
          name="title"
          value={title}
          onChange={handleChangeField}
        />
      </Form.Group>
      {!title &&
        errors.title?.map((message, idx) => (
          <Alert variant="warning" key={idx}>
            {message}
          </Alert>
        ))}
      <Form.Group controlId="content">
        <Form.Label className="d-none">Description</Form.Label>
        <Form.Control
          as="textarea"
          placeholder="Description (Optional)"
          name="content"
          value={content}
          rows={5}
          onChange={handleChangeField}
        />
      </Form.Group>
      {errors.content?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      <FormTagsField
        initialTags={initialTags}
        handleTagsChange={handleTagsChange}
      />
      {errors.tags?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
    </>
  );

  const eventDateField = (
    <>
      <Form.Group controlId="event_date">
        <div>
          <Form.Label>Date</Form.Label>
        </div>
        <DatePicker
          timeFormat="HH:mm"
          timeIntervals={15}
          minDate={new Date()}
          selected={startDate}
          placeholderText="Select a date"
          onChange={(date) => {
            const formattedDate = date.toISOString();
            setStartDate(date);
            setEventData({ ...eventData, event_date: formattedDate });
          }}
          showTimeSelect
          dateFormat="MMMM d, yyyy h:mm aa"
          withPortal
        />
      </Form.Group>
      <Row className="d-md-none">
        <Col>
          {errors.event_date?.map((message, idx) => (
            <Alert variant="warning" key={idx}>
              {message}
            </Alert>
          ))}
        </Col>
      </Row>
    </>
  );

  const eventCategoryField = (
    <>
      <Form.Group controlId="event_category">
        <Form.Label>Category</Form.Label>
        <Form.Control
          as="select"
          value={event_category}
          onChange={handleChangeField}
          name="event_category"
        >
          <option value="games">Games</option>
          <option value="movies">Movies</option>
          <option value="street_art">Street art</option>
          <option value="sport">Sport</option>
          <option value="languages">Languages</option>
          <option value="other">Other</option>
        </Form.Control>
      </Form.Group>
      <Row className="d-md-none">
        <Col>
          {errors.event_category?.map((message, idx) => (
            <Alert variant="warning" key={idx}>
              {message}
            </Alert>
          ))}
        </Col>
      </Row>
    </>
  );

  const indoorOutdoorField = (
    <>
      <Form.Group controlId="indoor_outdoor">
        <Form.Label>Indoor / Outdoor</Form.Label>
        <Form.Control
          as="select"
          value={indoor_outdoor}
          onChange={handleChangeField}
          name="indoor_outdoor"
        >
          <option value="indoor">Indoor</option>
          <option value="outdoor">Outdoor</option>
        </Form.Control>
      </Form.Group>
      <Row className="d-md-none">
        <Col>
          {errors.indoor_outdoor?.map((message, idx) => (
            <Alert variant="warning" key={idx}>
              {message}
            </Alert>
          ))}
        </Col>
      </Row>
    </>
  );

  const eventRegistrationField = (
    <>
      <Form.Group controlId="event_registration" className="mb-0">
        <Form.Check
          type="checkbox"
          label="Registration Required?"
          checked={event_registration}
          onChange={(e) =>
            setEventData({
              ...eventData,
              event_registration: e.target.checked,
            })
          }
          name="event_registration"
        />
      </Form.Group>
      <Row className="d-md-none">
        <Col>
          {errors.event_registration?.map((message, idx) => (
            <Alert variant="warning" key={idx}>
              {message}
            </Alert>
          ))}
        </Col>
      </Row>
    </>
  );

  const handleChangeImage = (event) => {
    URL.revokeObjectURL(image);
    setEventData({
      ...eventData,
      image: URL.createObjectURL(event.target.files[0]),
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("event_date", event_date);
    formData.append("event_category", event_category);
    formData.append("indoor_outdoor", indoor_outdoor);
    formData.append("event_registration", event_registration);

    if (imageInputRef.current.files[0]) {
      formData.append("image", imageInputRef.current.files[0]);
    }

    try {
      if (location) {
        const locationResponse = await createLocation(location);
        formData.append("location", locationResponse.id);
      }

      if (tags) {
        const tagsResponse = await createTags(tags);
        tagsResponse.forEach((tag) => formData.append("tags", tag.id));
      }

      const { data } = await axiosReq.put(`/events/${id}`, formData);
      history.push(`/events/${data.id}`);
    } catch (error) {
      setErrors(error.response.data);
    }
  };

  return (
    <Container className="mt-4">
      <Form onSubmit={handleSubmit}>
        {hasLoaded ? (
          <>
            <Row className={styles.Form}>
              <Col lg={6} className="text-center">
                <FormImageField
                  image={image}
                  imageInputRef={imageInputRef}
                  handleChangeImage={handleChangeImage}
                />
              </Col>
            </Row>
            <Row className="align-items-center">
              <Col md={6}>{textFields}</Col>
              <Col md={6}>
                <Form.Group controlId="location">
                  <Form.Label className="d-none">Location</Form.Label>
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
            <Row className="text-center mt-3">
              <Col
                md={4}
                lg={3}
                className="d-flex justify-content-center align-items-center flex-column"
              >
                {eventDateField}
              </Col>
              <Col
                md={3}
                className="d-flex justify-content-center align-items-center flex-column"
              >
                {eventCategoryField}
              </Col>
              <Col
                md={3}
                className="d-flex justify-content-center align-items-center flex-column"
              >
                {indoorOutdoorField}
              </Col>
              <Col
                md={2}
                lg={3}
                className="d-flex justify-content-center align-items-center"
              >
                {eventRegistrationField}
              </Col>
            </Row>

            <Row className="text-center">
              <Col md={4} lg={3} className="d-none d-md-block">
                {errors.event_date?.map((message, idx) => (
                  <Alert variant="warning" key={idx}>
                    {message}
                  </Alert>
                ))}
              </Col>
              <Col md={3} className="d-none d-md-block">
                {errors.event_category?.map((message, idx) => (
                  <Alert variant="warning" key={idx}>
                    {message}
                  </Alert>
                ))}
              </Col>
              <Col md={3} className="d-none d-md-block">
                {" "}
                {errors.indoor_outdoor?.map((message, idx) => (
                  <Alert variant="warning" key={idx}>
                    {message}
                  </Alert>
                ))}
              </Col>
              <Col md={2} lg={3} className="d-none d-md-block">
                {" "}
                {errors.event_registration?.map((message, idx) => (
                  <Alert variant="warning" key={idx}>
                    {message}
                  </Alert>
                ))}
              </Col>
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
                  Save
                </CustomButton>
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

export default EventEditForm;
