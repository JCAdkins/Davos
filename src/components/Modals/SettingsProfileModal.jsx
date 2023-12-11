import { Modal } from "flowbite-react";
import { useState, useEffect, useRef } from "react";
import AddressForm from "../Forms/AddressForm";
import EducationForm from "../Forms/EducationForm";
import OccupationForm from "../Forms/OccupationForm";
import "../../customcss/CustomCardCss.css";
import Draggable from "react-draggable";

function SettingsProfileModal({ clearSettingsModal, data, submitData, user }) {
  const [openModal, setOpenModal] = useState("dismissible");
  const [form, setForm] = useState(<></>);
  const modalRef = useRef(null);

  const clearModal = () => {
    clearSettingsModal();
    setOpenModal(undefined);
  };

  const submitForm = (formData) => {
    submitData(formData);
    clearSettingsModal();
    setOpenModal(undefined);
  };

  useEffect(() => {
    if (data.type === "address")
      setForm(
        <AddressForm
          onSubmit={(formData) =>
            submitForm({ type: "address", data: formData })
          }
        />
      );
    if (data.type === "education")
      setForm(
        <EducationForm
          currentInfo={user.profile.education}
          onSubmit={(formData) =>
            submitForm({ type: "education", data: formData })
          }
        />
      );
    if (data.type === "work")
      setForm(
        <OccupationForm
          currentInfo={user.profile.occupational}
          onSubmit={(formData) => submitForm({ type: "work", data: formData })}
        />
      );
  }, []);

  return (
    <Draggable handle=".form-handle" nodeRef={modalRef}>
      <Modal
        ref={modalRef}
        dismissible
        className="event-modal"
        show={openModal}
        onClose={() => clearModal()}
      >
        <Modal.Header className="form-handle hover:cursor-pointer bg-gray-200 text-center w-full">
          <strong className="text-center">Edit {data.type}</strong>{" "}
        </Modal.Header>
        <Modal.Body className="">{form}</Modal.Body>
      </Modal>
    </Draggable>
  );
}

export default SettingsProfileModal;
