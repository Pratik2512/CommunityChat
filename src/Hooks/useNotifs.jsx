import { firestore } from "../Firebase/config"
import useAuthContext from "./useAuthContext";
import useRoomContext from "./useRoomContext";

const useNotifs = () => {
    const { user } = useAuthContext();
    const { currentRoom } = useRoomContext();

    const setLastMsg = (doc) => {
        firestore.collection("Lmsg").doc(doc.roomid).set(doc);
    }

    const setLastOpen = async (doc, isPeaking) => {
        
        const query = firestore.collection("Lopn").doc(user.uid);

        query.get().then((res) => {
            
            if (isPeaking) {
                if (res.data() && res.data().hasOwnProperty(currentRoom.roomid)) {
                    query.update(doc);
                }
            }
            else {
                if(res.exists)
                {
                    query.update(doc);
                }
                else{
                    query.set(doc);
                }
            }
        });

    }
    return { setLastMsg, setLastOpen };
}
export default useNotifs