import getEvent from "./getEvent";

const getAllUserEvents = (user) => {
  let events = [];

  user.events.map((event) => {
    console.log("identifier: ", event.identifier);
    events = [...events, getEvent(event.identifier)];
  });
  return events;
};

export default getAllUserEvents;
