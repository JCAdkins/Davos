import { useState, useRef, Component } from "react";

class AudioPlayer extends Component() {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      currentTime: "0:00",
      musicList: [
        {
          name: "Nice piano and ukulele",
          author: "Royalty",
          img: "https://www.bensound.com/bensound-img/buddy.jpg",
          audio: "https://www.bensound.com/bensound-music/bensound-buddy.mp3",
          duration: "2:02",
        },
        {
          name: "Gentle acoustic",
          author: "Acoustic",
          img: "https://www.bensound.com/bensound-img/sunny.jpg",
          audio: "https://www.bensound.com//bensound-music/bensound-sunny.mp3",
          duration: "2:20",
        },
        {
          name: "Corporate motivational",
          author: "Corporate",
          img: "https://www.bensound.com/bensound-img/energy.jpg",
          audio: "https://www.bensound.com/bensound-music/bensound-energy.mp3",
          duration: "2:59",
        },
        {
          name: "Slow cinematic",
          author: "Royalty",
          img: "https://www.bensound.com/bensound-img/slowmotion.jpg",
          audio:
            "https://www.bensound.com/bensound-music/bensound-slowmotion.mp3",
          duration: "3:26",
        },

        // ... (other music items)
      ],
      pause: false,
    };

    this.playerRef = React.createRef();
    this.timelineRef = React.createRef();
    this.playheadRef = React.createRef();
    this.hoverPlayheadRef = React.createRef();
  }

  componentDidMount() {
    playerRef.addEventListener("timeupdate", this.timeUpdate, false);
    this.playerRef.addEventListener("ended", this.nextSong, false);
    this.timelineRef.addEventListener("click", this.changeCurrentTime, false);
    this.timelineRef.addEventListener("mousemove", this.hoverTimeLine, false);
    this.timelineRef.addEventListener("mouseout", this.resetTimeLine, false);
  }

  componentWillUnmount() {
    this.playerRef.removeEventListener("timeupdate", this.timeUpdate);
    this.playerRef.removeEventListener("ended", this.nextSong);
    this.timelineRef.removeEventListener("click", this.changeCurrentTime);
    this.timelineRef.removeEventListener("mousemove", this.hoverTimeLine);
    this.timelineRef.removeEventListener("mouseout", this.resetTimeLine);
  }

  changeCurrentTime = (e) => {
    const duration = this.playerRef.duration;

    const playheadWidth = this.timelineRef.offsetWidth;
    const offsetWidht = this.timelineRef.offsetLeft;
    const userClickWidht = e.clientX - offsetWidht;

    const userClickWidhtInPercent = (userClickWidht * 100) / playheadWidth;

    this.playheadRef.style.width = userClickWidhtInPercent + "%";
    this.playerRef.currentTime = (duration * userClickWidhtInPercent) / 100;
  };

  hoverTimeLine = (e) => {
    const duration = this.playerRef.duration;

    const playheadWidth = this.timelineRef.offsetWidth;

    const offsetWidht = this.timelineRef.offsetLeft;
    const userClickWidht = e.clientX - offsetWidht;
    const userClickWidhtInPercent = (userClickWidht * 100) / playheadWidth;

    if (userClickWidhtInPercent <= 100) {
      this.hoverPlayheadRef.style.width = userClickWidhtInPercent + "%";
    }

    const time = (duration * userClickWidhtInPercent) / 100;

    if (time >= 0 && time <= duration) {
      this.hoverPlayheadRef.dataset.content = this.formatTime(time);
    }
  };

  resetTimeLine = () => {
    this.hoverPlayheadRef.style.width = 0;
  };

  timeUpdate = () => {
    const duration = this.playerRef.duration;
    const timelineWidth =
      this.timelineRef.offsetWidth - this.playheadRef.offsetWidth;
    const playPercent = 100 * (this.playerRef.currentTime / duration);
    this.playheadRef.style.width = playPercent + "%";
    const currentTime = this.formatTime(parseInt(this.playerRef.currentTime));
    this.setState({
      currentTime,
    });
  };

  formatTime = (currentTime) => {
    const minutes = Math.floor(currentTime / 60);
    let seconds = Math.floor(currentTime % 60);

    seconds = seconds >= 10 ? seconds : "0" + (seconds % 60);

    const formatTime = minutes + ":" + seconds;

    return formatTime;
  };

  updatePlayer = () => {
    const { musicList, index } = this.state;
    const currentSong = musicList[index];
    const audio = new Audio(currentSong.audio);
    this.playerRef.load(audio);
  };

  nextSong = () => {
    const { musicList, index, pause } = this.state;
    this.setState({
      ...this.state,
      index: (index + 1) % musicList.length,
    });
    this.updatePlayer();
    if (pause) {
      this.playerRef.play();
    }
  };

  prevSong = () => {
    const { musicList, index, pause } = this.state;

    this.setState({
      index: (index + musicList.length - 1) % musicList.length,
    });
    this.updatePlayer();
    if (pause) {
      this.playerRef.play();
    }
  };

  playOrPause = () => {
    const { pause } = this.state;
    if (!this.state.pause) {
      this.playerRef.play();
    } else {
      this.playerRef.pause();
    }
    this.state = {
      ...this.state,
      pause: !pause,
    };
  };

  clickAudio = (key) => {
    const { pause } = this.state;

    this.setState({
      index: key,
    });

    this.updatePlayer();
    if (pause) {
      this.playerRef.play();
    }
  };

  speedUpAudio = () => {};

  render() {
    const { musicList, index, currentTime, pause } = this.state;
    const currentSong = musicList[index];
    return (
      <div>
        <div className="current-song mt-6 sm:mt-10 relative z-10 rounded-xl shadow-xl">
          <audio
            ref={(ref) => {
              this.playerRef = ref;
            }}
          >
            <source src={currentSong.audio} type="audio/ogg" />
          </audio>
          <div className="bg-white border-slate-100 transition-all duration-500 dark:bg-slate-800 transition-all duration-500 dark:border-slate-500 border-b rounded-t-xl p-4 pb-6 sm:p-10 sm:pb-8 lg:p-6 xl:p-10 xl:pb-8 space-y-6 sm:space-y-8 lg:space-y-6 xl:space-y-8">
            <div className="flex items-center space-x-4">
              <img
                src={currentSong.img}
                loading="lazy"
                decoding="async"
                alt=""
                className="flex-none rounded-lg bg-slate-100"
                width="88"
                height="88"
              />
              <div className="min-w-0 flex-auto space-y-1 font-semibold">
                <p className="text-cyan-500 transition-all duration-500 dark:text-cyan-400 text-sm leading-6">
                  <abbr title="Episode">Ep.</abbr> 128
                </p>
                <h2 className="text-slate-500 transition-all duration-500 dark:text-slate-400 text-sm leading-6 truncate">
                  {currentSong.name}
                </h2>
                <p className="text-slate-900 transition-all duration-500 dark:text-slate-50 text-lg">
                  {currentSong.author}
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="relative">
                <div className="bg-slate-100 transition-all duration-500 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="bg-cyan-500 transition-all duration-500 dark:bg-cyan-400 w-1/2 h-2"
                    role="progressbar"
                    aria-label="music progress"
                    aria-valuenow="1456"
                    aria-valuemin="0"
                    aria-valuemax="4550"
                  ></div>
                </div>
                <div className="ring-cyan-500 transition-all duration-500 dark:ring-cyan-400 ring-2 absolute left-1/2 top-1/2 w-4 h-4 -mt-2 -ml-2 flex items-center justify-center bg-white rounded-full shadow">
                  <div className="w-1.5 h-1.5 bg-cyan-500 transition-all duration-500 dark:bg-cyan-400 rounded-full ring-1 ring-inset ring-slate-900/5"></div>
                </div>
              </div>
              <div className="flex justify-between text-sm leading-6 font-medium tabular-nums">
                <div className="text-cyan-500 transition-all duration-500 dark:text-slate-100">
                  {currentTime}
                </div>
                <div className="text-slate-500 transition-all duration-500 dark:text-slate-400">
                  {currentSong.duration}
                </div>
              </div>
            </div>
            <div ref={(ref) => (this.timelineRef = ref)} id="timeline">
              <div ref={(ref) => (this.playheadRef = ref)} id="playhead"></div>
              <div
                ref={(ref) => (this.hoverPlayheadRef = ref)}
                class="hover-playhead"
                data-content="0:00"
              ></div>
            </div>

            <div className="bg-slate-50 text-slate-500 transition-all duration-500 dark:bg-slate-600 transition-all duration-500 dark:text-slate-200 rounded-b-xl flex items-center">
              <div className="flex-auto flex items-center justify-evenly">
                <button
                  type="button"
                  aria-label="Add to favorites"
                  onClick={this.addToFavorites}
                >
                  <svg width="24" height="24">
                    <path
                      d="M7 6.931C7 5.865 7.853 5 8.905 5h6.19C16.147 5 17 5.865 17 6.931V19l-5-4-5 4V6.931Z"
                      fill="currentColor"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </button>
                <button
                  type="button"
                  className="hidden sm:block lg:hidden xl:block"
                  aria-label="Previous"
                  onClick={this.prevSong}
                >
                  <svg width="24" height="24" fill="none">
                    <path
                      d="m10 12 8-6v12l-8-6Z"
                      fill="currentColor"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M6 6v12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </button>
              </div>
              <button
                type="button"
                className="bg-white text-slate-900 transition-all duration-500 dark:bg-slate-100 transition-all duration-500 dark:text-slate-700 flex-none -my-2 mx-auto w-20 h-20 rounded-full ring-1 ring-slate-900/5 shadow-md flex items-center justify-center"
                aria-label="Pause"
                onClick={this.playOrPause}
              >
                <svg width="30" height="32" fill="currentColor">
                  <rect x="6" y="4" width="4" height="24" rx="2"></rect>
                  <rect x="20" y="4" width="4" height="24" rx="2"></rect>
                </svg>
              </button>
              <div className="flex-auto flex items-center justify-evenly">
                <button
                  type="button"
                  className="hidden sm:block lg:hidden xl:block"
                  aria-label="Next"
                  onClick={this.nextSong}
                >
                  <svg width="24" height="24" fill="none">
                    <path
                      d="M14 12 6 6v12l8-6Z"
                      fill="currentColor"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M18 6v12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </button>
                <button
                  type="button"
                  className="rounded-lg text-xs leading-6 font-semibold px-2 ring-2 ring-inset ring-slate-500 text-slate-500 transition-all duration-500 dark:text-slate-100 transition-all duration-500 dark:ring-0 transition-all duration-500 dark:bg-slate-500"
                  onClick={this.speedUpAudio}
                >
                  1x
                </button>
              </div>
            </div>
          </div>
          <div className="play-list">
            {musicList.map((music, key = 0) => (
              <div
                key={key}
                onClick={() => this.clickAudio(key)}
                className={
                  "track " +
                  (index === key && !pause ? "current-audio" : "") +
                  (index === key && pause ? "play-now" : "")
                }
              >
                <img className="track-img" src={music.img} />
                <div className="track-discr">
                  <span className="track-name">{music.name}</span>
                  <span className="track-author">{music.author}</span>
                </div>
                <span className="track-duration">
                  {index === key ? currentTime : music.duration}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default AudioPlayer;
