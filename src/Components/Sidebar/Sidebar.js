import React from "react";
import { useState, useEffect } from "react";
import { Avatar, IconButton } from "@material-ui/core";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchIcon from "@material-ui/icons/Search";
import "./Sidebar.css";
import SidebarChat from "../SidebarChat/SidebarChat";
import db from "../../firebase/config";
import { useStateValue } from "../StateProvider/StateProvider";
import firebase from "firebase";

const Sidebar = () => {
  const [rooms, setRooms] = useState([]);
  // const [{ user }, dispatch] = useStateValue();
  const [{ user }, dispatch] = useStateValue();
  console.log(user);

  useEffect(() => {
    db.collection("Rooms").onSnapshot((snapshot) => {
      setRooms(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <Avatar
          src={user.photoURL}
          onClick={(e) => firebase.auth().signOut()}
        />

        <div className="header-right">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatBubbleIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="search">
        <div className="search-container">
          <IconButton>
            <SearchIcon />
            <input type="text" placeholder="search or start new chat"></input>
          </IconButton>
        </div>
      </div>

      {/* sending data as props */}
      <SidebarChat addnewchat />
      {rooms.map((room) => (
        <SidebarChat id={room.id} name={room.data.name} />
      ))}
    </div>
  );
};

export default Sidebar;
