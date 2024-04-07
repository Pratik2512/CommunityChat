import { useEffect, useState } from "react";
import { firestore } from "../Firebase/config";
import useRoomContext from "./useRoomContext";

const useDatabase = ({ sort }) => {
  const [RoomsList, setRoomsList] = useState();
  const [loading, setLoading] = useState(false);
  const { notifications } = useRoomContext();

  useEffect(() => {
    if (sort) {
      var dataArray = [];
      setLoading(true);
      firestore
        .collection("rooms").where("name", ">=", sort).where("name", "<=", sort + "\uf8ff")
        .get()
        .then((snapshot) => {
          dataArray = [];
          snapshot.forEach((datum) => {
            dataArray.push({ ...datum.data(), roomid: datum.id });
          });
          setRoomsList(dataArray);
          setLoading(false);
        });
    } else {
      fetchRooms();
    }

  }, [sort]);

  const fetchRooms = () => {

    let dataArray = [];
    setLoading(true);
    firestore
      .collection("rooms")
      .get()
      .then((snapshot) => {
        dataArray = [];
        snapshot.forEach((datum) => {
          dataArray.push({ ...datum.data(), roomid: datum.id, priority: notifications.includes(datum.id) ? 1 : 0 });
        });
        setRoomsList(dataArray.sort((a, b) => b.priority - a.priority));
        setLoading(false);
      });

  };

  return { fetchRooms, RoomsList, loading, setRoomsList };
};

export default useDatabase;
