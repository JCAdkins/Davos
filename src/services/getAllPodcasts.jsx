import { appCheck } from "../utils/firebase";
import { getToken } from "firebase/app-check";

const getAllPodcasts = async () => {
  const url = "https://getcollection-jxeq62gl4a-uc.a.run.app";
  const test_url =
    "http://127.0.0.1:5001/davos-57f96/us-central1/getCollection";

  try {
    const appToken = await getToken(appCheck, false);
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({ data: "podcasts" }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "X-Firebase-AppCheck": `Bearer ${appToken.token}`,
      },
    });

    const podcasts = await response.json();
    return podcasts.documents;
  } catch (error) {
    console.error("Error fetching podcasts:", error.message);
  }
};

export default getAllPodcasts;
