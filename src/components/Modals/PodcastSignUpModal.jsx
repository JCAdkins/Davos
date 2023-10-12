import { Button, Label, Modal, TextInput } from "flowbite-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

const URL = "http://127.0.0.1:3000/podcast_subscribers";

const PodcastSignInModal = (props) => {
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
    const response = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const resData = await response.json();
    // Implement logic to check for a successful post code here
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
  };

  return (
    <Modal
      show={openModal === true}
      size="md"
      popup
      dismissible
      onClose={() => setOpenModal(undefined)}
    >
      <Modal.Header />
      {content && content}
      {!content && (
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Subscribe To Our Podcast.
            </h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email" value="Your email" />
              </div>
              <TextInput
                id="email"
                type="email"
                placeholder="name@company.com"
                {...register("email", {
                  required: "Email address is required.",
                  pattern: {
                    value: emailRegex,
                    message: "Invalid email adress.",
                  },
                })}
              />
              <p className="text-red-600 text-sm">{errors.email?.message}</p>
            </div>
            <div className="flex flex-row justify-between">
              <div className="w-fit">
                <Button type="submit" onClick={handleSubmit(onSubmit)}>
                  Subscribe
                </Button>
              </div>
              <p className="text-black">OR</p>
              <div className="w-fit">
                <Button>Log In</Button>
              </div>
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
      )}
    </Modal>
  );
};

export default PodcastSignInModal;
