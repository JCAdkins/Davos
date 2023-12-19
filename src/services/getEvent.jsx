// import { doc, getDoc } from "firebase/firestore";
// import { db } from "../utils/firebase";
import { auth } from "../utils/firebase";
import { appCheck } from "../utils/firebase";
import { getToken } from "firebase/app-check";

const getEvent = async (id) => {
  const url = "https://getDoc-jxeq62gl4a-uc.a.run.app";
  const test_url = "http://127.0.0.1:5001/davos-57f96/us-central1/getDoc";

  try {
    const appToken = await getToken(appCheck, false);
    const userToken = await auth.currentUser.getIdToken();
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({ data: { col: "events", id: id } }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "X-Firebase-AppCheck": `Bearer ${appToken.token}`,
        Authorization: `Bearer ${userToken.token}`,
      },
    });

    const event = await response.json();
    return event.document;
  } catch (error) {
    console.error("Error fetching event:", error.message);
  }
};
// const docRef = doc(db, "events", uid);
// const docSnap = await getDoc(docRef);

// if (docSnap.exists()) {
//   return docSnap.data();
// } else {
//   // docSnap.data() will be undefined in this case
//   console.log("No such document!");
// }
// };

export default getEvent;
