import { getToken } from "firebase/app-check";
import { appCheck } from "../utils/firebase";

const generateSessionCookie = async (idToken) => {
  //const url = "https://generatesessioncookie-jxeq62gl4a-uc.a.run.app";
  //const url = "https://davos-57f96.web.app/generateSessionCookie";
  const url = "https://adkinthesky.adadkins.com/generateSessionCookie";
  console.log(idToken);
  try {
    const appToken = await getToken(appCheck, false);
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({ data: idToken }),
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
