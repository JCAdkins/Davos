import { auth } from "../utils/firebase";
import { appCheck } from "../utils/firebase";
import { getToken } from "firebase/app-check";

const addUser = async (user) => {
  const url = "https://adduser-jxeq62gl4a-uc.a.run.app";
  const test_url = "http://127.0.0.1:5001/davos-57f96/us-central1/addUser";
  getToken(appCheck, false).then((appToken) => {
    auth.currentUser.getIdToken().then((userToken) => {
      fetch(test_url, {
        method: "POST",
        body: JSON.stringify({ data: { ...user } }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${userToken}`,
          "X-Firebase-AppCheck": `Bearer ${appToken.token}`,
        },
      })
        .then((response) => response.json())
        .then((json) => console.log(json));
    });
  });
};

export default addUser;
