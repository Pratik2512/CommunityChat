import { useContext } from "react";
import { RoomContext } from "../Context/RoomContext";

const useRoomContext = () => {
  const { currentRoom, setCurrentRoom, notifications, setNotifications } = useContext(RoomContext);
  return { currentRoom, setCurrentRoom, notifications, setNotifications };
};
export default useRoomContext;
