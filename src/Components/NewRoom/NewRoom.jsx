import "./NewRoom.css";
import { BsFillCloudUploadFill, BsFillImageFill } from "react-icons/bs";
import { useRef, useState } from "react";
import useImage from "../../Hooks/useImage";
import useAuthContext from "../../Hooks/useAuthContext";
import useCreateRoom from "../../Hooks/useCreateRoom";
import { storage } from "../../Firebase/config";
import { AnimatePresence, motion } from "framer-motion";
import imageCompression from "browser-image-compression";

const NewRoom = ({ setShowAddRoom }) => {
  const { createRoom } = useCreateRoom();
  const [roomName, setRoomName] = useState();
  const [image, setImage] = useState(null);
  const { updateProfilePic, progress } = useImage();
  const [roomDpUrl, setRoomDpUrl] = useState();
  const { user } = useAuthContext();
  const [error, setError] = useState(null);

  function generateUniqueName() {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < 20; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  const handlePropagation = (e) => {
    e.stopPropagation();
  };

  const handleRoomSubmit = (e) => {
    e.preventDefault();
    try {
      if (roomDpUrl) {
        if (roomName) {
          createRoom({
            name: roomName,
            image: roomDpUrl,
            creatorUID: user.uid,
            creatorImg: user.photoURL,
            creatorName: user.displayName,
            createdAt: new Date(),
          });
          setRoomName(null);
          setRoomDpUrl(null);
          setError(null);
          e.target.reset();
          setShowAddRoom(false);
        } else {
          throw new Error("Enter a Room Name");
        }
      } else {
        throw new Error("Select an Image for Room");
      }
    } catch (e) {
      setError(e);
    }
  };

  const inputFile = useRef(null);

  const onButtonClick = () => {
    inputFile.current.click();
  };

  const onUploadComplete = (url) => {
    setRoomDpUrl(url);
  };

  let validImages = ["jpg", "jpeg", "png", "gif"];

  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 200,
    useWebWorker: true
  }

  const handleImageChange = async (e) => {
    if (e.target.files[0]) {

      let fileName = e.target.files[0].name;
      let extention = fileName.substr(fileName.lastIndexOf('.') + 1).toLowerCase();

      if (validImages.includes(extention)) {
        setError(false);
        // setImage(e.target.files[0]);
        imageCompression(e.target.files[0], options)
          .then((compressed) => {
            updateProfilePic(
              false,
              compressed,
              user,
              "RoomImages",
              generateUniqueName(),
              {
                onComplete: onUploadComplete,
              }
            );
          })

      }
      else {
        setError({ message: "Invalid Image Format" });
      }
    }
  };

  const popupVariant = {
    hide: {
      scale: 0,
    },
    show: {
      scale: 1,
    },
    close: {
      scale: 0
    }
  }

  return (
    <div
      className="NewRoom"
      onClick={() => {
        if (roomDpUrl) {
          var fileRef = storage.refFromURL(roomDpUrl);
          fileRef.delete();
        }
        setShowAddRoom(false);
      }}
    >
      <motion.div
        variants={popupVariant}
        initial='hide'
        animate='show'
        exit='close'
        className="card"
        onClick={(e) => {
          handlePropagation(e);
        }}
      >
        <div className="room_anim">
          <lottie-player
            src="https://assets9.lottiefiles.com/packages/lf20_2cghrrpi.json"
            style={{ width: "80%" }}
            background="transparent"
            speed="1"
            loop
            autoplay
          ></lottie-player>
        </div>
        <div className="add_room_form">
          <h3 className="card_title">Room Details</h3>
          <form
            onSubmit={(e) => {
              handleRoomSubmit(e);
            }}
          >
            <p>Room Name</p>
            <input
              type="text"
              autoComplete="off"
              className="room_name_inp"
              onChange={(e) => {
                setRoomName(e.target.value.trim().toLowerCase());
              }}
            />
            <p>Upload Profile Picture</p>
            <input
              type="file"
              id="file"
              ref={inputFile}
              style={{ display: "none" }}
              onChange={handleImageChange}
              accept="image/*"
            />
            <div className="file_pick_contain" onClick={onButtonClick}>
              {!roomDpUrl && <BsFillCloudUploadFill />}
              {roomDpUrl && <BsFillImageFill />}
              {progress && (
                <div className="progress_bar">
                  <div
                    className="progress_completed"
                    style={{ flex: `${progress}` }}
                  ></div>
                </div>
              )}
            </div>
            {error && <p className="error_msg">{error.message}</p>}
            <button
              className="room_submit"
              disabled={!roomDpUrl ? true : false}
            >
              Create
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default NewRoom;
