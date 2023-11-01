import {
  query,
  orderBy,
  collection,
  startAfter,
  limit,
  getDocs,
} from "firebase/firestore";
import { db } from "../utils/firebase";

const paginatedCollection = async (col, sortBy, lim, dir) => {
  const pages = [];
  let lastVisible = null;
  const direction = dir;

  while (true) {
    const myQuery = lastVisible
      ? query(
          collection(db, col),
          orderBy(sortBy, direction),
          limit(lim),
          startAfter(lastVisible)
        )
      : query(collection(db, col), orderBy(sortBy, direction), limit(lim));

    const querySnapshot = await getDocs(myQuery);

    if (querySnapshot.empty) break;

    const pageData = [];
    querySnapshot.forEach((doc) => {
      pageData.push(doc.data());
    });
    pages.push(pageData);

    if (querySnapshot.length < lim) break;

    // Get the last visible document
    lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
  }

  return pages;
};

export default paginatedCollection;
