import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { DefaultImage } from "../components/DefaultImage";
import {
  Navbar,
  Typography,
  Button,
  IconButton,
  Collapse,
} from "@material-tailwind/react";
import DropDownButton from "../components/DropDownButton";
import MemberSignInModal from "../components/Modals/MemberSignInModal";
import UserContext from "../contexts/UserContext";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import clearSessionCookie from "../services/clearSessionCookie";
import SuccessModal from "../components/Modals/SuccessModal";
import ShopInTheDesertAnchor from "../components/ShopInTheDesertAnchor";
import "../customcss/CustomCardCss.css";

const StickyNavbar = () => {
  const [openNav, setOpenNav] = useState(false);
  const [openSignInModal, setOpenSignInModal] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const [successModal, setSuccessModal] = useState();

  const signIn = () => {
    setOpenSignInModal(true);
  };

  const resetModal = () => {
    setOpenSignInModal(false);
  };

  const logOut = () => {
    signOut(auth)
      .then(() => {
        setUser();
        // User signed out we need to remove cookie from their cookies
        clearSessionCookie().then((data) => console.log(data));
        setSuccessModal(`${user.username} has successfully signed out.`);
        setTimeout(() => signIn(), 2000);
      })
      .catch((error) => {
        console.log(error);
      });
    setUser();
  };

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="large"
        color="blue-gray"
        className="flex w-full justify-evenly p-1 font-normal"
      >
        <Link
          className="flex items-center hover:scale-110 hover:drop-shadow-[0_1.2px_1.2px_rgba(120,120,120)]"
          to="/"
        >
          <div className="flex items-center hover:scale-110 hover:drop-shadow-[0_1.2px_1.2px_rgba(120,120,120)]">
            Home
          </div>
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="large"
        color="blue-gray"
        className="flex w-full justify-evenly p-1 font-normal"
      >
        <Link
          className="flex items-center hover:scale-110 hover:drop-shadow-[0_1.2px_1.2px_rgba(120,120,120)]"
          to="/events"
        >
          Events
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="large"
        color="blue-gray"
        className="flex w-full justify-evenly p-1 font-normal"
      >
        <Link
          className="flex items-center hover:scale-110 hover:drop-shadow-[0_1.2px_1.2px_rgba(120,120,120)]"
          to="/podcasts"
        >
          Podcasts
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="large"
        color="blue-gray"
        className="flex w-full justify-evenly p-1 font-normal"
      >
        <Link
          className="flex items-center hover:scale-110 hover:drop-shadow-[0_1.2px_1.2px_rgba(120,120,120)]"
          to="/about"
        >
          About
        </Link>
      </Typography>
    </ul>
  );

  return (
    <>
      <Navbar
        variant="gradient"
        className="sticky bg-app_main top-0 z-10 border-none h-[76px] max-w-full rounded-none py-1 px-4 lg:px-8 lg:py-1 z-20"
      >
        <div className="flex items-center justify-between text-blue-gray-900">
          <Link className="cursor-pointer py-1.5 font-medium" to="/">
            <div className="invert relative rounded-md w-full overflow-hidden hover:scale-105 hover:drop-shadow-[0_1.2px_1.2px_rgba(120,120,120)] bg-cover bg-[50%] bg-no-repeat">
              <DefaultImage
                className="hover:scale-110 hover:drop-shadow-[0_1.2px_1.2px_rgba(120,120,120)]"
                src="https://davosinthedesert.us/wp-content/uploads/2023/02/davos-logo-v3.png"
                alt="Davos In The Desert"
              ></DefaultImage>
            </div>
          </Link>

          <div className="flex items-center gap-4">
            <div className="mr-4 hidden lg:block">{navList}</div>
            <div className="-ml-12 -mr-2 hidden lg:block">
              <ShopInTheDesertAnchor />
            </div>
            {user ? (
              <div className="flex justify-evenly gap-4 drop-down">
                <DropDownButton onClick={logOut} />
              </div>
            ) : (
              <Button
                variant="gradient"
                size="sm"
                className="hidden lg:inline-block bg-app_accent-600 active:drop-shadow-[0_2px_2px_rgba(95,95,95)] shadow hover:drop-shadow-[0_3px_3px_rgba(95,95,95)] hover:shadow-lg font-medium transition transform active:bg-app_accent-700 hover:scale-105 hover:-translate-y-0.5"
                onClick={signIn}
              >
                <span>Sign In</span>
              </Button>
            )}
            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={true}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
          </div>
        </div>
        <Collapse open={openNav} className="bg-gray-200 rounded-b-lg">
          {navList}
          {user ? (
            <Button
              onClick={logOut}
              variant="gradient"
              size="sm"
              fullWidth
              className="mb-2"
            >
              <span>Sign Out</span>
            </Button>
          ) : (
            <Button
              onClick={signIn}
              variant="gradient"
              size="sm"
              fullWidth
              className="mb-2"
            >
              <span>Sign In</span>
            </Button>
          )}
        </Collapse>

        {openSignInModal && <MemberSignInModal resetModal={resetModal} />}
      </Navbar>
      {successModal && (
        <SuccessModal
          message={successModal}
          clearSuccessModal={() => setSuccessModal()}
        />
      )}
    </>
  );
};

export default StickyNavbar;
