import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "../utils/firebase";

const addSubscriber = async (subscriber) => {
  console.log(subscriber);
  const myQuery = query(
    collection(db, "users"),
    where("credentials.userName", "==", subscriber.email)
  );
  const querySnapshot = await getDocs(myQuery).then((snapshot) => {
    return snapshot;
  });

  console.log(querySnapshot.empty);

  try {
    const docRef = await setDoc(doc(db, "subscribers", subscriber.email), {
      ...subscriber,
      member: !querySnapshot.empty,
    });
    return docRef;
  } catch (error) {
    console.error("Error adding profile: ", error);
  }
};

export default addSubscriber;
