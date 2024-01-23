import { Modal } from "flowbite-react";
import { useState } from "react";

function ErrorModal({ error, clearErrorModal }) {
  const [openModal, setOpenModal] = useState("dismissible");

  const clearModal = () => {
    clearErrorModal();
    setOpenModal(undefined);
  };

  return (
    <Modal
      dismissible
      className="event-modal scale-110"
      show={openModal}
      onClose={() => clearModal()}
    >
      <Modal.Header className="error-modal-header bg-red-600 text-white">
        Error
      </Modal.Header>
      <Modal.Body className="bg-white text-red-400">
        <div>{error.message ? error.message : error}</div>
      </Modal.Body>
    </Modal>
  );
}

export default ErrorModal;
