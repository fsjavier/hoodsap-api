import React, { useRef, useState } from "react";
import Asset from "../../components/Asset";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import CustomButton from "../../components/CustomButton";
import styles from "../../styles/PostCreateForm.module.css";
import ButtonStyles from "../../styles/CustomButton.module.css";
import { useHistory } from "react-router-dom";

const PostCreateForm = () => {
  const history = useHistory();
  const uploadImageSrc =
    "https://res.cloudinary.com/drffvkjy6/image/upload/v1707474874/upload_icon_bdzvjh.webp";
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
    formData.append('title', title)
    formData.append('content', content)
    formData.append('image', imageInputRef.current.files[0])
  };

  return (
    <Container className="mt-4">
      <Form onSubmit={handleSubmit}>
        <Row className={styles.Form}>
          <Col lg={6} className="text-center">
            <Form.Group>
              {image ? (
                <>
                  <figure className={styles.Image__Container}>
                    <Image src={image} className={styles.Image} />
                  </figure>
                  <div>
                    <Form.Label
                      htmlFor="image-upload"
                      className={`${ButtonStyles.Button} ${ButtonStyles.Primary}`}
                    >
                      Change the image
                    </Form.Label>
                  </div>
                </>
              ) : (
                <Form.Label
                  htmlFor="image-upload"
                  className="d-flex justify-content-center"
                >
                  <Asset
                    src={uploadImageSrc}
                    message="Click or tap to upload an image"
                    height={100}
                    width={100}
                  />
                </Form.Label>
              )}
              <Form.File
                ref={imageInputRef}
                className="d-none"
                id="image-upload"
                accept="image/*"
                onChange={handleChangeImage}
              />
            </Form.Group>

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
