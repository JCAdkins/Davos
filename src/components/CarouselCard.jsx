import { Timestamp } from "firebase/firestore";
import Xicon from "./Xicon";
import { Card, Button } from "flowbite-react";

const getHours = (hour) => {
  if (hour === 0) return "12";
  if (hour > 12) return hour - 12;
  return hour;
};

const CarouselCard = (props) => {
  const displayEvents = props.events.map((event) => {
    const date =
      event.date instanceof Timestamp
        ? event.date.toDate()
        : new Date(event.date);
    return (
      <Card
        className="event-card flex-1 h-full border-none drop-shadow-md"
        imgAlt="Guest Speaker"
        imgSrc={event.img}
      >
        <p className="text-sm font-bold tracking-tight text-gray-900 dark:text-white">
          {event.title}
        </p>

        <div className="flex text-gray-900 text-xs whitespace-pre">
          <p>
            {date.getMonth() + 1}/{date.getDate()}/{date.getFullYear()}
          </p>
          {" @ "}
          <p>
            {getHours(date.getHours())}:
            {date.getMinutes().toString().padStart(2, "0")}
            {date.getHours() > 12 ? "PM" : "AM"}
          </p>
        </div>
        <div className="flex items-end justify-center h-full">
          <Button
            className="w-full"
            color="blue"
            size="xs"
            onClick={() => props.setEvent(event)}
          >
            Details
          </Button>
        </div>
      </Card>
    );
  });

  return (
    <div className="group -mt-72 rounded-lg min-w-full container bg-orange-300 px-4 pt-2 flex-grow w-full mx-auto">
      <button
        className="absolute hidden group-hover:inline-block bg-white hover:bg-gray-400 top-1 right-0 border-solid border-2 rounded-md mr-1 z-10 border-black"
        type="button"
        onClick={props.onButtonClick}
      >
        <Xicon />
      </button>
      <div id="scrollContainer" className="overflow-x-scroll items-start mb-8">
        <div className="flex flex-no-wrap mb-4 gap-4">{[displayEvents]}</div>
      </div>
    </div>
  );
};

export default CarouselCard;
