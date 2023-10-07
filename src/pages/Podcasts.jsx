import AudioPlayerII from "../components/AudioPlayer/AudioPlayerII";
import CardDefault from "../components/CardDefault";
import VerticalAccordion from "../components/VerticalAccordion";
import { useState } from "react";

const Podcasts = () => {
  const [audio, setAudio] = useState(null);
  const [haveAudio, setHaveAudio] = useState(null);

  const playAudio = (audio) => {
    setAudio(audio);
    setHaveAudio(true);
    return true;
  };

  const audioPlayer = new AudioPlayerII();

  return (
    <div className="">
      <div className="flex flex-row justify-evenly">
        <div className="flex flex-col px-6 basis-1/2 max-w-sm md:max-w-2xl h-fit mr-15">
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
          {haveAudio && audioPlayer.render()}
        </CardDefault>
      </div>
    </div>
  );
};

export default Podcasts;
