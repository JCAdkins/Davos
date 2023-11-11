import { Avatar } from "flowbite-react";

const BaseAvatar = ({ image }) => {
  return (
    <div className="flex flex-wrap gap-2">
      <Avatar color={"app_accent-900"} bordered img={image} rounded />
    </div>
  );
};

export default BaseAvatar;
