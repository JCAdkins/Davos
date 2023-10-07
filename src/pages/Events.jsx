import CardDefault from "../components/CardDefault";
import CarouselCard from "../components/CarouselCard";
import DefaultCalendar from "../components/DefaultCalendar";
import OverlayCard from "../components/OverlayCard";

import { useState } from "react";

const Events = () => {
  const [showOverlay, setShowOverlay] = useState(true);
  const [daysEvents, setDaysEvents] = useState([]);

  const closeOverlay = () => {
    setShowOverlay(!showOverlay);
  };

  const temp = [
    {
      title: "SWC: Star Wars Campout",
      description:
        "Come join us on an epic night of awesomeness. Together we'll travers the unknown, crosisng from sea to shining sea. They will never know another love like ours.",
      date: new Date("10/07/2023"),
      type: "luncheon",
      link: "",
    },
    {
      title: "CPVA: Certified Patient Valuation Analyst",
      description: "Some description.",
      date: new Date("09/28/2023"),
      type: "cocktail_party",
      link: "",
    },
    {
      title: "CPVA: Certified Patient Valuation Analyst",
      description: "Some description.",
      date: new Date("10/07/2023"),
      type: "course",
      link: "",
    },
    {
      title: "Analyzing Some Shit II",
      description: "This description blows hard.",
      date: new Date("09/10/2023"),
      type: "luncheon",
      link: "",
    },
    {
      title: "Certified Patient Valuation Analyst III",
      description: "This description blows even harder.",
      date: new Date("09/29/2023"),
      type: "cocktail_party",
      link: "",
    },
    {
      title: "Something Patient Certified Analyst III",
      description: "This description blows even harder.",
      date: new Date("10/02/2023"),
      type: "cocktail_party",
      link: "course",
    },
    {
      title: "Something Patient Certified Analyst III",
      description: "This description blows even harder.",
      date: new Date("10/07/2023"),
      type: "luncheon",
      link: "course",
    },
  ];

  const events =
    temp == null
      ? undefined
      : temp.sort((a, b) => {
          return a.date - b.date;
        });

  const todaysDate = new Date();
  todaysDate.setHours(0, 0, 0, 0);

  const [firstEvent, secondEvent, thirdEvent] = events.filter((event) => {
    return event.date >= todaysDate;
  });

  const setTileContent = (date) => {
    setDaysEvents(
      events.filter((event) => {
        return (
          date.getDate() == event.date.getDate() &&
          date.getMonth() == event.date.getMonth() &&
          date.getFullYear() == event.date.getFullYear()
        );
      })
    );
  };

  return (
    <div className="flex flex-row justify-evenly">
      <div className="flex justify-items-center w-full basis-2/5">
        <CardDefault
          display="justify-center items-center"
          className="bg-opacity-50 max-w-sm"
          header="Upcoming Events"
          text="2xl"
        >
          {firstEvent && (
            <OverlayCard
              date={firstEvent.date}
              title={firstEvent.title}
              description={firstEvent.description}
              link={firstEvent.link}
              buttonText="SEE EVENT"
              buttonVisible={true}
            />
          )}
          {secondEvent && (
            <OverlayCard
              date={secondEvent.date}
              title={secondEvent.title}
              description={secondEvent.description}
              link={secondEvent.link}
              buttonText="SEE EVENT"
              buttonVisible={true}
            />
          )}
          {thirdEvent && (
            <OverlayCard
              date={thirdEvent.date}
              title={thirdEvent.title}
              description={thirdEvent.description}
              link={thirdEvent.link}
              buttonText="SEE EVENT"
              buttonVisible={true}
            />
          )}
        </CardDefault>
      </div>

      <div className="flex basis-2/5">
        <CardDefault
          display="justify-center"
          className="bg-opacity-50 max-w-[vw / 3]"
        >
          <div className="flex flex-row justify-evenly">
            <div className="flex flex-row w-fit">
              <span className="flex w-3 h-3 bg-yellow-400 rounded-full m-2"></span>
              <p>Luncheon</p>
            </div>

            <div className="flex flex-row w-fit">
              <span className="flex w-3 h-3 bg-gray-900 rounded-full dark:bg-gray-700 m-2"></span>
              <p>Cocktail Party</p>
            </div>
            <div className="flex flex-row w-fit">
              <span className="flex w-3 h-3 bg-blue-600 rounded-full m-2"></span>
              <p>Courses</p>
            </div>
          </div>
          <DefaultCalendar
            events={events}
            daysEvents={daysEvents}
            setTileContent={setTileContent}
          />
          <div className="divide-y divide-black">
            <CardDefault display="mt-4 justify-center">
              Log in to see your events.
            </CardDefault>
          </div>
        </CardDefault>
      </div>
    </div>
  );
};

export default Events;
