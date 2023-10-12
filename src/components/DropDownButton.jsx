"use client";

import { Dropdown } from "flowbite-react";
import { DropdownItem } from "flowbite-react/lib/esm/components/Dropdown/DropdownItem";
import { Link } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import { useContext } from "react";
import BaseAvatar from "./BaseAvatar";

export default function DropDownButton(props) {
  const { user } = useContext(UserContext);
  return (
    <>
      <BaseAvatar img={user.profile.image} />
      <Dropdown label={user.name.firstName + " " + user.name.lastName}>
        <DropdownItem>
          <Link to="/profile">Profile</Link>
        </DropdownItem>
        <DropdownItem>
          <Link to="/profile/settings">Settings</Link>
        </DropdownItem>

        <DropdownItem onClick={props.onClick}>Sign out</DropdownItem>
      </Dropdown>
    </>
  );
}
