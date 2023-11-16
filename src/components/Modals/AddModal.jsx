import { Modal } from "flowbite-react";
import { useState, useEffect, useRef } from "react";
import AddressForm from "../Forms/AddressForm";
import PaymentMethodForm from "../Forms/PaymentMethodForm";
import Draggable from "react-draggable";

function AddModal({ clearAddModal, data, submitData }) {
  const [openModal, setOpenModal] = useState("dismissible");
  const [form, setForm] = useState(<></>);
  const modalRef = useRef(null);

  const clearModal = () => {
    clearAddModal();
    setOpenModal(undefined);
  };

  const submitForm = (formData) => {
    submitData(formData);
    clearModal();
  };

  const submitBillingAddress = (formData) => {
    submitData(formData);
  };

  useEffect(() => {
    console.log(modalRef.current);
    if (data.type === "payment method")
      setForm(
        <PaymentMethodForm
          payments={data.payments}
          addresses={data.addresses}
          submitNewBilling={(addData) => submitBillingAddress(addData)}
          submitData={(formData) =>
            submitForm({ type: data.type, data: formData })
          }
        />
      );
    if (data.type === "shipping address")
      setForm(
        <AddressForm
          houseRequired
          onSubmit={(formData) =>
            submitForm({ type: data.type, data: formData })
          }
        />
      );
  }, []);

  return (
    <Draggable handle=".form-handle" nodeRef={modalRef}>
      <Modal
        ref={modalRef}
        dismissible
        className="add-modal"
        show={openModal}
        onClose={() => clearModal()}
      >
        <Modal.Header className="form-handle hover:cursor-pointer bg-gray-300 text-center w-full">
          <strong className="text-center">Add new {data.type}.</strong>
        </Modal.Header>
        <Modal.Body className="">{form}</Modal.Body>
      </Modal>
    </Draggable>
  );
}

export default AddModal;
