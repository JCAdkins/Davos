import { doc, updateDoc } from "firebase/firestore";
import { db } from "../utils/firebase";

const updateUser = async (uid, newData) => {
  const docRef = doc(db, "users", uid);

  updateDoc(docRef, newData)
    .then((data) => {
      console.log("Value of an Existing Document Field has been updated");
    })
    .catch((error) => {
      console.log(error);
    });
};

export default updateUser;
