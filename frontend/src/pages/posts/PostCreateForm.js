import React, { useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import CustomButton from "../../components/CustomButton";
import styles from "../../styles/PostEventCreateForm.module.css";
import { useHistory } from "react-router-dom";
import LocationPicker from "../../components/LocationPicker";
import FormImageField from "../../components/FormImageField";
import FormTagsField from "../../components/FormTagsField";
import { axiosReq } from "../../api/axiosDefault";
import { useRedirect } from "../../hooks/useRedirect";

const PostCreateForm = () => {
  useRedirect("loggedOut");
  const history = useHistory();

  const [postData, setPostData] = useState({
    title: "",
    content: "",
    location: "",
    tags: [],
    image: null,
  });
  const { title, content, location, tags, image } = postData;

  const handleLocationChange = (newLocation) => {
    setPostData({
      ...postData,
      location: newLocation,
    });
  };
  const handleTagsChange = (newTags) => {
    setPostData({
      ...postData,
      tags: newTags,
    });
  };

  const [errors, setErrors] = useState({});

  const imageInputRef = useRef(null);

  const handleChangeField = (event) => {
    setPostData({
      ...postData,
      [event.target.name]: event.target.value,
    });
  };

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
          aria-label="Title"
        />
      </Form.Group>
      {!title &&
        errors.title?.map((message, idx) => (
          <Alert variant="warning" key={idx}>
            {message}
          </Alert>
        ))}
      <Form.Group controlId="content">
        <Form.Label className="d-none">Text</Form.Label>
        <Form.Control
          aria-label="Text"
          as="textarea"
          placeholder="Text (Optional)"
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
      <FormTagsField handleTagsChange={handleTagsChange} />
      {errors.tags?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
    </>
  );

  const handleChangeImage = (event) => {
    URL.revokeObjectURL(image);
    setPostData({
      ...postData,
      image: URL.createObjectURL(event.target.files[0]),
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
    } catch (error) {}
  };

  const createTags = async (tags) => {
    const userAddedTags = [];

    for (let tag of tags) {
      try {
        // check if the tag already exists
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
      } catch (error) {}
    }

    return userAddedTags;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);

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

      const { data } = await axiosReq.post("/posts/", formData);
      history.push(`/posts/${data.id}`);
    } catch (error) {
      setErrors(error.response.data);
    }
  };

  return (
    <Container className="mt-4">
      <Form onSubmit={handleSubmit}>
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
            <CustomButton variant="Secondary" onClick={() => history.goBack()}>
              Cancel
            </CustomButton>
            <CustomButton variant="Primary" type="submit">
              Create post
            </CustomButton>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default PostCreateForm;
