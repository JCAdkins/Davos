import CardDefault from "../components/CardDefault";
import DefaultCalendar from "../components/DefaultCalendar";
import IMAGES from "../images/Images";
import {
  Accordion,
  Card,
  Button,
  ListGroup,
  Pagination,
  Spinner,
} from "flowbite-react";
import { useEffect, useState, useContext, useRef } from "react";
import getAllEvents from "../services/getAllEvents";
import getAllUserEvents from "../services/getAllUserEvents";
import UserContext from "../contexts/UserContext";
import EventsModal from "../components/Modals/EventsModal";
import EventCard from "../components/EventCard";
import SearchBar from "../components/SearchBar";
import paginatedCollection from "../services/paginatedCollection";
import PaginatedTransitions from "../animations/PaginatedTransitions";
import CardSkeleton from "../components/Skeletons/CardSkeleton";
import UpcomingEvents from "../components/Icons/UpcomingEvents";
import { Timestamp } from "firebase/firestore";
import addEventToUserList from "../services/addEventToUserList";
import "../customcss/CustomCardCss.css";
import { getAuth } from "firebase/auth";
import removeEventFromUserList from "../services/removeEventFromUserList";

const skeletonList = [
  <CardSkeleton />,
  <CardSkeleton />,
  <CardSkeleton />,
  <CardSkeleton />,
  <CardSkeleton />,
  <CardSkeleton />,
];

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

const Events = () => {
  const { user, setUser } = useContext(UserContext);
  const [daysEvents, setDaysEvents] = useState([]);
  const [eventList, setEventList] = useState([]);
  const [userEvents, setUserEvents] = useState([]);
  const [showEvent, setShowEvent] = useState(false);
  const [event, setEvent] = useState();
  const [paginatedEvents, setPaginatedEvents] = useState();
  const [currentPage, setCurrentPage] = useState();
  const [loadingAllEvents, setLoadingAllEvents] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [loadingInit, setLoadingInit] = useState(true);
  const [searchEvents, setSearchEvents] = useState();
  const searchRef = useRef(null);

  // useEffect called just once
  useEffect(() => {
    getAllEvents().then((list) => {
      setEventList(list);
      setLoadingInit(false);
    });
  }, []);

  // useEffect called whenever user is changed
  useEffect(() => {
    if (user) {
      // Fetch user events only once
      const fetchUserEvents = async () => {
        try {
          const userEvents = getAllUserEvents(user); // Fetch all user events
          const eventPromises = userEvents.map((eventPromise) =>
            eventPromise.then((data) => ({
              ...data, // Spread the event data to maintain other properties
              dateObject: makeDate(data.date), // Create a date object for sorting
            }))
          );

          // Resolve all event promises in one go
          const resolvedEvents = await Promise.all(eventPromises);

          // Sort the events by the date field
          const sortedEvents = resolvedEvents.sort(
            (a, b) => a.dateObject - b.dateObject
          );

          // Map the sorted events to ListGroup items and set state
          const sortedEventItems = sortedEvents.map((data) => (
            <ListGroup.Item
              key={data.id} // Ensure unique keys for each item
              onClick={() => {
                setEvent(data);
                setShowEvent(true);
              }}
              className="flex-col text-black whitespace-pre overflow-hidden focus:text-app_accent-900 hover:text-app_accent-900"
            >
              <div className="scroll-text">
                {data.title} {" - "}
                {data.dateObject.getMonth() + 1}/{data.dateObject.getDate()}/
                {data.dateObject.getFullYear()}
              </div>
            </ListGroup.Item>
          ));

          setUserEvents(sortedEventItems);
        } catch (error) {
          console.error("Error fetching user events:", error);
        }
      };

      fetchUserEvents(); // Trigger the async event fetching
    } else {
      // Clear the user events if no user is logged in
      setUserEvents([]);
    }
  }, [user]);

  // This adds an event to a users event list in both Firestore as well as on the app. Since user is updated it will refresh the screen
  const addEvent = (title) => {
    if (!user) {
      return console.log("User is not authenticated");
    }
    const event = addEventToUserList(title, getAuth().currentUser.uid);
    event.then((e) => {
      const eventList = [...user.events, e];
      eventList.sort((a, b) => {
        const aSeconds = a.date.seconds || a.date._seconds;
        const aNanoseconds = a.date.nanoseconds || a.date._nanoseconds;

        const bSeconds = b.date.seconds || b.date._seconds;
        const bNanoseconds = b.date.nanoseconds || b.date._nanoseconds;

        // Compare by seconds first, then by nanoseconds
        if (aSeconds !== bSeconds) {
          return aSeconds - bSeconds;
        } else {
          return aNanoseconds - bNanoseconds;
        }
      });
      setUser({
        ...user,
        events: eventList,
      });
    });
  };

  // This removers an event to a users event list in both Firestore as well as on the app. Since user is updated it will refresh the screen
  const removeEvent = (event) => {
    const removedEvent = removeEventFromUserList(
      event,
      getAuth().currentUser.uid
    );

    let updatedEventList;
    removedEvent
      .then((rmEvent) => {
        // Filter out the event that was removed
        updatedEventList = user.events.filter(
          (e) => e.identifier !== rmEvent.identifier
        );
      })
      .then(() => {
        setUser({
          ...user,
          events: updatedEventList,
        });
      });
  };

  // Set the events to be displayed after sorting them according to date
  const events =
    eventList == null
      ? []
      : eventList.sort((a, b) => {
          return makeDate(a.date) - makeDate(b.date);
        });

  const todaysDate = new Date();
  todaysDate.setHours(0, 0, 0, 0);

  // Filter out past events; should they still be on the list?
  const upcomingEvents = events
    .filter((event) => {
      return makeDate(event.date) >= todaysDate;
    })
    .slice(0, 6)
    .map((event, ind) => (
      <EventCard
        key={ind}
        event={event}
        setEvent={setEvent}
        setShowEvent={setShowEvent}
      />
    ));

  // This will load all the events, even past ones, as a paginated collection
  const loadAllEvents = () => {
    setLoadingAllEvents(true);
    paginatedCollection("events", "date", 6).then((data) => {
      setPaginatedEvents(data.data);
    });
  };

  // This does not technically set the tile content. This filters the events according to the calendar date. setDaysEvents is what
  // actually sets the tile content.
  const setTileContent = (date) => {
    setDaysEvents(
      events.filter((event) => {
        const eventDate = makeDate(event.date);
        return (
          date.getDate() == eventDate.getDate() &&
          date.getMonth() == eventDate.getMonth() &&
          date.getFullYear() == eventDate.getFullYear()
        );
      })
    );
  };

  // Refresh the page whenever the full paginated events collection is loaded
  useEffect(() => {
    paginatedEvents ? setCurrentPage(paginatedEvents[0]) : {};
  }, [paginatedEvents]);

  // Handle user searches
  const handleSearchBarChange = (searchVal) => {
    const filteredEvents = eventList
      .filter((event) => {
        return (
          event.title.toLowerCase().includes(searchVal.toLowerCase()) ||
          event.description.toLowerCase().includes(searchVal.toLowerCase()) ||
          event.full_description
            .toLowerCase()
            .includes(searchVal.toLowerCase()) ||
          makeDate(event.date).toLocaleString().includes(searchVal) ||
          event.location.address
            .toLowerCase()
            .includes(searchVal.toLowerCase()) ||
          event.location.city.toLowerCase().includes(searchVal.toLowerCase()) ||
          event.location.state
            .toLowerCase()
            .includes(searchVal.toLowerCase()) ||
          event.location.state
            .toLowerCase()
            .includes(searchVal.toLowerCase()) ||
          event.location.zip.toLowerCase().includes(searchVal.toLowerCase()) ||
          event.type.toLowerCase().includes(searchVal.toLowerCase())
        );
      })
      .map((event, ind) => {
        return (
          <EventCard
            key={ind}
            event={event}
            setEvent={setEvent}
            setShowEvent={setShowEvent}
          />
        );
      });
    searchVal === "" ? setSearchEvents(null) : setSearchEvents(filteredEvents);
  };

  return (
    <div className="bg-app_bg lg:grid lg:auto-cols-max lg:grid-cols-4">
      <div className="flex flex-col lg:col-span-3">
        <div className="lg:flex-1 lg:w-full">
          <div className="lg:hidden p-4 bg-app_accent-900">
            <Accordion collapseAll className="">
              <Accordion.Panel>
                <Accordion.Title className="text-gray-900 bg-white">
                  <div className="flex w-full gap-1 drop-shadow-[0_1.2px_1.2px_rgba(120,120,120)]">
                    <UpcomingEvents />
                    <p>Upcoming Events</p>
                  </div>
                </Accordion.Title>
                <Accordion.Content className="bg-gray-400">
                  <div className="flex-col">
                    {searchEvents && (
                      <div className="flex overflow-x-scroll justify-content text-center mb-4">
                        <div className="flex-1 min-w-[25ch] h-full">
                          {...searchEvents}
                        </div>
                      </div>
                    )}
                    {!currentPage && !searchEvents && (
                      <>
                        <div className="flex overflow-x-scroll justify-content text-center mb-4">
                          <div className="flex-1 min-w-[25ch] h-full">
                            {...upcomingEvents}
                          </div>
                        </div>
                        <div>
                          <Button
                            className="w-full bg-app_accent-900  rounded-none"
                            size="xs"
                            onClick={loadAllEvents}
                          >
                            <p>
                              {loadingAllEvents ? (
                                <Spinner />
                              ) : (
                                "Load All Events"
                              )}
                            </p>
                          </Button>
                        </div>
                      </>
                    )}
                    {currentPage && !searchEvents && (
                      <PaginatedTransitions>
                        <div className="flex w-full justify-center mb-4">
                          <Pagination
                            currentPage={pageNumber}
                            onPageChange={(page) => {
                              setCurrentPage(paginatedEvents[page - 1]);
                              setPageNumber(page);
                            }}
                            totalPages={paginatedEvents.length}
                          />
                        </div>
                        <div className="-mx-4 flex flex-wrap justify-evenly mb-4">
                          {currentPage.map((event, ind) => {
                            return (
                              <EventCard
                                key={ind}
                                event={event}
                                setEvent={setEvent}
                                setShowEvent={setShowEvent}
                              />
                            );
                          })}
                        </div>
                        <div className="flex w-full justify-center mb-4">
                          <Pagination
                            currentPage={pageNumber}
                            onPageChange={(page) => {
                              setCurrentPage(paginatedEvents[page - 1]);
                              setPageNumber(page);
                            }}
                            totalPages={paginatedEvents.length}
                          />
                        </div>
                      </PaginatedTransitions>
                    )}
                  </div>
                </Accordion.Content>
              </Accordion.Panel>
              <Accordion.Panel>
                <Accordion.Title className="text-gray-900 bg-white">
                  Calendar
                </Accordion.Title>
                <Accordion.Content className="bg-gray-400">
                  <div className="lg:items-center lg:flex-1">
                    <div className="bg-app_main border border-gray-200 shadow-lg dark:border-gray-700 dark:bg-gray-800 rounded-none h-full justify-start">
                      <div className="flex flex-row gap-4 p-6 justify-evenly">
                        <div className="flex flex-row gap-4 w-fit">
                          <span className="flex-none w-3 h-3 bg-yellow-200 rounded-full mr-1 my-2"></span>
                          <p>Luncheon</p>
                        </div>

                        <div className="mx-2 flex flex-row items-start w-fit">
                          <span className="flex-none w-3 h-3 bg-red-400 rounded-full dark:bg-gray-700 mr-1 my-2"></span>
                          <p>Cocktail Party</p>
                        </div>
                        <div className="flex flex-row w-fit">
                          <span className="flex-none w-3 h-3 bg-blue-400 rounded-full mr-1 my-2"></span>
                          <p>Courses</p>
                        </div>
                      </div>
                      <div className="px-4">
                        <CardDefault>
                          <DefaultCalendar
                            setEvent={(event) => {
                              setEvent(event);
                              setShowEvent(true);
                            }}
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
                <Accordion.Content className="bg-gray-400">
                  <div className="divide-y mb-4 divide-black">
                    {!user && (
                      <Card className="mt-4 text-black text-center justify-center">
                        Log in to see your events.
                      </Card>
                    )}
                    {user && (
                      <div className="text-center text-black text-xl font-bold">
                        <h1 className="mb-2">My Events</h1>
                        <ListGroup>{...userEvents}</ListGroup>
                      </div>
                    )}
                  </div>
                </Accordion.Content>
              </Accordion.Panel>
            </Accordion>
          </div>
          <div className="hidden lg:block">
            <div className="h-full lg:rounded-none lg:justify-start lg:items-center lg:h-full lg:w-fill text-xl font-dmserif">
              <div className="max-w-screen-xl mx-4 my-4">
                <div className="flex justify-between">
                  <div className="flex gap-1 drop-shadow-[0_1.2px_1.2px_rgba(120,120,120)]">
                    <UpcomingEvents />
                    <p className="w-full text-app_accent-900">
                      {searchEvents ? "Searching Events" : "Upcoming Events"}
                    </p>
                  </div>
                  <SearchBar
                    ref={searchRef}
                    value={searchRef.current?.value}
                    onChange={() =>
                      handleSearchBarChange(searchRef.current.value)
                    }
                  />
                </div>

                {!currentPage && (
                  <>
                    {loadingInit && (
                      <div className="-mx-4 gap-4 flex flex-wrap">
                        {...skeletonList}
                      </div>
                    )}
                    {!loadingInit && (
                      <>
                        {searchEvents && (
                          <div className="-mx-4 flex flex-wrap">
                            {...searchEvents}
                          </div>
                        )}
                        {!searchEvents && (
                          <div className="-mx-4 flex flex-wrap">
                            {...upcomingEvents}
                          </div>
                        )}

                        <Button
                          className="w-full bg-app_accent-900 rounded-none mt-6 drop-shadow-[0_1.2px_1.2px_rgba(120,120,120)]"
                          size="xs"
                          onClick={loadAllEvents}
                        >
                          <p>
                            {loadingAllEvents ? <Spinner /> : "Load All Events"}
                          </p>
                        </Button>
                      </>
                    )}
                  </>
                )}
                {currentPage && (
                  <>
                    {searchEvents && (
                      <div className="-mx-4 flex flex-wrap">
                        {...searchEvents}
                      </div>
                    )}
                    {!searchEvents && (
                      <PaginatedTransitions>
                        <div className="-mx-4 flex flex-wrap justify-evenly mb-4">
                          {currentPage.map((event, ind) => {
                            return (
                              <EventCard
                                key={ind}
                                event={event}
                                setEvent={setEvent}
                                setShowEvent={setShowEvent}
                              />
                            );
                          })}
                        </div>
                        <div className="flex w-full justify-center">
                          <Pagination
                            currentPage={pageNumber}
                            onPageChange={(page) => {
                              setCurrentPage(paginatedEvents[page - 1]);
                              setPageNumber(page);
                            }}
                            totalPages={paginatedEvents.length}
                          />
                        </div>
                      </PaginatedTransitions>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="w-full font-serif items-center lg:leading-snug text-gray-900 lg:text-2xl">
          <div className="flex-col items-center justify-center drop-shadow-[0_1.2px_1.2px_rgba(70,70,70)]">
            <div className="w-full mt-6 justify-center items-center">
              <img
                className="w-full mr-4 drop-shadow-[0_1.2px_1.2px_rgba(120,120,120)]"
                src={IMAGES.social_event_page}
                alt="Social Event Picture"
              ></img>
            </div>
            <br></br>
            <div className="flex flex-col w-full items-center">
              <div className="mt-6  text-center mx-6 lg:max-w-[65ch]">
                <p>
                  Welcome to our exciting world of events! Join us in
                  celebrating innovation, knowledge sharing, and community
                  building. At Davos In The Desert, we curate a diverse range of
                  events designed to inspire, educate, and connect.{" "}
                </p>
              </div>
              <br></br>

              <div className="flex flex-col mx-6 lg:max-w-[65ch]">
                <span className="mt-6 font-bold">What to Expect: </span>
                <ol
                  role="list"
                  className="items-center marker:text-white rounded bg-app_accent-900 drop-shadow-[0_1.2px_1.2px_rgba(120,120,120)] text-white px-4 pb-2 list-disc list-inside mb-6 space-y-3"
                >
                  <li className="mt-2 drop-shadow-[0_1.2px_1.2px_rgba(200,200,200)]">
                    <strong>Engaging Workshops: </strong>Dive deep into the
                    latest industry trends and gain hands-on experience with our
                    expert-led workshops.
                  </li>{" "}
                  <li className="drop-shadow-[0_1.2px_1.2px_rgba(200,200,200)]">
                    <strong> Informative Webinars:</strong> Stay updated with
                    the ever-evolving landscape through our informative webinars
                    and panel discussions.
                  </li>
                  <li className="drop-shadow-[0_1.2px_1.2px_rgba(200,200,200)]">
                    {" "}
                    <strong> Networking Opportunities:</strong> Connect with
                    like-minded professionals, potential partners, and industry
                    leaders.
                  </li>
                  <li className="drop-shadow-[0_1.2px_1.2px_rgba(200,200,200)]">
                    {" "}
                    <strong>Product Launches:</strong> Be the first to witness
                    groundbreaking product launches and innovations.
                  </li>
                  <li className="mb-2 drop-shadow-[0_1.2px_1.2px_rgba(200,200,200)]">
                    {" "}
                    <strong>Community Building:</strong> Share your insights,
                    ask questions, and participate in discussions that matter to
                    you.{" "}
                  </li>
                </ol>
              </div>

              <div className="flex flex-col items-center mx-6 lg:max-w-[65ch]">
                <span className="mt-6 w-[100%] font-bold">Why Attend:</span> Our
                events are designed to provide valuable takeaways for every
                participant. Whether you're an industry veteran or just starting
                your journey, you'll find something that aligns with your
                interests and goals. Join us to:{" "}
              </div>

              <div className="flex flex-col mx-6 lg:max-w-[65ch]">
                <ol
                  role="list"
                  className="marker:text-white bg-app_accent-900 drop-shadow-[0_1.2px_1.2px_rgba(120,120,120)] text-white rounded list-disc list-inside px-4 pb-2 space-y-3"
                >
                  <li className="mt-2 drop-shadow-[0_1.2px_1.2px_rgba(200,200,200)]">
                    Expand your knowledge
                  </li>
                  <li className="drop-shadow-[0_1.2px_1.2px_rgba(200,200,200)]">
                    {" "}
                    Build meaningful connections{" "}
                  </li>
                  <li className="drop-shadow-[0_1.2px_1.2px_rgba(200,200,200)]">
                    Explore new opportunities
                  </li>{" "}
                  <li className="drop-shadow-[0_1.2px_1.2px_rgba(200,200,200)]">
                    Stay ahead in your field
                  </li>
                  <li className="mb-2 drop-shadow-[0_1.2px_1.2px_rgba(200,200,200)]">
                    {" "}
                    Enjoy the experience
                  </li>
                </ol>
                <div className="flex flex-col items-center mt-6 lg:max-w-[65ch]">
                  <span className="mt-6 w-[100%] font-bold">Stay Updated:</span>{" "}
                  Bookmark this page and keep an eye on our event calendar. We
                  regularly update it with new, exciting events you won't want
                  to miss.
                </div>
                <div className="flex flex-col items-center my-6 lg:max-w-[65ch]">
                  <span className="mt-6 w-[100%] font-bold">Get In Touch:</span>{" "}
                  Have questions or need more information? Reach out to our
                  friendly team at media@davos.net or (309)230-7966. Don't miss
                  out on our upcoming events; your next adventure starts here!
                  Feel free to customize this description to match the unique
                  features and goals of your company's events.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="sticky h-[20%] hidden lg:block right-0 pt-6 px-2 top-20 lg:items-center">
        <div className="mb-4">
          {!user && (
            <Card className="mt-4 text-black text-center justify-center">
              Log in to see your events.
            </Card>
          )}
          {user && (
            <div className="text-center text-black text-xl font-bold">
              <h1 className="mb-2 drop-shadow-[0_1.2px_1.2px_rgba(70,70,70)]">
                My Events
              </h1>
              <div className="event-list rounded-lg bg-white mt-4 text-black text-center justify-center drop-shadow-[0_1.2px_1.2px_rgba(70,70,70)]">
                {...userEvents}
                {userEvents.length > 0 ? "" : "No Events Planned."}
              </div>
            </div>
          )}
        </div>
        <div className="">
          <div className="rounded-t-md bg-app_main bg-opacity-90">
            <div className="flex">
              <div className="flex items-center justify-center gap-1 text-black text-center text-sm w-full h-full">
                <p className="flex-none w-3 h-3 bg-yellow-200 rounded-full dark:bg-gray-700 "></p>
                <p> Luncheon</p>
              </div>

              <div className="flex items-center justify-center gap-1 text-black text-center text-sm w-full h-full">
                <p className="flex-none w-3 h-3 bg-red-400 rounded-full dark:bg-gray-700 "></p>
                <p>Social</p>
              </div>
              <div className="flex items-center justify-center gap-1 text-black text-center text-sm w-full h-full">
                <p className="flex-none w-3 h-3 bg-blue-400 rounded-full dark:bg-gray-700 "></p>
                <p> Courses</p>
              </div>
            </div>
          </div>
          <div className="shrink-0 justify-center">
            <div className="text-black w-full rounded-lg drop-shadow-[0_1.2px_1.2px_rgba(120,120,120)]">
              <DefaultCalendar
                setEvent={(event) => {
                  setEvent(event);
                  setShowEvent(true);
                }}
                events={events}
                daysEvents={daysEvents}
                setTileContent={setTileContent}
              />
            </div>
          </div>
        </div>
      </div>
      {/* {showWhatsGoingOn()} */}
      {showEvent && (
        <EventsModal
          clearEventsModal={() => {
            setShowEvent(false);
          }}
          attending={
            userEvents.filter(
              (evnt) => event.title === evnt.props.children.props.children[0]
            ).length > 0
          }
          event={event}
          addEvent={(title) => addEvent(title)}
          removeEvent={(e) => removeEvent(e)}
        />
      )}
    </div>
  );
};

export default Events;
