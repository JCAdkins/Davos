import { useEffect, useState, useContext, useRef } from "react";
import { Timestamp } from "firebase/firestore";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { auth } from "../utils/firebase";
import updateUser from "../services/updateUser";
import UserContext from "../contexts/UserContext";
import EllipsisCircle from "./EllipsisCircle";
import { Textarea, TextInput } from "flowbite-react";
import { STATES_LIST } from "../assets/STATES_LIST";
import SelectInput from "./Input/SelectInput";
import { NUMBERS_1TO50 } from "../assets/NUMBERS_1TO50";
import { EDUCATION } from "../assets/EDUCATION";
import ProfilePicModal from "./Modals/ProfilePicModal";

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
    updateUser(auth.currentUser.uid, {
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
    updateUser(auth.currentUser.uid, {
      profile: {
        ...user.profile,
        experience: yearsExp,
        occupation: occupationRef.current.value,
        organization: organizationRef.current.value,
      },
    });
    setUser({
      ...user,
      profile: {
        ...user.profile,
        experience: yearsExp,
        occupation: occupationRef.current.value,
        organization: organizationRef.current.value,
      },
    });
    setEditingCareer(false);
  };

  const editEducation = () => {
    setEditingEducation(true);
  };

  const submitEducation = (event) => {
    event ? event.preventDefault() : {};
    updateUser(auth.currentUser.uid, {
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
    // There are two ways to submit the data one with onSubmit which provides an event and another which doesn't
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
      updateUser(auth.currentUser.uid, {
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
      updateUser(auth.currentUser.uid, {
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
          updateUser(auth.currentUser.uid, { new: false });
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
    <div className="p-16 bg-gray-300">
      <div className="p-8 bg-white shadow mt-24">
        {/* <div className="flex items-center justify-center w-full -mb-40">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <img
              className=""
              src="https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg"
              alt="Background Image"
            />
          </div>
        </div> */}
        <div className="grid grid-cols-1 md:grid-cols-3">
          {" "}
          <div className="grid grid-cols-2 text-center order-last md:order-first mt-20 md:mt-0">
            {" "}
            <div>
              {" "}
              <p className="font-bold text-gray-700 text-xl">22</p>{" "}
              <p className="text-gray-400">Friends</p>{" "}
            </div>{" "}
            <div>
              {" "}
              <p className="font-bold text-gray-700 text-xl">89</p>{" "}
              <p className="text-gray-400">Comments</p>{" "}
            </div>{" "}
          </div>{" "}
          <div className="relative">
            {" "}
            <div className="w-48 h-48 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center">
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
            </div>{" "}
          </div>{" "}
          <div className="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center">
            <button className="text-white py-2 px-4 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
              {" "}
              Connect
            </button>{" "}
            <button className="text-white py-2 px-4 uppercase rounded bg-gray-700 hover:bg-gray-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
              {" "}
              Message
            </button>{" "}
          </div>{" "}
        </div>{" "}
        <div className="mt-20 text-center border-b pb-12">
          {" "}
          <h1 className="text-4xl font-medium mb-4 text-gray-700">
            {user.name.firstName + " " + user.name.lastName},{" "}
            <span className="font-light text-gray-500">
              {getAge(user.profile.dob)}
            </span>
          </h1>{" "}
          <div className="group justify-center">
            <button
              class="hidden -mt-3 group-hover:inline-block text-black"
              onClick={() => {
                editLocation();
              }}
            >
              <EllipsisCircle />
            </button>

            {editingLocation && (
              <form
                type="submit"
                className="flex-row justify center mb-4 -mt-2"
                onBlur={(e) => {
                  e.currentTarget.contains(e.relatedTarget) ? {} : cancelEdit();
                }}
                onSubmit={submitLocation}
              >
                {" "}
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
                  ></TextInput>
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
                </div>{" "}
              </form>
            )}

            {!editingLocation && (
              <p className="font-light text-gray-600 -mt-2 mb-10">
                {user.profile.location.city +
                  ", " +
                  user.profile.location.state}
              </p>
            )}
          </div>
          <div className="group justify-cente mb-4">
            <button
              class="hidden -mt-3 group-hover:inline-block text-black"
              onClick={editCareer}
            >
              <EllipsisCircle />
            </button>
            {editingCareer && (
              <form
                type="submit"
                className="flex-row justify center mb-4 -mt-2"
                onBlur={(e) => {
                  e.currentTarget.contains(e.relatedTarget) ? {} : cancelEdit();
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
              <div className="flex justify-center -mt-2 gap-2">
                {user.profile.occupation != "" && (
                  <>
                    <p className="text-gray-500">{user.profile.occupation}</p>
                    <p className="text-gray-500"> - </p>
                  </>
                )}

                {user.profile.experience > 0 && (
                  <>
                    <p className="text-gray-500">{user.profile.experience}</p>
                    <p className="text-gray-500"> Years - </p>
                  </>
                )}
                <p className="text-gray-500">{user.profile.organization}</p>
              </div>
            )}
          </div>
          <div className="group justify-center">
            <button
              class="hidden group-hover:inline-block text-black"
              onClick={editEducation}
            >
              <EllipsisCircle />
            </button>
            {editingEducation && (
              <form
                type="submit"
                className="flex-row justify center mb-4 -mt-2"
                onBlur={(e) => {
                  e.currentTarget.contains(e.relatedTarget) ? {} : cancelEdit();
                }}
                onSubmit={submitEducation}
              >
                {" "}
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
                </div>{" "}
              </form>
            )}
            {!editingEducation && (
              <div className="flex justify-center gap-2">
                <p className="-mt-2 text-gray-500">
                  {user.profile.education.school}
                </p>
                {<p className="-mt-2 text-gray-500"> - </p>}
                <p className="-mt-2 text-gray-500">
                  {user.profile.education.degree}
                </p>
              </div>
            )}
          </div>
        </div>{" "}
        <div className="group mt-12 flex justify-center">
          {" "}
          <div className="flex-col justify-center">
            <button
              className="hidden group-hover:inline-block text-center text-black"
              onClick={editAboutMe}
            >
              <EllipsisCircle />
            </button>
            <div className="flex-row justify-start text-gray-600 text-center font-light lg:px-16 whitespace-pre-line">
              {addAboutMe && (
                <>
                  <a
                    data-tooltip-content="Add an about me"
                    data-tooltip-place="bottom"
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
                ></Textarea>
              )}
              {!editingAboutMe && (
                <div className="max-w-[65ch] text-xl justify-center">
                  {user.profile.about ? user.profile.about : <p>[About ME]</p>}
                </div>
              )}
            </div>{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDisplay;
