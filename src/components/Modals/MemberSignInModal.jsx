import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import UserContext from "../../contexts/UserContext";
import { Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../utils/firebase";
import getUser from "../../services/getUser";

const MemberSignInModal = (props) => {
  const [openModal, _] = useState("form-elements");
  const [errorMessage, setErrorMessage] = useState();
  const { __, setUser } = useContext(UserContext);
  const emailRegex = new RegExp(
    /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,})$/
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const logInClick = async (creds) => {
    signInWithEmailAndPassword(auth, creds.email, creds[`current-password`])
      .then((userCredential) => {
        // Signed in
        logInAuthorized(userCredential.user);
      })
      .catch((error) => {
        logInDenied();
        console.log(error.errorCode, error.errorMessage);
      });
  };

  const logInAuthorized = (u) => {
    const tmpUser = getUser(u.uid);
    tmpUser.then((data) => setUser(data));
    props.resetModal();
  };

  const logInDenied = () => {
    setErrorMessage("Email/Password is incorrect.");
  };

  const clearErrorMessage = () => {
    setErrorMessage();
  };

  return (
    <Modal
      id="memberModal"
      show={openModal === "form-elements"}
      size="md"
      popup
      onClose={() => props.resetModal()}
    >
      <Modal.Header />
      <Modal.Body>
        <div className="space-y-6">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">
            Sign in to{" "}
            <em className="drop-shadow-[0_1.2px_1.2px_rgba(125,125,125)]">
              Davos
            </em>
          </h3>
          <form>
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
              <p className="text-white">Easter Egg!</p>
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="current-password" value="Your password" />
              </div>
              <TextInput
                id="current-password"
                type="password"
                onChange={clearErrorMessage}
                {...register("current-password", {
                  required: "Password is required.",
                  minLength: { value: 10, message: "Minimum 10 characters" },
                  onChange: () => clearErrorMessage(),
                })}
              />

              {errorMessage && (
                <p className="text-red-600 text-sm">{errorMessage}</p>
              )}
              <p className="text-red-600 text-sm">
                {errors[`current-password`]?.message}
              </p>
              <p className="text-white">Easter Egg!</p>
            </div>
            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember">Remember me</Label>
              </div>
              <a
                href="/modal"
                className="text-sm text-app_accent-700 hover:underline dark:text-app_accent-500"
              >
                Lost Password?
              </a>
            </div>
            <div className="w-full">
              <Button
                className="bg-app_accent-900"
                type="submit"
                onClick={handleSubmit(logInClick)}
              >
                Log in to your account
              </Button>
            </div>
            <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300">
              Not registered?&nbsp;
              <Link
                to="/new_account"
                className="text-app_accent-700 hover:underline dark:text-app_accent-500"
                onClick={() => props.resetModal()}
              >
                Create account
              </Link>
            </div>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default MemberSignInModal;
