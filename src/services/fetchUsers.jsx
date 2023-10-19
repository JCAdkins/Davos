import { collection, getDocs } from "firebase/firestore";
import { db } from "../utils/firebase";

const fetchUsers = async () => {
  return await getDocs(collection(db, "users")).then((querySnapshot) => {
    const newData = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    return newData;
  });
};

export default fetchUsers;
