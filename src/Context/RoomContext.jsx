import { createContext, useState } from "react";

export const RoomContext = createContext();

export const RoomProvider = ({ children }) => {
  const [currentRoom, setCurrentRoom] = useState({
    name: "General",
    image:
      "https://firebasestorage.googleapis.com/v0/b/collabcraze-d0632.appspot.com/o/RoomImages%2FO2Bv2lAB1DJsFGpTRmjM.png?alt=media&token=7d28bf16-6eb2-49bc-b7fb-021082e80f1f",
    roomid: "6DbAoawAfzRvY80ToOZA",
  });
  const [notifications,setNotifications] = useState([])
  return (
    <RoomContext.Provider value={{ currentRoom, setCurrentRoom, notifications, setNotifications }}>
      {children}
    </RoomContext.Provider>
  );
};


