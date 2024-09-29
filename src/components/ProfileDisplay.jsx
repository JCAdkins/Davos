import { useEffect, useState, useContext, useRef } from "react";
import { Timestamp } from "firebase/firestore";
import { Tooltip } from "react-tooltip";
import updateUser from "../services/updateUser";
import UserContext from "../contexts/UserContext";
import EditIcon from "./Icons/EditIcon";
import { Textarea, TextInput } from "flowbite-react";
import { STATES_LIST } from "../assets/STATES_LIST";
import SelectInput from "./Input/SelectInput";
import { NUMBERS_1TO50 } from "../assets/NUMBERS_1TO50";
import { EDUCATION } from "../assets/EDUCATION";
import ProfilePicModal from "./Modals/ProfilePicModal";

const convertSeconds = (date) => {
  return date.seconds
    ? new Date(date.seconds * 1000)
    : new Date(date._seconds * 1000);
};

function getAge(dateString) {
  console.log(dateString);
  var today = new Date();
  var birthDate =
    dateString instanceof Timestamp
      ? dateString.toDate()
      : dateString.seconds || dateString._seconds
      ? convertSeconds(dateString)
      : new Date(dateString);
  console.log(birthDate);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}
const cityRegEx = new RegExp(/[a-zA-Z-]+/);

const ProfileDisplay = () => {
  const [addAboutMe, setAddAboutMe] = useState(false);
  const [addProfilePic, setAddProfilePic] = useState(false);
  const [editingAboutMe, setEditingAboutMe] = useState(false);
  const [editingLocation, setEditingLocation] = useState(false);
  const [editingCareer, setEditingCareer] = useState(false);
  const [editingEducation, setEditingEducation] = useState(false);
  const [editingProfilePic, setEditingProfilePic] = useState(false);
  const aboutMeRef = useRef(null);
  const cityRef = useRef(null);
  const occupationRef = useRef(null);
  const organizationRef = useRef(null);
  const schoolRef = useRef(null);
  const { user, setUser } = useContext(UserContext);
  const [state, setState] = useState(user.profile.location.state);
  const [yearsExp, setYearsExp] = useState(user.profile.experience);
  const [degree, setDegree] = useState(user.profile.education.degree);

  const setProfilePic = () => {
    setEditingProfilePic(true);
  };
  const editAboutMe = () => {
    setEditingAboutMe(true);
  };
  const submitAboutMe = () => {
    updateUser({
      profile: { ...user.profile, about: aboutMeRef.current.value },
    });
    setUser({
      ...user,
      profile: { ...user.profile, about: aboutMeRef.current.value },
    });
    setEditingAboutMe(false);
  };

  const editCareer = () => {
    setEditingCareer(true);
  };

  const submitCareer = () => {
    const upU = updateUser({
      profile: {
        ...user.profile,
        occupational: {
          ...user.profile.occupational,
          experience: yearsExp,
          occupation: occupationRef.current.value,
          organization: organizationRef.current.value,
        },
      },
    });
    setUser({
      ...user,
      profile: {
        ...user.profile,
        occupational: {
          ...user.profile.occupational,
          experience: yearsExp,
          occupation: occupationRef.current.value,
          organization: organizationRef.current.value,
        },
      },
    });
    console.log("upU: ", upU);
    setEditingCareer(false);
  };

  const editEducation = () => {
    setEditingEducation(true);
  };

  const submitEducation = (event) => {
    event ? event.preventDefault() : {};
    updateUser({
      profile: {
        ...user.profile,
        education: { school: schoolRef.current.value, degree: degree },
      },
    });
    setUser({
      ...user,
      profile: {
        ...user.profile,
        education: { school: schoolRef.current.value, degree: degree },
      },
    });
    setEditingEducation(false);
  };

  const editLocation = () => {
    setEditingLocation(true);
  };

  const submitLocation = (event) => {
    // There are two ways to submit the data, one with onSubmit which provides an event and another which doesn't
    // provide an event in which case we have to check for an event here before preventing the window refresh
    event ? event.preventDefault() : {};

    // If data submitted is the same as what's already there we do nothing
    if (
      cityRef.current.value === user.profile.location.city &&
      state === user.profile.location.state
    ) {
      setEditingLocation(false);
      return;
    }

    // Make sure city entered is at least kinda valid before updating the db with the new data; maybe
    // utilize a way to check major cities in the future.
    if (cityRef.current.value.match(cityRegEx)) {
      updateUser({
        profile: {
          ...user.profile,
          location: { city: cityRef.current.value, state: state },
        },
      });
      setUser({
        ...user,
        profile: {
          ...user.profile,
          location: { city: cityRef.current.value, state: state },
        },
      });
      setEditingLocation(false);
    }
    // If we reach this else block then the user input isn't valid
    else {
      cityRef.current.style.background = "red";
    }
  };

  const cancelEdit = () => {
    if (editingAboutMe) setEditingAboutMe(false);
    if (editingLocation) setEditingLocation(false);
    if (editingCareer) setEditingCareer(false);
    if (editingEducation) setEditingEducation(false);
  };

  const onKeyUpEnter = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      if (editingAboutMe) submitAboutMe();
      if (editingLocation) submitLocation();
      if (editingCareer) submitCareer();
      if (editingEducation) submitEducation();
    }
  };

  const setUserProfPic = async (path) => {
    await path?.then((data) => {
      updateUser({
        profile: {
          ...user.profile,
          image: data,
        },
      });
      setUser({
        ...user,
        profile: {
          ...user.profile,
          image: data,
        },
      });
    });
    setEditingProfilePic(false);
  };

  useEffect(() => {
    user.new
      ? setTimeout(() => {
          updateUser({ new: false });
          setUser({ ...user, new: false });
          setAddProfilePic(true);
          setTimeout(() => {
            setAddProfilePic(false);
            setTimeout(() => {
              setAddAboutMe(true);
            }, 500);
            setTimeout(() => {
              setAddAboutMe(false);
            }, 2000);
          }, 2000);
        }, 700)
      : {};
  }, []);

  return (
    <div className="p-16 bg-app_accent-900 font-dmserif">
      <div className="p-8 bg-gray-300 rounded-md shadow mt-24">
        <div className="grid grid-cols-1 md:grid-cols-3">
          <div className="grid grid-cols-2 text-center order-last md:order-first mt-20 md:mt-0 drop-shadow-[0_1.2px_1.2px_rgba(95,95,95)]">
            <div>
              <p className="font-bold text-black text-xl">
                {user.social.friends.length}
              </p>
              <p className="text-gray-800">Friends</p>
            </div>
            <div>
              <p className="font-bold text-black text-xl">
                {user.social.comments.length}
              </p>
              <p className="text-gray-800">Comments</p>
            </div>
          </div>
          <div className="relative">
            <div className="w-48 h-48 mx-auto z-10 rounded-full shadow-2xl drop-shadow-[0_6px_6px_rgba(95,95,95)] absolute inset-x-0 top-0 -mt-24 flex items-center justify-center">
              {addProfilePic && (
                <>
                  <img
                    data-tooltip-content="Add a profile picture"
                    data-tooltip-place="top"
                    data-tooltip-id="my-tooltip"
                    className="rounded-full w-48 h-48 hover:cursor-pointer"
                    src={user.profile.image}
                    alt={user.name}
                  />
                  <Tooltip id="my-tooltip" isOpen />
                </>
              )}
              {!addProfilePic && (
                <img
                  className="rounded-full w-48 h-48 hover:cursor-pointer"
                  src={user.profile.image}
                  alt={user.name}
                  onClick={setProfilePic}
                />
              )}
              {editingProfilePic && (
                <ProfilePicModal setUser={setUserProfPic} />
              )}
            </div>
          </div>
          <div className="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center drop-shadow-[0_2px_2px_rgba(95,95,95)]">
            <button className="text-white py-2 px-4 uppercase rounded bg-app_accent-600 active:drop-shadow-[0_2px_2px_rgba(95,95,95)] shadow hover:drop-shadow-[0_3px_3px_rgba(95,95,95)] hover:shadow-lg font-medium transition transform active:bg-app_accent-700 hover:scale-105 hover:-translate-y-0.5">
              Connect
            </button>
            <button className="text-white py-2 px-4 uppercase rounded bg-app_accent-600 active:drop-shadow-[0_2px_2px_rgba(95,95,95)] hover:drop-shadow-[0_3px_3px_rgba(95,95,95)] hover:scale-105 active:bg-app_accent-700 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
              Message
            </button>
          </div>
        </div>
        <div className="flex justify-center w-full mt-4 drop-shadow-[0_3px_3px_rgba(95,95,95)]">
          <div className="flex items-center bg-app_main w-fit h-full px-4 rounded-md ">
            <div className="w-fit mt-10 text-center pb-12">
              <h1 className="text-4xl font-medium mb-4 text-black drop-shadow-[0_1.2px_1.2px_rgba(95,95,95)] ">
                {user.name.firstName + " " + user.name.lastName},{" "}
                <span className="font-light text-black">
                  {getAge(user.profile.dob)}
                </span>
              </h1>
              <div className="group justify-center">
                <button
                  // class="hidden -mt-3 group-hover:inline-block text-black"
                  className="hidden -mt-3 text-black"
                  onClick={() => {
                    editLocation();
                  }}
                >
                  <EditIcon />
                </button>

                {editingLocation && (
                  <form
                    type="submit"
                    className="flex-row justify center mb-4 -mt-2"
                    onBlur={(e) => {
                      e.currentTarget.contains(e.relatedTarget)
                        ? {}
                        : cancelEdit();
                    }}
                    onSubmit={submitLocation}
                  >
                    <div className="flex flex-row w-full items-center gap-2 scale-75 justify-center">
                      <TextInput
                        ref={cityRef}
                        type="input"
                        autoFocus
                        className="w-fit"
                        id="city"
                        defaultValue={user.profile.location.city}
                        placeholder="City"
                        onChange={() => {
                          cityRef.current
                            ? (cityRef.current.style.background = "white")
                            : {};
                        }}
                        shadow
                      />
                      <SelectInput
                        type="input"
                        id="state"
                        value={state}
                        onKeyDown={(e) => {
                          cityRef.current.value
                            ? onKeyUpEnter(e)
                            : (cityRef.current.style.background = "red");
                        }}
                        onChange={(e) => {
                          setState(e.target.value);
                        }}
                        options={STATES_LIST}
                      />
                    </div>
                  </form>
                )}
                {!editingLocation && (
                  <p className="font-light text-black -mt-2 mb-10 drop-shadow-[0_3px_3px_rgba(95,95,95)]">
                    {user.profile.location.city +
                      ", " +
                      user.profile.location.state}
                  </p>
                )}
              </div>
              <div className="group justify-center mb-4">
                <button
                  // class="hidden -mt-3 group-hover:inline-block text-black"
                  className="hidden -mt-3 text-black"
                  onClick={editCareer}
                >
                  <EditIcon />
                </button>
                {editingCareer && (
                  <form
                    type="submit"
                    className="flex-row justify center mb-4 -mt-2"
                    onBlur={(e) => {
                      e.currentTarget.contains(e.relatedTarget)
                        ? {}
                        : cancelEdit();
                    }}
                    onSubmit={submitCareer}
                  >
                    <div className="flex flex-row w-full items-center gap-2 scale-75 justify-center">
                      <TextInput
                        autoFocus
                        ref={occupationRef}
                        type="input"
                        defaultValue={user.profile.occupation}
                        placeholder="Occupation"
                        shadow
                        onKeyDown={(e) => {
                          onKeyUpEnter(e);
                        }}
                        className="w-fit"
                      ></TextInput>
                      <SelectInput
                        type="input"
                        id="years"
                        value={yearsExp}
                        onKeyDown={(e) => {
                          onKeyUpEnter(e);
                        }}
                        onChange={(e) => {
                          setYearsExp(e.target.value);
                        }}
                        options={NUMBERS_1TO50}
                        className="w-fit"
                        placeholder="Exp"
                      ></SelectInput>
                      <TextInput
                        type="input"
                        ref={organizationRef}
                        defaultValue={user.profile.organization}
                        placeholder="Organization"
                        shadow
                        onKeyDown={(e) => {
                          onKeyUpEnter(e);
                        }}
                        className="w-fit"
                      ></TextInput>
                    </div>
                  </form>
                )}
                {!editingCareer && (
                  <div className="flex justify-center -mt-2 gap-2 drop-shadow-[0_1.2px_1.2px_rgba(95,95,95)] ">
                    {user.profile.occupational.occupation != "" && (
                      <>
                        <p className="text-black">
                          {user.profile.occupational.occupation}
                        </p>
                        <p className="text-black"> - </p>
                      </>
                    )}

                    {user.profile.occupational.experience > 0 && (
                      <>
                        <p className="text-black">
                          {user.profile.occupational.experience}
                        </p>
                        <p className="text-black"> Years - </p>
                      </>
                    )}
                    <p className="text-black">
                      {user.profile.occupational.organization}
                    </p>
                  </div>
                )}
              </div>
              <div className="group justify-center">
                <button
                  // class="hidden group-hover:inline-block text-black"
                  className="hidden text-black"
                  onClick={editEducation}
                >
                  <EditIcon />
                </button>
                {editingEducation && (
                  <form
                    type="submit"
                    className="flex-row justify center mb-4 -mt-2"
                    onBlur={(e) => {
                      e.currentTarget.contains(e.relatedTarget)
                        ? {}
                        : cancelEdit();
                    }}
                    onSubmit={submitEducation}
                  >
                    <div className="flex flex-row w-full items-center gap-2 scale-75 justify-center">
                      <TextInput
                        ref={schoolRef}
                        type="input"
                        autoFocus
                        className="w-fit"
                        id="school"
                        defaultValue={user.profile.education.school}
                        placeholder="School"
                        shadow
                      ></TextInput>
                      <SelectInput
                        type="input"
                        id="degree"
                        value={degree}
                        onKeyDown={(e) => onKeyUpEnter(e)}
                        onChange={(e) => {
                          setDegree(e.target.value);
                        }}
                        options={EDUCATION}
                      />
                    </div>
                  </form>
                )}
                {!editingEducation && (
                  <div className="flex justify-center gap-2 drop-shadow-[0_1.2px_1.2px_rgba(95,95,95)]">
                    <p className="-mt-2 text-black">
                      {user.profile.education.school}
                    </p>
                    {<p className="-mt-2 text-black"> - </p>}
                    <p className="-mt-2 text-black">
                      {user.profile.education.degree}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 flex justify-center drop-shadow-[0_4px_4px_rgba(95,95,95)]">
          <div className="group flex bg-app_main items-center flex-col basis-3/4 p-4 rounded-md">
            <button
              className="hidden group-hover:inline-block text-center text-black"
              onClick={editAboutMe}
            >
              <EditIcon />
            </button>
            <div className="w-full justify-center items-center content-center flex-row text-black text-center font-light lg:px-16 whitespace-pre-line">
              {addAboutMe && (
                <>
                  <a
                    data-tooltip-content="Add an about me"
                    data-tooltip-place="top"
                    data-tooltip-id="about-me-tooltip"
                  ></a>
                  <Tooltip id="about-me-tooltip" isOpen={addAboutMe} />
                </>
              )}
              {editingAboutMe && (
                <Textarea
                  id="about_me"
                  ref={aboutMeRef}
                  autoFocus
                  type="submit"
                  onBlur={cancelEdit}
                  rows={5}
                  onKeyDown={(e) => onKeyUpEnter(e)}
                  defaultValue={
                    user.profile.about ? user.profile.about : "[About ME]"
                  }
                  className="max-w-[65ch] w-full text-xl text-center justify-center"
                ></Textarea>
              )}
              {!editingAboutMe && (
                <div className="max-w-[55ch] text-xl border-x-8 break-words w-full p-4 border-double border-gray-300 justify-center drop-shadow-[0_1.2px_1.2px_rgba(95,95,95)]">
                  {user.profile.about ? user.profile.about : <p>[About ME]</p>}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDisplay;
