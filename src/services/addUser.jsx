import { setDoc, doc } from "firebase/firestore";
import { db } from "../utils/firebase";

const addUser = async (user, id) => {
  try {
    console.log(id);
    const docRef = await setDoc(doc(db, "users", id), {
      user: user,
    });
    return docRef;
  } catch (error) {
    console.error("Error adding profile: ", error);
  }
};

export default addUser;
