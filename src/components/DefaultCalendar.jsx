import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import "./DefaultCalendar.css";
import CarouselCard from "./CarouselCard";

export default function DefaultCalendar(props) {
  const [value, onChange] = useState(new Date());
  const [showOverlay, setShowOverlay] = useState(false);
  const [opacity, setOpacity] = useState("notOpaque");

  const handleDateChange = (value) => {
    onChange(value);
    setShowOverlay(!showOverlay);
    setOpacity(opacity === "notOpaque" ? "opaque" : "notOpaque");
    props.setTileContent(value);
  };

  const closeOverlay = () => {
    setShowOverlay(!showOverlay);
  };

  return (
    <div className="Calendar">
      <div className="Calendar__container">
        <div className="Calendar__container__content">
          <Calendar
            //className={opacity}
            tileContent={({ activeStartDate, date }) => {
              const temp = props.events.filter((event) => {
                return (
                  date.getDate() == event.date.getDate() &&
                  date.getMonth() == event.date.getMonth() &&
                  date.getFullYear() == event.date.getFullYear()
                );
              });
              const retArray = temp.map((event) => {
                const margin = () => (event.length === 3 ? 0.5 : 1);

                if (event.type === "luncheon")
                  return (
                    <span
                      className={`flex -mt-0.5 w-1/2 ml-2.5 h-px bg-yellow-400 rounded-full m-{$margin}`}
                    ></span>
                  );
                else if (event.type === "cocktail_party")
                  return (
                    <span
                      className={`flex w-1/2 h-px -mt-0.5 ml-2.5 bg-red-400 rounded-full dark:bg-gray-700 m-{margin}`}
                    ></span>
                  );
                else if (event.type === "course")
                  return (
                    <span
                      className={`flex w-1/2 h-px -mt-0.5 ml-2.5 bg-blue-600 rounded-full m-{$margin}`}
                    ></span>
                  );
              });
              return <p>{[retArray]}</p>;
            }}
            calendarType="gregory"
            onChange={handleDateChange}
            value={value}
          />
          {showOverlay &&
            (props.daysEvents.length > 0 ? (
              <CarouselCard
                events={props.daysEvents}
                onButtonClick={closeOverlay}
              ></CarouselCard>
            ) : (
              <CarouselCard
                events={[
                  {
                    title: "There Are No Events This Day",
                    description: "No description available.",
                    date: new Date(value),
                    type: "cocktail_party",
                    link: "course",
                  },
                ]}
                onButtonClick={closeOverlay}
              ></CarouselCard>
            ))}
        </div>
      </div>
    </div>
  );
}
