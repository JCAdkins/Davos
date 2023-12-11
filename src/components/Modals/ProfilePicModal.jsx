import { Modal } from "flowbite-react";
import FileDropZone from "../Input/FileDropZone";
import { useState, useRef } from "react";
import Draggable from "react-draggable";

export default function ProfilePicModal({ setUser }) {
  const [openModal, setOpenModal] = useState("dismissible");
  const modalRef = useRef();

  const clearModal = (path) => {
    setUser(path);
    setOpenModal(undefined);
  };

  return (
    <Draggable handle=".modal-handle" nodeRef={modalRef}>
      <Modal
        ref={modalRef}
        dismissible
        show={openModal}
        onClose={() => clearModal()}
      >
        <Modal.Header className="modal-handle bg-gray-300 hover:cursor-pointer">
          Add Profile Picture
        </Modal.Header>
        <Modal.Body>
          <FileDropZone
            fileType={[
              "image/svg",
              "image/jpg",
              "image/jpeg",
              "image/png",
              "image/gif",
              "image/webp",
            ]}
            clearModal={clearModal}
            setUser={setUser}
          ></FileDropZone>
        </Modal.Body>
      </Modal>
    </Draggable>
  );
}
