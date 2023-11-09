import { Button, Label, Modal, TextInput } from "flowbite-react";
import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import getSubscriber from "../../services/getSubscriber";
import addSubscriber from "../../services/addSubscriber";

const PodcastSignInModal = ({ clearPodcastSignUpModal }) => {
  const emailRef = useRef(null);
  const [userExists, setUserExists] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [openModal, setOpenModal] = useState(true);
  const [content, setContent] = useState();
  const emailRegex = new RegExp(
    /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,})$/
  );

  const onSubmit = async (data) => {
    getSubscriber(data.email).then((promiseData) => {
      return setUserExists({ data: data, exists: promiseData.exists });
    });
  };

  useEffect(() => {
    if (userExists)
      if (!userExists.exists) {
        const { data } = userExists;
        console.log(data);
        console.log(addSubscriber(data));
        setContent(
          <Modal.Body>
            <div className="flex space-y-6 justify-center">
              <div className="text-xl justify-center w-fit font-medium text-gray-900 dark:text-white">
                Thank you for subscribing!
              </div>
            </div>
          </Modal.Body>
        );
        setTimeout(() => setOpenModal(undefined), 1500);
      }
  }, [userExists]);

  const clearModal = () => {
    clearPodcastSignUpModal();
    setOpenModal(undefined);
  };

  return (
    <Modal
      size="md"
      popup
      dismissible
      show={openModal}
      onClose={() => clearModal()}
    >
      <Modal.Header />
      {content && content}
      {!content && (
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Subscribe To{" "}
              <em className="drop-shadow-[0_1.2px_1.2px_rgba(125,125,125)]">
                Davos On Air
              </em>
              .
            </h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email" value="Your email" />
              </div>
              <TextInput
                ref={emailRef}
                id="email"
                type="email"
                placeholder="name@company.com"
                {...register("email", {
                  required: "Email address is required.",
                  onChange: () => {
                    userExists ? setUserExists(null) : {};
                  },
                  pattern: {
                    value: emailRegex,
                    message: "Invalid email adress.",
                  },
                })}
              />
              <p className="text-red-600 text-sm">
                {userExists && "Email is already subscribed."}
                {errors.email?.message}
              </p>
            </div>
            <div className="flex flex-row justify-between">
              <div className="w-fit">
                <Button
                  className="bg-app_accent-900"
                  type="submit"
                  onClick={handleSubmit(onSubmit)}
                >
                  Subscribe
                </Button>
              </div>
              <p className="text-black">OR</p>
              <div className="w-fit">
                <Button className="bg-app_accent-900">Log In</Button>
              </div>
            </div>
            <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300">
              Not registered?&nbsp;
              <Link
                to="/new_account"
                className="text-app_accent-700 hover:underline dark:text-app_accent-500"
              >
                Create account
              </Link>
            </div>
          </div>
        </Modal.Body>
      )}
    </Modal>
  );
};

export default PodcastSignInModal;
