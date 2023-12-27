import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../utils/firebase";

const getUser = async (username) => {
  const q = query(collection(db, "users"), where("username", "==", username));
  const qSnap = await getDocs(q);
  
  if (qSnap.empty) console.log("User doesn't exist.");
  else return qSnap;
};

export default getUser;
