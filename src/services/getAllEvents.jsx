import { appCheck } from "../utils/firebase";
import { getToken } from "firebase/app-check";

const getAllEvents = async () => {
  const url = "https://getcollection-jxeq62gl4a-uc.a.run.app";
  const test_url =
    "http://127.0.0.1:5001/davos-57f96/us-central1/getCollection";

  try {
    const appToken = await getToken(appCheck, false);
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({ data: "events" }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "X-Firebase-AppCheck": `Bearer ${appToken.token}`,
      },
    });

    const events = await response.json();
    return events.documents;
  } catch (error) {
    console.error("Error fetching events:", error.message);
  }
};

export default getAllEvents;
