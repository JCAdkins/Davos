import { Card } from "flowbite-react";
import AudioPlayerII from "../components/AudioPlayer/AudioPlayerII";
import PodcastSignInModal from "../components/Modals/PodcastSignUpModal";
import VerticalAccordion from "../components/VerticalAccordion";
import { useState, useContext, useEffect, useRef } from "react";
import UserContext from "../contexts/UserContext";
import MakePodCasts from "../components/MakePodCasts";
import { Transition } from "react-transition-group";

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
  const [currentPodcast, setCurrentPodcast] = useState(emptyPodcastList);
  const [inProp, setInProp] = useState(false);
  const [haveAudio, setHaveAudio] = useState(null);
  const [podcastList, setPodcastList] = useState([]);
  const [modal, setModal] = useState(false);
  const nodeRef = useRef(null);

  useEffect(() => {
    setTimeout(setModal(!user), 3000);
  }, []);

  const addPodcast = (podcast) => {
    const updatedPodcast = { ...podcast, uniqueId: Math.random() };
    setPodcastList([...podcastList, updatedPodcast]);
  };

  const playAudio = (podcast) => {
    setInProp(true);
    addPodcast(podcast);
    setHaveAudio(true);
  };

  const removePodcast = (indexToRemove) => {
    const updatedPodcastList = [...podcastList];
    updatedPodcastList.splice(indexToRemove, 1);
    if (updatedPodcastList.length === 0) {
      setInProp(false);
      setHaveAudio(false);
      setCurrentPodcast(emptyPodcastList);
    }
    setPodcastList(updatedPodcastList);
  };

  const showPodcastInfo = (podcast) => {
    const curPodcast = podcast;
    setCurrentPodcast(curPodcast);
  };

  return (
    <div className="bg-black bg-cover">
      <div className="flex flex-wrap m-auto justify-evenly gap-0">
        <div className="flex-start basis-1/4 shrink divide-y divide-gray-200">
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
        {!currentPodcast.disabled && (
          <Transition
            className="flex grow-1 basis-1/2"
            nodeRef={nodeRef}
            in={inProp}
            timeout={duration}
          >
            {(state) => {
              console.log(state);
              return (
                <Card
                  ref={nodeRef}
                  className={`${defaultStyle} ${transitionStyles[state]} flex grow-1 basis-1/2 shrink bg-opacity-0 border-none gap-2 min-w-0 text-white mb-7 prose`}
                >
                  <Card>
                    <div className="text-black divide-y-2 divide-black">
                      <p>Speaker: {currentPodcast.speaker.name}</p>
                      <p>Position: {currentPodcast.speaker.position}</p>
                      <p>Company: {currentPodcast.speaker.company}</p>
                    </div>
                    <div className="text-black">
                      <p>{currentPodcast.speaker.about}</p>
                    </div>
                  </Card>
                  <h5 className="text-xl text-center bg-gray-400 rounded-md font-bold tracking-tight text-gray-900 dark:text-white">
                    <p>{currentPodcast.title}</p>
                  </h5>
                  <div className="divide-y -mt-6">
                    <p className="font-normal dark:text-gray-400">
                      <p className="">{currentPodcast.description}</p>
                    </p>
                    <div className="font-normal dark:text-gray-400">
                      <h2 class="mb-2 text-lg text-center font-semibold text-white dark:text-white">
                        Discussion Topics
                      </h2>
                      <ul class="max-w-md space-y-1 text-gray-200 list-disc list-inside dark:text-gray-400">
                        {currentPodcast.issues_discussed.map((issue) => (
                          <li>{issue}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Card>
              );
            }}
          </Transition>
        )}
        <div className="flex-col flexgrow-1 shrink basis-1/4 min-w-[400px] max-w-[35%] mt-5 mb-7 overflow-hidden">
          <div className="bg-gray-300 rounded-md text-lg">
            <p className="text-black text-center text-2xl font-mono">
              Davos On Air - Featured Podcasts
            </p>
            <VerticalAccordion playAudio={playAudio}></VerticalAccordion>
          </div>
          <div className="bg-gray-300 rounded-md mt-3 text-lg">
            <p className="text-black text-center text-2xl font-mono">
              Davos On Air - Recent Podcasts
            </p>
            <div>{MakePodCasts(null, playAudio)}</div>
          </div>
        </div>
      </div>
      {modal && <PodcastSignInModal />}
    </div>
  );
};

export default Podcasts;
