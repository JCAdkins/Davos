import { Modal } from "flowbite-react";
import { useEffect, useState } from "react";

function SuccessModal({ message, clearSuccessModal }) {
  const [openModal, setOpenModal] = useState("dismissible");

  const clearModal = () => {
    clearSuccessModal();
    setOpenModal(undefined);
  };

  useEffect(() => {
    setTimeout(() => {
      clearModal();
    }, 2000);
  }, []);

  return (
    <>
      <Modal
        dismissible
        className="event-modal"
        show={openModal}
        onClose={() => clearModal()}
      >
        <Modal.Header className="">Success</Modal.Header>
        <Modal.Body className="text-black">
          <div>{message}</div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default SuccessModal;
