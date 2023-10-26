import { collection, query, getDocs } from "firebase/firestore";
import { db } from "../utils/firebase";

const getAllEvents = async () => {
  const q = query(collection(db, "events"));

  return await getDocs(q);
};

export default getAllEvents;
