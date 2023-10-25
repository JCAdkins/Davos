import CardDefault from "../components/CardDefault";
import DefaultCalendar from "../components/DefaultCalendar";
import OverlayCard from "../components/OverlayCard";
import IMAGES from "../images/Images";
import { Accordion } from "flowbite-react";

import { useState } from "react";

const Events = () => {
  const [daysEvents, setDaysEvents] = useState([]);

  const temp = [
    {
      title: "SWC: Star Wars Campout",
      description:
        "Come join us on an epic night of awesomeness. Together we'll travers the unknown, crosisng from sea to shining sea. They will never know another love like ours.",
      date: new Date("10/28/2023"),
      type: "luncheon",
      link: "",
    },
    {
      title: "CPVA: Certified Patient Valuation Analyst",
      description: "Some description.",
      date: new Date("010/28/2023"),
      type: "cocktail_party",
      link: "",
    },
    {
      title: "CPVA: Certified Patient Valuation Analyst",
      description: "Some description.",
      date: new Date("11/07/2023"),
      type: "course",
      link: "",
    },
    {
      title: "Analyzing Some Shit II",
      description: "This description blows hard.",
      date: new Date("11/10/2023"),
      type: "luncheon",
      link: "",
    },
    {
      title: "Certified Patient Valuation Analyst III",
      description: "This description blows even harder.",
      date: new Date("10/29/2023"),
      type: "cocktail_party",
      link: "",
    },
    {
      title: "Something Patient Certified Analyst III",
      description: "This description blows even harder.",
      date: new Date("10/28/2023"),
      type: "course",
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
    <div className="lg:grid lg:grid-cols-4">
      <div className="lg:flex-1 lg:w-full lg:justify-start">
        <div className="lg:hidden p-4 bg-sky-900">
          <Accordion collapseAll className="bg-orange-300">
            <Accordion.Panel>
              <Accordion.Title className="text-gray-900 bg-white">
                Upcoming Events
              </Accordion.Title>
              <Accordion.Content>
                <div className="flex overflow-auto h-full bg-orange-300 justify-content text-center">
                  <div className="min-w-[25ch] h-full">
                    {firstEvent && (
                      <OverlayCard
                        className="bg-opacity-90"
                        date={firstEvent.date}
                        title={firstEvent.title}
                        description={firstEvent.description}
                        link={firstEvent.link}
                        buttonText="SEE EVENT"
                        buttonVisible={true}
                      />
                    )}
                  </div>
                  <div className="min-w-[25ch] h-full">
                    {secondEvent && (
                      <OverlayCard
                        className="bg-opacity-90"
                        date={secondEvent.date}
                        title={secondEvent.title}
                        description={secondEvent.description}
                        link={secondEvent.link}
                        buttonText="SEE EVENT"
                        buttonVisible={true}
                      />
                    )}
                  </div>
                  <div className="min-w-[25ch] h-full">
                    {thirdEvent && (
                      <OverlayCard
                        className="bg-opacity-90"
                        date={thirdEvent.date}
                        title={thirdEvent.title}
                        description={thirdEvent.description}
                        link={thirdEvent.link}
                        buttonText="SEE EVENT"
                        buttonVisible={true}
                      />
                    )}
                  </div>
                </div>
              </Accordion.Content>
            </Accordion.Panel>
            <Accordion.Panel>
              <Accordion.Title className="text-gray-900 bg-white">
                Calendar
              </Accordion.Title>
              <Accordion.Content>
                <div className="lg:items-center lg:flex-1">
                  <div className="bg-sky-900 border border-gray-200 shadow-lg dark:border-gray-700 dark:bg-gray-800 rounded-none h-full justify-start">
                    <div className="flex flex-row gap-4 p-6 justify-evenly">
                      <div className="flex flex-row gap-4 w-fit">
                        <span className="flex-none w-3 h-3 bg-yellow-400 rounded-full mr-1 my-2"></span>
                        <p>Luncheon</p>
                      </div>

                      <div className="mx-2 flex flex-row items-start w-fit">
                        <span className="flex-none w-3 h-3 bg-red-400 rounded-full dark:bg-gray-700 mr-1 my-2"></span>
                        <p>Cocktail Party</p>
                      </div>
                      <div className="flex flex-row w-fit">
                        <span className="flex-none w-3 h-3 bg-blue-600 rounded-full mr-1 my-2"></span>
                        <p>Courses</p>
                      </div>
                    </div>
                    <div className="px-4">
                      <CardDefault>
                        <DefaultCalendar
                          events={events}
                          daysEvents={daysEvents}
                          setTileContent={setTileContent}
                        />
                      </CardDefault>
                    </div>
                  </div>
                </div>
              </Accordion.Content>
            </Accordion.Panel>
            <Accordion.Panel>
              <Accordion.Title className="text-gray-900 bg-white">
                Your Events
              </Accordion.Title>
              <Accordion.Content>
                <div className="divide-y px-4 divide-black">
                  <CardDefault display="mt-4 justify-center">
                    Log in to see your events.
                  </CardDefault>
                </div>
              </Accordion.Content>
            </Accordion.Panel>
          </Accordion>
        </div>
        <div className="sticky h-[41%] left-0 top-20 overflow-scroll hidden lg:block">
          <div className="flex-1 h-full overflow-scroll lg:rounded-none lg:bg-sky-900 lg:px-4 lg:justify-start lg:items-center lg:h-full lg:w-fill">
            <p className="lg:font-sarif lg:py-5 lg:text-3xl lg:text-center">
              Upcoming Events
            </p>
            {firstEvent && (
              <OverlayCard
                className="bg-opacity-90"
                date={firstEvent.date}
                title={firstEvent.title}
                description={firstEvent.description}
                link={firstEvent.link}
                buttonText="DETAILS"
                buttonVisible={true}
              />
            )}
            {secondEvent && (
              <OverlayCard
                className="bg-opacity-90"
                date={secondEvent.date}
                title={secondEvent.title}
                description={secondEvent.description}
                link={secondEvent.link}
                buttonText="DETAILS"
                buttonVisible={true}
              />
            )}
            {thirdEvent && (
              <OverlayCard
                className="bg-opacity-90"
                date={thirdEvent.date}
                title={thirdEvent.title}
                description={thirdEvent.description}
                link={thirdEvent.link}
                buttonText="DETAILS"
                buttonVisible={true}
              />
            )}
          </div>
        </div>
      </div>
      <div className="lg:col-span-2 lg:items-center lg:w-fit font-serif lg:leading-snug text-gray-900 lg:text-xl">
        <div className="bg-white">
          <div className="flex flex-col items-center mx-6 lg:max-w-[65ch]">
            <span className="m-6 w-[100%] text-center font-bold text-xl lg:text-3xl">
              Explore Our Upcoming Events
            </span>{" "}
            Welcome to our exciting world of events! Join us in celebrating
            innovation, knowledge sharing, and community building. At Davos In
            The Desert, we curate a diverse range of events designed to inspire,
            educate, and connect.{" "}
          </div>
          <br></br>
          <div className="items-center">
            <img
              src={IMAGES.social_event_page}
              alt="Social Event Picture"
            ></img>
          </div>
          <br></br>

          <div className="flex flex-col mx-6 lg:max-w-[65ch]">
            <span className="mt-6 font-bold">What to Expect: </span>
            <ol
              role="list"
              className="marker:text-sky-900 bg-orange-300 rounded lg:bg-white list-disc mb-6 pl-5 space-y-3"
            >
              <li className="mt-2">
                <strong>Engaging Workshops: </strong>Dive deep into the latest
                industry trends and gain hands-on experience with our expert-led
                workshops.
              </li>{" "}
              <li>
                <strong> Informative Webinars:</strong> Stay updated with the
                ever-evolving landscape through our informative webinars and
                panel discussions.
              </li>
              <li>
                {" "}
                <strong> Networking Opportunities:</strong> Connect with
                like-minded professionals, potential partners, and industry
                leaders.
              </li>
              <li>
                {" "}
                <strong>Product Launches:</strong> Be the first to witness
                groundbreaking product launches and innovations.
              </li>
              <li className="mb-2">
                {" "}
                <strong>Community Building:</strong> Share your insights, ask
                questions, and participate in discussions that matter to you.{" "}
              </li>
            </ol>
          </div>

          <div className="flex flex-col items-center mx-6 lg:max-w-[65ch]">
            <span className="mt-6 w-[100%] font-bold">Why Attend:</span> Our
            events are designed to provide valuable takeaways for every
            participant. Whether you're an industry veteran or just starting
            your journey, you'll find something that aligns with your interests
            and goals. Join us to:{" "}
          </div>

          <div className="flex flex-col mx-6 lg:max-w-[65ch]">
            <ol
              role="list"
              className="marker:text-sky-900 bg-orange-300 lg:bg-white rounded list-disc pl-5 space-y-3"
            >
              <li className="mt-2">Expand your knowledge</li>
              <li> Build meaningful connections </li>
              <li>Explore new opportunities</li>{" "}
              <li>Stay ahead in your field</li>
              <li className="mb-2"> Enjoy the experience</li>
            </ol>
            <div className="flex flex-col items-center mt-6 lg:max-w-[65ch]">
              <span className="mt-6 w-[100%] font-bold">Stay Updated:</span>{" "}
              Bookmark this page and keep an eye on our event calendar. We
              regularly update it with new, exciting events you won't want to
              miss.
            </div>
            <div className="flex flex-col items-center my-6 lg:max-w-[65ch]">
              <span className="mt-6 w-[100%] font-bold">Get In Touch:</span>{" "}
              Have questions or need more information? Reach out to our friendly
              team at media@davos.net or (309)230-7966. Don't miss out on our
              upcoming events; your next adventure starts here! Feel free to
              customize this description to match the unique features and goals
              of your company's events.
            </div>
          </div>
        </div>
      </div>
      <div className="sticky h-[41%] right-0 overflow-scroll top-20 lg:items-center lg:flex-1">
        <div className="flex-1 h-full hidden lg:block">
          <div className="flex-1 overflow-scroll h-full bg-sky-900 border border-gray-200 shadow-lg dark:border-gray-700 dark:bg-gray-800 rounded-none h-full justify-start">
            <div className="flex flex-row gap-4 p-6 justify-evenly">
              <div className="flex flex-row gap-4 w-fit">
                <span className="flex-none w-3 h-3 bg-yellow-400 rounded-full mr-1 my-2"></span>
                <p>Luncheon</p>
              </div>

              <div className="mx-2 flex flex-row items-start w-fit">
                <span className="flex-none w-3 h-3 bg-red-400 rounded-full dark:bg-gray-700 mr-1 my-2"></span>
                <p>Cocktail Party</p>
              </div>
              <div className="flex flex-row w-fit">
                <span className="flex-none w-3 h-3 bg-blue-600 rounded-full mr-1 my-2"></span>
                <p>Courses</p>
              </div>
            </div>
            <div className="px-4">
              <CardDefault>
                <DefaultCalendar
                  events={events}
                  daysEvents={daysEvents}
                  setTileContent={setTileContent}
                />
              </CardDefault>
            </div>
            <div className="divide-y px-4 divide-black">
              <CardDefault display="mt-4 justify-center">
                Log in to see your events.
              </CardDefault>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events;
