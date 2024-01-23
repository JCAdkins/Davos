import { getToken } from "firebase/app-check";
import { appCheck } from "../utils/firebase";

const generateSessionCookie = async (idToken) => {
  const url = "https://adkinthesky.adadkins.com/generateSessionCookie";
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
