import { useState, useRef, useEffect } from "react";
import { TextInput, ToggleSwitch } from "flowbite-react";
import InfoIcon from "../components/Icons/InfoIcon";
import EditIcon from "../components/Icons/EditIcon";
import { Tooltip } from "react-tooltip";
import SettingsProfileModal from "./Modals/SettingsProfileModal";
import "../customcss/CustomCardCss.css";

const SettingsProfile = ({ user, setSaveData }) => {
  const [searchableToggle, setSearchableToggle] = useState(
    user.settings.searchable
  );
  const [viewableToggle, setViewableToggle] = useState(user.settings.viewable);
  const [locationToggle, setLocationToggle] = useState(
    user.settings.showLocation
  );
  const [changingPassword, setChangingPassword] = useState(false);
  const [newPassword, setNewPassword] = useState();
  const [modalData, setModalData] = useState();
  const [address, setAddress] = useState();
  const [education, setEducation] = useState();
  const [work, setWork] = useState();
  const newPasswordRef = useRef(null);
  const retypePasswordRef = useRef(null);

  useEffect(() => {
    setSaveData({
      password: newPassword,
      address: address,
      education: education,
      work: work,
    });
  }, [newPassword, address, education, work]);

  const submitData = (data) => {
    if (data.type === "address") setAddress(data.data);
    if (data.type === "education") setEducation(data.data);
    if (data.type === "work") setWork(data.data);
  };

  return (
    <div className="flex justify-center w-full h-full p-4 text-xl">
      <div className="inner-settings-profile flex grid grid-cols-2 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0)] auto-rows-auto w-full  gap-4">
        <div className="flex flex-col bg-white bg-opacity-70 border-b-2 rounded-lg w-full h-full text-lg p-4 whitespace-pre divide-y divide-gray-200">
          <div className="flex drop-shadow-[0_1.2px_1.2px_rgba(135,135,135)] grid-cols-6 justify-center mb-3">
            <div className="flex flex-col pr-1 text-right">
              <p>Name:</p>
              <p>User:</p>
              <p>Password:</p>
              {changingPassword ? <p>Re-Type:</p> : ""}
              <p>Created:</p>
            </div>
            <div className="flex flex-col col-span-5 text-app_accent-700 pl-1">
              <p>
                {user.name.firstName} {user.name.lastName}
              </p>
              <p>{user.credentials.userName}</p>
              <div>
                {changingPassword ? (
                  <form
                    onSubmit={(event) => {
                      event.preventDefault();
                      setNewPassword(newPasswordRef.current?.value);
                      setChangingPassword(false);
                    }}
                  >
                    <div className="flex flex-col gap-1">
                      <div className="flex gap-1">
                        <TextInput
                          ref={newPasswordRef}
                          className="new-password"
                          placeholder="New Password"
                          id="new-password"
                          type="text"
                          sizing="sm"
                          required
                        />
                        <button
                          className="bg-app_accent-900 hover:bg-cyan-700 h-18 w-auto rounded-full px-2 text-sm text-white"
                          onSubmit={(event) => {
                            event.preventDefault();
                            setNewPassword(newPasswordRef.current?.value);
                            setChangingPassword(false);
                          }}
                        >
                          Submit
                        </button>
                      </div>
                      <div className="flex gap-1">
                        <TextInput
                          ref={retypePasswordRef}
                          className="new-password"
                          id="re-type-password"
                          placeholder="Re-type Password"
                          type="text"
                          sizing="sm"
                          required
                        />
                        <button
                          className="bg-app_accent-900 hover:bg-cyan-700 h-18 w-auto rounded-full px-2 text-sm text-white"
                          onClick={() => setChangingPassword(false)}
                        >
                          Cancel{" "}
                        </button>
                      </div>
                    </div>
                  </form>
                ) : (
                  <button
                    className="bg-app_accent-900 hover:bg-cyan-700 h-[26px] px-2 w-auto rounded-full text-sm text-white "
                    onClick={() => {
                      setChangingPassword((prevState) => !prevState);
                    }}
                  >
                    Change
                  </button>
                )}
              </div>
              <p>{user.created.toDate().toLocaleString()}</p>
            </div>
          </div>
          <div className="">
            <div className="flex grid grid-cols-2 auto-rows-auto gap-2 p-4 drop-shadow-[0_1.2px_1.2px_rgba(135,135,135)]">
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
        </div>
        <div className="flex flex-col bg-white bg-opacity-70 border-b-2 rounded-lg w-full h-full text-lg p-4">
          <div className="flex flex-col w-full divide-y divide-gray-200">
            <div className="flex w-full text-center justify-between drop-shadow-[0_1.2px_1.2px_rgba(135,135,135)] mb-2">
              <div className="invisible">j</div>
              <p>Location Info</p>
              <div
                className="flex hover:cursor-pointer"
                onClick={() =>
                  setModalData({ type: "address", ...user.profile.location })
                }
              >
                <EditIcon />
              </div>
            </div>
            <div className="flex grid-cols-6 justify-center pt-2 border-b-2 border-white">
              <div className="flex flex-col text-right pr-1 drop-shadow-[0_1.2px_1.2px_rgba(135,135,135)] ">
                <p>Address:</p>
              </div>
              <div className="flex flex-col text-app_accent-700 text-left pl-1 drop-shadow-[0_1.2px_1.2px_rgba(135,135,135)] ">
                {address ? (
                  <p>
                    {address.address}, {address.city}, {address.state},{" "}
                    {address.country}, {address.zip}
                  </p>
                ) : (
                  <p>
                    {user.profile.location.address},{" "}
                    {user.profile.location.city}, {user.profile.location.state},{" "}
                    {user.profile.location.country}, {user.profile.location.zip}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full divide-y divide-gray-200 mt-4 border-t-4 border-double border-gray-700">
            <div className="flex w-full text-center justify-between drop-shadow-[0_1.2px_1.2px_rgba(135,135,135)] mb-2 pt-3">
              <div className="invisible">j</div>
              <p>Education Info</p>
              <div
                className="flex hover:cursor-pointer"
                onClick={() =>
                  setModalData({
                    type: "education",
                    ...user.profile.education,
                  })
                }
              >
                <EditIcon />
              </div>
            </div>
            <div className="flex grid-cols-6 justify-center pt-2">
              <div className="flex flex-col text-right pr-1 drop-shadow-[0_1.2px_1.2px_rgba(135,135,135)] ">
                <p>Degree:</p>
                {!education && (
                  <>
                    {user.profile.education.degree.length > 22 ? (
                      <p className="invisible">j</p>
                    ) : (
                      ""
                    )}
                  </>
                )}
                {education && (
                  <>
                    {education.degree.length > 22 ? (
                      <p className="invisible">j</p>
                    ) : (
                      ""
                    )}
                  </>
                )}
                <p>School:</p>
              </div>
              <div className="flex flex-col text-app_accent-700 text-left pl-1 drop-shadow-[0_1.2px_1.2px_rgba(135,135,135)] ">
                <p>
                  {education ? education.degree : user.profile.education.degree}
                </p>
                <p>
                  {education ? education.school : user.profile.education.school}
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full divide-y divide-gray-200 mt-4 border-t-4 border-double border-gray-700">
            <div className="flex w-full text-center justify-between drop-shadow-[0_1.2px_1.2px_rgba(135,135,135)] mb-2 pt-3">
              <div className="invisible">j</div>
              <p>Occupational Info</p>
              <div
                className="flex hover:cursor-pointer"
                onClick={() =>
                  setModalData({
                    type: "work",
                    occupation: {
                      company_url: user.profile.company_url,
                      business_email: user.profile.email,
                      experience: user.profile.experience,
                      industry: user.profile.industry,
                      no_employees: user.profile.number_employees,
                      occupation: user.profile.occupation,
                      organization: user.profile.organization,
                      responsibilities: user.profile.responsibilities,
                    },
                  })
                }
              >
                <EditIcon />
              </div>
            </div>
            <div className="flex grid-cols-6 justify-center pt-2">
              <div className="flex flex-col text-right pr-1 drop-shadow-[0_1.2px_1.2px_rgba(135,135,135)] ">
                <p>Occupation:</p>
                {!work && (
                  <>
                    {user.profile.occupational.occupation.length > 22 ? (
                      <p className="invisible">j</p>
                    ) : (
                      ""
                    )}
                    <p>Industry:</p>
                    {user.profile.occupational.industry.length > 22 ? (
                      <p className="invisible">j</p>
                    ) : (
                      ""
                    )}
                    <p>Company:</p>
                    {user.profile.occupational.organization.length > 22 ? (
                      <p className="invisible">j</p>
                    ) : (
                      ""
                    )}
                    <p>Experience:</p>
                    {user.profile.occupational.experience.length > 22 ? (
                      <p className="invisible">j</p>
                    ) : (
                      ""
                    )}
                    <p>Employees:</p>
                    {user.profile.occupational.number_employees.length > 22 ? (
                      <p className="invisible">j</p>
                    ) : (
                      ""
                    )}
                    <p>URL:</p>
                    {user.profile.occupational.company_url.length > 22 ? (
                      <p className="invisible">j</p>
                    ) : (
                      ""
                    )}
                    <p>Email:</p>
                    {user.profile.occupational.email.length > 22 ? (
                      <p className="invisible">j</p>
                    ) : (
                      ""
                    )}
                  </>
                )}
                {work && (
                  <>
                    {work.occupation.length > 22 ? (
                      <p className="invisible">j</p>
                    ) : (
                      ""
                    )}
                    <p>Industry:</p>
                    {work.industry.length > 22 ? (
                      <p className="invisible">j</p>
                    ) : (
                      ""
                    )}
                    <p>Company:</p>
                    {work.organization.length > 22 ? (
                      <p className="invisible">j</p>
                    ) : (
                      ""
                    )}
                    <p>Experience:</p>
                    {work.experience.length > 22 ? (
                      <p className="invisible">j</p>
                    ) : (
                      ""
                    )}
                    <p>Employees:</p>
                    {work.number_employees.length > 22 ? (
                      <p className="invisible">j</p>
                    ) : (
                      ""
                    )}
                    <p>URL:</p>
                    {work.company_url.length > 22 ? (
                      <p className="invisible">j</p>
                    ) : (
                      ""
                    )}
                    <p>Email:</p>
                    {work.email.length > 22 ? (
                      <p className="invisible">j</p>
                    ) : (
                      ""
                    )}
                  </>
                )}
                <p>Duties:</p>
              </div>
              <div className="flex flex-col text-app_accent-700 text-left pl-1 drop-shadow-[0_1.2px_1.2px_rgba(135,135,135)] ">
                <p className="w-fit break-all">
                  {user.profile.occupational.occupation}
                </p>
                <p className="w-fit break-all">
                  {user.profile.occupational.industry}
                </p>
                <p className="w-fit break-all">
                  {user.profile.occupational.organization}
                </p>
                <p className="w-fit break-all">
                  {user.profile.occupational.experience}
                </p>
                <p className="w-fit break-all">
                  {user.profile.occupational.number_employees}
                </p>
                <p className="w-fit break-all">
                  {user.profile.occupational.company_url}
                </p>
                <p className="w-fit break-all">
                  {user.profile.occupational.email}
                </p>
                <p className="w-fit break-all overflow-scroll">
                  {user.profile.occupational.responsibilities}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {modalData && (
        <SettingsProfileModal
          clearSettingsModal={() => {
            setModalData();
          }}
          data={modalData}
          submitData={(data) => submitData(data)}
        />
      )}
    </div>
  );
};

export default SettingsProfile;
