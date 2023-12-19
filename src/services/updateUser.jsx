import { auth } from "../utils/firebase";
import { appCheck } from "../utils/firebase";
import { getToken } from "firebase/app-check";

const updateUser = async (newData) => {
  const url = "https://updateuser-jxeq62gl4a-uc.a.run.app";
  const test_url = "http://127.0.0.1:5001/davos-57f96/us-central1/updateUser";

  getToken(appCheck, false).then((appToken) => {
    auth.currentUser.getIdToken().then(async (userToken) => {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({ data: { ...newData } }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${userToken}`,
          "X-Firebase-AppCheck": `${appToken.token}`,
        },
      });
      const json = await response.json();
      return json.result.data;
    });
  });
};
export default updateUser;
