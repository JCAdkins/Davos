import NewAccountForm from "../components/Forms/NewAccountForm";
import CardDefault from "../components/CardDefault";
import { Card } from "flowbite-react";
import DavosFooter from "../navigation/DavosFooter";

const NewAccount = () => {
  return (
    <div className="flex flex-row justify-evenly">
      <Card>
        <div className="text-black text-xl max-w-[30ch]">
          <p>
            Congratulations! You have taken the first step toward becoming part
            of a bold fellowship of new acquaintances and wonderful activities.
          </p>
        </div>
      </Card>
      <CardDefault display="flex justify-center">
        <NewAccountForm />
      </CardDefault>
    </div>
  );
};

export default NewAccount;
