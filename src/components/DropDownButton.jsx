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
      <BaseAvatar image={user.profile.image} />
      <Dropdown label={user.name.firstName + " " + user.name.lastName}>
        <Link to="/profile">
          <DropdownItem>Profile</DropdownItem>
        </Link>
        <Link to="/profile/settings">
          <DropdownItem>Settings</DropdownItem>
        </Link>
        {user.permissions.includes("admin") ? (
          <Link to="/admin">
            <DropdownItem>Admin Panel</DropdownItem>
          </Link>
        ) : (
          <></>
        )}

        <DropdownItem onClick={props.onClick}>Sign out</DropdownItem>
      </Dropdown>
    </>
  );
}
