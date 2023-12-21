import { useState } from "react";
import Calendar from "react-calendar";
import CarouselCard from "./CarouselCard";
import { Timestamp } from "firebase/firestore";
import "./DefaultCalendar.css";

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

export default function DefaultCalendar(props) {
  const [value, onChange] = useState(new Date());
  const [showOverlay, setShowOverlay] = useState(false);

  const handleDateChange = (value) => {
    onChange(value);
    setShowOverlay(!showOverlay);
    props.setTileContent(value);
  };

  const closeOverlay = () => {
    setShowOverlay(!showOverlay);
  };

  return (
    <div className="">
      <div className="Calendar z-0">
        <div className="Calendar__container">
          <div className="Calendar__container__content">
            <Calendar
              tileContent={({ date }) => {
                const temp = props.events.filter((event) => {
                  const eventDate = makeDate(event.date);
                  return (
                    date.getDate() == eventDate.getDate() &&
                    date.getMonth() == eventDate.getMonth() &&
                    date.getFullYear() == eventDate.getFullYear()
                  );
                });
                const retArray = temp.map((event, ind) => {
                  const margin = () => (event.length === 3 ? 0.5 : 1);

                  if (event.type === "luncheon")
                    return (
                      <span
                        key={ind}
                        className={`flex mt-0.5 w-full h-1 bg-yellow-200 dark:bg-yellow-200 rounded-full m-${margin}`}
                      ></span>
                    );
                  else if (event.type === "cocktail_party")
                    return (
                      <span
                        key={ind}
                        className={`flex w-full h-1 mt-0.5  bg-red-400 rounded-full dark:bg-red-700 m-${margin}`}
                      ></span>
                    );
                  else if (event.type === "course")
                    return (
                      <span
                        key={ind}
                        className={`flex w-full h-1 mt-0.5 bg-blue-400 dark:bg-blue-400 rounded-full m-${margin}`}
                      ></span>
                    );
                });

                return <div>{retArray}</div>;
              }}
              calendarType="gregory"
              onChange={handleDateChange}
              value={value}
            />
          </div>
        </div>
      </div>
      <div className="bg-orange-400 z-10 rounded-lg relative">
        {showOverlay &&
          (props.daysEvents.length > 0 ? (
            <div className="bg-orange-400 rounded-lg z-10">
              <CarouselCard
                setEvent={(event) => props.setEvent(event)}
                events={props.daysEvents}
                onButtonClick={closeOverlay}
              ></CarouselCard>
            </div>
          ) : (
            <CarouselCard
              setEvent={{}}
              events={[
                {
                  title: "There Are No Events This Day",
                  description: "No description available.",
                  date: value,
                  type: "cocktail_party",
                  link: "course",
                },
              ]}
              onButtonClick={closeOverlay}
            ></CarouselCard>
          ))}
      </div>
    </div>
  );
}
