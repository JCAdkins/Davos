import { cloudStorage } from "../utils/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const upLoadImage = async (currentUser, image) => {
  const storageRef = ref(
    cloudStorage,
    `profile_images/${currentUser.uid}/${image.name}`
  );
  const snapShot = await uploadBytes(storageRef, image);
  return await getDownloadURL(snapShot.ref);
};

export default upLoadImage;
