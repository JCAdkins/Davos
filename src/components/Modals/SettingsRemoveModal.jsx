import { Modal } from "flowbite-react";
import { useState } from "react";

const SettingsRemoveModal = ({ data, removeItem, clearRemoveModal }) => {
  const [openModal, setOpenModal] = useState("dismissible");

  const clearModal = () => {
    clearRemoveModal();
    setOpenModal(undefined);
  };

  const remove = () => {
    removeItem({ type: data.type, data: data.data });
    clearModal();
  };

  return (
    <>
      <Modal
        dismissible
        className="event-modal"
        show={openModal}
        onClose={() => clearModal()}
      >
        <Modal.Header className="">Remove {data.type}?</Modal.Header>
        <Modal.Body className="text-black">
          <div>Are you sure you want to remove {data.message}</div>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="bg-app_accent-900 ml-auto hover:bg-cyan-700 w-auto rounded-full px-2 text-white"
            onClick={clearModal}
          >
            Cancel
          </button>
          <button
            className="bg-app_accent-900 ml-auto hover:bg-cyan-700 w-auto rounded-full px-2 text-white"
            onClick={remove}
          >
            Remove
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SettingsRemoveModal;
