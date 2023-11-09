import { Button, Card } from "flowbite-react";

const getHours = (hour) => {
  if (hour === 0) return "12";
  if (hour > 12) return hour - 12;
  return hour;
};

const EventCard = ({ event, setEvent, setShowEvent }) => {
  return (
    <div className="w-full flex lg:flex-col p-4 sm:w-1/2 lg:w-1/3">
      <Card
        className="event-card flex-1 h-full border-none hover:shadow-app_accent-900 hover:scale-105 shadow-lg shadow-app_accent-900"
        imgAlt="Guest Speaker"
        imgSrc={event.img}
      >
        <h5 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
          <p>{event.title}</p>
        </h5>
        <div className="flex-col text-gray-900 text-xs">
          <div className="flex whitespace-pre">
            <p>
              {event.date.toDate().getMonth() + 1}/
              {event.date.toDate().getDate()}/
              {event.date.toDate().getFullYear()}
            </p>
            {" @ "}
            <p>
              {getHours(event.date.toDate().getHours())}:
              {event.date.toDate().getMinutes().toString().padStart(2, "0")}
              {event.date.toDate().getHours() > 12 ? "PM" : "AM"}
            </p>
          </div>
          <p>
            {event.location.city}, {event.location.state}
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
