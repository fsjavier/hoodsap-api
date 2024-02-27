import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import CustomButton from "./CustomButton";
import { useState } from "react";
import { axiosReq } from "../api/axiosDefault";

function ChangePasswordModal({ showModal, onHide, title, button }) {
  const [userData, setUserData] = useState({
    new_password1: "",
    new_password2: "",
  });
  const { new_password1, new_password2 } = userData;
  const [errors, setErrors] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (event) => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmitPasswordChange = async (event) => {
    event.preventDefault();
    try {
      await axiosReq.post("/dj-rest-auth/password/change/", userData);
      setIsSuccess(true);

      setTimeout(() => {
        onHide();
        setIsSuccess(false);
        setUserData({ new_password1: "", new_password2: "" });
      }, 3000);

      
    } catch (err) {
      console.log(err);
      setErrors(err.response?.data);
    }
  };

  return (
    <Modal
      show={showModal}
      onHide={onHide}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">{title}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmitPasswordChange}>
        <Modal.Body>
          {isSuccess && (
            <Alert variant="success">Password updated successfully</Alert>
          )}
          <Form.Group>
            <Form.Label>New password</Form.Label>
            <Form.Control
              placeholder="new password"
              type="password"
              value={new_password1}
              onChange={handleChange}
              name="new_password1"
            />
          </Form.Group>
          {errors?.new_password1?.map((message, idx) => (
            <Alert key={idx} variant="warning">
              {message}
            </Alert>
          ))}
          <Form.Group>
            <Form.Label>Confirm password</Form.Label>
            <Form.Control
              placeholder="confirm new password"
              type="password"
              value={new_password2}
              onChange={handleChange}
              name="new_password2"
            />
          </Form.Group>
          {errors?.new_password2?.map((message, idx) => (
            <Alert key={idx} variant="warning">
              {message}
            </Alert>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <CustomButton type="button" onClick={onHide} variant="Secondary">
            Close
          </CustomButton>
          <CustomButton type="submit" variant="Primary">
            {button}
          </CustomButton>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default ChangePasswordModal;
