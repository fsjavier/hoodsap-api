import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CustomButton from "../../components/CustomButton";
import styles from "../../styles/CommentCreateEditForm.module.css";
import { axiosReq } from "../../api/axiosDefault";
import { useRedirect } from "../../hooks/useRedirect";

const CommentPostEditForm = ({ id, content, setShowEditForm, setComments }) => {
  useRedirect("loggedOut");
  const [formContent, setFormContent] = useState(content);

  const handleChange = (event) => {
    setFormContent(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axiosReq.put(`/post_comments/${id}`, {
        content: formContent,
      });

      setComments((prevComments) => ({
        ...prevComments,
        results: prevComments.results.map((comment) => {
          return comment.id === id
            ? {
                ...comment,
                content: formContent,
                updated_at_naturaltime: "now",
              }
            : comment;
        }),
      }));
      setShowEditForm(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Row>
      <Col xs={12} md={7}>
        <Form.Row className={styles.Form}>
          <Form.Group as={Col} className={styles.Textarea__Container}>
            <Form.Control
              as="textarea"
              rows={2}
              value={formContent}
              onChange={handleChange}
              name="content"
              className={styles.Textarea}
            />
            <div className={styles.Button__Container}>
              <CustomButton onClick={() => setShowEditForm(false)}>
                Cancel
              </CustomButton>
              <CustomButton onClick={handleSubmit} disabled={!content.trim()}>
                Edit
              </CustomButton>
            </div>
          </Form.Group>
        </Form.Row>
      </Col>
    </Row>
  );
};

export default CommentPostEditForm;
