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
      <Dropdown
        className="bg-sky-700"
        label={user.name.firstName + " " + user.name.lastName}
      >
        <Link to="/profile">
          <DropdownItem className="text-white hover:text-black">
            Profile
          </DropdownItem>
        </Link>
        <Link to="/profile/settings">
          <DropdownItem className="text-white hover:text-black">
            Settings
          </DropdownItem>
        </Link>
        {user.permissions.includes("admin") ? (
          <Link to="/admin">
            <DropdownItem className="text-white hover:text-black">
              Admin Panel
            </DropdownItem>
          </Link>
        ) : (
          <></>
        )}

        <DropdownItem
          className="text-white hover:text-black"
          onClick={props.onClick}
        >
          Sign out
        </DropdownItem>
      </Dropdown>
    </>
  );
}
