import { Button, Card } from "flowbite-react";
import HomeIcon from "../components/Icons/HomeIcon";
import CalendarIcon from "../components/Icons/CalendarIcon";
import PodcastIcon from "../components/Icons/PodcastIcon";
import { useState, useEffect } from "react";
import getAllPodcasts from "../services/getAllPodcasts";
import PlusIcon from "../components/Icons/PlusIcon";
import Xicon from "../components/Icons/Xicon";
import { Tooltip } from "react-tooltip";
import TrashIcon from "../components/Icons/TrashIcon";
import EditIcon from "../components/Icons/EditIcon";
import { Sidebar } from "flowbite-react";
import UserIcon from "../components/Icons/UserIcon";
import ShoppingBagIcon from "../components/Icons/ShoppingBagIcon";
import addEvent from "../services/addEvent";
import getAllEvents from "../services/getAllEvents";
import "../customcss/CustomCardCss.css";

const events = () => {};

const Admin = () => {
  const [showPodcasts, setShowPodcasts] = useState(true);
  const [showDashboard, setShowDashboard] = useState(false);
  const [showEvents, setShowEvents] = useState(false);
  const [showUsers, setShowUsers] = useState(false);
  const [showProducts, setShowProducts] = useState(false);
  const [showSales, setShowSales] = useState(false);
  const [showShipping, setShowShipping] = useState(false);
  const [showSalesData, setShowSalesData] = useState(false);
  const [podcastList, setPodcastList] = useState([]);
  const [eventList, setEventList] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [loadingPodcasts, setLoadingPodcasts] = useState(true);

  const loadPodcasts = () => {
    var pcList = [];
    getAllPodcasts({ exclude: false }).then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        pcList = [
          ...pcList,
          <div className="w-full p-4 sm:w-1/2 lg:w-1/3">
            <Card
              className="event-card flex-1 h-full"
              imgAlt="Guest Speaker"
              imgSrc={doc.data().podcast.speaker.img}
            >
              <h5 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                <p>{doc.data().podcast.title}</p>
              </h5>
            </Card>
          </div>,
        ];
        setPodcastList(pcList);
      });
    });
    setLoadingPodcasts(false);
  };

  const loadEvents = () => {
    var evList = [];
    getAllEvents().then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        evList = [
          ...evList,
          <div className="w-full p-4 sm:w-1/2 lg:w-1/3">
            <Card
              className="event-card flex-1 h-full"
              imgAlt="Guest Speaker"
              imgSrc={doc.data().img}
            >
              <h5 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                <p>{doc.data().title}</p>
              </h5>
            </Card>
          </div>,
        ];
        setEventList(evList);
      });
    });
    setLoadingEvents(false);
  };

  const closeDisplays = () => {
    setShowDashboard(false);
    setShowEvents(false);
    setShowPodcasts(false);
    setShowUsers(false);
  };

  const addNewPodcast = () => {};

  const deletePodcast = () => {};

  const editPodcast = () => {};

  const addNewEvent = () => {};

  const deleteEvent = () => {};

  const editEvents = () => {};

  return (
    <div className="bg-sky-900 lg:grid lg:grid-cols-5">
      <div className="sticky h-[30%] shrink-0 top-20 lg:items-center lg:flex-1 bg-sky-900">
        <div className="flex h-fill justify-center mx-auto mt-4">
          <Sidebar
            className="flex justify-center"
            aria-label="Sidebar with multi-level dropdown example"
          >
            <Sidebar.Items className="flex bg-orange-300">
              <Sidebar.ItemGroup>
                <Sidebar.Item
                  className="hover:bg-sky-600"
                  onClick={() => {
                    closeDisplays();
                    setShowDashboard(true);
                  }}
                  icon={HomeIcon}
                >
                  <p>Dashboard</p>
                </Sidebar.Item>
                <Sidebar.Item
                  className="hover:bg-sky-600"
                  onClick={() => {
                    closeDisplays();
                    setShowUsers(true);
                  }}
                  icon={UserIcon}
                >
                  <p>Users</p>
                </Sidebar.Item>
                <Sidebar.Collapse
                  className="hover:bg-sky-600"
                  icon={ShoppingBagIcon}
                  label="E-commerce"
                >
                  <Sidebar.Item
                    className="hover:bg-sky-600"
                    onClick={() => {
                      closeDisplays();
                      setShowProducts(true);
                    }}
                  >
                    Products
                  </Sidebar.Item>
                  <Sidebar.Item
                    className="hover:bg-sky-600"
                    onClick={() => {
                      closeDisplays();
                      setShowSales(true);
                    }}
                  >
                    Sales
                  </Sidebar.Item>
                  <Sidebar.Item
                    className="hover:bg-sky-600"
                    onClick={() => {
                      closeDisplays();
                      setShowShipping(true);
                    }}
                  >
                    Shipping
                  </Sidebar.Item>
                  <Sidebar.Item
                    className="hover:bg-sky-600"
                    onClick={() => {
                      closeDisplays();
                      setShowSalesData(true);
                    }}
                  >
                    Sales Data
                  </Sidebar.Item>
                </Sidebar.Collapse>
                <Sidebar.Item
                  className="hover:bg-sky-600"
                  onClick={() => {
                    closeDisplays();
                    loadEvents();
                    setShowEvents(true);
                  }}
                  icon={CalendarIcon}
                >
                  <p>Events</p>
                </Sidebar.Item>
                <Sidebar.Item
                  className="hover:bg-sky-600"
                  onClick={() => {
                    closeDisplays();
                    loadPodcasts();
                    setShowPodcasts(true);
                  }}
                  icon={PodcastIcon}
                >
                  <p>Podcasts</p>
                </Sidebar.Item>
              </Sidebar.ItemGroup>
            </Sidebar.Items>
          </Sidebar>
        </div>
      </div>
      <div className="col-span-3 h-fit bg-red-200">
        {showPodcasts && (
          <div className="p-6">
            <div className="flex w-full justify-between text-black text-3xl font-sarif text-center">
              <div className="flex text-xs gap-2">
                <Button
                  size="xs"
                  className="bg-sky-900"
                  onClick={addNewPodcast}
                  data-tooltip-content="Add a new podcast"
                  data-tooltip-place="top"
                  data-tooltip-id="add-tooltip"
                >
                  <PlusIcon />
                </Button>
                <Tooltip className="z-10" id="add-tooltip" delayShow={1300} />
                <Button
                  size="xs"
                  className="bg-sky-900"
                  onClick={editPodcast}
                  data-tooltip-content="Edit a podcast"
                  data-tooltip-place="top"
                  data-tooltip-id="edit-tooltip"
                >
                  <EditIcon />
                </Button>{" "}
                <Tooltip className="z-10" id="edit-tooltip" delayShow={1300} />
                <Button
                  size="xs"
                  className="bg-sky-900"
                  onClick={deletePodcast}
                  data-tooltip-content="Delete a podcast"
                  data-tooltip-place="top"
                  data-tooltip-id="delete-tooltip"
                >
                  <TrashIcon />
                </Button>
                <Tooltip
                  className="z-10"
                  id="delete-tooltip"
                  delayShow={1300}
                />
              </div>
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                <p>Podcasts</p>
              </h5>
              <div className="text-xs">
                <Button
                  size="xs"
                  className="bg-sky-900"
                  data-tooltip-content="Close"
                  data-tooltip-place="top"
                  data-tooltip-id="close-tooltip"
                  onClick={() => {
                    setShowPodcasts(false);
                  }}
                >
                  <Xicon />
                </Button>{" "}
                <Tooltip className="z-10" id="close-tooltip" delayShow={1300} />
              </div>
            </div>
            <div className="max-w-screen-xl mx-auto px-4">
              <div className="-mx-4 flex flex-wrap">{...podcastList}</div>
            </div>
          </div>
        )}
        {showEvents && (
          <div className="p-6">
            <div className="flex w-full justify-between text-black text-3xl font-sarif text-center">
              <div className="flex text-xs gap-2">
                <Button
                  size="xs"
                  className="bg-sky-900"
                  onClick={addNewEvent}
                  data-tooltip-content="Add a new event"
                  data-tooltip-place="top"
                  data-tooltip-id="add-tooltip"
                >
                  <PlusIcon />
                </Button>
                <Tooltip className="z-10" id="add-tooltip" delayShow={1300} />
                <Button
                  size="xs"
                  className="bg-sky-900"
                  onClick={editEvents}
                  data-tooltip-content="Edit an event"
                  data-tooltip-place="top"
                  data-tooltip-id="edit-tooltip"
                >
                  <EditIcon />
                </Button>{" "}
                <Tooltip className="z-10" id="edit-tooltip" delayShow={1300} />
                <Button
                  size="xs"
                  className="bg-sky-900"
                  onClick={deleteEvent}
                  data-tooltip-content="Delete an event"
                  data-tooltip-place="top"
                  data-tooltip-id="delete-tooltip"
                >
                  <TrashIcon />
                </Button>
                <Tooltip
                  className="z-10"
                  id="delete-tooltip"
                  delayShow={1300}
                />
              </div>
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                <p>Events</p>
              </h5>
              <div className="text-xs">
                <Button
                  size="xs"
                  className="bg-sky-900"
                  data-tooltip-content="Close"
                  data-tooltip-place="top"
                  data-tooltip-id="close-tooltip"
                  onClick={() => {
                    setShowEvents(false);
                  }}
                >
                  <Xicon />
                </Button>{" "}
                <Tooltip className="z-10" id="close-tooltip" delayShow={1300} />
              </div>
            </div>
            <div className="max-w-screen-xl mx-auto px-4">
              <div className="-mx-4 flex flex-wrap">{...eventList}</div>
            </div>
          </div>
        )}
      </div>
      <div className="col-span-1 sticky h-[43%] top-20 lg:items-center lg:flex-1 bg-sky-900">
        Other Content
      </div>
    </div>
  );
};

export default Admin;
