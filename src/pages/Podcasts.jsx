import { Accordion, Button, Pagination, Spinner } from "flowbite-react";
import AudioPlayerII from "../components/AudioPlayer/AudioPlayerII";
import PodcastSignInModal from "../components/Modals/PodcastSignUpModal";
import { useState, useContext, useEffect } from "react";
import UserContext from "../contexts/UserContext";
import { Transition } from "react-transition-group";
import getAllPodcasts from "../services/getAllPodcasts";
import PodcastCard from "../components/PodcastCard";
import paginatedCollection from "../services/paginatedCollection";
import BackIcon from "../components/Icons/BackIcon";
import PodcastDetails from "../components/PodcastDetails";

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
  const [paginatedPodcasts, setPaginatedPodcasts] = useState();
  const [currentPage, setCurrentPage] = useState();
  const [loadingAllPCS, setLoadingAllPCS] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [pcDetailsPodcast, setPCDetailsPodcast] = useState();

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
      .splice(0, 6)
      .map((podcast, ind) => {
        return (
          <PodcastCard
            key={ind}
            shadowColor={"blue-600"}
            podcast={podcast}
            playAudio={playAudio}
            showDetails={(podcast) => showDetails(podcast)}
          />
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

  const loadAllPodcasts = () => {
    setLoadingAllPCS(true);
    paginatedCollection("podcasts", "podcast.date", 6, "desc").then((data) => {
      setPaginatedPodcasts(data);
    });
  };

  useEffect(() => {
    paginatedPodcasts ? setCurrentPage(paginatedPodcasts[0]) : {};
  }, [paginatedPodcasts]);

  const showDetails = (podcast) => {
    setPCDetailsPodcast(
      <PodcastDetails
        podcast={podcast}
        addToPlaylist={() => playAudio(podcast)}
      />
    );
  };

  return (
    <div className="bg-[#dee2fc]">
      <div className="flex flex-col lg:grid lg:grid-cols-4">
        {!pcDetailsPodcast && (
          <>
            <div className="flex flex-col items-center mt-8 px-4 lg:col-span-3">
              <div className="flex-col w-full justify-center  mb-8">
                {!paginatedPodcasts && (
                  <>
                    <div className="flex flex-wrap gap-8 justify-evenly mb-12">
                      {...featuredPC}
                    </div>

                    <Button
                      className="w-full rounded-none mt-6"
                      size="xs"
                      color="blue"
                      onClick={loadAllPodcasts}
                    >
                      <p>{loadingAllPCS ? <Spinner /> : "Load All Podcasts"}</p>
                    </Button>
                  </>
                )}
                {currentPage && (
                  <div className="flex flex-wrap gap-8 justify-evenly mb-12">
                    {currentPage.map((podcast) => {
                      return (
                        <PodcastCard
                          shadowColor={"blue-600"}
                          podcast={podcast.podcast}
                          playAudio={playAudio}
                          showDetails={(podcast) => showDetails(podcast)}
                        />
                      );
                    })}
                  </div>
                )}
                {currentPage && (
                  <div className="flex w-full justify-center">
                    <Pagination
                      currentPage={pageNumber}
                      onPageChange={(page) => {
                        setCurrentPage(paginatedPodcasts[page - 1]);
                        setPageNumber(page);
                      }}
                      totalPages={paginatedPodcasts.length}
                    />
                  </div>
                )}
              </div>
              <div className="w-full bg-gray-300 rounded-md text-lg mb-6">
                <p className="text-black text-center text-2xl my-4 font-mono">
                  Categories
                </p>
                <Accordion collapseAll>
                  <Accordion.Panel>
                    <Accordion.Title className="text-black">
                      Thought Leaders
                    </Accordion.Title>
                    <Accordion.Content className="overflow-x-scroll">
                      <div className="flex rounded-lg min-w-max w-full gap-6">
                        {allPC
                          .filter(
                            (podcast) => podcast.tag === "thought_leaders"
                          )
                          .map((podcast) => (
                            <PodcastCard
                              shadowColor={"gray-800"}
                              podcast={podcast}
                              playAudio={playAudio}
                              showDetails={(podcast) => showDetails(podcast)}
                            />
                          ))}
                      </div>
                    </Accordion.Content>
                  </Accordion.Panel>
                  <Accordion.Panel>
                    <Accordion.Title className="text-black">
                      Business Leaders
                    </Accordion.Title>
                    <Accordion.Content className="overflow-x-scroll">
                      <div className="flex rounded-lg min-w-max w-full gap-6">
                        {allPC
                          .filter(
                            (podcast) => podcast.tag === "business_leaders"
                          )
                          .map((podcast) => (
                            <PodcastCard
                              shadowColor={"gray-800"}
                              podcast={podcast}
                              playAudio={playAudio}
                              showDetails={(podcast) => showDetails(podcast)}
                            />
                          ))}
                      </div>
                    </Accordion.Content>
                  </Accordion.Panel>
                  <Accordion.Panel>
                    <Accordion.Title className="text-black">
                      Government Leaders
                    </Accordion.Title>
                    <Accordion.Content className="overflow-x-scroll">
                      <div className="flex rounded-lg min-w-max w-full gap-6">
                        {allPC
                          .filter(
                            (podcast) => podcast.tag === "government_leaders"
                          )
                          .map((podcast) => (
                            <PodcastCard
                              shadowColor={"gray-800"}
                              podcast={podcast}
                              playAudio={playAudio}
                              showDetails={(podcast) => showDetails(podcast)}
                            />
                          ))}
                      </div>
                    </Accordion.Content>
                  </Accordion.Panel>
                </Accordion>
              </div>
            </div>
          </>
        )}
        {pcDetailsPodcast && (
          <div className="relative flex mt-4 px-4 lg:col-span-3">
            <div className="sticky w-[9px] h-[9px] top-24 z-10">
              <Button
                color="blue"
                className="shadow-md bg-opacity-80 z-10"
                size="sm"
                onClick={() => setPCDetailsPodcast(null)}
              >
                <BackIcon />
              </Button>
            </div>
            <div className="relative flex flex-col text-center w-full font-dmserif">
              {pcDetailsPodcast}
            </div>
          </div>
        )}
        <div className="flex-col sticky top-24 h-fit mt-4 items-center">
          <div className="w-fit mx-auto">
            {!user && (
              <Button
                color="blue"
                size="sm"
                className="w-full"
                onClick={() => setModal(true)}
              >
                Subscribe
              </Button>
            )}
            {!haveAudio && (
              <AudioPlayerII
                podcastList={[emptyPodcastList]}
                removePodcast={removePodcast}
                showPodcastInfo={showPodcastInfo}
              />
            )}
            {haveAudio && (
              <div className="w-min">
                <AudioPlayerII
                  podcastList={podcastList}
                  removePodcast={removePodcast}
                  showPodcastInfo={showPodcastInfo}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      {modal && (
        <PodcastSignInModal clearPodcastSignUpModal={() => setModal(false)} />
      )}
    </div>
  );
};

export default Podcasts;
