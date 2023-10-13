import NewAccountForm from "../components/Forms/NewAccountForm";
import CardDefault from "../components/CardDefault";

const NewAccount = () => {
  return (
    <div className="justify-center">
      <CardDefault display="flex justify-center">
        <NewAccountForm />
      </CardDefault>
    </div>
  );
};

export default NewAccount;
