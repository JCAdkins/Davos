import { doc, updateDoc, arrayRemove, Timestamp } from "firebase/firestore";
import { db } from "../utils/firebase";

// Function to remove event from user's event list
const removeEventFromUserList = async (eventData, userId) => {
  try {
    const userRef = doc(db, "users", userId);

    // Convert the `date` field in the eventData to Firestore `Timestamp`
    const normalizedEventData = {
      ...eventData,
      date: new Timestamp(eventData.date._seconds, eventData.date._nanoseconds), // Normalize the `date` field to a Firestore `Timestamp`
    };

    // Update the user's events list and remove the normalized event
    await updateDoc(userRef, {
      events: arrayRemove(normalizedEventData), // Removes the event from the user's event array
    });

    return normalizedEventData;
  } catch (error) {
    console.error("Error removing event from user's list:", error);
  }
};

export default removeEventFromUserList;
