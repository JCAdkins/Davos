import { Accordion, Button } from "flowbite-react";
import AudioPlayerII from "../components/AudioPlayer/AudioPlayerII";
import PodcastSignInModal from "../components/Modals/PodcastSignUpModal";
import { useState, useContext, useEffect } from "react";
import UserContext from "../contexts/UserContext";
import { Transition } from "react-transition-group";
import getAllPodcasts from "../services/getAllPodcasts";
import ClockIcon from "../components/Icons/ClockIcon";
import PodcastCalendar from "../components/Icons/PodcastCalendar";
import MegaphoneIcon from "../components/Icons/MegaphoneIcon";

const formatDate = (date) => {
  return [
    padTo2Digits(date.getMonth() + 1),
    padTo2Digits(date.getDate()),
    date.getFullYear(),
  ].join("/");
};
const padTo2Digits = (num) => {
  return num.toString().padStart(2, "0");
};

const emptyPodcastList = {
  title: "",
  description: "",
  speaker: {
    name: "",
    position: "",
    company: "",
    about: "",
    img: "https://www.solidbackgrounds.com/images/1600x900/1600x900-black-solid-color-background.jpg",
  },
  duration: "--:--:--",
  link: "",
  tag: "",
  date: "--/--/----",
  embedded_src: "",
  issues_discussed: [],
  disabled: true,
};

const duration = 15000;

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
};

const transitionStyles = {
  entering: { opacity: 0.5 },
  entered: { opacity: 1 },
  exiting: { opacity: 0.5 },
  exited: { opacity: 0 },
};

const Podcasts = () => {
  const { user } = useContext(UserContext);
  const [_, setCurrentPodcast] = useState(emptyPodcastList);
  const [haveAudio, setHaveAudio] = useState(null);
  const [podcastList, setPodcastList] = useState([]);
  const [modal, setModal] = useState(false);
  const [featuredPC, setFeaturedPC] = useState([]);
  const [allPC, setAllPC] = useState([]);

  useEffect(() => {
    var pcList = [];
    getAllPodcasts({ exclude: false }).then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        pcList = [...pcList, doc.data().podcast];
        setAllPC(pcList);
      });
    });
  }, []);

  useEffect(() => {
    const featureds = allPC
      .filter((pc) => pc.featured === true)
      .map((podcast) => {
        return (
          <div className="speaker-div snap-center w-fit flex flex-col items-center bg-white rounded-lg shadow-lg shadow-blue-600 md:flex-row md:max-w-xl hover:scale-105 hover:shadow-blue-600 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
            <img
              className="rounded-l-lg h-fit"
              src={podcast.speaker.img}
              alt=""
            />
            <div className="flex flex-col justify-between p-4 leading-normal">
              <h5 className="mb-2 text-md font-bold max-w-[16ch] tracking-tight text-gray-900 dark:text-white">
                {podcast.title}
              </h5>
              <div className="flex-col w-full mb-3 text-xs text-gray-700 dark:text-gray-400">
                <div className="flex w-fit gap-2 items-center">
                  <ClockIcon />
                  <p className="text-black">{podcast.duration}</p>
                </div>
                <div className="flex w-fit gap-2 items-center text-black">
                  <PodcastCalendar />
                  <p className="text-black">
                    {formatDate(new Date(podcast.date))}
                  </p>
                </div>

                <div className="flex w-fit gap-2 items-center text-black">
                  <MegaphoneIcon />
                  <p className="min-w-[15 ch] text-black">
                    {podcast.speaker.name}
                  </p>
                </div>
              </div>
              <div className="flex w-full gap-4">
                <Button
                  className="w-full"
                  size="xs"
                  color="blue"
                  onClick={() => {
                    playAudio(podcast);
                  }}
                >
                  Listen
                </Button>

                <Button className="w-full" size="xs" color="blue">
                  Details
                </Button>
              </div>
            </div>
          </div>
        );
      });
    setFeaturedPC(featureds);
  }, [allPC]);

  useEffect(() => {
    setTimeout(setModal(!user), 3000);
  }, []);

  const addPodcast = (podcast) => {
    const updatedPodcast = { ...podcast, uniqueId: Math.random() };
    setPodcastList((prevState) => [...prevState, updatedPodcast]);
  };

  const playAudio = (podcast) => {
    addPodcast(podcast);
    setHaveAudio(true);
  };

  const removePodcast = (indexToRemove) => {
    const updatedPodcastList = [...podcastList];
    updatedPodcastList.splice(indexToRemove, 1);
    if (updatedPodcastList.length === 0) {
      setHaveAudio(false);
    }
    setPodcastList(updatedPodcastList);
  };

  const showPodcastInfo = (podcast) => {
    const curPodcast = podcast;
    setCurrentPodcast(curPodcast);
  };

  return (
    <div className="bg-[#dee2fc]">
      <div className="flex flex-col justify-start lg:grid lg:grid-cols-4">
        <div className="flex flex-col items-center mt-8 px-4 lg:col-span-3">
          <div className="flex-col w-full justify-center  mb-8">
            <div className="flex flex-wrap gap-8 justify-evenly mb-12">
              {...featuredPC}
            </div>
            <Button className="w-full rounded-none mt-6" size="xs" color="blue">
              <p>Load All Podcasts</p>
            </Button>
          </div>
          <div className="w-full bg-gray-300 rounded-md text-lg">
            <p className="text-black text-center text-2xl font-mono">
              Davos On Air - Categories
            </p>
            <Accordion collapseAll>
              <Accordion.Panel>
                <Accordion.Title>Thought Leaders</Accordion.Title>
                <Accordion.Content>hrhr</Accordion.Content>
              </Accordion.Panel>
              <Accordion.Panel>
                <Accordion.Title>Business Leaders</Accordion.Title>
                <Accordion.Content>hrhr</Accordion.Content>
              </Accordion.Panel>
              <Accordion.Panel>
                <Accordion.Title>Government Leaders</Accordion.Title>
                <Accordion.Content>hrhr</Accordion.Content>
              </Accordion.Panel>
            </Accordion>
          </div>
        </div>
        <div className="flex sticky top-20 h-fit mt-4 justify-center">
          {!haveAudio && (
            <AudioPlayerII
              podcastList={[emptyPodcastList]}
              removePodcast={removePodcast}
              showPodcastInfo={showPodcastInfo}
            />
          )}
          {haveAudio && (
            <AudioPlayerII
              podcastList={podcastList}
              removePodcast={removePodcast}
              showPodcastInfo={showPodcastInfo}
            />
          )}
        </div>
      </div>
      {modal && <PodcastSignInModal />}
    </div>
  );
};

export default Podcasts;
