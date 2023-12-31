// import { doc, getDoc } from "firebase/firestore";
// import { db } from "../utils/firebase";
import { auth } from "../utils/firebase";
import { appCheck } from "../utils/firebase";
import { getToken } from "firebase/app-check";

const getDoc = async ({col, id}) => {
  const url = "https://getDoc-jxeq62gl4a-uc.a.run.app";
  const test_url = "http://127.0.0.1:5001/davos-57f96/us-central1/getDoc";

  try {
    const appToken = await getToken(appCheck, false);
    const userToken = await auth.currentUser.getIdToken();
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({ data: { col: col, id: id } }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "X-Firebase-AppCheck": `Bearer ${appToken.token}`,
        Authorization: `Bearer ${userToken}`,
      },
    });
    const doc = await response.json();
    return await doc.document;
  } catch (error) {
    console.error("Error fetching event:", error.message);
  }
};

export default getDoc;
