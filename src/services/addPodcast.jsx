import { setDoc, doc } from "firebase/firestore";
import { db } from "../utils/firebase";

const addPodcast = async (podcast, id) => {
  console.log(podcast);
  try {
    const docRef = id
      ? await setDoc(doc(db, "podcasts", id), {
          ...podcast,
        })
      : await setDoc(doc(db, "podcasts", podcast.title));
    return docRef;
  } catch (error) {
    console.error("Error adding profile: ", error);
  }
};

export default addPodcast;
