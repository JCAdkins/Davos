import { doc, getDoc } from "firebase/firestore";
import { db } from "../utils/firebase";

const getSubscriber = async (email) => {
  const docRef = doc(db, "subscribers", email);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return { exists: true };
  } else {
    // docSnap.data() will be undefined in this case
    return { exists: false };
  }
};

export default getSubscriber;
