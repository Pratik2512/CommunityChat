import { useEffect, useState } from "react";
import { firestore } from "../Firebase/config";
import useAuthContext from "./useAuthContext";
import useNotifs from "./useNotifs";
import useRoomContext from "./useRoomContext";

const useCollection = (roomid) => {
  const [chats, setChats] = useState();
  const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);
  const { setLastMsg, setLastOpen } = useNotifs();
  const { user } = useAuthContext();
  const { currentRoom } = useRoomContext();

  useEffect(() => {
    setLoading(true);
    if (user) {
      let doc = { uid: user.uid };
      doc[currentRoom.roomid] = new Date();
      setLastOpen(doc, true);
    }

    const unsub = firestore
      .collection("chats")
      .where("roomid", "==", roomid)
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        let docs = [];
        snapshot.docs.forEach((each) => {
          docs.push({ ...each.data(), id: each.id });
        });

        setChats(docs);
        setLoading(false);
      });
    return () => unsub();
  }, [roomid]);

  const Send = async (newDoc) => {
    try {
      const ref = firestore.collection("chats");
      let doc = { uid: newDoc.uid };
      doc[newDoc.roomid] = new Date();
      await ref.doc().set(newDoc);
      await setLastMsg({ roomid: newDoc.roomid, lastMSG: new Date(), senderID: user.uid });
      await setLastOpen(doc, false);
    } catch (e) {
      console.log(e);
    }
  };

  const DeleteMsg = async (msgid) =>{
    try{
      firestore
      .collection("chats")
      .doc(msgid)
      .delete()
    }
    catch(e)
    {
      console.log(e.message);
    }
  }

  return { chats, Send, loading, DeleteMsg };
};

export default useCollection;
