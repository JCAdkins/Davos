import { Label, Radio, Select, TextInput } from "flowbite-react";
import { useEffect, useState, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../customcss/CustomCardCss.css";
import InfoIcon from "../Icons/InfoIcon";
import AddressForm from "./AddressForm";
import BackIcon from "../Icons/BackIcon";
import ErrorModal from "../Modals/ErrorModal";
import SuccessModal from "../Modals/SuccessModal";
import validateCard from "../../services/validateCard";

const PaymentMethodForm = ({
  payments,
  addresses,
  submitData,
  //submitNewBilling,
}) => {
  const [date, setDate] = useState();
  const [cardType, setCardType] = useState("Credit");
  const [billingAddress, setBillingAddress] = useState();
  const [billingOptions, setBillingOpptions] = useState();
  const cardNumberRef = useRef(null);
  const billingRef = useRef(null);
  const [addNewAddress, setAddNewAddress] = useState(false);
  const [errorMod, setErrorMod] = useState();
  const [success, setSuccess] = useState();
  const [pAddresses, setPAddresses] = useState(addresses);
  const [validate, setValidate] = useState();
  const [cvvLength, setCvvLength] = useState(3);
  const {
    setValue,
    watch,
    control,
    setError,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitForm = (data) => {
    const addy = billingAddress.props
      ? pAddresses.filter((address) => {
          return (
            billingAddress.props.children[0] == address.address &&
            billingAddress.props.children[2] == address.city &&
            (billingAddress.props.children[4] == address.state_code ||
              billingAddress.props.children[5] == address.state_code) &&
            billingAddress.props.children[7] ==
              address.country_code.toUpperCase() &&
            billingAddress.props.children[9] == address.zip
          );
        })
      : pAddresses.filter((address) => {
          const addr = billingAddress.split(", ");
          return (
            addr[0] == address.address &&
            addr[1] == address.city &&
            addr[2] == address.state_code &&
            addr[3] == address.country_code.toUpperCase() &&
            addr[4] == address.zip
          );
        });

    const formData = {
      company: data.company,
      cvc: data.cvc,
      expiration: date,
      name: data.name,
      number: data.card_number.replace(/\s+/g, ""),
      type: cardType,
      billing_address: addy[0],
    };
    const cardExists = payments.filter(
      (payment) =>
        payment.company == formData.company &&
        payment.cvc == formData.cvc &&
        payment.expiration == formData.expiration &&
        payment.name == formData.name &&
        payment.number == formData.number &&
        payment.type == formData.type &&
        payment.billing_address.address == formData.billing_address.address &&
        payment.billing_address.city == formData.billing_address.city &&
        payment.billing_address.state == formData.billing_address.state &&
        payment.billing_address.country == formData.billing_address.country &&
        payment.billing_address.zip == formData.billing_address.zip &&
        payment.billing_address.coordinates.lat ==
          formData.billing_address.coordinates.lat &&
        payment.billing_address.coordinates.long ==
          formData.billing_address.coordinates.long
    );
    if (cardExists.length > 0) {
      setErrorMod("Payment method already added.");
      return;
    }
    validateCard(formData).then((data) =>
      setValidate({ validation: data, payment: formData })
    );
  };

  const submitNewAddress = (newAddressData) => {
    const addressExists = pAddresses.filter(
      (address) =>
        newAddressData.address === address.address &&
        newAddressData.city === address.city &&
        newAddressData.state === address.state &&
        newAddressData.state_code === address.state_code &&
        newAddressData.country === address.country &&
        newAddressData.country_code === address.country_code &&
        newAddressData.zip === address.zip &&
        newAddressData.coordinates.lat === address.coordinates.lat &&
        newAddressData.coordinates.long === address.coordinates.long
    );

    if (addressExists.length > 0) {
      setErrorMod("Address already saved.");
      setTimeout(() => {
        setErrorMod();
      }, 1000);
      return;
    }
    // ********************************************************************************
    // DO NOT DO THIS WAY: submitNewBilling({ type: "shipping address", data: newAddressData });
    //
    // **** If we submitted a new billing address this way, then the Users db will be updated to reflect the address
    // **** addition, however, the data inside the AddModal <PaymentMethodForm> closure formed when function is mounted
    // **** will not have that data included. So, when form submission with new payment method is done, the user addresses
    // **** will be updated to what's inside the closure and the newly added address will be effectively be removed.
    // ********************************************************************************
    if (billingOptions)
      setBillingOpptions([
        <option>
          {newAddressData.address}, {newAddressData.city},{" "}
          {newAddressData.state_code},{" "}
          {newAddressData.country_code.toUpperCase()}, {newAddressData.zip}
        </option>,
        ...billingOptions,
      ]);
    else
      setBillingOpptions([
        <option>
          {newAddressData.address}, {newAddressData.city},{" "}
          {newAddressData.state_code},{" "}
          {newAddressData.country_code.toUpperCase()}, {newAddressData.zip}
        </option>,
      ]);
    setPAddresses((prevState) => [newAddressData, ...prevState]);
    setBillingAddress(
      <p className="text-black">
        {newAddressData.address}, {newAddressData.city},{" "}
        {newAddressData.state_code}, {newAddressData.country_code.toUpperCase()}
        , {newAddressData.zip}
      </p>
    );
    setValue("billing_address", billingAddress);
    setAddNewAddress(false);
  };

  useEffect(() => {
    if (validate) {
      console.log(validate);
      if (validate.validation.error || !validate.validation.data.isValid) {
        console.log("Data not valid.");
        if (validate.validation.error) {
          validate.validation.error === "429"
            ? setErrorMod(
                "An error occurred on our end. Please contact FAKEEMAIL@fake.com and tell them you received error code: 429."
              )
            : setErrorMod(
                "An error occurred on our end. Please give us a little time to correct the issue then try again."
              );
          return;
        }
        setErrorMod(
          "An error occurred while adding payment method. Re-check that all fields are entered correctly then re-submit."
        );
        return;
      }
      if (
        validate.payment.company.toLowerCase() !=
        validate.validation.data.card.type
      ) {
        console.log("companies don't match.");
        setErrorMod(
          <div className="flex gap-2">
            <div className="underline whitespace-nowrap">Company mismatch:</div>
            <div className="">
              Company provided{" "}
              <span className="italic font-semibold">
                {validate.payment.company}
              </span>{" "}
              does not match expected company{" "}
              <span className="italic font-semibold">
                {validate.validation.data.card.niceType}
              </span>
              .
            </div>
          </div>
        );
        return;
      }
      submitData({ payment: validate.payment, addresses: pAddresses });
    }
  }, [validate]);

  useEffect(() => {
    if (success) setAddNewAddress(false);
  }, [success]);

  useEffect(() => {
    setValue("billing_address", billingAddress);
  }, [billingAddress]);

  const addSpaces = (event) => {
    if (
      event.key === "1" ||
      event.key === "2" ||
      event.key === "3" ||
      event.key === "4" ||
      event.key === "5" ||
      event.key === "6" ||
      event.key === "7" ||
      event.key === "8" ||
      event.key === "9" ||
      event.key === "0"
    ) {
      if (event.target.value.slice(-1) === " ") return;
      if (
        cardNumberRef.current.children[1].children[0].children[0].value.length >
        15
      )
        return;
      if (
        cardNumberRef.current.children[1].children[0].children[0].value.replace(
          /\s+/g,
          ""
        ).length > 0
      ) {
        if (
          cardNumberRef.current.children[1].children[0].children[0].value.replace(
            /\s+/g,
            ""
          ).length %
            4 ===
          0
        )
          cardNumberRef.current.children[1].children[0].children[0].value +=
            " ";
      }
    }
  };

  useEffect(() => {
    setValue("company", "Visa");
    const tempAddr = pAddresses.map((address, ind) => (
      <option key={ind} id={ind}>
        {address.address}, {address.city}, {address.state_code},{" "}
        {address.country_code.toUpperCase()}, {address.zip}
      </option>
    ));
    setBillingAddress(tempAddr.length > 0 ? tempAddr[0] : null);
    setValue("billing_address", billingAddress);
    setBillingOpptions(tempAddr.length > 0 ? tempAddr : null);
  }, []);

  return (
    <>
      {addNewAddress && (
        <div>
          <div
            className="bg-app_accent-900 hover:bg-cyan-700 w-fit rounded-lg p-1 hover:cursor-pointer"
            onClick={() => setAddNewAddress(false)}
          >
            <BackIcon />
          </div>
          <AddressForm onSubmit={(data) => submitNewAddress(data)} />
        </div>
      )}
      {!addNewAddress && (
        <form onSubmit={handleSubmit(submitForm)}>
          <div className="flex flex-col gap-2">
            <div className="bg-white flex grid grid-cols-2 gap-2 text-black">
              <div className="flex flex-col grid-span-1 gap-2">
                <div className="flex flex-col w-full mx-auto">
                  <Label htmlFor="name" value="Name: " />
                  <TextInput
                    id="name"
                    {...register("name", { required: "Name is required." })}
                    placeholder="Name on card"
                  />
                  <p className="text-red-600 text-sm">{errors.name?.message}</p>
                </div>
                <div className="flex gap-2 justify-evenly">
                  <div className="flex flex-col mr-auto">
                    <Label htmlFor="type" value="Type:" />
                    <Select
                      id="type"
                      onChange={(event) => {
                        setCardType(event.target.value);
                      }}
                      value={cardType}
                      required
                    >
                      <option>Credit</option>
                      <option>Debit</option>
                    </Select>
                  </div>
                  <div className="flex flex-col mx-auto">
                    <Label htmlFor="company" value="Company:" />
                    <Controller
                      control={control}
                      name="company"
                      id="company"
                      defaultValue={"Visa"}
                      render={({ field }) => (
                        <fieldset
                          onChange={(event) => {
                            event.target.value === "Amex"
                              ? setCvvLength(4)
                              : setCvvLength(3);
                            field.onChange(event.target.value);
                          }}
                          className="flex gap-2"
                          defaultValue={"Visa"}
                          id="company"
                        >
                          <div className="flex flex-col">
                            <div className="radio-button flex items-center gap-2">
                              <Radio
                                id="visa"
                                name="company"
                                value="Visa"
                                defaultChecked
                              />
                              <Label htmlFor="visa">Visa</Label>
                            </div>
                            <div className="radio-button flex items-center gap-2">
                              <Radio
                                id="mastercard"
                                name="company"
                                value="Mastercard"
                              />
                              <Label htmlFor="mastercard">Mastercard</Label>
                            </div>
                          </div>
                          <div className="flex flex-col">
                            <div className="radio-button flex items-center gap-2">
                              <Radio
                                id="discover"
                                name="company"
                                value="Discover"
                              />
                              <Label htmlFor="discover">Discover</Label>
                            </div>
                            <div className="radio-button flex items-center gap-2">
                              <Radio id="amex" name="company" value="Amex" />
                              <Label htmlFor="amex">Amex</Label>
                            </div>
                          </div>
                        </fieldset>
                      )}
                      {...register("company")}
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col grid-span-1 gap-2">
                <div
                  ref={cardNumberRef}
                  className="flex flex-col w-full mx-auto"
                >
                  <Label htmlFor="card_number" value="Card Number:" />
                  <TextInput
                    id="card_number"
                    maxLength={19}
                    onKeyDown={(event) => addSpaces(event)}
                    placeholder="XXXX XXXX XXXX XXXX"
                    {...register("card_number", {
                      required: "Card number is required.",
                      pattern: {
                        value:
                          /^[0-9]{4} [0-9]{4} [0-9]{4} [0-9]{4}|^[0-9]{16}/,
                        message: "Invalid card number.",
                      },
                    })}
                  />
                  <p className="text-red-600 text-sm">
                    {errors.card_number?.message}
                  </p>
                </div>
                <div className="flex w-full gap-2">
                  <div className="flex flex-col mx-auto">
                    <Label htmlFor="expiration" value="Expiration: " />
                    <Controller
                      control={control}
                      name="expiration"
                      render={({ field }) => (
                        <DatePicker
                          id="expiration"
                          showMonthYearPicker
                          dateFormat="MM/yyyy"
                          selected={date}
                          placeholderText="--/----"
                          onChange={(date) => {
                            setDate(date);
                            field.onChange(date);
                          }}
                          minDate={new Date()}
                        />
                      )}
                      {...register("expiration", {
                        required: "Expiration date is required.",
                      })}
                    />
                    <p className="text-red-600 text-sm">
                      {errors.expiration?.message}
                    </p>
                  </div>
                  <div className="flex flex-col mx-auto">
                    <div className="flex">
                      <Label htmlFor="cvc" value="CVC:" />
                      <InfoIcon />
                    </div>
                    <TextInput
                      maxLength={cvvLength}
                      minLength={cvvLength}
                      id="cvc"
                      placeholder={cvvLength === 3 ? "XXX" : "XXXX"}
                      {...register("cvc", {
                        required: "CVC is required.",
                        pattern: {
                          value: /^[0-9]{3}^[0-9]{4}|$/,
                          message: "Invalid CVC number.",
                        },
                      })}
                    />
                    <p className="text-red-600 text-sm">
                      {errors.cvc?.message}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <div ref={billingRef} className="flex flex-col w-full">
                <Label htmlFor="billing_address" value="Billing Address:" />
                <Controller
                  control={control}
                  name="billing_address"
                  id="billing_address"
                  defaultValue={billingAddress}
                  render={({ field }) => (
                    <Select
                      id="billing_address"
                      onChange={(event) => {
                        field.onChange(event.target.value);
                        setBillingAddress(event.target.value);
                      }}
                      value={billingAddress}
                    >
                      {billingOptions}
                    </Select>
                  )}
                  {...register("billing_address", {
                    required: "Billing address is required.",
                  })}
                />
                <p className="text-red-600 text-sm">
                  {errors.billing_address?.message}
                </p>
              </div>
              <div className="flex flex-col w-1/3">
                <div className="h-[20px] invisible">
                  <Label htmlFor="new_address" value="New Billing Address" />
                </div>
                <button
                  type="button"
                  className="w-full h-full bg-app_accent-900 hover:bg-cyan-700 rounded-lg px-2 text-white"
                  onClick={() => setAddNewAddress(true)}
                >
                  Add
                </button>
                <p className="invisible text-red-600 text-sm">
                  {errors.billing_address?.message.slice(0, 1)}
                </p>
              </div>
            </div>
            <div className="flex w-full justify-end mt-4">
              <button
                className="w-full bg-app_accent-900 hover:bg-cyan-700 rounded-lg h-auto px-2 py-1 text-lg text-white"
                onClick={handleSubmit(submitForm)}
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      )}{" "}
      <div className="scale-90">
        {errorMod && (
          <ErrorModal
            error={{ message: errorMod }}
            clearErrorModal={() => setErrorMod()}
          />
        )}
      </div>
      {success && (
        <SuccessModal
          message={success}
          clearSuccessModal={() => setSuccess()}
        />
      )}
    </>
  );
};

export default PaymentMethodForm;
