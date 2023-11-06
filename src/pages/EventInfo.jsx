import { useLocation, useNavigate } from "react-router-dom";
import { useState, useContext, useRef } from "react";
import UserContext from "../contexts/UserContext";
import BackIcon from "../components/Icons/BackIcon";
import EventInfoModal from "../components/Modals/EventInfoModal";
import IMAGES from "../images/Images";
import { Button, ListGroup } from "flowbite-react";
import {
  GoogleMap,
  InfoWindow,
  Marker,
  useLoadScript,
} from "@react-google-maps/api";

const getHours = (hour) => {
  if (hour === 0) return "12";
  if (hour > 12) return hour - 12;
  return hour;
};
const today = new Date();
function toDateTime(secs) {
  var t = new Date(1970, 0, 1); // Epoch
  t.setSeconds(secs);
  return t;
}

const EventInfo = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { event, isJoiningEvent } = location.state;
  const markerRefs = useRef([]);
  const { user } = useContext(UserContext);
  const [mapRef, setMapRef] = useState();
  const [infoWindowData, setInfoWindowData] = useState();
  const [showModal, setShowModal] = useState(false);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });
  const eventDate = toDateTime(event.date.seconds);

  let markers = [];
  event.parking.map((parking) => {
    markers = [
      ...markers,
      {
        address: `${parking.address}, ${parking.city}, ${parking.state}, ${parking.country}, ${parking.zip}`,
        lat: parseFloat(parking.coordinates.lat),
        lng: parseFloat(parking.coordinates.long),
        type: "parking",
      },
    ];
  });

  markers = [
    ...markers,
    {
      address: `${event.location.address}, ${event.location.city}, ${event.location.state}, ${event.location.country}, ${event.location.zip}`,
      lat: parseFloat(event.location.coordinates.lat),
      lng: parseFloat(event.location.coordinates.long),
      type: "event",
    },
  ];

  const parkingClicked = (index) => {
    markerRefs.current[index].props.onClick();
  };

  const onMapLoad = (map) => {
    setMapRef(map);
    const bounds = new google.maps.LatLngBounds();
    markers?.forEach(({ lat, lng }) => bounds.extend({ lat, lng }));
    map.fitBounds(bounds);
  };

  const handleMarkerClick = (id, lat, lng, address) => {
    mapRef?.panTo({ lat, lng });
    setInfoWindowData({ id, address });
  };

  markerRefs.current = markers.map(({ type, address, lat, lng }, ind) => {
    return (
      <Marker
        key={ind}
        position={{ lat, lng }}
        icon={
          type === "event"
            ? {
                url: IMAGES.event_location,
                scaledSize: new google.maps.Size(50, 50),
              }
            : {
                url: IMAGES.parking_location,
                scaledSize: new google.maps.Size(50, 50),
              }
        }
        onClick={() => {
          handleMarkerClick(ind, lat, lng, address);
        }}
      >
        {infoWindowData && infoWindowData.id === ind && (
          <InfoWindow
            visible={infoWindowData ? true : false}
            onCloseClick={() => {
              setInfoWindowData(undefined);
            }}
          >
            <h3>{infoWindowData.address}</h3>
          </InfoWindow>
        )}
      </Marker>
    );
  });

  return (
    <div className="flex flex-col w-full h-full bg-black text-black">
      <div className="sticky h-[25px] absolute top-24 ml-4 z-10">
        <Button
          className="shadow-md bg-sky-600 bg-opacity-80 z-10"
          size="sm"
          onClick={() => navigate("/events")}
        >
          <BackIcon />
        </Button>
      </div>
      <img className="flex h-[60%]" src={event.img} alt="Event Image"></img>
      <div className="flex-col m-6 font-dmserif text-5xl items-center text-center">
        <div className="flex w-full h-full justify-center p-6">
          <div className="relative w-fit">
            <h1 className="bg-gradient-to-r from-red-700 to-blue-700 absolute p-2 rounded-lg  text-sky-900 blur -inset-2">
              {event.title}
            </h1>
            <h1 className="relative p-2 bg-black drop-shadow-[0_1.2px_1.2px_rgba(255,255,255)] text-shadow shadow-orange-500 text-red-200 rounded-lg w-fit">
              {event.title}
            </h1>
          </div>
        </div>
        <div className="flex bg-gray-300 justify-center -m-6 w-screen my-4 text-2xl">
          <div className="event-info-description  text-shadow shadow-sky-500/50 w-full leading-10 text-center max-w-[65ch]">
            {event.description}
          </div>
        </div>
        <div className="flex-wrap lg:grid lg:grid-cols-2 gap-4 p-4 text-xl text-center">
          <div className="text-black bg-white h-full w-full">
            <div className="flex flex-col divide-y-8 divide-gray-900">
              <div className="flex bg-black gap-2 justify-evenly">
                <Button
                  className="text-black bg-sky-900 w-full h-full rounded-none"
                  onClick={() => setShowModal(true)}
                >
                  {user ? (
                    <p className="text-white text-xl">Attend Event</p>
                  ) : (
                    <p className="text-white text-xl">Buy Tickets</p>
                  )}
                </Button>
              </div>
              <div className="flex-col p-4">
                <p>WHERE: </p>
                <ListGroup>
                  <ListGroup.Item
                    className="text-xl"
                    onClick={() => {
                      markerRefs.current[
                        markerRefs.current.length - 1
                      ].props.onClick();
                    }}
                  >
                    <div className="flex-col w-full divide-y divide-gray-900 justify-center">
                      <p>
                        {event.location.building ? event.location.building : ""}
                      </p>
                      <p className="text-lg">
                        {event.location.address}, {event.location.city},{" "}
                        {event.location.state}, {event.location.country},{" "}
                        {event.location.zip}
                      </p>
                    </div>
                  </ListGroup.Item>
                </ListGroup>
              </div>
              <div className="flex-col p-4">
                <p>WHEN: </p>
                <div>
                  {eventDate < today ? (
                    <p>Event Completed</p>
                  ) : (
                    <p className="whitespace-pre">
                      {eventDate.toLocaleDateString("en-us", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                      {" at "}
                      {getHours(eventDate.getHours())}:
                      {eventDate.getMinutes().toString().padStart(2, "0")}
                      {eventDate.getHours() > 12 ? " PM" : " AM"}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex-col p-4">
                <p>PRICE: </p>
                <p>
                  ${event.cost} per entry <b>OR</b> free with Davos membership.
                </p>
              </div>
              <div className="flex-col p-4">
                <p>PARKING: </p>
                <ListGroup>
                  {event.parking.map((parking, index) => {
                    return (
                      <ListGroup.Item
                        key={index}
                        onClick={() => parkingClicked(index)}
                      >
                        <div className="flex w-full justify-center">
                          <>{parking.building}</>
                        </div>
                      </ListGroup.Item>
                    );
                  })}
                </ListGroup>
              </div>
            </div>
          </div>
          <div className="rounded-lg">
            {!isLoaded ? (
              <h1>Loading...</h1>
            ) : (
              <GoogleMap
                mapContainerClassName="info-map-container"
                onLoad={onMapLoad}
                onClick={() => {
                  setInfoWindowData(undefined);
                }}
              >
                {...markerRefs.current}
              </GoogleMap>
            )}
          </div>
        </div>
        <div className="flex w-full justify-center">
          <div className="flex w-fit mt-14 text-white leading-10 text-3xl max-w-[65ch]">
            {event.full_description}
          </div>
        </div>
      </div>
      {showModal && (
        <EventInfoModal
          clearEventInfoModal={() => {
            setShowModal(false);
          }}
          user={user}
        />
      )}
    </div>
  );
};

export default EventInfo;
