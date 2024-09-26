import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { db } from "../utils/firebase"; // Ensure you import the Firestore instance

// Function to add event to user's event list
const addEventToUserList = async (eventTitle, userId) => {
  try {
    // Step 1: Query the event by its title
    const eventsRef = collection(db, "events"); // Assuming 'events' is the collection where events are stored
    const q = query(eventsRef, where("title", "==", eventTitle));
    const querySnapshot = await getDocs(q);
    console.log("snapshot: ", querySnapshot);

    if (querySnapshot.empty) {
      console.log("No matching event found.");
      return;
    }

    // Step 2: Get the event data (assuming there's only one event with that title)
    let eventData = null;
    querySnapshot.forEach((doc) => {
      eventData = doc.data(); // Get the event data
    });

    console.log(">>>>>eventData: ", eventData);

    // Step 3: Add the event to the user's event list
    const userRef = doc(db, "users", userId); // Assuming 'users' is the collection where user data is stored
    console.log("userRef: ", userRef);

    // Update the user document to include the event in an array (assuming the user's events are stored in an array field called 'events')
    await updateDoc(userRef, {
      events: arrayUnion(eventData), // Adds the event data to the user's event array
    });

    console.log(`Event '${eventTitle}' added to user's list.`);
    return eventData;
  } catch (error) {
    console.error("Error adding event to user's list:", error);
  }
};

export default addEventToUserList;
