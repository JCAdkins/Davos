import { Navbar, Typography } from "@material-tailwind/react";

const StickyFooter = () => {
  return (
    <Navbar className="sticky bottom-0 border-y-black text-center h-max max-w-full rounded-none py-0.5 px-4 lg:px-8">
      <div className="flex items-center text-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          href="#"
          className="cursor-pointer text-center py-1.5 font-medium"
        >
          ©2023 ALL RIGHTS RESERVED – DAVOS IN THE DESERT
        </Typography>
      </div>
    </Navbar>
  );
};

export default StickyFooter;
