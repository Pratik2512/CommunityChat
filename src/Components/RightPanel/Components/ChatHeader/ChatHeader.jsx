import "./ChatHeader.css";
import { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import useAuthContext from "../../../../Hooks/useAuthContext";
import useCreateRoom from "../../../../Hooks/useCreateRoom";
import useRoomContext from "../../../../Hooks/useRoomContext";
import { BiArrowBack } from "react-icons/bi";
import { AnimatePresence, motion } from "framer-motion";

const ChatHeader = ({ setDetailsPopup, setShowChat }) => {
  const [popup, setPopup] = useState(false);
  const { deleteRoom, clearRoom } = useCreateRoom();
  const { currentRoom, setCurrentRoom } = useRoomContext();
  const { user } = useAuthContext();
  const adminUID = "1JIDD2wkCsbeEL2xbWZKHm5Fpg52";

  const handleDeleteRoom = () => {
    setPopup(false);
    deleteRoom();
    setCurrentRoom({
      name: "General",
      image:
        "https://firebasestorage.googleapis.com/v0/b/chatroom-b93bf.appspot.com/o/RoomImages%2F7XguRtYdQtVWmjph8Gf4.jpg?alt=media&token=6408a3db-f673-4ba0-a141-bfe93ad87e87",
      roomid: "7XguRtYdQtVWmjph8Gf4",
    });
  };

  const handlePop = () => {
    setShowChat(false);
  }

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

  const headerVariant = {
    hide: {
      y: "-100%"
    },
    show: {
      y: 0
    }
  }

  return (
    <motion.div className="chat_header" variants={headerVariant} initial='hide' animate='show'>
      <div className="header_left">
        <div className="back" onClick={handlePop}>
          <BiArrowBack />
        </div>
        <img src={currentRoom.image} className="room_avatar" />
        <h2 onClick={() => { setDetailsPopup(true) }}>{currentRoom.name}</h2>
      </div>

      {popup && (
        <div
          className="backdrop"
          onClick={() => {
            setPopup(false);
          }}
        ></div>
      )}

      <div
        className="room_options"
        onClick={() => {
          setPopup((prev) => !prev);
        }}
      >
        <BsThreeDotsVertical />
      </div>

      <AnimatePresence>
        {popup && (
          <motion.div className="room_menu" variants={popupVariant} initial='hide' animate='show' exit='close'>
            <p
              className="popup_option"
              onClick={() => {
                setDetailsPopup(true);
                setPopup(false);
              }}
            >
              Details
            </p>
            {(currentRoom.creatorUID == user.uid || user.uid == adminUID) && (<p
              className="popup_option"
              onClick={() => {
                clearRoom();
                setPopup(false);
              }}
            >
              Clear Chat
            </p>)}
            {(currentRoom.creatorUID == user.uid || user.uid == adminUID) && (
              <button className="del_room_btn" onClick={handleDeleteRoom}>
                Delete
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  );
};
export default ChatHeader;
