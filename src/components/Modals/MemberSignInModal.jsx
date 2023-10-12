import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import UserContext from "../../contexts/UserContext";

const MemberSignInModal = (props) => {
  const [openModal, setOpenModal] = useState("form-elements");
  const [errorMessage, setErrorMessage] = useState();
  const { user, setUser } = useContext(UserContext);
  const emailRegex = new RegExp(
    /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,})$/
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const logInClick = async (event) => {
    fetch("http://127.0.0.1:3000/users")
      .then((response) => response.json())
      .then((users) => {
        users.filter((user) => {
          user.credentials.userName === event.email &&
          user.credentials.password === event.password
            ? logInAuthorized(user)
            : logInDenied();
        });
      })
      .catch((err) => {
        console.error("An error occurred: ", err);
      });
  };

  const logInAuthorized = (user) => {
    setUser(user);
    props.resetModal();
  };

  const logInDenied = () => {
    setErrorMessage("Email/Password is incorrect.");
  };

  const clearErrorMessage = () => {
    console.log("clear");
    setErrorMessage();
  };

  return (
    <Modal
      show={openModal === "form-elements"}
      size="md"
      popup
      onClose={() => props.resetModal()}
    >
      <Modal.Header />
      <Modal.Body>
        <div className="space-y-6">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">
            Sign in to our platform
          </h3>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email" value="Your email" />
            </div>
            <TextInput
              id="email"
              placeholder="name@company.com"
              {...register("email", {
                required: "Email is required.",
                pattern: {
                  value: emailRegex,
                  message: "Invalid email address.",
                },
                onChange: () => clearErrorMessage(),
              })}
            />
            <p className="text-red-600 text-sm">{errors.email?.message}</p>
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password" value="Your password" />
            </div>
            <TextInput
              id="password"
              type="password"
              onChange={clearErrorMessage}
              {...register("password", {
                required: "Password is required.",
                minLength: { value: 10, message: "Minimum 10 characters" },
                onChange: () => clearErrorMessage(),
              })}
            />
            {errorMessage && (
              <p className="text-red-600 text-sm">{errorMessage}</p>
            )}
            <p className="text-red-600 text-sm">{errors.password?.message}</p>
          </div>
          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              <Checkbox id="remember" />
              <Label htmlFor="remember">Remember me</Label>
            </div>
            <a
              href="/modal"
              className="text-sm text-cyan-700 hover:underline dark:text-cyan-500"
            >
              Lost Password?
            </a>
          </div>
          <div className="w-full">
            <Button onClick={handleSubmit(logInClick)}>
              Log in to your account
            </Button>
          </div>
          <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300">
            Not registered?&nbsp;
            <a
              href="/modal"
              className="text-cyan-700 hover:underline dark:text-cyan-500"
            >
              Create account
            </a>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default MemberSignInModal;
