import { useState, useRef, useEffect, Suspense } from "react";
import { Button } from "flowbite-react";
import { Link } from "react-router-dom";
import { lazyWithPreload } from "react-lazy-with-preload";
import IMAGES from "../images/Images.jsx";
import "../customcss/CustomCardCss.css";

const Video1 = lazyWithPreload(() =>
  import("../components/Video1Component.jsx")
);
const Video2 = lazyWithPreload(() =>
  import("../components/Video2Component.jsx")
);
const Video3 = lazyWithPreload(() =>
  import("../components/Video3Component.jsx")
);
const Video4 = lazyWithPreload(() =>
  import("../components/Video4Component.jsx")
);

const HomePage = () => {
  const [videoIndex, setVideoIndex] = useState(0);
  const [video1Disp, setVideo1Disp] = useState("block");
  const [video2Disp, setVideo2Disp] = useState("hidden");
  const [video3Disp, setVideo3Disp] = useState("hidden");
  const [video4Disp, setVideo4Disp] = useState("hidden");
  const vid1Ref = useRef(null);
  const vid2Ref = useRef(null);
  const vid3Ref = useRef(null);
  const vid4Ref = useRef(null);

  useEffect(() => {
    if (videoIndex === 0) {
      if (vid1Ref.current) vid1Ref.current.playbackRate = 2.0;

      vid1Ref.current?.play();
      vid4Ref.current ? (vid4Ref.current.currentTime = 0) : {};
      Video2.preload();
      setVideo4Disp("hidden");
      setVideo1Disp("block");
    }
    if (videoIndex === 1) {
      vid2Ref.current?.play();
      vid1Ref.current ? (vid1Ref.current.currentTime = 0) : {};
      Video3.preload();
      setVideo1Disp("hidden");
      setVideo2Disp("block");
    }
    if (videoIndex === 2) {
      vid3Ref.current?.play();
      vid2Ref.current ? (vid2Ref.current.currentTime = 0) : {};
      Video4.preload();
      setVideo2Disp("hidden");
      setVideo3Disp("block");
    }
    if (videoIndex === 3) {
      vid4Ref.current?.play();
      vid3Ref.current ? (vid3Ref.current.currentTime = 0) : {};
      Video1.preload();
      setVideo3Disp("hidden");
      setVideo4Disp("block");
    }
  }, [videoIndex]);

  useEffect(() => {
    Video1.preload();
  }, []);

  return (
    <div className="flex-col bg-app_bg font-dmserif">
      <div className="flex-col h-screen w-screen">
        <div className="absolute top-0 left-0">
          <Suspense
            fallback={
              <div
                role="status"
                className="flex items-center justify-center h-56 max-w-sm bg-gray-300 rounded-lg animate-pulse dark:bg-gray-700"
              >
                <svg
                  className="w-10 h-10 text-gray-400 dark:text-gray-600"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 16 20"
                >
                  <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                  <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM9 13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2Zm4 .382a1 1 0 0 1-1.447.894L10 13v-2l1.553-1.276a1 1 0 0 1 1.447.894v2.764Z" />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            }
          >
            <Video1
              ref={vid1Ref}
              onEnded={() => {
                setVideoIndex((videoIndex) => (videoIndex + 1) % 4);
              }}
              style={video1Disp}
            />
            <Video2
              ref={vid2Ref}
              onEnded={() => {
                setVideoIndex((videoIndex) => (videoIndex + 1) % 4);
              }}
              style={video2Disp}
            />
            <Video3
              ref={vid3Ref}
              onEnded={() => {
                setVideoIndex((videoIndex) => (videoIndex + 1) % 4);
              }}
              style={video3Disp}
            />
            <Video4
              ref={vid4Ref}
              onEnded={() => {
                setVideoIndex((videoIndex) => (videoIndex + 1) % 4);
              }}
              style={video4Disp}
            />
            <div className="flex w-full justify-between">
              <a className="bg-black" href="http://videezy.com">
                Free B-Roll provided by Videezy
              </a>
              {/* <p className="bg-black text-white">
                *Proper 4k video will look much more crisp.
              </p> */}
            </div>
          </Suspense>
        </div>
        <div className="flex relative w-2/3 h-1/2 m-12">
          <div className="flex text-xl md:text-3xl lg:text-5xl w-full text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
            <p className="drop-shadow-[0_1.2px_1.2px_rgba(0,0,0)]">
              The{" "}
              <span className="h-fit italic text-black drop-shadow-[0_1.2px_1.2px_rgba(255,255,255)] text-3xl md:text-4xl lg:text-7xl">
                premier
              </span>{" "}
              forum for elite business, thought & government leaders to
              collaborate and build the future.
            </p>
          </div>
        </div>
        <div className="empty-container w-screen h-1/2"></div>
      </div>
      <div className="lg:hidden bg-app_accent-900 flex flex-col text-xl">
        <div className="flex flex-col justify-center items-center w-full border-double border-x-8 border-t-8 sm:border-none border-white">
          <div className="w-full">
            <div className="sm:hidden w-screen">
              <div className="flex flex-wrap max-w-[38ch] items-center justify-center text-center text-2xl whitespace-pre py-4 px-8">
                <em className="text-black font-bold text-shadow shadow-app_accent-300 drop-shadow-[0_1.2px_1.2px_rgba(255,255,255)]">
                  Davos On Air:
                </em>{" "}
                The best{" "}
                <strong className="flex text-center text-red-400">
                  conservative{" "}
                </strong>{" "}
                podcast on the web!
              </div>
            </div>
            <img
              className="w-full h-auto"
              src={IMAGES.podcast_home_2}
              alt="podcast picture"
            ></img>
          </div>
          <div className="flex w-full items-center justify-center text-center">
            <div className="flex-col items-center justify-center sm:border-double sm:border-x-8 sm:border-white text-center">
              <div className="hidden sm:block">
                <div className="flex flex-wrap max-w-[38ch] items-center justify-center text-center text-2xl whitespace-pre p-8">
                  <em className="text-black font-bold text-shadow shadow-app_accent-300 drop-shadow-[0_1.2px_1.2px_rgba(255,255,255)]">
                    Davos On Air:
                  </em>{" "}
                  The best{" "}
                  <strong className="flex text-center text-red-400">
                    conservative{" "}
                  </strong>{" "}
                  podcast on the web!
                </div>
              </div>
              <div className="flex w-full items-center justify-center text-center">
                <div className=" max-w-[35ch]">
                  <p className="italic">
                    "I listen to the Davos On Air podcast all the time! They
                    talk about current events and bring on the best guest
                    speakers with a wide variety of expertise."{" "}
                    <strong className="not-italic text-black">
                      -Nancy A.{" "}
                    </strong>
                  </p>
                </div>
              </div>
              <div className="mt-4 pb-8 flex w-full justify-center">
                <Link to="/podcasts">
                  <Button color="dark" size="md" pill>
                    Listen Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center w-full border-double border-white border-x-8 sm:border-none">
          <div className="flex flex-col justify-center items-center w-full border-y-2 border-white sm:border-none">
            <div className="sm:hidden flex flex-wrap items-center justify-center text-center text-2xl whitespace-pre p-4">
              <p>Become a </p>
              <em className="text-black font-bold text-shadow shadow-app_accent-300 drop-shadow-[0_1.2px_1.2px_rgba(255,255,255)]">
                Davos In The Desert{" "}
              </em>
              member now
            </div>
            <img
              className="w-full h-auto"
              src={IMAGES.member_home_1}
              alt="podcast picture"
            ></img>
            <div className="flex w-full items-center justify-center text-center">
              <div className="flex w-full items center justify-center">
                <div className="flex-col items-center justify-center text-center sm:border-double sm:border-x-8 sm:border-white">
                  <div className="hidden sm:block">
                    <div className="flex flex-wrap items-center justify-center text-center text-2xl whitespace-pre p-8">
                      <p>Become a </p>
                      <em className="text-black font-bold text-shadow shadow-app_accent-300 drop-shadow-[0_1.2px_1.2px_rgba(255,255,255)]">
                        Davos In The Desert{" "}
                      </em>
                      member now
                    </div>
                  </div>
                  <div className="flex w-full items-center justify-center text-center">
                    <div>
                      <p className="text-center max-w-[30ch]">
                        ...and join thousands of people just like you! Have your
                        voice heard by those that want to <span>DO</span>{" "}
                        something about it. Now is the time to take actions.
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 mb-2 text-red-500 text-center">
                    <p className="">*Special offers available</p>
                  </div>
                  <div className="flex w-full justify-center">
                    <div className="mb-8 flex w-2/3 justify-center">
                      <Link to="/new_account">
                        <Button className="w-full" color="dark" size="md" pill>
                          Sign Up
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center w-full border-double border-white border-x-8 border-b-8 sm:border-none">
          <div className="sm:hidden flex flex-wrap items-center justify-center text-center text-2xl whitespace-pre my-8 sm:px-14">
            Party & mingle with all of your{" "}
            <em className="text-black font-bold text-shadow shadow-app_accent-300 drop-shadow-[0_1.2px_1.2px_rgba(255,255,255)]">
              Davos{" "}
            </em>
            pals
          </div>
          <img
            className="w-full h-auto"
            src={IMAGES.event_homepage}
            alt="podcast picture"
          ></img>
          <div className="flex w-full items-center justify-center text-center">
            <div className="flex-col sm:border-b-0 items-center justify-center text-center sm:border-double sm:border-x-8 sm:border-white">
              <div className="hidden sm:block">
                <div className="flex flex-wrap items-center justify-center text-center text-2xl whitespace-pre my-8 sm:px-14">
                  Party & mingle with all of your{" "}
                  <em className="text-black font-bold text-shadow shadow-app_accent-300 drop-shadow-[0_1.2px_1.2px_rgba(255,255,255)]">
                    Davos{" "}
                  </em>
                  pals
                </div>
              </div>
              <div className="flex w-full items-center justify-center text-center">
                <div>
                  <p className="text-center max-w-[30ch]">
                    Events are held frequently and you do not want to miss out
                    on all of the fun. Socialize and grow your political
                    network. What can you achieve with your newfound
                    connections?
                  </p>
                </div>
              </div>
              <div className="flex w-full justify-center">
                <div className="mt-4 mb-8 flex w-2/3 justify-center">
                  <Link to="/events">
                    <Button className="w-full" color="dark" size="md" pill>
                      View Events
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden lg:block bg-app_accent-900 lg:grid lg:grid-cols-12 lg:grid-rows-3">
        <div className="flex lg:col-span-7  bg-app_accent-900 w-full h-full">
          <img
            className="home-images lg:w-full lg:h-auto lg:max-h-1/3"
            src={IMAGES.podcast_home_1}
            alt="podcast picture"
          ></img>
        </div>
        <div className="bg-app_accent-900 lg:grid lg:grid-rows-2 flex-col lg:col-span-5 text-xl lg:text-2xl">
          <div className="lg:row-span-1">
            <div className="lg:flex-col h-full p-4 w-full text-2xl lg:text-4xl">
              <div className="flex lg:h-1/5 w-full  lg:justify-start items-center justify-center">
                <em className="text-black font-bold text-shadow shadow-app_accent-300 drop-shadow-[0_1.2px_1.2px_rgba(255,255,255)]">
                  Davos On Air:
                </em>
              </div>
              <div className="flex lg:h-1/5 w-full ml-20 items-center  lg:justify-start justify-center">
                <p className="whitespace-pre">The best </p>
              </div>
              <div className="flex lg:h-1/5 justify-center">
                <strong className="flex text-center text-red-500">
                  conservative
                </strong>{" "}
              </div>
              <div className="flex justicy-center -ml-20 lg:justify-end items-center lg:h-1/5 w-full">
                <p className="whitespace-pre"> podcast </p>
              </div>

              <div className="flex lg:justify-end items-center lg:h-1/5 w-full">
                <div className="flex h-1/3">on the web!</div>
              </div>
            </div>
          </div>

          <div className="flex w-full h-full items-center justify-center lg:row-span-1">
            <div className="flex-col">
              <div className="flex max-w-[35ch] text-center">
                <p className="italic">
                  "I listen to the Davos On Air podcast all the time! They talk
                  about current events and bring on the best guest speakers with
                  a wide variety of expertise."{" "}
                  <strong className="not-italic text-black">-Nancy A. </strong>
                </p>
              </div>
              <div className="w-full">
                <div className="flex-col mt-5 h-full justify-center items-center">
                  <Link to="/podcasts">
                    <div className="flex w-full  items-center justify-center">
                      <Button className="w-2/3" color="dark" size="md" pill>
                        Listen Now
                      </Button>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 bg-app_accent-900">
          <div className="flex-col h-full text-xl lg:text-2xl lg:grid lg:grid-rows-3">
            <div className="davos-member-container flex-col w-full h-full text-2xl lg:text-4xl">
              <div className="flex w-full h-1/3 justify-start">
                <p>Become a</p>
              </div>

              <div className="flex w-full h-1/3 justify-center">
                <p>
                  <em className="text-black font-bold text-shadow shadow-app_accent-300 drop-shadow-[0_1.2px_1.2px_rgba(255,255,255)]">
                    Davos In The Desert
                  </em>
                </p>
              </div>
              <div className="flex w-full h-1/3 justify-end">
                <p>member now</p>
              </div>
            </div>
            <div className="flex-col items-center">
              <div className="flex justify-center h-fit w-full">
                <div>
                  <p className="text-center max-w-[30ch]">
                    ...and join thousands of people just like you! Have your
                    voice heard by those that want to <span>DO</span> something
                    about it. Now is the time to take actions.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center justify-evenly">
              <div className="text-red-500 -mt-6 text-center">
                <p className="">*Special offers available</p>
              </div>
              <div className="w-2/3">
                <Link to="/new_account">
                  <Button className="w-full" color="dark" size="md" pill>
                    Sign Up
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="flex lg:col-span-7">
          <img
            className="home-images lg:w-full lg:h-auto"
            src={IMAGES.member_home_1}
            alt="Member picture"
          ></img>
        </div>

        <div className="lg:col-span-7">
          <img
            className="flex home-images lg:w-full lg:h-full"
            src={IMAGES.event_home_2}
            alt="Events picture"
          ></img>
        </div>
        <div className="flex-col h-full items-center justify-center lg:col-span-5 text-xl md:text-2xl">
          <div className="flex grid grid-cols-3 grid-rows-2 h-fit text-center text-2xl lg:text-4xl whitespace-normal m-8">
            <div className="flex row-span-1 col-span-2 justify-center text-center mb-1">
              Party & mingle
            </div>
            <div className="flex row-start-2 col-start-2 row-span-1 col-span-2 justify-center text-center mt-1">
              with
              <strong className="text-black font-bold text-shadow shadow-app_accent-300 drop-shadow-[0_1.2px_1.2px_rgba(255,255,255)] whitespace-pre">
                {" "}
                Davos{" "}
              </strong>
              pals.
            </div>
          </div>
          <div className="flex flex-col justify-stretch items-center">
            <div className="flex justify-center items-center h-fit w-full mt-8">
              <div>
                <p className="text-center max-w-[30ch]">
                  Events are held frequently and you do not want to miss out on
                  all of the fun. Socialize and grow your political network.
                  What can you achieve with your newfound connections?
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-16 w-full items-center">
            <div className="w-2/3">
              <Link to="/events">
                <Button className="w-full" color="dark" size="md" pill>
                  View Events
                </Button>
              </Link>
            </div>
          </div>{" "}
        </div>
      </div>

      <div className="w-screen mt-32">
        <img src={IMAGES.reagan_home_2} alt="Ronald Reagan Quote"></img>
      </div>
    </div>
  );
};

export default HomePage;
