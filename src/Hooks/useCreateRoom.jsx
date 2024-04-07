import { firestore, storage } from "../Firebase/config";
import useDatabase from "./useDatabase";
import useRoomContext from "./useRoomContext";

const useCreateRoom = () => {

  const { currentRoom } = useRoomContext();
  const { setRoomsList } = useDatabase(false);

  const createRoom = async (newDoc) => {
    try {
      const ref = firestore.collection("rooms");
      await ref.doc().set(newDoc);
    } catch (e) {
      console.log(e);
    }
  };

  const clearRoom = () => {
    var chat_del_query = firestore
      .collection("chats")
      .where("roomid", "==", currentRoom.roomid);
    chat_del_query.get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        doc.ref.delete();
      });
    });
  }

  const clearRoomDP = () => {
    var fileRef = storage.refFromURL(currentRoom.image);
    fileRef.delete();
  }

  const deleteRoom = () => {

    clearRoom()
    clearRoomDP();

    firestore
      .collection("rooms")
      .doc(currentRoom.roomid)
      .delete()
      // .then(() => {
        
      //   console.log("cleaning up")

      //   setRoomsList((prev) => {
      //     return prev.filter((each) => {
      //       return each.roomid !== currentRoom.roomid;
      //     })
      //   })
      // });

  };

  return { createRoom, deleteRoom, clearRoom, clearRoomDP };
};
export default useCreateRoom;
