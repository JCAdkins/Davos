import { DefaultImage } from "./DefaultImage";
import IMAGES from "../images/Images";
import ArrowUpRight from "./Icons/ArrowUpRight";

const ShopInTheDesertAnchor = () => {
  return (
    <a className="cursor-pointer" href="https://shop.adadkins.com">
      <div className="flex items-center scale-50 relative rounded-md w-full h-full hover:scale-[0.53] hover:drop-shadow-[0_1.2px_1.2px_rgba(120,120,120)] bg-cover bg-[50%] bg-no-repeat">
        <div className="flex w-fit h-fit">
          <DefaultImage
            className="hover:scale-[0.53] hover:drop-shadow-[0_1.2px_1.2px_rgba(120,120,120)]"
            src={IMAGES.davos_icon}
            alt="Davos In The Desert"
          ></DefaultImage>
          <div className="bg-transparent flex flex-col w-fit h-full divide-y divide-white leading-4 tracking-tight -ml-3.5">
            <div className="flex justify-between text-white text-[27px] leading-tight -mb-[3px]">
              <p>S</p>
              <p>H</p>
              <p>O</p>
              <p>P</p>
            </div>
            <div className="flex shrink-0 w-fit whitespace-pre">
              <p className="flex shrink-0 text-sm w-fit text-center text-white text-nowrap">
                IN{" "}
              </p>
              <p className="flex shrink-0 text-sm w-fit text-center text-white text-nowrap">
                THE{" "}
              </p>
              <p className="flex shrink-0 text-sm w-fit text-center text-white text-nowrap">
                DESERT
              </p>
            </div>
          </div>
          <div className="flex w-fit h-full items-start pl-1">
            <ArrowUpRight />
          </div>
        </div>
      </div>
    </a>
  );
};

export default ShopInTheDesertAnchor;
