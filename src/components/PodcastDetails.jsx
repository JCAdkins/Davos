import "../customcss/CustomCardCss.css";
import ClockIcon from "./Icons/ClockIcon";
import PodcastCalendar from "./Icons/PodcastCalendar";
import { Button, Tabs } from "flowbite-react";
import HashtagIcon from "./Icons/HashtagIcon";
import { Timestamp } from "firebase/firestore";

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

const convertSeconds = (date) => {
  return new Date(date._seconds * 1000);
};

const PodcastDetails = ({ podcast, addToPlaylist }) => {
  const pcDate =
    podcast.date instanceof Timestamp
      ? podcast.date.toDate()
      : podcast.date._seconds
      ? convertSeconds(podcast.date)
      : new Date(podcast.date);

  return (
    <div className="flex-col">
      <div className="pc-details flex flex-col sm:flex-row justify-center items-center gap-8 text-app_accent-900 my-4 font-dmserif">
        <div className="flex-col">
          <img
            className="rounded-lg shadow-lg shadow-app_accent-900"
            src={podcast.speaker.img}
            alt="Speaker Image"
          />
          <div className="flex-col mt-4">
            <p className="w-full text-lg font-bold">
              {podcast.speaker.name}, {podcast.speaker.company}
            </p>
            <p className="w-full text-md">{podcast.speaker.position}</p>
          </div>
        </div>
        <div className="grid auto-rows-auto items-center">
          <p className="text-3xl drop-shadow-[0_1.2px_1.2px_rgba(255,255,255)] text-shadow shadow-app_accent-600">
            {podcast.title}
          </p>
          <div className="pc-details-icons-container flex w-full items-center justify-evenly my-3 text-xs text-app_accent-900 dark:text-gray-400">
            <div className="flex w-fit gap-2 items-center">
              <ClockIcon text={"app_accent-900"} />
              <p className="text-app_accent-900">{podcast.duration}</p>
            </div>
            <div className="flex w-fit gap-2 items-center text-black">
              <PodcastCalendar text={"app_accent-900"} />
              <p className="text-app_accent-900">{formatDate(pcDate)}</p>
            </div>
            <div className="flex w-fit items-center">
              <HashtagIcon text={"app_accent-900"} />
              <p className="text-app_accent-900">{podcast.tag}</p>
            </div>
          </div>
          <p className="h-fit text-lg">{podcast.description}</p>

          <Button
            className="mt-4 bg-app_accent-900"
            size="xs"
            onClick={() => {
              addToPlaylist(podcast);
            }}
          >
            Add To Playlist
          </Button>
        </div>
      </div>
      <div>
        <Tabs
          className="tabs"
          aria-label="Tabs with underline"
          style="underline"
        >
          <Tabs.Item className="" active title="Topics">
            <div className="flex w-full justify-center bg-app_accent-900">
              <ul className="bg-app_accent-900 border-x-8 border-white border-double list-disc list-inside p-4 max-w-[70ch] text-lg text-left">
                <p className="text-center">
                  The issues that are discussed during this podcast:
                </p>
                {podcast.issues_discussed?.map((issue, ind) => {
                  return (
                    <li className="m-6" key={ind}>
                      {issue}
                    </li>
                  );
                })}
              </ul>
            </div>
          </Tabs.Item>
          <Tabs.Item title="Biography">
            <div className="flex w-full justify-center bg-app_accent-900">
              <div className="flex-col border-x-8 border-white border-double bg-app_accent-900 p-4 max-w-[70ch] text-lg text-left">
                <p className="m-6">{podcast.speaker.about}</p>
              </div>
            </div>
          </Tabs.Item>
        </Tabs>
      </div>
    </div>
  );
};

export default PodcastDetails;
