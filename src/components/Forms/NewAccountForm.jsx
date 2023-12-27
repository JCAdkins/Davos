import {
  Button,
  Checkbox,
  Label,
  TextInput,
  Datepicker,
  Textarea,
} from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { useState, useContext, useRef, useEffect } from "react";
import addUser from "../../services/addUser";
import UserContext from "../../contexts/UserContext";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../utils/firebase";
import { EDUCATION } from "../../assets/EDUCATION";
import SelectInput from "../Input/SelectInput";
import { STATES_LIST } from "../../assets/STATES_LIST";

const emailRegex = new RegExp(
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
);
const phoneRegex = new RegExp(
  /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/
);

const NewAccountForm = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [page, setPage] = useState(0);
  const uidRef = useRef();
  const [userTaken, setUserTaken] = useState();
  const [degree, setDegree] = useState("");
  const [state, setState] = useState("");
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  //uyukj

  const submitForm = async (event) => {
    const today = new Date();
    const userData = {
      username: event.email,
      name: {
        firstName: event.firstName,
        lastName: event.lastName,
      },
      membership: {
        cards: [],
        communication: { preference: "Phone", receive_promotions: true },
        pay_period: {
          begin: today,
          end: new Date(
            today.getFullYear() + 1,
            today.getMonth(),
            today.getDate() - 1
          ),
        },
        shipping: [],
        subscribed: true,
        tier: "yearly",
      },
      profile: {
        dob: new Date(event.dob),
        image:
          "https://firebasestorage.googleapis.com/v0/b/davos-57f96.appspot.com/o/tester_mctestington.png?alt=media&token=0c4ad935-6a4a-4424-b064-b47bebf25871&_gl=1*80ywfm*_ga*MTUzMzk2MTg0MC4xNjk3NTM3Mzk3*_ga_CW55HF8NVT*MTY5Nzc3MzE2OS4xNS4xLjE2OTc3NzMyOTQuNDMuMC4w",
        occupational: {
          organization: event.organization,
          occupation: event.occupation,
          experience: event.experience,
          responsibilities: event.responsibilities,
          company_url: event.company_url,
          number_employees: event.number_employees,
          industry: event.industry,
          email: event.company_email,
        },
        education: { school: event.school, degree: degree },
        location: { city: event.city, state: state },
        phone: event.phone,
        about: "",
      },
      roles: ["user", "subscriber"],
      subscribed: true,
      settings: {
        searchable: true,
        showLocation: true,
        viewable: true,
      },
      events: [],
      social: {
        friends: [],
        comments: [],
      },
      created: today,
      new: true,
      playlists: [
        {
          name: "current",
          podcasts: [],
        },
      ],
    };

    addUser(userData, uidRef.current);
    setUser(userData);
    navigate("/profile")

    // Implement logic to check for a successful post code here
  };

  useEffect(() => {
    console.log("user: ", user);
  }, [user])

  const checkPage = (user) => {
    console.log("checking page");
    if (page === 0) {
      const newUser = createUserEmailAndPassword(
        auth,
        user.email,
        user.password
      );

      newUser.then((data) => {
        uidRef.current = data;
        console.log(data);
        if (data) setPage(page + 1);
      });
    } else setPage(page + 1);
  };

  const createUserEmailAndPassword = async (auth, email, password) => {
    const uid = await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        return user.uid;
      })
      .catch((error) => {
        console.log("Error: ", error);
        setUserTaken("Username is taken.");
      });
    return uid;
  };

  return (
    <form className="flex max-w-md flex-col gap-4">
      {page === 0 && (
        <>
          <div className="flex flex-row gap-4">
            <div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="email" value="Email (username)" />
                </div>
                <TextInput
                  id="email"
                  placeholder="name@email.com"
                  shadow
                  type="email"
                  {...register("email", {
                    required: "Email is required.",
                    pattern: {
                      value: emailRegex,
                      message: "Invalid email address.",
                    },
                    onChange: () => {
                      userTaken ? setUserTaken() : {};
                    },
                  })}
                />
                <p className="text-red-600 text-sm">{userTaken}</p>
                <p className="text-red-600 text-sm">{errors.email?.message}</p>
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="firstName" value="First Name" />
                </div>
                <TextInput
                  id="firstName"
                  shadow
                  type="name"
                  {...register("firstName", {
                    required: "First name is required.",
                  })}
                />
                <p className="text-red-600 text-sm">
                  {errors.firstName?.message}
                </p>
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="password" value="Password" />
                </div>
                <TextInput
                  id="password"
                  shadow
                  type="password"
                  {...register("password", {
                    required: "Password is required.",
                    minLength: { value: 10, message: "Minimum 10 characters" },
                  })}
                />
                <p className="text-red-600 text-sm">
                  {errors.password?.message}
                </p>
              </div>
            </div>
            <div>
              <div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="dob" value="Date of Birth" />
                  </div>{" "}
                  <Controller
                    control={control}
                    name="dob"
                    render={({ field }) => (
                      <Datepicker
                        id="dob"
                        shadow
                        type="birthdate"
                        onSelectedDateChanged={(dob) => field.onChange(dob)}
                      />
                    )}
                    {...register("dob", {
                      required: "Date of birth is required.",
                      validate: {
                        olderThan18: (date) => {
                          const today = new Date();
                          const eighteen = new Date(
                            today.setFullYear(today.getFullYear() - 18)
                          );
                          return date > eighteen
                            ? "Must be older than 18."
                            : true;
                        },
                      },
                    })}
                  ></Controller>
                  <p className="text-red-600 text-sm">{errors.dob?.message}</p>
                </div>
                <div className="mb-2 block">
                  <Label htmlFor="lastName" value="Last Name" />
                </div>
                <TextInput
                  id="lastName"
                  shadow
                  type="name"
                  {...register("lastName", {
                    required: "Last name is required.",
                  })}
                />
                <p className="text-red-600 text-sm">
                  {errors.lastName?.message}
                </p>
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="repeat_password" value="Repeat password" />
                </div>
                <TextInput
                  id="repeat_password"
                  shadow
                  type="password"
                  {...register("repeat_password", {
                    required: "Password is required.",
                    minLength: { value: 10, message: "Minimum 10 characters" },
                    validate: {
                      passwordsMatch: (repeat_password) =>
                        watch("password") === repeat_password
                          ? true
                          : "Passwords don't match.",
                    },
                  })}
                />
                <p className="text-red-600 text-sm">
                  {errors.repeat_password?.message}
                </p>
              </div>
            </div>
          </div>
          <Button
            className="bg-app_accent-900"
            type="submit"
            onClick={handleSubmit(checkPage)}
          >
            Continue
          </Button>
        </>
      )}
      {page === 2 && (
        <>
          <div className="flex flex-row gap-4">
            <div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="organization" value="Organization" />
                </div>
                <TextInput
                  id="organization"
                  placeholder="Fake Company"
                  shadow
                  type="input"
                  {...register("organization")}
                />
                <p className="text-red-600 text-sm">
                  {errors.organization?.message}
                </p>
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="occupation" value="Occupation" />
                </div>
                <TextInput
                  id="occupation"
                  shadow
                  type="input"
                  {...register("occupation")}
                />
                <p className="text-red-600 text-sm">
                  {errors.occupation?.message}
                </p>
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="experience" value="Years Experience" />
                </div>
                <input
                  className="rounded-lg text-black"
                  id="experience"
                  type="number"
                  min="0"
                  max="100"
                  {...register("experience")}
                />
                <p className="text-red-600 text-sm">
                  {errors.experience?.message}
                </p>
              </div>
            </div>
            <div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="industry" value="Industry" />
                </div>
                <TextInput
                  id="industry"
                  shadow
                  type="name"
                  {...register("industry")}
                />
                <p className="text-red-600 text-sm">
                  {errors.industry?.message}
                </p>
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="company_url" value="Company Website" />
                </div>
                <TextInput
                  id="company_url"
                  shadow
                  type="name"
                  {...register("company_url")}
                />
                <p className="text-red-600 text-sm">
                  {errors.company_url?.message}
                </p>
              </div>
              <div>
                <div className="mb-2 block">
                  <Label
                    htmlFor="number_employees"
                    value="Number of Employees"
                  />
                </div>{" "}
                <input
                  className="rounded-lg text-black"
                  id="number_employees"
                  type="number"
                  min="0"
                  max="100"
                  {...register("number_employees")}
                />
                <p className="text-red-600 text-sm">
                  {errors.number_employees?.message}
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="flex flex-row gap-2">
              <Checkbox
                id="agree"
                {...register("agree", {
                  required: "You must agree with the T&C's.",
                })}
              />
              <Label className="flex gap-1" htmlFor="agree">
                <p>I agree with the </p>
                <Link
                  className="text-cyan-600 hover:underline dark:text-cyan-500"
                  href="/forms"
                >
                  <p>{" " + "terms and conditions"}</p>
                </Link>
              </Label>
            </div>
            <p className="text-red-600 text-sm">{errors.agree?.message}</p>
          </div>
          <Button
            className="bg-app_accent-900"
            type="submit"
            onClick={handleSubmit(submitForm)}
          >
            Register new account
          </Button>
        </>
      )}
      {page === 1 && (
        <>
          <div className="flex flex-row gap-4">
            <div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="city" value="City" />
                </div>
                <TextInput
                  id="city"
                  shadow
                  type="input"
                  {...register("city", {
                    required: "City is required.",
                  })}
                />
                <p className="text-red-600 text-sm">{errors.city?.message}</p>
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="phone" value="Phone" />
                </div>
                <TextInput
                  id="phone"
                  shadow
                  type="input"
                  {...register("phone", {
                    required: "Phone number is required.",
                    pattern: {
                      value: phoneRegex,
                      message: "Invalid phone number.",
                    },
                  })}
                />
                <p className="text-red-600 text-sm">{errors.phone?.message}</p>
              </div>
            </div>
            <div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="state" value="State" />
                </div>
                <SelectInput
                  id="state"
                  shadow
                  type="state"
                  name="state"
                  onChange={(event) => setState(event.target.value)}
                  defaultValue={state}
                  options={STATES_LIST}
                />
                <p className="text-red-600 text-sm">
                  {errors.education_state?.message}
                </p>
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="school" value="School" />
                </div>
                <TextInput
                  id="school"
                  shadow
                  type="name"
                  {...register("school")}
                />
                <p className="text-red-600 text-sm">{errors.school?.message}</p>
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="degree" value="Degree" />
                </div>
                <SelectInput
                  id="degree"
                  shadow
                  type="name"
                  defaultValue={degree}
                  onChange={(event) => setDegree(event.target.value)}
                  options={EDUCATION}
                />
                <p className="text-red-600 text-sm">{errors.degree?.message}</p>
              </div>
            </div>
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="company_email" value="Company Email" />
            </div>
            <TextInput
              id="company_email"
              placeholder="name@business_email.com"
              shadow
              type="email"
              {...register("company_email", {
                pattern: {
                  value: emailRegex,
                  message: "Invalid email address.",
                },
              })}
            />
            <p className="text-red-600 text-sm">
              {errors.company_email?.message}
            </p>
          </div>
          <div className="max-w-md" id="textarea">
            <div className="mb-2 block">
              <Label htmlFor="responsibilities" value="Responsibilities" />
            </div>
            <Textarea
              id="responsibilities"
              placeholder="What are your responsibilities..."
              rows={4}
              {...register("responsibilities")}
            />
          </div>
          <Button
            className="bg-app_accent-900"
            type="submit"
            onClick={handleSubmit(checkPage)}
          >
            Continue
          </Button>
        </>
      )}
    </form>
  );
};

export default NewAccountForm;
