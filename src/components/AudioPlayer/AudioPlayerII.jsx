import React, { useEffect, useState, useRef } from "react";
import Xicon from "../Xicon";

const AudioPlayerII = (props) => {
  const [index, setIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [pause, setPause] = useState(false);
  const podcastList = props.podcastList;
  const currentPodcast = podcastList[index];

  const showInfo = () => {
    !currentPodcast.disabled ? props.showPodcastInfo(podcastList[index]) : {};
    console.log(podcastList[index]);
  };

  const playerRef = useRef(null);
  const timelineRef = useRef(null);
  const playheadRef = useRef(null);
  const hoverPlayheadRef = useRef(null);

  const back = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953l7.108-4.062A1.125 1.125 0 0121 8.688v8.123zM11.25 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953L9.567 7.71a1.125 1.125 0 011.683.977v8.123z"
      />
    </svg>
  );
  const forward = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062A1.125 1.125 0 013 16.81V8.688zM12.75 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062a1.125 1.125 0 01-1.683-.977V8.688z"
      />
    </svg>
  );

  const play = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
      />
    </svg>
  );
  const paused = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 5.25v13.5m-7.5-13.5v13.5"
      />
    </svg>
  );

  const changeCurrentTime = (e) => {
    const duration = playerRef.current.duration;
    const playheadWidth = timelineRef.current.offsetWidth;
    const offsetWidth = timelineRef.current.offsetLeft;
    const userClickWidth = e.clientX - offsetWidth;
    // if UI isn't displayed correctly within parent container (e.g. it overflows parent) then
    // userClickWidth will be incorrect and will mess up all subsequent calculations.
    const userClickWidthInPercent = (userClickWidth * 100) / playheadWidth;
    playheadRef.current.style.width = userClickWidthInPercent + "%";
    playerRef.current.currentTime = (duration * userClickWidthInPercent) / 100;
  };

  const hoverTimeLine = (e) => {
    const duration = playerRef.current.duration;
    const playheadWidth = timelineRef.current.offsetWidth;
    const offsetWidth = timelineRef.current.offsetLeft;
    const userClickWidth = e.clientX - offsetWidth;
    const userClickWidthInPercent = (userClickWidth * 100) / playheadWidth;
    if (userClickWidthInPercent <= 100) {
      hoverPlayheadRef.current.style.width = userClickWidthInPercent + "%";
    }
    // if (hoverPlayheadRef.current.style.width < ) use this to style the hover timeline lighter when less than the played timeline
    const time = (duration * userClickWidthInPercent) / 100;
    if (time >= 0 && time <= duration) {
      hoverPlayheadRef.current.dataset.content = formatTime(time);
    }
  };

  const resetTimeLine = () => {
    hoverPlayheadRef.current.style.width = "0%";
  };

  const timeUpdate = () => {
    const duration = playerRef.current.duration; // duration is correct
    const timelineWidth =
      timelineRef.current.offsetWidth - playheadRef.current.offsetWidth; // timelineWidth is how much time is left on the song and shrinks accordingly it is correct
    const playPercent = 100 * (playerRef.current.currentTime / duration); // playPercent is correct
    playheadRef.current.style.width = playPercent + "%";
    const currentTime = formatTime(parseInt(playerRef.current.currentTime));
    setCurrentTime(currentTime);
  };

  const formatTime = (currentTime) => {
    const minutes = Math.floor(currentTime / 60);
    let seconds = Math.floor(currentTime % 60);
    seconds = seconds >= 10 ? seconds : "0" + (seconds % 60);
    return minutes + ":" + seconds;
  };

  const updatePlayer = () => {
    playheadRef.current.style.width = "0%";
    playerRef.current.load();
  };

  const nextPodcast = () => {
    setIndex((index + 1) % podcastList.length);
    updatePlayer();
    showInfo();
    if (pause) {
      playerRef.current.play();
    }
  };

  const prevPodcast = () => {
    setIndex((index + podcastList.length - 1) % podcastList.length);
    updatePlayer();
    showInfo();
    if (pause) {
      playerRef.current.play();
    }
  };

  const playOrPause = () => {
    if (!pause) {
      playerRef.current.play();
    } else {
      playerRef.current.pause();
    }
    setPause(!pause);
  };

  const clickAudio = (key) => {
    setIndex(key);
    updatePlayer();
    showInfo();
    if (pause) {
      playerRef.current.play();
    }
  };

  const removePodcast = (key) => {
    if (currentPodcast === podcastList[key] && key > 0) prevPodcast();
    else if (currentPodcast === podcastList[podcastList.length - 1])
      setIndex(index - 1);
    else if (key < index) setIndex(index - 1);

    showInfo();
    props.removePodcast(key);
  };

  useEffect(() => {
    const myPlayer = playerRef.current;
    const myTimeline = timelineRef.current;
    playerRef.current.addEventListener("timeupdate", timeUpdate, false);
    playerRef.current.addEventListener("ended", nextPodcast, false);
    timelineRef.current.addEventListener("click", changeCurrentTime, false);
    timelineRef.current.addEventListener("mousemove", hoverTimeLine, false);
    timelineRef.current.addEventListener("mouseout", resetTimeLine, false);

    return () => {
      myPlayer.removeEventListener("timeupdate", timeUpdate);
      myPlayer.removeEventListener("ended", nextPodcast);
      myTimeline.removeEventListener("click", changeCurrentTime);
      myTimeline.removeEventListener("mousemove", hoverTimeLine);
      myTimeline.removeEventListener("mouseout", resetTimeLine);
    };
  }, [podcastList]);

  showInfo();

  return (
    // <div className="min-h-screen flex flex-col items-center justify-center text-blue-700">
    <div className="flex flex-col items-center justify-center mt-5 mb-7 w-min rounded-2xl shadow-2xl shadow-blue-700 bg-blue-900 text-white font-light">
      <div className="p-5 bg-white items-center justify-center text-center text-blue-900 rounded-2xl">
        <audio ref={playerRef}>
          <source src={currentPodcast.embedded_src} type="audio/ogg" />
          Your browser does not support the audio element.
        </audio>
        <div className="img-wrap shadow-md object-contain shadow-blue-600 mx-auto w-64 h-48 overflow-hidden rounded-lg shadow-lg">
          <img
            src={currentPodcast.speaker.img}
            alt={currentPodcast.speaker.name}
            className="w-full h-full"
          />
        </div>
        <div className="justify-center mt-4 max-w-[25ch] text-blue-900 prose m-auto">
          <p className="text-center m-auto">{currentPodcast.title}</p>
        </div>
        <div className="text-center song-author text-blue-400">
          {currentPodcast.speaker.name}
        </div>

        <div className="time flex justify-between mt-4">
          <div>{currentTime}</div>
          <div>{currentPodcast.duration}</div>
        </div>

        <div
          ref={timelineRef}
          className="relative h-3 mt-2 bg-blue-400 rounded-full cursor-pointer"
        >
          <div
            ref={hoverPlayheadRef}
            className="absolute h-3 bg-blue-700 rounded-full"
          ></div>
          <div
            ref={playheadRef}
            className="absolute h-3 bg-blue-900 rounded-full"
          ></div>
        </div>

        <div className="controls flex justify-center mt-4 space-x-4">
          <button
            onClick={prevPodcast}
            className="text-blue-900 hover:scale-110"
          >
            <i className="fas fa-backward">{back}</i>
          </button>
          <button
            onClick={playOrPause}
            className="border-2 border-gray-300 rounded-full w-12 h-12 flex items-center justify-center text-blue-900 hover:shadow-lg"
          >
            {!pause ? (
              <i className="fas fa-play">{play}</i>
            ) : (
              <i className="fas fa-pause">{paused}</i>
            )}
          </button>
          <button
            onClick={nextPodcast}
            className="text-blue-900 hover:scale-110"
          >
            <i className="fas fa-forward">{forward}</i>
          </button>
        </div>
      </div>

      <div className="play-list flex flex-col bg-blue-900 rounded-lg p-2 mt-5 space-y-2 h-48 overflow-y-scroll">
        {podcastList.map((podcast, key) => {
          return podcast.disabled ? (
            <div></div>
          ) : (
            <div
              key={key}
              onClick={() => clickAudio(key)}
              className={`track relative w-full flex items-center p-2 hover:bg-blue-600 rounded-lg transition ${
                index === key ? "bg-blue-700" : ""
              }`}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removePodcast(key);
                }}
                className="absolute visible top-3 right-3 bottom-autio left-absolute"
              >
                <Xicon />
              </button>
              <img
                className="w-16 h-16 overflow-hidden rounded-lg shadow-lg"
                src={podcast.speaker.img}
                alt={podcast.speaker.name}
              />
              <div className="track-discr max-w-[25ch] ml-3 flex-1">
                <span className="block text-white">{podcast.title}</span>
                <span className="block mt-1 text-blue-300 text-sm">
                  {podcast.speaker.name}
                </span>
              </div>
              <span className="ml-auto">{podcast.duration}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AudioPlayerII;
