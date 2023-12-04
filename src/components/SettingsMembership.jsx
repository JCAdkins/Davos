import PlusIcon from "./Icons/PlusIcon";
import SettingsRemoveModal from "./Modals/SettingsRemoveModal";
import { useEffect, useState, useContext } from "react";
import { auth } from "../utils/firebase";
import updateUser from "../services/updateUser";
import UserContext from "../contexts/UserContext";
import SuccessModal from "./Modals/SuccessModal";
import AddModal from "./Modals/AddModal";
import { Timestamp } from "firebase/firestore";

const formatDate = (date) => {
  let dateObj = date.toDate();
  let month = dateObj.getUTCMonth() + 1; //months from 1-12
  let day = dateObj.getUTCDate();
  let year = dateObj.getUTCFullYear();

  return (
    String(month).padStart(2, "0") +
    "/" +
    String(day).padStart(2, "0") +
    "/" +
    year
  );
};

const tierBenefit =
  "As a Davos Gold Member you pay reduced price per month, you can attend events at no cost, and you get a 10% discount on Davos merchandise. You can also listen to podcasts commercial free.";

const SettingsMembership = () => {
  const [itemToRemove, setItemToRemove] = useState();
  const [paymentMethods, setPaymentMethods] = useState();
  const [shippingAddresses, setShippingAddresses] = useState();
  const [successModal, setSuccessModal] = useState();
  const { user, setUser } = useContext(UserContext);
  const [addData, setAddData] = useState();

  useEffect(() => {
    setPaymentMethods(mapPaymentMethods(user.membership.cards));
    setShippingAddresses(mapShipAddresses(user.membership.shipping));
  }, []);

  const mapShipAddresses = (list) => {
    return list.map((address, ind) => {
      return (
        <div
          key={ind}
          className="bg-white border-b border-black drop-shadow-[0_1.2px_1.2px_rgba(135,135,135)] text-sm rounded-lg p-2 leading-none"
        >
          <p>
            Street:{" "}
            <span className="text-app_accent-700">{address.address}</span>
          </p>
          <div className="flex gap-2">
            <p>
              State:{" "}
              <span className="text-app_accent-700">{address.state_code}</span>
            </p>

            <p>
              Country:{" "}
              <span className="text-app_accent-700">
                {address.country_code.toUpperCase()}
              </span>
            </p>
            <p>
              Zip: <span className="text-app_accent-700">{address.zip}</span>
            </p>

            <button
              className="bg-app_accent-900 ml-auto hover:bg-cyan-700 h-18 w-auto rounded-full px-2 text-sm text-white"
              onClick={() => removeShipping(address)}
            >
              Remove
            </button>
          </div>
        </div>
      );
    });
  };

  const mapPaymentMethods = (list) => {
    return list.map((card, ind) => (
      <div
        key={ind}
        className="bg-white border-b border-black drop-shadow-[0_1.2px_1.2px_rgba(135,135,135)] text-sm rounded-lg p-2 leading-none"
      >
        <div>
          <p>
            Name: <span className="text-app_accent-700">{card.name}</span>
          </p>
          <p>
            Type: <span className="text-app_accent-700">{card.company}</span>
          </p>
        </div>
        <div className="flex gap-2">
          <p>
            Number:{" "}
            <span className="text-app_accent-700">
              ****{card.number.slice(-4)}
            </span>
          </p>
          <p>
            Exp:{" "}
            <span className="text-app_accent-700">
              {card.expiration instanceof Timestamp ? (
                <>
                  {card.expiration.toDate().getMonth() +
                    1 +
                    "/" +
                    card.expiration.toDate().getUTCFullYear()}
                </>
              ) : (
                <>
                  {card.expiration.getMonth() +
                    1 +
                    "/" +
                    card.expiration.getUTCFullYear()}
                </>
              )}
            </span>
          </p>
          <button
            className="bg-app_accent-900 ml-auto hover:bg-cyan-700 h-18 w-auto rounded-full px-2 text-sm text-white"
            onClick={() => removePayment(card)}
          >
            Remove
          </button>
        </div>
      </div>
    ));
  };

  const addItem = (saveData) => {
    updateUser(auth.currentUser.uid, {
      membership: {
        ...user.membership,
        cards:
          saveData.type == "payment method"
            ? [...user.membership.cards, saveData.data.payment]
            : [...user.membership.cards],
        shipping:
          saveData.type == "shipping address"
            ? [saveData.data, ...user.membership.shipping]
            : [...saveData.data.addresses],
      },
    });
    setUser({
      ...user,
      membership: {
        ...user.membership,
        cards:
          saveData.type == "payment method"
            ? [...user.membership.cards, saveData.data.payment]
            : [...user.membership.cards],
        shipping:
          saveData.type == "shipping address"
            ? [saveData.data, ...user.membership.shipping]
            : [...saveData.data.addresses],
      },
    });

    if (saveData.type == "shipping address")
      setShippingAddresses((prevState) => [
        <div className="bg-white border-b border-black drop-shadow-[0_1.2px_1.2px_rgba(135,135,135)] text-sm rounded-lg p-2 leading-none">
          <p>
            Street:{" "}
            <span className="text-app_accent-700">{saveData.data.address}</span>
          </p>
          <div className="flex gap-2">
            <p>
              State:{" "}
              <span className="text-app_accent-700">
                {saveData.data.state_code}
              </span>
            </p>

            <p>
              Country:{" "}
              <span className="text-app_accent-700">
                {saveData.data.country_code.toUpperCase()}
              </span>
            </p>
            <p>
              Zip:{" "}
              <span className="text-app_accent-700">{saveData.data.zip}</span>
            </p>

            <button
              className="bg-app_accent-900 ml-auto hover:bg-cyan-700 h-18 w-auto rounded-full px-2 text-sm text-white"
              onClick={() => removeShipping(saveData.data)}
            >
              Remove
            </button>
          </div>
        </div>,
        ...prevState,
      ]);

    if (saveData.type == "payment method") {
      setShippingAddresses(mapShipAddresses(saveData.data.addresses));
      setPaymentMethods((prevState) => [
        ...prevState,
        <div className="bg-white border-b border-black drop-shadow-[0_1.2px_1.2px_rgba(135,135,135)] text-sm rounded-lg p-2 leading-none">
          <div>
            <p>
              Name:{" "}
              <span className="text-app_accent-700">
                {saveData.data.payment.name}
              </span>
            </p>
            <p>
              Type:{" "}
              <span className="text-app_accent-700">
                {saveData.data.payment.company}
              </span>
            </p>
          </div>
          <div className="flex gap-2">
            <p>
              Number:{" "}
              <span className="text-app_accent-700">
                ****{saveData.data.payment.number.slice(-4)}
              </span>
            </p>
            <p>
              Exp:{" "}
              <span className="text-app_accent-700">
                {saveData.data.payment.expiration instanceof Timestamp ? (
                  <>
                    {saveData.data.payment.expiration.toDate().getMonth() +
                      1 +
                      "/" +
                      saveData.data.payment.expiration
                        .toDate()
                        .getUTCFullYear()}
                  </>
                ) : (
                  <>
                    {saveData.data.payment.expiration.getMonth() +
                      1 +
                      "/" +
                      saveData.data.payment.expiration.getUTCFullYear()}
                  </>
                )}
              </span>
            </p>
            <button
              className="bg-app_accent-900 ml-auto hover:bg-cyan-700 h-18 w-auto rounded-full px-2 text-sm text-white"
              onClick={() => removePayment(saveData.data.payment)}
            >
              Remove
            </button>
          </div>
        </div>,
      ]);
    }
  };

  const removeItem = (item) => {
    if (item.type === "shipping address") {
      const filteredAddresses = user.membership.shipping.filter(
        (address) =>
          item.data.city != address.city ||
          item.data.country != address.country ||
          item.data.state != address.state ||
          item.data.address != address.address ||
          item.data.zip != address.zip
      );
      updateUser(auth.currentUser.uid, {
        membership: { ...user.membership, shipping: filteredAddresses },
      });
      setUser({
        ...user,
        membership: { ...user.membership, shipping: filteredAddresses },
      });
      const newShip = mapShipAddresses(filteredAddresses);
      setShippingAddresses(newShip);
    }
    if (item.type === "payment method") {
      const filteredPayments = user.membership.cards.filter(
        (card) =>
          card.company != item.data.company ||
          card.cvc != item.data.cvc ||
          card.expiration != item.data.expiration ||
          card.name != item.data.name ||
          card.number != item.data.number ||
          card.type != item.data.type
      );
      updateUser(auth.currentUser.uid, {
        membership: { ...user.membership, cards: filteredPayments },
      });
      setUser({
        ...user,
        membership: { ...user.membership, cards: filteredPayments },
      });
      const newPay = mapPaymentMethods(filteredPayments);
      setPaymentMethods(newPay);
    }
    const message = item.type.charAt(0).toUpperCase() + item.type.slice(1);
    setSuccessModal(`${message} has been successfully removed.`);
  };

  const removePayment = (paymentMethod) => {
    setItemToRemove({
      type: "payment method",
      message: `payment method ending in ${paymentMethod.number.slice(-4)}?`,
      data: paymentMethod,
    });
  };

  const removeShipping = (shippingMethod) => {
    setItemToRemove({
      type: "shipping address",
      message: `address at ${shippingMethod.address}, ${shippingMethod.city}, ${
        shippingMethod.state_code
      }, ${shippingMethod.zip}, ${shippingMethod.country_code.toUpperCase()}?`,
      data: shippingMethod,
    });
  };

  return (
    <div className="flex justify-center w-full h-full p-4 text-xl">
      <div className="inner-settings-profile drop-shadow-[0_1.2px_1.2px_rgba(0,0,0)] w-full gap-4 overflow-y-auto">
        <div className="flex-col bg-white bg-opacity-70 border-b-2 rounded-lg w-full text-lg p-4 whitespace-pre divide-y divide-gray-200">
          <div className="flex drop-shadow-[0_1.2px_1.2px_rgba(135,135,135)] grid-cols-6  mb-3">
            <div className="flex flex-col pr-1 text-right">
              <p>Name:</p>
              <p>Since:</p>
              <p>Davos Tier: </p>
              <p>Current: </p>
            </div>
            <div className="flex flex-col col-span-5 text-app_accent-700 pl-1">
              <p>
                {user.name.firstName} {user.name.lastName}
              </p>
              <p>{formatDate(user.created)}</p>
              <p>
                Gold
                {() =>
                  user.membership.tier === "monthly"
                    ? "Silver"
                    : user.membershipt.tier === "yearly"
                    ? "Gold"
                    : "Lifetime"
                }
              </p>{" "}
              <p className="whitespace-pre-wrap">
                {formatDate(user.membership.pay_period.begin) +
                  " - " +
                  formatDate(user.membership.pay_period.end)}
              </p>
            </div>
          </div>
          <div className="flex mb-2">
            <div className="flex w-full pt-2 drop-shadow-[0_1.2px_1.2px_rgba(135,135,135)]">
              Tier Benefits:{" "}
              <span className="text-app_accent-700 whitespace-normal break-normal">
                {tierBenefit}
              </span>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex w-full pt-2 drop-shadow-[0_1.2px_1.2px_rgba(135,135,135)]">
              Preffered Comm.:{" "}
              <span className="text-app_accent-700 whitespace-normal break-normal">
                {user.membership.communication.preference}
              </span>
            </div>
            <div className="flex w-full pt-2 drop-shadow-[0_1.2px_1.2px_rgba(135,135,135)]">
              Receive Promos:{" "}
              <span className="text-app_accent-700 whitespace-normal break-normal">
                {user.membership.communication.receive_promotions === true
                  ? "Yes"
                  : "No"}
              </span>
            </div>
            <div className="flex w-full pt-2 drop-shadow-[0_1.2px_1.2px_rgba(135,135,135)]">
              Davos on Air:{" "}
              <span className="text-app_accent-700 whitespace-normal break-normal">
                {user.membership.subscribed === true
                  ? "Subscribed"
                  : "Not Subscribed"}
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col bg-white bg-opacity-70 border-b-2 divide-y rounded-lg w-full h-full text-lg p-4">
          <div className="flex flex-col w-full divide-y divide-gray-200">
            <div className="mb-4">
              <div className="flex justify-evenly w-full  drop-shadow-[0_1.2px_1.2px_rgba(135,135,135)] mb-2">
                <div className="invisible">j</div>
                <h1>Payment Methods:</h1>
                <div
                  onClick={() =>
                    setAddData({
                      type: "payment method",
                      addresses: user.membership.shipping,
                      payments: user.membership.cards,
                    })
                  }
                >
                  <PlusIcon className="hover:bg-gray-400 active:bg-gray-500 rounded-lg hover:cursor-pointer" />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                {paymentMethods?.length > 0 ? (
                  paymentMethods
                ) : (
                  <div className="border-b border-black drop-shadow-[0_1.2px_1.2px_rgba(135,135,135)] p-1 rounded-lg w-full text-center bg-white">
                    No payment methods added.
                  </div>
                )}
              </div>
            </div>
            <div>
              <div className="flex justify-evenly w-full  drop-shadow-[0_1.2px_1.2px_rgba(135,135,135)] my-2">
                <div className="invisible">j</div>
                <h1>Shipping & Payment Addresses:</h1>
                <div
                  onClick={() =>
                    setAddData({
                      type: "shipping address",
                      addresses: user.membership.shipping,
                    })
                  }
                >
                  <PlusIcon className="hover:bg-gray-400 active:bg-gray-500 rounded-lg hover:cursor-pointer" />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                {shippingAddresses?.length > 0 ? (
                  shippingAddresses
                ) : (
                  <div className="border-b border-black drop-shadow-[0_1.2px_1.2px_rgba(135,135,135)] p-1 rounded-lg w-full text-center bg-white">
                    No shipping addresses added.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {itemToRemove && (
        <SettingsRemoveModal
          data={itemToRemove}
          removeItem={(item) => removeItem(item)}
          clearRemoveModal={() => setItemToRemove()}
        />
      )}
      {successModal && (
        <SuccessModal
          message={successModal}
          clearSuccessModal={() => setSuccessModal()}
        />
      )}
      {addData && (
        <AddModal
          clearAddModal={() => setAddData()}
          data={addData}
          submitData={(data) =>
            // data.type === "shipping address"
            //   ? addShipping(data)
            //   : addPayment(data)
            addItem(data)
          }
        />
      )}
    </div>
  );
};

export default SettingsMembership;
