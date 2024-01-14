import { Avatar } from "flowbite-react";

const BaseAvatar = ({ image }) => {
  return (
    <div className="flex flex-wrap gap-2">
      <Avatar
        className="border border-app_accent-900 rounded-full"
        img={image}
        rounded
      />
    </div>
  );
};

export default BaseAvatar;
