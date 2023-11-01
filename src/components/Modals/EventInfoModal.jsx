import { Modal } from "flowbite-react";
import { useState } from "react";

const getHours = (hour) => {
  if (hour === 0) return "12";
  if (hour > 12) return hour - 12;
  return hour;
};
const today = new Date();

function EventInfoModal({ user, clearEventInfoModal }) {
  const [openModal, setOpenModal] = useState("dismissible");

  const clearModal = () => {
    clearEventInfoModal();
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
        <Modal.Header className=""></Modal.Header>
        <Modal.Body className="text-black">
          {user.name.firstName} {user.name.lastName}
        </Modal.Body>
        <Modal.Footer className=""></Modal.Footer>
      </Modal>
    </>
  );
}

export default EventInfoModal;
