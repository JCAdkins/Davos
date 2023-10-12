"use client";

import { Avatar } from "flowbite-react";

const BaseAvatar = ({ image }) => {
  return (
    <div className="flex flex-wrap gap-2">
      <Avatar bordered img={image} rounded />
    </div>
  );
};

export default BaseAvatar;
