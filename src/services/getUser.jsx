import { appCheck } from "../utils/firebase";
import { getToken } from "firebase/app-check";
import { auth } from "../utils/firebase";
import getDoc from "./getDoc";

const getUser = async ({uid}) => {
  
  const url = "https://getuser-jxeq62gl4a-uc.a.run.app";
  const test_url = "http://127.0.0.1:5001/davos-57f96/us-central1/getUser";

  if (uid){
    const doc = await getDoc({col: "users", id: uid})
    return doc;
  }
  return {message: "Error: No UID provided."}
  }

export default getUser;
