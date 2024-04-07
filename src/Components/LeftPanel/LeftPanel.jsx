import "./LeftPanel.css";
import { BsSearch } from "react-icons/bs";
import useDatabase from "../../Hooks/useDatabase";
import { useEffect, useState } from "react";
import useRoomContext from "../../Hooks/useRoomContext";
import { IoIosAdd } from "react-icons/io";
import useScreenContext from "../../Hooks/useScreenContest";
import React from "react";

const NewRoom = React.lazy(()=>import("../NewRoom/NewRoom"));

const LeftPanel = ({ setShowChat, showChat }) => {
  const [sort, setSort] = useState();
  const { RoomsList, loading } = useDatabase({ sort });
  const [roomData, setRoomData] = useState();
  const { setCurrentRoom, notifications } = useRoomContext();
  const [showAddRoom, setShowAddRoom] = useState(false);
  const { size } = useScreenContext();
  let temp;

  useEffect(() => {
    if (roomData) {
      temp = roomData;
      temp = temp.map((each) => {
        return { ...each, priority: notifications.includes(each.roomid) ? 1 : 0 };
      })
      setRoomData([...temp.sort((a, b) => b.priority - a.priority)]);
    }
  }, [notifications]);

  useEffect(() => {
    RoomsList && setRoomData([...RoomsList]);


    
  }, [RoomsList])

   console.log(roomData);
  return (
    <div className={showChat ? "left_panel hide" : "left_panel"}>

      {showAddRoom && <NewRoom setShowAddRoom={setShowAddRoom} />}
      <div style={{display:"flex", justifyContent:'space-between', paddingRight:'40px',alignItems:'center'}}>
      <h2>Rooms</h2>
      <p style={{fontSize:'20px', fontWeight:'bold'}}>Resources <a href="https://tybca.netlify.app" target="_blank">📚</a></p> 
      </div>
      <div className="left_bar">
        <div className="search_contain">
          <BsSearch style={{ color: "grey" }}></BsSearch>
          <input
            type="text"
            className="room_search_bar"
            autoComplete="off"
            onChange={(e) => {
              setSort(e.target.value.trim().toLowerCase());
            }}
          />
        </div>
        <button
          className="add_room_btn"
          onClick={() => {
            setShowAddRoom(true);
          }}
        >
          <IoIosAdd />
        </button>
      </div>
      <div className="rooms_contain scrollbar" id="style-1">
        {!loading &&
          roomData &&
          roomData.map((each, index) => {
            return (
              <div
                className="room_card"
                key={each.roomid}
                onClick={() => {
                  setCurrentRoom(each);
                  if (size[1] < 750) {
                    setShowChat(true);
                  }
                }}
              >
                <img src={each.image} className="room_icon" />
                <h3 className="room_title">{each.name}</h3>
                {
                  notifications.includes(each.roomid) && <div className="notif_dot"></div>
                }
              </div>
            );
          })}
        {loading && (
          <div className="loader">
            <lottie-player
              src="https://assets7.lottiefiles.com/private_files/lf30_fup2uejx.json"
              background="transparent"
              speed="1"
              style={{ width: "100%", height: "auto" }}
              loop
              autoplay
            ></lottie-player>
          </div>
        )}
        {!loading && RoomsList && RoomsList.length == 0 && (
          <div className="loader">
            <lottie-player
              src="https://assets9.lottiefiles.com/private_files/lf30_gctc76jz.json"
              background="transparent"
              speed="1"
              style={{ width: "200px", height: "200px" }}
              loop
              autoplay
            ></lottie-player>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeftPanel;
