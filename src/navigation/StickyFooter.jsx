import { Navbar, Typography } from "@material-tailwind/react";

const StickyFooter = () => {
  return (
    <Navbar className="sticky bottom-0 bg-[#E1E3E4] border-y-black text-center h-16 max-w-full rounded-none px-4 lg:px-8">
      <div className="flex text-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          href="#"
          className="cursor-pointer text-center font-medium"
        >
          ©2023 ALL RIGHTS RESERVED – DAVOS IN THE DESERT
        </Typography>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="200"
          height="100"
          viewBox="0 0 200 100"
        >
          <text x="10" y="20" fontFamily="Arial" fontSize="24" fill="black">
            Adkins
          </text>
          <text x="10" y="35" fontFamily="Arial" fontSize="18" fill="black">
            Industrial
          </text>
        </svg>
      </div>
    </Navbar>
  );
};

export default StickyFooter;
