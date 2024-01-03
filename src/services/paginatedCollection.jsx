import { appCheck } from "../utils/firebase";
import { getToken } from "firebase/app-check";

const paginatedCollection = async (col, sortBy, lim, dir) => {
  const url = "https://getcollectionpage-jxeq62gl4a-uc.a.run.app"
  const test_url = "https://test.com"
    const appToken = await getToken(appCheck, false);
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({ data: { col: col, sortBy: sortBy, lim: lim, dir: dir } }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "X-Firebase-AppCheck": `Bearer ${appToken.token}`,
      },
    });
    
    const pages = await response.json();
    return pages;
};

export default paginatedCollection;
