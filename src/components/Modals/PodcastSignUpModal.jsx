import { Button, Label, Modal, TextInput } from "flowbite-react";
import { useState, useRef } from "react";
import { useForm } from "react-hook-form";

const PodcastSignInModal = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [openModal, setOpenModal] = useState(true);
  const [outcome, setOutcome] = useState("failure");
  const emailInputRef = useRef(null);

  return (
    <Modal
      show={openModal === true}
      size="md"
      popup
      dismissible
      onClose={() => setOpenModal(undefined)}
      initialFocus={emailInputRef}
    >
      <Modal.Header />
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
              ref={emailInputRef}
              placeholder="name@company.com"
              required
              color={outcome}
            />
          </div>
          <div className="flex flex-row justify-between">
            <div className="w-fit">
              <Button type="submit">Subscribe</Button>
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
    </Modal>
  );
};

export default PodcastSignInModal;
