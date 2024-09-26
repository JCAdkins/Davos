import { getToken } from "firebase/app-check";
import { appCheck } from "../utils/firebase";

const generateSessionCookie = async (idToken) => {
  // Dynamically set the URL based on the current domain
  const baseUrl = window.location.hostname.includes("adadkins.com")
    ? "https://adkinthesky.adadkins.com"
    : "https://davos-57f96.web.app";
  const url = `${baseUrl}/generateSessionCookie`;
  try {
    const appToken = await getToken(appCheck, false);
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "X-Firebase-AppCheck": `Bearer ${appToken.token}`,
        Authorization: `Bearer ${idToken}`,
      },
    });
    const data = await response.json();
    return await data;
  } catch (error) {
    console.log("error: ", error);
  }
};

export default generateSessionCookie;
