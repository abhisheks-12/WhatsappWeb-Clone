import React, { useState, useEffect } from "react";
import { Avatar, IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import EmojiEmotionsOutlinedIcon from "@material-ui/icons/EmojiEmotionsOutlined";
import MicIcon from "@material-ui/icons/Mic";
import { useParams } from "react-router";
import "./Chat.css";
import db from "../../firebase/config";
import firebase from "firebase";
import { useStateValue } from "../StateProvider/StateProvider";

const Chat = () => {
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [input, setInput] = useState("");
  const [msg, setMsg] = useState([]);
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    if (roomId) {
      db.collection("Rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => {
          // console.log(snapshot.data().name);
          setRoomName(snapshot.data().name);
        });

      db.collection("Rooms")
        .doc(roomId)
        .collection("message")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) => {
          setMsg(snapshot.docs.map((doc) => doc.data()));
        });
    }
  }, [roomId]);

  console.log(msg);

  const sendMsg = (e) => {
    e.preventDefault();
    if (input === "") {
      return alert("Chat Box Is Empty");
    } else {
      db.collection("Rooms").doc(roomId).collection("message").add({
        name: user.displayName,
        meessage: input,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    }
    setInput("");
  };

  return (
    <div className="chat">
      <div className="chat-header">
        <Avatar src="https://avatars.dicebear.com/api/avataaars/.svg" />

        <div className="header-info">
          <h3>{roomName}</h3>
          <p>
            {
              new Date(msg.timestamp?.seconds * 1000).toLocaleTimeString()
            }
            </p>
        </div>
        <div className="header-right">
          <IconButton>
            <SearchIcon />
          </IconButton>

          <IconButton>
            <AttachFileIcon />
          </IconButton>

          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>

      <div className="chat-body">
        {msg.map((message) => (
          <p
            className={`chat-msg ${
              user.displayName === message.name && "chat-reciever"
            } `}
          >
            <span className="user-name">{message.name}</span>
            {message.meessage}
            <span className="time">
              {new Date(message.timestamp?.seconds * 1000).toLocaleTimeString()}
            </span>
          </p>
        ))}
        {/* <p className="chat-msg  chat-reciever">
          <span className="user-name">Abhishek</span>
          Hi My Name is abhishek
          <span className="time"></span>
        </p>
        <p className="chat-msg   chat-reciever">
          <span className="user-name">Abhishek</span>
          Hi My Name is abhishek
          <span className="time">10:45am</span>
        </p>
        <p className="chat-msg ">
          <span className="user-name">Abhishek</span>
          Hi My Name is abhishek
          <span className="time">10:45am</span>
        </p> */}
      </div>

      <div className="footer">
        <AttachFileIcon />
        <button>
          <EmojiEmotionsOutlinedIcon />
        </button>
        {/* <EmojiEmotionsOutlinedIcon /> */}
        <form onClick={sendMsg}>
          <input
            type="text"
            placeholder="type"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <input type="submit" />
        </form>
        <MicIcon />
      </div>
    </div>
  );
};

export default Chat;
