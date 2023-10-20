import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../utils/firebase";

const getAllPodcasts = async () => {
  const q = query(
    collection(db, "podcasts"),
    where("podcast.disabled", "==", false)
  );

  return await getDocs(q);
};

export default getAllPodcasts;
