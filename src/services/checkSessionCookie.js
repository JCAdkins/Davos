import { appCheck } from "../utils/firebase";
import { getToken } from "firebase/app-check";

const checkSessionCookie = async () => {
  // Dynamically set the URL based on the current domain
  const baseUrl = window.location.hostname.includes("adadkins.com")
    ? "https://adkinthesky.adadkins.com"
    : "https://davos-57f96.web.app";
  const url = `${baseUrl}/authStatus`;
  console.log("url: ", url);
  try {
    console.log("in here");
    const appToken = await getToken(appCheck, false);
    console.log("past here");
    console.log("appToken: ", appToken);
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "X-Firebase-AppCheck": `Bearer ${appToken.token}`,
      },
    });
    return await response.json();
  } catch (error) {
    console.error("Error fetching event:", error.message);
    return { error: error.message };
  }
};

export default checkSessionCookie;
