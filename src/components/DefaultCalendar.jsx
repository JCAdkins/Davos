import { useState } from "react";
import Calendar from "react-calendar";
import CarouselCard from "./CarouselCard";
import "./DefaultCalendar.css";

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
    <div>
      <div className="Calendar z-0">
        <div className="Calendar__container">
          <div className="Calendar__container__content">
            <Calendar
              tileContent={({ date }) => {
                const temp = props.events.filter((event) => {
                  const eventDate = event.date.toDate();
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
                        className={`flex mt-0.5 w-full h-1 bg-yellow-200 rounded-full m-${margin}`}
                      ></span>
                    );
                  else if (event.type === "cocktail_party")
                    return (
                      <span
                        key={ind}
                        className={`flex w-full h-1 mt-0.5  bg-red-400 rounded-full dark:bg-gray-700 m-${margin}`}
                      ></span>
                    );
                  else if (event.type === "course")
                    return (
                      <span
                        key={ind}
                        className={`flex w-full h-1 mt-0.5 bg-blue-400 rounded-full m-${margin}`}
                      ></span>
                    );
                });
                const currentDate = new Date();
                const isCurrentDate =
                  date.getDate() === currentDate.getDate() &&
                  date.getMonth() === currentDate.getMonth() &&
                  date.getFullYear() === currentDate.getFullYear();

                return (
                  <div
                    className={`calendar-tile-${
                      isCurrentDate ? "current-day" : ""
                    }`}
                  >
                    {[retArray]}
                  </div>
                );
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
