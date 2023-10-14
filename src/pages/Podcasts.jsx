import AudioPlayerII from "../components/AudioPlayer/AudioPlayerII";
import CardDefault from "../components/CardDefault";
import PodcastSignInModal from "../components/Modals/PodcastSignUpModal";
import VerticalAccordion from "../components/VerticalAccordion";
import { useState, useContext } from "react";
import UserContext from "../contexts/UserContext";

const Podcasts = () => {
  const { user } = useContext(UserContext);
  const [haveAudio, setHaveAudio] = useState(null);
  const [podcastList, setPodcastList] = useState([]);
  const [modal, setModal] = useState(false);

  setTimeout(() => {
    setModal(!user);
  }, 3000);

  const addPodcast = (podcast) => {
    const updatedPodcast = { ...podcast, index: Math.random() };

    setPodcastList([...podcastList, updatedPodcast]);
  };

  const playAudio = (podcast) => {
    addPodcast(podcast);
    setHaveAudio(true);
  };

  const removePodcast = (indexToRemove) => {
    const updatedPodcastList = [...podcastList];
    updatedPodcastList.splice(indexToRemove, 1);
    if (updatedPodcastList.length === 0) setHaveAudio(false);
    setPodcastList(updatedPodcastList);
    1;
  };

  return (
    <div className="">
      <div className="flex flex-row justify-evenly bg-black">
        <div className="flex flex-col px-6 basis-1/2 max-w-sm md:max-w-2xl mr-15">
          <CardDefault
            display="justify-center mb-4"
            className="bg-opacity-50 max-w-sm"
            header="Davos On Air - Featured Podcasts"
            text="2xl"
          >
            <div className="flex flex-col w-fulltext-lg">
              <VerticalAccordion playAudio={playAudio}></VerticalAccordion>
            </div>
          </CardDefault>
          <CardDefault
            display="justify-center items-center mb-1"
            className="mt-10 bg-opacity-50 max-w-sm"
            header="Davos On Air - Recent Podcasts"
            text="2xl"
          ></CardDefault>
        </div>
        <CardDefault
          display="justify-center items-center ml-12 divide-y divide-gray-200"
          className="bg-opacity-50 max-w-sm"
          header="Now Playing"
          text="2xl"
        >
          {!haveAudio && <div>Nothing Playing</div>}
          {haveAudio && (
            <AudioPlayerII
              podcastList={podcastList}
              removePodcast={removePodcast}
            />
          )}
        </CardDefault>
      </div>
      {modal && <PodcastSignInModal />}
    </div>
  );
};

export default Podcasts;
