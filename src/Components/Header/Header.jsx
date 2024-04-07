import useLogout from "../../Hooks/useLogout";
import logo from "../../assets/images/logo.png";
import avatar from "../../assets/images/avatar.svg";
import { useRef, useState } from "react";
import "./Header.css";
import { AnimatePresence, motion } from "framer-motion";
import useImage from "../../Hooks/useImage";
import imageCompression from "browser-image-compression";

const Header = ({ user }) => {
  const { logout } = useLogout();
  const [showPopup, setShowPopup] = useState(false);
  const [image, setImage] = useState(null);
  const { updateProfilePic, progress } = useImage();
  const [url, setUrl] = useState(
    user && user.photoURL ? user.photoURL : avatar
  );

  const inputFile = useRef(null);

  const onButtonClick = () => {
    inputFile.current.click();
  };

  const onUploadComplete = (url) => {
    setUrl(url);
  };

  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 200,
    useWebWorker: true
  }

  let validImages = ["jpg", "jpeg", "png", "gif"];

  const handleImageChange = async (e) => {
    if (e.target.files[0]) {

      let fileName = e.target.files[0].name;
      let extention = fileName.substr(fileName.lastIndexOf('.') + 1).toLowerCase();

      if (validImages.includes(extention)) {
        imageCompression(e.target.files[0], options)
          .then((compressed) => {
            setImage(compressed);

            updateProfilePic(
              true,
              compressed,
              user,
              "ProfilePictures",
              user.uid,
              {
                onComplete: onUploadComplete,
              }
            );
          })
      }
    }
  };

  const popupVariant = {
    hide: {
      opacity: 0,
      y: -50
    },
    show: {
      opacity: 1,
      y: 0
    },
    close: {
      opacity: 0,
      y: -50,
      transition: {
        duration: 0.1
      }
    }
  }

  return (
    <div className="header">

      <div className="branding">
        <img src={logo} alt="" />
        <h1>CollabCraze</h1>
      </div>

      <div className="user_profile_contain">

        {progress && (
          <div className="progress_bar">
            <div
              className="progress_completed"
              style={{ flex: `${progress}` }}
            ></div>
          </div>
        )}

        <div className="dp_container">
          <img
            src={url}
            className="user_avatar"
            onClick={() => {
              setShowPopup((prev) => !prev);
            }}
          />
        </div>

        <h2
          className="user_name"
          onClick={() => {
            setShowPopup((prev) => !prev);
          }}
        >
          {user && user.displayName}
        </h2>

        {showPopup && (
          <div
            className="backdrop"
            onClick={() => {
              setShowPopup((prev) => !prev);
            }}
          ></div>
        )}

        <AnimatePresence>
          {showPopup && (
            <motion.div className="popup" variants={popupVariant} initial='hide' animate='show' exit='close'>
              <p className="popup_option" onClick={onButtonClick}>
                Change Photo
              </p>
              <input
                type="file"
                id="file"
                ref={inputFile}
                style={{ display: "none" }}
                onChange={handleImageChange}
                accept="image/*"
              />
              <a
                href="mailto:brijrajparmaromegab32@gmail.com"
                className="popup_option"
              >
                Report bug
              </a>
              <button className="logout_btn" onClick={logout}>
                Logout
              </button>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};
export default Header;
