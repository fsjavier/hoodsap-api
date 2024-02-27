import Modal from "react-bootstrap/Modal";
import CustomButton from "./CustomButton";

function ConfirmationModal({ showModal, onHide, title, body, button, handleAction }) {
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
      <Modal.Body>
        <p>{body}</p>
      </Modal.Body>
      <Modal.Footer>
        <CustomButton onClick={onHide} variant="Primary">Close</CustomButton>
        <CustomButton onClick={handleAction} variant="Danger">{button}</CustomButton>
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmationModal;
