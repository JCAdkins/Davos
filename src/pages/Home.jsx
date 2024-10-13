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
      if (vid1Ref.current) vid1Ref.current.playbackRate = 1.75;

      vid1Ref.current?.play();
      vid4Ref.current ? (vid4Ref.current.currentTime = 0) : {};
      // Video2.preload();
      setVideo4Disp("hidden");
      setVideo1Disp("block");
    }
    if (videoIndex === 1) {
      if (vid2Ref.current) vid2Ref.current.playbackRate = 2;
      vid2Ref.current?.play();
      vid1Ref.current ? (vid1Ref.current.currentTime = 0) : {};
      // Video3.preload();
      setVideo1Disp("hidden");
      setVideo2Disp("block");
    }
    if (videoIndex === 2) {
      if (vid3Ref.current) vid3Ref.current.playbackRate = 0.75;
      vid3Ref.current?.play();
      vid2Ref.current ? (vid2Ref.current.currentTime = 0) : {};
      // Video4.preload();
      setVideo2Disp("hidden");
      setVideo3Disp("block");
    }
    if (videoIndex === 3) {
      vid4Ref.current?.play();
      vid3Ref.current ? (vid3Ref.current.currentTime = 0) : {};
      //Video1.preload();
      setVideo3Disp("hidden");
      setVideo4Disp("block");
    }
  }, [videoIndex]);

  // useEffect(() => {
  // Video1.preload();
  // Video2.preload();
  // Video3.preload();
  // Video4.preload();
  // }, []);

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
            </div>
          </Suspense>
        </div>
        <div className="bb group absolute flex  mx-auto bg-white/30 hover:bg-white top-32 left-10 items-center sm:top-40 sm:left-20 hover:border-4 hover:border-black w-fit h-fit sm:h-[50px] sm:w-[75px] md:h-[70px] md:w-[100px] lg:h-[110px] lg:w-[150px] hover:lg:w-[638px] hover:lg:h-[340px] hover:md:w-[421px] hover:md:h-[252px] hover:sm:w-[301px] hover:sm:h-[212px] transition-all duration-300 ease-in-out">
          <div className="text-sm sm:text-[6px] sm:leading-[8px] group-hover:text-[20px] group-hover:leading-[28px] group-hover:md:text-[30px] group-hover:md:leading-[36px] group-hover:lg:text-[48px] group-hover:lg:leading-[52px] transition-all duration-75">
            <div className="border-4 border-transparent w-full h-full sm:w-[70px] sm:h-[45px] md:h-[70px] md:w-[100px] lg:h-[105px] lg:w-[145px] bg-white/50 sm:pl-[2px] group-hover:sm:pl-[32px] group-hover:lg:pl-[44px] group-hover:sm:pt-[24px] group-hover:md:pt-[24px] group-hover:lg:w-[630px] group-hover:lg:h-[332px] group-hover:md:w-[412px] group-hover:md:h-[244px] group-hover:sm:w-[292px] group-hover:sm:h-[204px] transition-all duration-300 ease-in-out">
              <div className="flex w-[24ch] text-transparent group-hover:text-gray-300 group-hover:drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                <div className="drop-shadow-[0_1.2px_1.2px_rgba(0,0,0)]">
                  The{" "}
                  <p className="italic inline-block text-transparent text-md  group-hover:text-gray-600 drop-shadow-[0_1.7px_1.7px_rgba(0,0,0)] sm:text-[1px] sm:leading-[1px] group-hover:sm:text-[24px] group-hover:sm:leading-[32px] group-hover:md:text-[30px] group-hover:md:leading-[36px] group-hover:lg:text-[60px] group-hover:lg:leading-[66px] transition-all duration-[400ms]">
                    premier
                  </p>{" "}
                  forum for elite business, thought & government leaders to
                  collaborate and build the future.
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="empty-container w-screen h-1/2"></div>
      </div>
      <div className="md:mt-56 lg:mt-82">
        <div className="lg:hidden bg-app_accent-900 flex flex-col text-xl">
          <div className="flex flex-col justify-center items-center w-full border-double border-x-8 border-t-8 sm:border-none border-white">
            <div className="w-full">
              <div className="sm:hidden w-screen">
                <div className="flex flex-wrap max-w-[38ch] items-center justify-center text-center text-2xl whitespace-pre py-4 px-8">
                  <em className="text-black font-bold drop-shadow-[0_1.2px_1.2px_rgba(255,255,255)]">
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
                    <em className="text-black font-bold drop-shadow-[0_1.2px_1.2px_rgba(255,255,255)]">
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
                    <div className="italic">
                      "I listen to the Davos On Air podcast all the time! They
                      talk about current events and bring on the best guest
                      speakers with a wide variety of expertise."
                      <p className="not-italic font-bold text-black drop-shadow-[0_1px_1px_rgba(255,255,255)]">
                        -Nancy A.
                      </p>
                    </div>
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
                <em className="text-black font-bold  drop-shadow-[0_1.2px_1.2px_rgba(255,255,255)]">
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
                        <em className="text-black font-bold  drop-shadow-[0_1.2px_1.2px_rgba(255,255,255)]">
                          Davos In The Desert{" "}
                        </em>
                        member now
                      </div>
                    </div>
                    <div className="flex w-full items-center justify-center text-center">
                      <div>
                        <p className="text-center max-w-[30ch]">
                          ...and join thousands of people just like you! Have
                          your voice heard by those that want to <span>DO</span>{" "}
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
                          <Button
                            className="w-full"
                            color="dark"
                            size="md"
                            pill
                          >
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
              <em className="text-black font-bold  drop-shadow-[0_1.2px_1.2px_rgba(255,255,255)]">
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
                    <em className="text-black font-bold  drop-shadow-[0_1.2px_1.2px_rgba(255,255,255)]">
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
      </div>
      <div className="hidden lg:block bg-app_accent-900 lg:grid lg:grid-cols-12 lg:grid-rows-3">
        <div className="flex lg:col-span-7  bg-app_accent-900 w-full h-full">
          <img
            className="home-images lg:w-full lg:h-auto lg:max-h-1/3"
            src={IMAGES.podcast_home_2}
            alt="podcast picture"
          ></img>
        </div>
        <div className="bg-app_accent-900 h-full w-full lg:grid lg:grid-rows-5 lg:col-span-5 text-xl lg:text-2xl">
          <div className="lg:row-span-2 w-full">
            <div className="seven-grid mx-auto lg:flex lg:grid lg:grid-cols-6 lg:grid-row-5 h-full p-4 w-full text-2xl lg:text-4xl">
              <div className="col-start-1 row-start-1 col-span-2 text-black font-bold w-1/5 whitespace-nowrap drop-shadow-[0_1.2px_1.2px_rgba(255,255,255)]">
                Davos On Air:
              </div>
              <div className="flex row-start-2 col-start-2 col-span-2 w-1/5 whitespace-nowrap">
                The best
              </div>
              <div className="flex row-start-3 col-start-3 col-span-2 w-1/5 whitespace-nowrap text-red-500">
                conservative
              </div>
              <div className="flex row-start-4 col-start-4 col-span-2 w-1/5 whitespace-nowrap">
                podcast on
              </div>

              <div className="flex row-start-5 col-start-5 col-span-2 text-end w-1/5 whitespace-nowrap">
                <p>the web!</p>
              </div>
            </div>
          </div>

          <div className="flex w-full h-full items-center justify-center lg:row-span-3">
            <div className="flex-col">
              <div className="flex max-w-[30ch] text-center">
                <div className="flex flex-col italic items-center">
                  "I listen to the Davos On Air podcast all the time! They talk
                  about current events and bring on the best guest speakers with
                  a wide variety of expertise."{" "}
                  <p className="not-italic w-fit rounded-md pr-1 font-bold text-black bg-white">
                    -Nancy A.
                  </p>
                </div>
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
                  <em className="text-black font-bold  drop-shadow-[0_1.2px_1.2px_rgba(255,255,255)]">
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
              <div className="text-red-700 -mt-6 text-center">
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
        <div className="flex flex-col h-full items-center justify-evenly lg:col-span-5 text-xl md:text-2xl">
          <div className="flex grid grid-cols-3 grid-rows-2 h-fit text-center text-2xl lg:text-4xl whitespace-normal">
            <div className="flex row-span-1 col-span-2 justify-center text-center mb-1">
              Party & mingle
            </div>
            <div className="flex row-start-2 col-start-2 row-span-1 col-span-2 justify-center text-center mt-1">
              with
              <strong className="text-black font-bold  drop-shadow-[0_1.2px_1.2px_rgba(255,255,255)] whitespace-pre">
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
          <div className="flex justify-center h-fill w-full items-center">
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

      <div className="w-screen mt-32 md:mt-64 lg:mt-96">
        <img src={IMAGES.reagan_home_2} alt="Ronald Reagan Quote"></img>
      </div>
    </div>
  );
};

export default HomePage;
