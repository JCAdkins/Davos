import { Button, Card } from "flowbite-react";
import { Timestamp } from "firebase/firestore";

const getHours = (hour) => {
  if (hour === 0) return "12";
  if (hour > 12) return hour - 12;
  return hour;
};

const makeDate = (data) => {
  return data instanceof Timestamp
    ? data.toDate()
    : data._seconds
    ? convertSeconds(data)
    : new Date(data);
};

const convertSeconds = (date) => {
  return new Date(date._seconds * 1000);
};

const EventCard = ({ event, setEvent, setShowEvent }) => {
  const background = "white";
  return (
    <div className="w-full flex lg:flex-col p-4 sm:w-1/2 lg:w-1/3">
      <Card
        className={`event-card bg-${background} flex-1 h-full border-none hover:shadow-app_accent-900 hover:scale-105 shadow-lg shadow-app_accent-900`}
        imgAlt="Guest Speaker"
        imgSrc={event.img}
      >
        <h5 className="text-lg font-bold leading-5 tracking-tight text-gray-900 dark:text-white">
          <p>{event.title}</p>
        </h5>
        <div className="flex-col text-gray-900 text-xs">
          <div className="flex whitespace-pre">
            <p>
              {makeDate(event.date).getMonth() + 1}/
              {makeDate(event.date).getDate()}/
              {makeDate(event.date).getFullYear()}
            </p>
            {" @ "}
            <p>
              {getHours(makeDate(event.date).getHours())}:
              {makeDate(event.date).getMinutes().toString().padStart(2, "0")}
              {makeDate(event.date).getHours() > 12 ? "PM" : "AM"}
            </p>
          </div>
          <p>
            {event.location.city}, {event.location.state}
          </p>
          <p>
            {event.type === "course"
              ? "Course"
              : event.type === "cocktail_party"
              ? "Cocktail Party"
              : "Luncheon"}
          </p>
        </div>
        <div className="flex items-end justify-center h-full">
          <Button
            onClick={() => {
              setEvent(event);
              setShowEvent(true);
            }}
            className="bg-app_accent-900 w-full"
            size="xs"
          >
            Details
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default EventCard;
