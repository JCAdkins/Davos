import getEvent from "./getEvent";

const getAllUserEvents = (user) => {
  let events = [];

  user.events.map((event) => {
    events = [...events, getEvent(event.identifier)];
  });
  return events;
};

export default getAllUserEvents;
