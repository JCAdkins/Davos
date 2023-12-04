import { Accordion, Button, Pagination, Spinner } from "flowbite-react";
import AudioPlayerII from "../components/AudioPlayer/AudioPlayerII";
import PodcastSignInModal from "../components/Modals/PodcastSignUpModal";
import { useState, useContext, useEffect, useRef } from "react";
import UserContext from "../contexts/UserContext";
import PaginatedTransitions from "../animations/PaginatedTransitions";
import getAllPodcasts from "../services/getAllPodcasts";
import PodcastCard from "../components/PodcastCard";
import paginatedCollection from "../services/paginatedCollection";
import HorizonatalCardSkeleton from "../components/Skeletons/HorizonatalCardSkeleton";
import BackIcon from "../components/Icons/BackIcon";
import PodcastDetails from "../components/PodcastDetails";
import ArrowTrendingUp from "../components/Icons/ArrowTrendingUp";
import RectangleStack from "../components/Icons/RectangleStack";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import "../animations/PodcastDetailsTransition.css";
import SearchBar from "../components/SearchBar";

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

const skeletonCards = [
  <HorizonatalCardSkeleton />,
  <HorizonatalCardSkeleton />,
  <HorizonatalCardSkeleton />,
  <HorizonatalCardSkeleton />,
  <HorizonatalCardSkeleton />,
  <HorizonatalCardSkeleton />,
];

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
  const [transState, setTransState] = useState(false);
  const [pcDetState, setPCDetState] = useState(true);
  const [hidden, setHidden] = useState("hidden");
  const enteringRef = useRef(null);
  const exitingRef = useRef(null);
  const enteringDetsRef = useRef(null);
  const exitingDetsRef = useRef(null);
  const podcastsRef = transState ? exitingRef : enteringRef;
  const pcDetailsRef = pcDetState ? exitingDetsRef : enteringDetsRef;
  const searchRef = useRef(null);
  const [searchPCs, setSearchPCs] = useState(null);
  const [loadingInit, setLoadingInit] = useState(true);

  useEffect(() => {
    var pcList = [];
    getAllPodcasts({ exclude: false }).then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        pcList = [...pcList, doc.data().podcast];
        setAllPC(pcList);
        setLoadingInit(false);
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
            shadowColor={"app_accent-900"}
            podcast={podcast}
            playAudio={playAudio}
            showDetails={(podcast) => {
              setTransState((transState) => !transState);
              setPCDetState((pcDetState) => !pcDetState);
              showDetails(podcast);
            }}
          />
        );
      });
    setFeaturedPC(featureds);
  }, [allPC]);

  useEffect(() => {
    setTimeout(() => setModal(!user), 2000);
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

  useEffect(() => {
    if (!searchRef.current) setSearchPCs(null);
  }, [searchRef.current]);

  const showDetails = (podcast) => {
    setHidden("");
    setPCDetailsPodcast(
      <PodcastDetails
        podcast={podcast}
        addToPlaylist={() => playAudio(podcast)}
      />
    );
  };

  const handleSearchBarChange = (searchVal) => {
    const filteredPCs = allPC
      .filter((podcast) => {
        return (
          podcast.title.toLowerCase().includes(searchVal.toLowerCase()) ||
          podcast.speaker.name
            .toLowerCase()
            .includes(searchVal.toLowerCase()) ||
          podcast.description.toLowerCase().includes(searchVal.toLowerCase()) ||
          podcast.date.toDate().toLocaleString().includes(searchVal) ||
          podcast.tag.toLowerCase().includes(searchVal.toLowerCase())
        );
      })
      .map((podcast, ind) => {
        return (
          <PodcastCard
            key={ind}
            shadowColor={"app_accent-900"}
            podcast={podcast}
            playAudio={playAudio}
            showDetails={(podcast) => {
              setTransState((transState) => !transState);
              setPCDetState((pcDetState) => !pcDetState);
              showDetails(podcast);
            }}
          />
        );
      });
    searchVal === "" ? setSearchPCs(null) : setSearchPCs(filteredPCs);
  };

  return (
    <div className="bg-app_bg min-h-[100vh]">
      <div className="flex flex-col lg:grid lg:grid-cols-4">
        <SwitchTransition mode="out-in">
          <CSSTransition
            key={transState ? "entering" : "exiting"}
            nodeRef={podcastsRef}
            timeout={300}
            addEndListener={(done) => {
              podcastsRef.current.addEventListener(
                "transitionend",
                done,
                false
              );
            }}
            classNames="slide"
          >
            <div ref={podcastsRef} className="lg:col-span-3">
              {!pcDetailsPodcast && (
                <div className="flex flex-col items-center mt-4 px-4">
                  <div className="flex-col w-full justify-center mb-8">
                    {!paginatedPodcasts && (
                      <>
                        <div className="flex ml-2 w-full justify-between p-4 text-app_accent-900 text-xl font-dmserif">
                          <div className="flex gap-1 drop-shadow-[0_1.2px_1.2px_rgba(120,120,120)]">
                            {!searchPCs && <ArrowTrendingUp />}
                            <p className="w-full">
                              {searchPCs ? "Searching All" : "Featured"}
                            </p>
                          </div>

                          <SearchBar
                            ref={searchRef}
                            value={searchRef.current?.value}
                            onChange={() =>
                              handleSearchBarChange(searchRef.current.value)
                            }
                          />
                        </div>
                        {!searchPCs && (
                          <div className="featured-pc-container">
                            <div className="featured-flex-container flex flex-wrap gap-8 justify-evenly mb-8">
                              {loadingInit ? (
                                <>{...skeletonCards}</>
                              ) : (
                                <>{...featuredPC}</>
                              )}
                            </div>
                          </div>
                        )}
                        {searchPCs && (
                          <div className="search-pc-container">
                            <div className="search-flex-container flex flex-wrap gap-8 justify-evenly mb-8">
                              {...searchPCs}
                            </div>
                          </div>
                        )}

                        <Button
                          className="bg-app_accent-900 w-full rounded-none drop-shadow-[0_1.2px_1.2px_rgba(120,120,120)]"
                          size="xs"
                          onClick={() => {
                            console.log("clicked");
                            loadAllPodcasts();
                          }}
                        >
                          <p>
                            {loadingAllPCS ? <Spinner /> : "Load All Podcasts"}
                          </p>
                        </Button>
                      </>
                    )}
                    {currentPage && (
                      <>
                        <div className="flex ml-2 w-full justify-between p-4 text-app_accent-900 text-xl font-dmserif">
                          <div className="flex gap-1">
                            <RectangleStack />
                            <p className="w-full">All Podcasts</p>
                          </div>
                          <SearchBar
                            ref={searchRef}
                            value={searchRef.current?.value}
                            onChange={() =>
                              handleSearchBarChange(searchRef.current.value)
                            }
                          />
                        </div>
                        {searchPCs && (
                          <div className="search-pc-container">
                            <div className="search-flex-container flex flex-wrap gap-8 justify-evenly mb-8">
                              {...searchPCs}
                            </div>
                          </div>
                        )}
                        {!searchPCs && (
                          <PaginatedTransitions>
                            <div className="paginated-pc-container">
                              <div className="paginated-flex-container flex flex-wrap gap-8 justify-evenly mb-8">
                                {currentPage.map((podcast, ind) => {
                                  return (
                                    <PodcastCard
                                      key={ind}
                                      onPageChange={() => {}}
                                      shadowColor={"app_accent-900"}
                                      podcast={podcast.podcast}
                                      playAudio={playAudio}
                                      showDetails={(podcast) => {
                                        setTransState(
                                          (transState) => !transState
                                        );
                                        setPCDetState(
                                          (pcDetState) => !pcDetState
                                        );
                                        showDetails(podcast);
                                      }}
                                    />
                                  );
                                })}
                              </div>
                            </div>
                            <div>
                              <Pagination
                                currentPage={pageNumber}
                                onPageChange={(page) => {
                                  setCurrentPage(paginatedPodcasts[page - 1]);
                                  setPageNumber(page);
                                }}
                                totalPages={paginatedPodcasts.length}
                              />
                            </div>
                          </PaginatedTransitions>
                        )}
                      </>
                    )}
                  </div>
                  <div className="w-full bg-gray-300 rounded-md text-lg mb-6 drop-shadow-[0_1.2px_1.2px_rgba(120,120,120)]">
                    <p className="text-black text-center text-2xl my-4 font-dmserif">
                      Categories
                    </p>
                    <Accordion collapseAll>
                      <Accordion.Panel>
                        <Accordion.Title className="text-black bg-white">
                          Thought Leaders
                        </Accordion.Title>
                        <Accordion.Content className="overflow-x-scroll bg-gray-400">
                          <div className="flex rounded-lg min-w-max w-full gap-6">
                            {allPC
                              .filter(
                                (podcast) => podcast.tag === "thought_leaders"
                              )
                              .map((podcast, ind) => (
                                <PodcastCard
                                  key={ind}
                                  shadowColor={"gray-800"}
                                  podcast={podcast}
                                  playAudio={playAudio}
                                  showDetails={(podcast) => {
                                    setTransState((transState) => !transState);
                                    setPCDetState((pcDetState) => !pcDetState);
                                    showDetails(podcast);
                                  }}
                                />
                              ))}
                          </div>
                        </Accordion.Content>
                      </Accordion.Panel>
                      <Accordion.Panel>
                        <Accordion.Title className="text-black bg-white">
                          Business Leaders
                        </Accordion.Title>
                        <Accordion.Content className="overflow-x-scroll bg-gray-400">
                          <div className="flex rounded-lg min-w-max w-full gap-6">
                            {allPC
                              .filter(
                                (podcast) => podcast.tag === "business_leaders"
                              )
                              .map((podcast, ind) => (
                                <PodcastCard
                                  key={ind}
                                  shadowColor={"gray-800"}
                                  podcast={podcast}
                                  playAudio={playAudio}
                                  showDetails={(podcast) => {
                                    setTransState((transState) => !transState);
                                    setPCDetState((pcDetState) => !pcDetState);
                                    showDetails(podcast);
                                  }}
                                />
                              ))}
                          </div>
                        </Accordion.Content>
                      </Accordion.Panel>
                      <Accordion.Panel>
                        <Accordion.Title className="text-black bg-white">
                          Government Leaders
                        </Accordion.Title>
                        <Accordion.Content className="overflow-x-scroll bg-gray-400">
                          <div className="flex rounded-lg min-w-max w-full gap-6">
                            {allPC
                              .filter(
                                (podcast) =>
                                  podcast.tag === "government_leaders"
                              )
                              .map((podcast, ind) => (
                                <PodcastCard
                                  key={ind}
                                  shadowColor={"gray-800"}
                                  podcast={podcast}
                                  playAudio={playAudio}
                                  showDetails={(podcast) => {
                                    setTransState((transState) => !transState);
                                    setPCDetState((pcDetState) => !pcDetState);
                                    showDetails(podcast);
                                  }}
                                />
                              ))}
                          </div>
                        </Accordion.Content>
                      </Accordion.Panel>
                    </Accordion>
                  </div>
                </div>
              )}
            </div>
          </CSSTransition>
        </SwitchTransition>

        <SwitchTransition mode="out-in">
          <CSSTransition
            key={pcDetState ? "exiting" : "entering"}
            nodeRef={pcDetailsRef}
            timeout={300}
            addEndListener={(done) => {
              pcDetailsRef.current.addEventListener(
                "transitionend",
                done,
                false
              );
            }}
            classNames="fade"
          >
            <div
              ref={pcDetailsRef}
              className={`${hidden} relative flex mt-4 px-4 lg:col-span-3`}
            >
              <div className="sticky w-[9px] h-[9px] top-24 z-10">
                <Button
                  className="shadow-md bg-app_accent-600 bg-opacity-80 z-10"
                  size="sm"
                  onClick={() => {
                    setHidden("hidden");
                    setPCDetState((pcDetState) => !pcDetState);
                    setTransState((transState) => !transState);
                    setPCDetailsPodcast(null);
                  }}
                >
                  <BackIcon />
                </Button>
              </div>
              <div className="relative flex flex-col text-center w-full font-dmserif">
                {pcDetailsPodcast}
              </div>
            </div>
          </CSSTransition>
        </SwitchTransition>
        <div className="flex-col sticky top-24 h-fit mt-4 items-center">
          <div className="w-fit mx-auto">
            {!user && (
              <Button
                size="sm"
                className="bg-app_accent-900 w-full"
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
                  podcastList={podcastList ? podcastList : [emptyPodcastList]}
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
