import { useState, useContext } from "react";
import { ListGroup } from "flowbite-react";
import SettingsProfile from "../components/SettingsProfile";
import SettingsMembership from "../components/SettingsMembership";
import updateUser from "../services/updateUser";
import UserContext from "../contexts/UserContext";
import { auth } from "../utils/firebase";
import ErrorModal from "../components/Modals/ErrorModal";
import SuccessModal from "../components/Modals/SuccessModal";
import { updatePassword } from "firebase/auth";
import "../customcss/CustomCardCss.css";
import SettingsSecurity from "../components/SettingsSecurity";

const UserSettings = () => {
  const { user, setUser } = useContext(UserContext);
  const [display, setDisplay] = useState();
  const [saveData, setSaveData] = useState();
  const [error, setError] = useState();
  const [success, setSuccess] = useState();

  const cancelProfile = () => {
    setDisplay("loadProfile");
    setTimeout(() => {
      setDisplay("profile");
    });
  };

  const saveProfile = () => {
    if (saveData.address) {
      updateUser(auth.currentUser.uid, {
        profile: { ...user.profile, location: saveData.address },
      });
      setUser({
        ...user,
        profile: { ...user.profile, location: saveData.address },
      });
    }
    if (saveData.education) {
      updateUser(auth.currentUser.uid, {
        profile: { ...user.profile, education: saveData.education },
      });
      setUser({
        ...user,
        profile: { ...user.profile, education: saveData.education },
      });
    }
    if (saveData.work) {
      updateUser(auth.currentUser.uid, {
        profile: { ...user.profile, occupational: saveData.work },
      });
      setUser({
        ...user,
        profile: { ...user.profile, occupational: saveData.work },
      });
    }
    if (saveData.password) {
      updatePassword(auth.currentUser, saveData.password)
        .then(() => console.log("Password change successful."))
        .catch((error) => setError(error));
      if (!error) {
        updateUser(auth.currentUser.uid, {
          credentials: { ...user.credentials, password: saveData.password },
        });
        setUser({
          ...user,
          credentials: { ...user.credentials, password: saveData.password },
        });
      }
    }
    setSuccess("Successfully saved settings.");
    setSaveData({
      address: undefined,
      education: undefined,
      password: undefined,
      work: undefined,
    });
  };

  return (
    <div className="settings-body bg-app_bg font-dmserif text-black">
      <div className="settings-container flex flex-col w-screen h-full">
        <div className="settings-grid-container flex flex-col sm:grid sm:grid-cols-4">
          <div className="settings-sidebar flex flex-col bg-app_accent-900 items-center gap-4 p-4 break-all">
            <img
              className="rounded-none w-auto h-auto border-1 sm:border-2 sm:border-app_main p-0 sm:p-1 md:p-2"
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
              <ListGroup.Item
                onClick={() =>
                  display != "security" ? setDisplay("security") : {}
                }
              >
                Security
              </ListGroup.Item>
              <ListGroup.Item
                onClick={() =>
                  display != "membership" ? setDisplay("membership") : {}
                }
              >
                Membership/Purchase
              </ListGroup.Item>
            </ListGroup>
          </div>
          {display === "membership" ? (
            <div className="setting-profile-main flex-col col-span-3 w-full">
              <div className="settings-header flex border-b-2 border-black items-center justify-evenly text-4xl">
                <h1 className="text-center">Membership & Purchase Settings</h1>
              </div>

              <SettingsMembership
                user={user}
                setUser={(uUser) => setUser(uUser)}
                setSaveData={(data) => setSaveData(data)}
              />
            </div>
          ) : (
            <></>
          )}
          {display === "security" ? (
            <div className="setting-security-main flex-col col-span-3 w-full">
              <div className="settings-header flex border-b-2 border-black items-center justify-evenly text-4xl">
                <h1 className="text-center">Security Settings</h1>
              </div>
              <SettingsSecurity
                user={user}
                setUser={(uUser) => setUser(uUser)}
                setSaveData={(data) => setSaveData(data)}
              ></SettingsSecurity>
            </div>
          ) : (
            <></>
          )}
          {display === "profile" ? (
            <div className="setting-profile-main flex-col col-span-3 w-full">
              <div className="settings-header flex border-b-2 border-black items-center justify-evenly text-4xl">
                {(saveData?.address ||
                  saveData?.education ||
                  saveData?.work ||
                  saveData?.password) && (
                  <button
                    className="bg-app_accent-900 hover:bg-cyan-700 h-[26px] w-auto rounded-full px-2 text-sm text-white"
                    onClick={cancelProfile}
                  >
                    Cancel
                  </button>
                )}
                <h1 className="text-center">Profile Settings</h1>
                {(saveData?.address ||
                  saveData?.education ||
                  saveData?.work ||
                  saveData?.password) && (
                  <button
                    className="bg-app_accent-900 hover:bg-cyan-700 h-[26px] w-auto whitespace-pre rounded-full px-2 text-sm text-white"
                    onClick={saveProfile}
                  >
                    {" "}
                    Save{" "}
                  </button>
                )}
              </div>

              <SettingsProfile
                user={user}
                setSaveData={(data) => setSaveData(data)}
              />
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
      {error && <ErrorModal error={error} clearErrorModal={() => setError()} />}
      {success && (
        <SuccessModal
          message={success}
          clearSuccessModal={() => setSuccess()}
        />
      )}
    </div>
  );
};

export default UserSettings;
