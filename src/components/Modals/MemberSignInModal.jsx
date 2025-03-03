import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  setPersistence,
  inMemoryPersistence,
} from "firebase/auth";
import { auth } from "../../utils/firebase";
import generateSessionCookie from "../../services/generateSessionCookie";

const MemberSignInModal = ({ setError, resetModal }) => {
  const [openModal, _] = useState("form-elements");
  const [errorMessage, setErrorMessage] = useState();
  const emailRegex = new RegExp(
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  );
  const emailInputRef = useRef(null); // Create the ref

  // Use useEffect to set focus when the component mounts or at any specific time
  useEffect(() => {
    if (emailInputRef.current) {
      emailInputRef.current.focus(); // Set focus on the email input
    }
  }, []); // Empty dependency array to set focus only on initial mount

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const logInClick = async (creds) => {
    setPersistence(auth, inMemoryPersistence)
      .then(() =>
        signInWithEmailAndPassword(
          auth,
          creds.signin_email,
          creds[`current-password`]
        ).then(async (userCredential) => {
          // Signed in
          const idToken = await userCredential.user.getIdToken();
          const sessionCookie = await generateSessionCookie(idToken);
          if (sessionCookie.error) {
            setError(sessionCookie.error);
          }
          resetModal();
        })
      )
      .catch((error) => {
        setErrorMessage("Email/Password is incorrect.");
        console.log(error);
      });
  };

  const clearErrorMessage = () => {
    setErrorMessage();
  };

  return (
    <Modal
      id="memberModal"
      show={openModal === "form-elements"}
      aria-label="User Login"
      size="md"
      popup
      onClose={() => resetModal()}
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
                <Label htmlFor="signin_email" value="Your email" />
              </div>
              <TextInput
                id="signin_email"
                placeholder="name@company.com"
                autoComplete="username"
                ref={emailInputRef}
                {...register("signin_email", {
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
                autoComplete="current-password"
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
            <div className="flex flex-col justify-evenly gap-2">
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
                  onClick={() => resetModal()}
                >
                  Create account
                </Link>
              </div>
            </div>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default MemberSignInModal;
