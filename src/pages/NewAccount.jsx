import NewAccountForm from "../components/Forms/NewAccountForm";
import { Alert } from "flowbite-react";
import DefaultCarousel from "../components/DefaultCarousel";
import { useState } from "react";
import "../customcss/CustomCardCss.css";

const NewAccount = () => {
  const [hidden, setHidden] = useState();
  return (
    <div className="relative">
      <div className="carousel-container absolute w-full h-full -z-10">
        <DefaultCarousel className="h-screen w-screen object-cover transition-opacity duration-300" />
      </div>
      <Alert
        className={`fade-in-alert w-fullabsolute tracking-tight rounded-none ${hidden} text-sm p-1`}
        color="failure"
        onDismiss={() => setHidden("hidden")}
      >
        <span className="font-medium">Hurry!</span> The $75 application fee is
        waived for a limited time. The $19 a month membership dues will soon
        rise to $29 a month. Become a member today and your $19 a month dues
        will be grandfathered.
      </Alert>
      <div className="flex justify-center items-center bg-transparent w-screen h-screen">
        <div className="bg-white p-6 rounded-lg w-fit bg-opacity-90">
          <NewAccountForm />
        </div>
      </div>
    </div>
  );
};

export default NewAccount;
