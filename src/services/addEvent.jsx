import { setDoc, doc } from "firebase/firestore";
import { db } from "../utils/firebase";

const addEvent = async (event, id) => {
  try {
    const docRef = id
      ? await setDoc(doc(db, "events", id), {
          ...event,
        })
      : await setDoc(doc(db, "events"));
    return docRef;
  } catch (error) {
    console.error("Error adding profile: ", error);
  }
};

export default addEvent;
