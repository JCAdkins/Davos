import Xicon from "../Xicon";
import { useState, useEffect, useRef } from "react";
import AddressForm from "../Forms/AddressForm";
import EducationForm from "../Forms/EducationForm";
import OccupationForm from "../Forms/OccupationForm";
import "../../customcss/CustomCardCss.css";
import Draggable from "react-draggable";

function EditSettingsInput({ clearSettingsModal, data, submitData }) {
  const [openModal, setOpenModal] = useState("dismissible");
  const [form, setForm] = useState(<></>);
  const modalRef = useState(null);

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
    <Draggable
      handle=".form-handle"
      onDrag={(e) => console.log(e)}
      nodeRef={modalRef}
    >
      <div ref={modalRef}>
        <div className="form-handle hover:cursor-pointer bg-gray-200 text-center w-full">
          <p>
            <strong className="text-center">Edit {data.type}</strong>
          </p>
          <Xicon />
        </div>
        <div className="">{form}</div>
      </div>
    </Draggable>
  );
}

export default EditSettingsInput;
