import { Modal, Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import {
  GoogleMap,
  InfoWindow,
  Marker,
  useLoadScript,
} from "@react-google-maps/api";
import "../../customcss/CustomCardCss.css";

const getHours = (hour) => {
  if (hour === 0) return "12";
  if (hour > 12) return hour - 12;
  return hour;
};
const today = new Date();

function EventsModal({ event, clearEventsModal }) {
  const [openModal, setOpenModal] = useState("dismissible");
  const navigate = useNavigate();
  const [mapRef, setMapRef] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [infoWindowData, setInfoWindowData] = useState();
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  const handleFullDetailsClick = () => {
    navigate("/events/info", {
      state: { event: event, isJoiningEvent: false },
    });
  };

  const handleAttendEventClick = () => {
    navigate("/events/info", { state: { event: event, isJoiningEvent: true } });
  };

  const markers = [
    {
      address: `${event.location.address}, ${event.location.city}, ${event.location.state}, ${event.location.country}, ${event.location.zip}`,
      lat: parseFloat(event.location.coordinates.lat),
      lng: parseFloat(event.location.coordinates.long),
    },
  ];

  const onMapLoad = (map) => {
    setMapRef(map);
    const bounds = new google.maps.LatLngBounds();
    markers?.forEach(({ lat, lng }) => bounds.extend({ lat, lng }));
    map.fitBounds(bounds);
  };

  const handleMarkerClick = (id, lat, lng, address) => {
    mapRef?.panTo({ lat, lng });
    setInfoWindowData({ id, address });
    setIsOpen(true);
  };

  const clearModal = () => {
    clearEventsModal();
    setOpenModal(undefined);
  };

  return (
    <>
      <Modal
        dismissible
        className="event-modal"
        show={openModal}
        onClose={() => clearModal()}
      >
        <Modal.Header className="text-center">
          <strong className="text-center">{event.title}</strong>{" "}
        </Modal.Header>
        <Modal.Body className="flex-col">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-black flex flex-col items-center justify-end">
              <img src={event.img} alt="Event Picture"></img>
              {event.date.toDate() < today ? (
                <p>Event Completed</p>
              ) : (
                <p className="whitespace-pre">
                  {event.date.toDate().getMonth() + 1}/
                  {event.date.toDate().getDate()}/
                  {event.date.toDate().getFullYear()}
                  {" @ "}
                  {getHours(event.date.toDate().getHours())}:
                  {event.date.toDate().getMinutes().toString().padStart(2, "0")}
                  {event.date.toDate().getHours() > 12 ? "PM" : "AM"}
                </p>
              )}
              <p>
                {event.location.city}, {event.location.state}
              </p>
              <hr className="h-px my-4 rounded-none bg-black border-sm border-black bg-black dark:bg-gray-700" />
              {event.description}
            </div>
            <div className="text-black h-full w-full">
              {!isLoaded ? (
                <h1>Loading...</h1>
              ) : (
                <GoogleMap
                  mapContainerClassName="map-container"
                  onLoad={onMapLoad}
                  onClick={() => setIsOpen(false)}
                  zoom={11}
                >
                  {markers.map(({ address, lat, lng }, ind) => (
                    <Marker
                      key={ind}
                      position={{ lat, lng }}
                      onClick={() => {
                        handleMarkerClick(ind, lat, lng, address);
                      }}
                    >
                      {isOpen && infoWindowData?.id === ind && (
                        <InfoWindow
                          onCloseClick={() => {
                            setIsOpen(false);
                          }}
                        >
                          <h3>{infoWindowData.address}</h3>
                        </InfoWindow>
                      )}
                    </Marker>
                  ))}
                </GoogleMap>
              )}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="flex w-full justify-evenly">
          <Button
            className="bg-app_accent-900"
            onClick={handleFullDetailsClick}
          >
            Full Details
          </Button>
          {event.date.toDate() < today ? (
            <Button disabled className="bg-app_accent-900">
              Attend Event
            </Button>
          ) : (
            <Button
              className="bg-app_accent-900"
              onClick={handleAttendEventClick}
            >
              Attend Event
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EventsModal;
