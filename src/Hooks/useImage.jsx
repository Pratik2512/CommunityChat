import { useEffect, useState } from "react";
import { storage } from "../Firebase/config";

const useImage = () => {
  const [progress, setProgress] = useState();

  useEffect(() => {
    if (progress == 1) {
      setProgress(null);
    }
  }, [progress]);

  const updateProfilePic = async (
    isDP,
    imageFile,
    user,
    filepath,
    filename,
    { onComplete }
  ) => {
    const uploadTask = storage
      .ref(`${filepath}/${filename}.png`)
      .put(imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = snapshot.bytesTransferred / snapshot.totalBytes;
        setProgress(prog);
      },
      (error) => console.log(error),
      () => {
        storage
          .ref(filepath)
          .child(`${filename}.png`)
          .getDownloadURL()
          .then((url) => {
            if (onComplete) {
              onComplete(url);
            }
            isDP && user.updateProfile({ photoURL: url });
          });
      }
    );
  };
  return { updateProfilePic, progress };
};
export default useImage;
