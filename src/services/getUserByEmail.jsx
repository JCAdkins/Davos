import { appCheck } from "../utils/firebase";
import { getToken } from "firebase/app-check";

const getUserByEmail = async (username) => {
  const url = "https://getuserbyemail-jxeq62gl4a-uc.a.run.app";
  const test_url = "";

  try {
    const appToken = await getToken(appCheck, false);
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({ data: { username: username } }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "X-Firebase-AppCheck": `Bearer ${appToken.token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching event:", error.message);
    return error;
  }
};

export default getUserByEmail;
