import React, { useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CustomButton from "../../components/CustomButton";
import styles from "../../styles/PostCreateForm.module.css";
import { useHistory } from "react-router-dom";
import LocationPicker from "../../components/LocationPicker";
import FormImageField from "../../components/FormImageField";
import FormTagsField from "../../components/FormTagsField";

const PostCreateForm = () => {
  const history = useHistory();

  const [postData, setPostData] = useState({
    title: "",
    content: "",
    location: "",
    tags: [],
    image: null,
  });
  const { title, content, location, tags, image } = postData;
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
        />
      </Form.Group>
      <Form.Group controlId="content">
        <Form.Label className="d-none">Text</Form.Label>
        <Form.Control
          as="textarea"
          placeholder="Text (Optional)"
          name="content"
          value={content}
          rows={5}
          onChange={handleChangeField}
        />
      </Form.Group>
      <FormTagsField/>
    </>
  );

  const handleChangeImage = (event) => {
    URL.revokeObjectURL(image);
    setPostData({
      ...postData,
      image: URL.createObjectURL(event.target.files[0]),
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("image", imageInputRef.current.files[0]);
    // formData.append(location)
    // formData.append(tags)
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
        <Row>
          <Col md={6}>{textFields}</Col>
          <Col md={6}>
            <LocationPicker />
          </Col>
        </Row>
        <Row className="text-align-center">
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
