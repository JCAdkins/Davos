import { doc, getDoc } from "firebase/firestore";
import { db } from "../utils/firebase";

const getEvent = async (uid) => {
  const docRef = doc(db, "events", uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }
};

export default getEvent;
