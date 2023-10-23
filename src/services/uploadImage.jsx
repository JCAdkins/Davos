import { cloudStorage } from "../utils/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const upLoadImage = (currentUser, image) => {
  const storageRef = ref(
    cloudStorage,
    `profile_images/${currentUser.email}/${image.name}`
  );
  return uploadBytes(storageRef, image).then((snapShot) =>
    getDownloadURL(snapShot.ref)
  );
};

export default upLoadImage;
