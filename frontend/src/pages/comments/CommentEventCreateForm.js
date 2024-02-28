import React, { useState } from "react";
import Avatar from "../../components/Avatar";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import CustomButton from "../../components/CustomButton";
import styles from "../../styles/CommentCreateEditForm.module.css";
import { axiosReq } from "../../api/axiosDefault";
import { useRedirect } from "../../hooks/useRedirect";

const CommentEventCreateForm = ({
  profile_id,
  profile_image,
  socialEvent,
  setSocialEvent,
  setComments,
}) => {
  useRedirect("loggedOut");
  const [content, setContent] = useState("");

  const handleChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await axiosReq.post("/event_comments/", {
        content: content,
        social_event: socialEvent,
      });

      setSocialEvent((prevEvent) => ({
        results: [
          {
            ...prevEvent.results[0],
            comments_count: prevEvent.results[0].comments_count + 1,
          },
        ],
      }));

      setComments((prevComments) => ({
        ...prevComments,
        results: [data, ...prevComments.results],
      }));
    } catch (error) {
      console.log(error);
    }

    setContent("");
  };

  return (
    <Row>
      <Col xs={12} md={7}>
        <Form.Row className={styles.Form}>
          <Form.Group as={Col} className={styles.Avatar__Container}>
            <Link to={`/profile/${profile_id}`}>
              <Avatar src={profile_image} />
            </Link>
          </Form.Group>
          <Form.Group as={Col} className={styles.Textarea__Container}>
            <Form.Control
              as="textarea"
              rows={2}
              value={content}
              onChange={handleChange}
              name="content"
              placeholder="Add a comment"
              className={styles.Textarea}
            />
            <div className={styles.Button__Container}>
              <CustomButton onClick={handleSubmit} disabled={!content.trim()}>
                Comment
              </CustomButton>
            </div>
          </Form.Group>
        </Form.Row>
      </Col>
    </Row>
  );
};

export default CommentEventCreateForm;
