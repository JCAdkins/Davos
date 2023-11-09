import { useState } from "react";
import { Timestamp } from "firebase/firestore";
import { ToggleSwitch } from "flowbite-react";
import InfoIcon from "../components/Icons/InfoIcon";
import { Tooltip } from "react-tooltip";
import "../customcss/CustomCardCss.css";

function getAge(dateString) {
  var today = new Date();
  var birthDate =
    dateString instanceof Timestamp
      ? dateString.toDate()
      : new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}
const cityRegEx = new RegExp(/[a-zA-Z-]+/);

const SettingsProfile = ({ user }) => {
  const [searchableToggle, setSearchableToggle] = useState(
    user.settings.searchable
  );
  const [viewableToggle, setViewableToggle] = useState(user.settings.viewable);
  const [locationToggle, setLocationToggle] = useState(
    user.settings.showLocation
  );

  return (
    <div className="flex justify-center w-full h-full p-4 text-xl">
      <div className="inner-settings-profile flex grid grid-cols-2 auto-rows-auto w-full  gap-4">
        <div className="flex flex-col bg-white bg-opacity-70 border-b-2 rounded-lg w-full h-full text-lg p-4 whitespace-pre divide-y divide-gray-200">
          <div className="flex grid-cols-6 justify-center">
            <div className="flex flex-col pr-1 text-right">
              <p>Name:</p>
              <p>User:</p>
              <p>Created:</p>
            </div>
            <div className="flex flex-col col-span-5 text-app_accent-700 pl-1">
              <p>
                {user.name.firstName} {user.name.lastName}
              </p>
              <p>{user.credentials.userName}</p>
              <p>{user.created.toDate().toLocaleString()}</p>
            </div>
          </div>
          <div className="flex grid grid-cols-2 auto-rows-auto gap-2 p-4">
            <div className="flex">
              <div
                className={`settings-toggle ${
                  searchableToggle ? "toggle-green" : "toggle-red"
                } flex`}
              >
                <ToggleSwitch
                  checked={searchableToggle}
                  label="Searchable"
                  onChange={() => {
                    setSearchableToggle((prevState) => !prevState);
                  }}
                />
                <a className="searchable-tooltip">
                  <InfoIcon />
                </a>
                <Tooltip anchorSelect=".searchable-tooltip" place="top">
                  <p className="text-xs">
                    On: Profile will appear in all searches.
                  </p>
                  <p className="text-xs">
                    Off: Profile will only appear in friends searches.
                  </p>
                </Tooltip>
              </div>
            </div>

            <div className="flex">
              <div
                className={`settings-toggle ${
                  locationToggle ? "toggle-green" : "toggle-red"
                } flex`}
              >
                <ToggleSwitch
                  checked={locationToggle}
                  label="Location"
                  onChange={() => {
                    setLocationToggle((prevState) => !prevState);
                  }}
                />
                <a className="location-tooltip">
                  <InfoIcon />
                </a>
                <Tooltip anchorSelect=".location-tooltip" place="top">
                  <p className="text-xs">
                    Toggle to show/hide location in profile page.
                  </p>
                </Tooltip>
              </div>
            </div>

            <div className="flex">
              <div
                className={`settings-toggle ${
                  viewableToggle ? "toggle-green" : "toggle-red"
                } flex`}
              >
                <ToggleSwitch
                  checked={viewableToggle}
                  label="Viewable"
                  onChange={() => {
                    setViewableToggle((prevState) => !prevState);
                  }}
                />
                <a className="viewable-tooltip">
                  <InfoIcon />
                </a>
                <Tooltip anchorSelect=".viewable-tooltip" place="top">
                  <p className="text-xs">
                    On: Profile will viewable by everyone.
                  </p>
                  <p className="text-xs">
                    Off: Profile will only be viewable by Davos friends.
                  </p>
                </Tooltip>
              </div>
            </div>
          </div>
        </div>
        <div className="flex bg-white bg-opacity-70 border-b-2 rounded-lg w-full h-full text-lg p-4">
          <div className="flex flex-col w-full">
            <div className="flex whitespace-pre">
              Address:{" "}
              <p className="text-app_accent-700">
                {user.profile.location.city}, {user.profile.location.state}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsProfile;
