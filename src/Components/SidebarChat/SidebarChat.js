import { Avatar } from "@material-ui/core";
import React from "react";
import "./SidebarChat.css";
import { useState, useEffect } from "react";
import db from "../../firebase/config";
import { Link } from "react-router-dom";

const SidebarChat = ({ addnewchat, id, name }) => {
  const [profile, setprofile] = useState("");
  const [lastMsg, setLastMsg] = useState("");

  useEffect(() => {
    setprofile(Math.floor(Math.random() * 5000));

    db.collection("Rooms")
      .doc(id)
      .collection("message")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setLastMsg(snapshot.docs.map((doc) => doc.data))
      );
  }, []);

  

  const createRoom = () => {
    const room = prompt("Create New Room");
    if (room) {
      db.collection("Rooms").add({
        name: room,
      });
    }
  };

  return !addnewchat ? (
    <Link to={`/rooms/${id}`}>
      <div className="sidebar-chat">
        <Avatar
          src={`https://avatars.dicebear.com/api/avataaars/${profile}.svg`}
        />
        <div className="info-chat">
          <h2>{name}</h2>
          <p>{lastMsg[0]?.message}</p>
        </div>
      </div>
    </Link>
  ) : (
    <div className="sidebar-chat" onClick={createRoom}>
      <h2>Add New Chat</h2>
    </div>
  );
};

export default SidebarChat;
