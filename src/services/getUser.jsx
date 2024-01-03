import getDoc from "./getDoc";

const getUser = async ({uid}) => {
  if (uid){
    const doc = await getDoc({col: "users", id: uid})
    return doc;
  }
  return {message: "Error: No UID provided."}
  }

export default getUser;
