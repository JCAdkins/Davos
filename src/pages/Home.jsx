import DefaultCarousel from "../components/DefaultCarousel.jsx";
import { Button } from "flowbite-react";
import { Link } from "react-router-dom";
import IMAGES from "../images/Images.jsx";

const HomePage = () => {
  return (
    <div className="bg-gray-400">
      <div className="justify-center align-center bg-black">
        <div className="w-full h-full top-20 bottom-0 left-0 right-0 -z-10">
          <DefaultCarousel className="h-screen w-screen object-cover transition-opacity duration-300 visible opacity-100" />
        </div>
        <div className="absolute z-0 top-28 left-16">
          <div className="relative text-5xl max-w-[35ch] leading-tight text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] left-15 right-0 z-20">
            The{" "}
            <em className="italic text-black drop-shadow-[0_1.2px_1.2px_rgba(255,255,255)] text-7xl">
              premier
            </em>{" "}
            forum for elite business, thought & government leaders to
            collaborate and build the future.
          </div>
        </div>
      </div>
      <div className="justify-center mt-24 align-center bg-sky-900">
        <div className="flex flex-row">
          <div className="flex grow-0 ml-20 shrink w-1/2">
            <img src={IMAGES.podcast_home_1} alt="podcast picture"></img>
          </div>
          <div className="">
            <div className="text-5xl font-sans not-italic">
              <p className="-ml-12 mt-12">
                <em className="text-black drop-shadow-[0_1.2px_1.2px_rgba(255,255,255)]">
                  Davos On Air
                </em>{" "}
                - The
              </p>
              <p className="ml-6 mt-2">
                best <strong>conservative</strong>
              </p>
              <p className="ml-24 mt-2">podcast on the web.</p>
            </div>
            <div className="flex max-w-[50ch] text-lg mt-10">
              <p>
                "I listen to the Davos On Air podcast all the time! They talk
                about current events and bring on the best guest speakers with a
                wide variety of expertise."{" "}
                <strong className="italic">-Nancy A. </strong>
              </p>
            </div>
            <div className="mt-4 justify-end mx-auto">
              <Link to="/podcasts">
                <Button className="ml-48" color="light" pill>
                  Listen Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="justify-center align-center bg-sky-900">
        <div className="flex flex-row">
          <div className="ml-28 mt-12 text-5xl font-sans justify-items-center">
            <p>
              Become a{" "}
              <em className="italic text-black drop-shadow-[0_1.2px_1.2px_rgba(255,255,255)]">
                Davos In
              </em>
            </p>
            <p className="ml-20 mt-2">
              <em className="italic text-black drop-shadow-[0_1.2px_1.2px_rgba(255,255,255)]">
                The Desert
              </em>{" "}
              member
            </p>
            <div className="flex max-w-[45ch] text-lg ml-10 mt-12">
              <p>
                ...and join thousands of people just like you! Have your voice
                heard by those that want to <em>DO</em> something about it. Now
                is the time to take actions.
              </p>
            </div>
            <div className="mt-4 justify-center mx-auto">
              <Link to="/new_account">
                <Button className="ml-52" color="dark" pill>
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
          <div className="w-1/2 ml-6">
            <img src={IMAGES.member_home_1} alt="Member picture"></img>
          </div>
        </div>
      </div>
      <div className="justify-center align-center bg-sky-900">
        <div className="flex flex-row">
          <div className="flex grow-0 ml-20 shrink w-43%">
            <img src={IMAGES.event_home_2} alt="Events picture"></img>
          </div>
          <div className="">
            <div className="text-5xl font-sans not-italic">
              <p className="ml-20 mt-12">Party and mingle</p>
              <p className="ml-40 mt-2">
                with your{" "}
                <em className="italic text-black drop-shadow-[0_1.2px_1.2px_rgba(255,255,255)]">
                  Davos
                </em>{" "}
                pals.
              </p>
            </div>
            <div className="flex max-w-[50ch] text-lg mt-10 ml-24">
              <p>
                Events are held frequently and you do not want to miss out on
                all of the fun. Socialize and grow your political network. What
                can you achieve with your newfound connections?
              </p>
            </div>
            <div className="mt-4 justify-end mx-auto">
              <Link to="/events">
                <Button className="ml-72" color="light" pill>
                  View Events
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="w-screen bg-black justify-center mt-24">
        <img src={IMAGES.reagan_home_2} alt="Ronald Reagan Quote"></img>
      </div>
    </div>
  );
};

export default HomePage;
