import { useEffect, useState } from "react";
import { firestore } from "../Firebase/config";
import useAuthContext from "./useAuthContext";
import useRoomContext from "./useRoomContext";

const useNotifReciever = () => {
    const [LastMsg, setLastMsg] = useState([]);
    const [LastOpn, setLastOpn] = useState([]);
    const { setNotifications, currentRoom } = useRoomContext();
    const { user } = useAuthContext();

    useEffect(() => {
        let notificationRooms = [];

        for (let room in LastOpn) {
            LastMsg.forEach((each) => {

                if (room == each.roomid) {
                    if (LastOpn[room] < each.lastMSG && each.senderID !== user.uid && currentRoom.roomid !== room) {
                        notificationRooms.push(room);
                    }
                }
            })
        }
        setNotifications(notificationRooms);
    }, [LastMsg, LastOpn])

    const ObserveLastMsg = () => {
        firestore.collection("Lmsg").onSnapshot((snapshot) => {
            let docs = [];
            snapshot.docs.forEach((each) => {
                docs.push({ ...each.data() });
            });
            setLastMsg(docs);
        })
    }
    const ObserveLastOpn = () => {
        user && firestore.collection("Lopn").where("uid", "==", user.uid).onSnapshot((snapshot) => {
            if (!snapshot.empty) {
                let docs = snapshot.docs[0].data();
                delete docs.uid;
                setLastOpn(docs);
            }
        })
    }
    return { ObserveLastMsg, ObserveLastOpn }
}

export default useNotifReciever;