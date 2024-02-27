import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import CustomButton from "./CustomButton";
import { useState } from "react";
import { axiosReq } from "../api/axiosDefault";
import { useSetCurrentUser } from "../context/CurrentUserContext";

function ChangeUsernameModal({ showModal, onHide, title, button }) {
  const [username, setUsername] = useState("");
  const [errors, setErrors] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);
  const setCurrentUser = useSetCurrentUser();

  const handleSubmitUsernameChange = async (event) => {
    event.preventDefault();
    try {
      await axiosReq.put("/dj-rest-auth/user/", { username });
      setCurrentUser((prevUser) => ({
        ...prevUser,
        username,
      }));

      setIsSuccess(true);

      setTimeout(() => {
        onHide();
        setIsSuccess(false);
        setUsername("");
      }, 3000);
    } catch (err) {
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
      <Form onSubmit={handleSubmitUsernameChange}>
        <Modal.Body>
          {isSuccess && (
            <Alert variant="success">Username updated successfully</Alert>
          )}
          <Form.Group>
            <Form.Label>Change username</Form.Label>
            <Form.Control
              placeholder="username"
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </Form.Group>
          {errors?.username?.map((message, idx) => (
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

export default ChangeUsernameModal;
