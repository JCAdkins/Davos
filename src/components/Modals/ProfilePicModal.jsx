import { Modal } from "flowbite-react";
import FileDropZone from "../Input/FileDropZone";
import { useState } from "react";

export default function ProfilePicModal({ setUser }) {
  const [openModal, setOpenModal] = useState("dismissible");

  const clearModal = (path) => {
    setUser(path);
    setOpenModal(undefined);
  };

  return (
    <>
      <Modal dismissible show={openModal} onClose={() => clearModal()}>
        <Modal.Header>Add Profile Picture</Modal.Header>
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
    </>
  );
}
