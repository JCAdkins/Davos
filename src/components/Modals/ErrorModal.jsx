import { Modal } from "flowbite-react";
import { useState } from "react";

function ErrorModal({ error, clearErrorModal }) {
  const [openModal, setOpenModal] = useState("dismissible");

  const clearModal = () => {
    clearErrorModal();
    setOpenModal(undefined);
  };

  return (
    <>
      <Modal
        dismissible
        className="event-modal"
        show={openModal}
        onClose={() => clearModal()}
      >
        <Modal.Header className="">Error</Modal.Header>
        <Modal.Body className="text-black">
          <div>{error.message}</div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ErrorModal;
