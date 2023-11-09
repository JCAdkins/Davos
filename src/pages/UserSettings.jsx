import { useState } from "react";
import { ListGroup } from "flowbite-react";
import SettingsProfile from "../components/SettingsProfile";
import "../customcss/CustomCardCss.css";

const UserSettings = ({ user }) => {
  const [display, setDisplay] = useState("profile");

  return (
    <div className="settings-body bg-app_bg font-dmserif text-black">
      <div className="settings-container flex flex-col w-screen h-full">
        <div className="settings-grid-container flex grid grid-cols-4 h-full">
          <div className="settings-sidebar flex flex-col bg-app_accent-900 items-center gap-4 p-4">
            <img
              className="rounded-full w-48 h-48 border-2 border-white p-2"
              src={user.profile.image}
              alt={user.name}
            />
            <ListGroup className="w-full">
              <ListGroup.Item
                onClick={() =>
                  display != "profile" ? setDisplay("profile") : {}
                }
              >
                Profile
              </ListGroup.Item>
              <ListGroup.Item>Security</ListGroup.Item>
              <ListGroup.Item>Display</ListGroup.Item>
            </ListGroup>
          </div>
          <div className="setting-profile-main flex-col col-span-3 w-full">
            <div className="settings-header flex border-b-2 border-black justify-center text-4xl">
              <h1 className="text-center">{user.name.firstName}'s Settings</h1>
            </div>
            {display === "profile" ? <SettingsProfile user={user} /> : {}}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSettings;
