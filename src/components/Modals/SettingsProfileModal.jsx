import { Modal } from "flowbite-react";
import { useState, useEffect } from "react";
import AddressForm from "../Forms/AddressForm";
import EducationForm from "../Forms/EducationForm";
import OccupationForm from "../Forms/OccupationForm";

function SettingsProfileModal({ clearSettingsModal, data, submitData }) {
  const [openModal, setOpenModal] = useState("dismissible");
  const [form, setForm] = useState(<></>);

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
          onSubmit={(formData) =>
            submitForm({ type: "education", data: formData })
          }
        />
      );
    if (data.type === "work")
      setForm(
        <OccupationForm
          onSubmit={(formData) => submitForm({ type: "work", data: formData })}
        />
      );
  }, []);

  return (
    <>
      <Modal
        dismissible
        className="event-modal"
        show={openModal}
        onClose={() => clearModal()}
      >
        <Modal.Header className="text-center">
          <strong className="text-center">Edit {data.type}</strong>{" "}
        </Modal.Header>
        <Modal.Body className="">{form}</Modal.Body>
      </Modal>
    </>
  );
}

export default SettingsProfileModal;
