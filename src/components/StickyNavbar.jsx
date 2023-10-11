import React, { useState } from "react";
import { DefaultImage } from "./DefaultImage";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import MemberSignInModal from "./Modals/MemberSignInModal";

export function StickyNavbar() {
  const [openNav, setOpenNav] = React.useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);

  const signIn = (props) => {
    setOpenSignIn(true);
  };

  const resetModal = () => {
    setOpenSignIn(false);
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
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="/members" className="flex items-center">
          Members
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="/events" className="flex items-center">
          Events
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="/podcasts" className="flex items-center">
          Podcasts
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="/about" className="flex items-center">
          About
        </a>
      </Typography>
    </ul>
  );

  return (
    <Navbar className="sticky bg-[#E1E3E4] top-0 z-10 h-max max-w-full rounded-none py-1 px-4 lg:px-8 lg:py-1">
      <div className="flex items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          href="home"
          className="mr-4 cursor-pointer py-1.5 font-medium"
        >
          <div className="invert relative rounded-md w-full overflow-hidden bg-cover bg-[50%] bg-no-repeat">
            <DefaultImage
              className=""
              src="https://davosinthedesert.us/wp-content/uploads/2023/02/davos-logo-v3.png"
              alt="Davos In The Desert"
            ></DefaultImage>
            <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed opacity-50"></div>
          </div>
        </Typography>

        <div className="flex items-center gap-4">
          <div className="mr-4 hidden lg:block">{navList}</div>
          <Button
            variant="gradient"
            size="sm"
            className="hidden lg:inline-block"
            onClick={signIn}
          >
            <span>Sign In</span>
          </Button>
          <IconButton
            variant="text"
            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
            ripple={false}
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
      <MobileNav open={openNav}>
        {navList}
        <Button
          onClick={signIn}
          variant="gradient"
          size="sm"
          fullWidth
          className="mb-2"
        >
          <span>Sign In</span>
        </Button>
      </MobileNav>
      {openSignIn && <MemberSignInModal resetModal={resetModal} />}
    </Navbar>
  );
}
