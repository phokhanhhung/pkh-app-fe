import React, { useState, useEffect, useRef } from "react";
import socketIoClient from "socket.io-client";
import ScrollToBottom from 'react-scroll-to-bottom';
import './Chat.css';

const socket = socketIoClient.connect("https://pkh-app.herokuapp.com");

function Chat() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [showRoom, setShowRoom] = useState(true);
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const joinRoom = () => {
    if(username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
      setShowRoom(false);
      // setUsername("");
      // setRoom("");
    }
  }

  const handlePressEnter = (e) => {
    if(e.keyCode === 13) {
      joinRoom();
    }
  }

  const sendMessage = () => {
    const messageData = {
      author: username,
      room: room,
      date: new Date().getDate()  + "/" + new Date().getMonth() + 1 + "/" + new Date().getFullYear(),
      time: new Date().getHours() + ":" + new Date().getMinutes(),
      message: currentMessage,
    }
    socket.emit("send_message", messageData);
    setMessageList(messageList => [...messageList, messageData]);
    console.log(messageData);
    setCurrentMessage("");
  }

  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log(data);
      setMessageList(messageList => [...messageList, data])
    });
    console.log("list", messageList)

  }, [socket])

  return (
    <div className="chat">
      {
        showRoom ? 
        <div className="chat__room-chat">
          <h1>Get room</h1>
          <input 
            placeholder="My username..." 
            type="text"
            onChange={e => setUsername(e.target.value)}
            className="chat__input-username"
          /> <br />
          <input 
            placeholder="My room..." 
            type="text"
            onChange={e => setRoom(e.target.value)}
            className="chat__input-room"
          /> <br />
          <button
            className="chat__button-enter-room"
            onClick={joinRoom}
            onKeyDown={handlePressEnter}
          >
            Enter room
          </button>
        </div>
        : ""
      }
      

      {
        !showChat ? "" :
        <div className="chat__box-chat">
          <ScrollToBottom className="chat__messages-wrapper">
            {messageList.map((mes, index) => (
              <div key={index}>
                <p 
                  className={
                    mes.author === username 
                    ? "mes-me" 
                    : "mes-orther"} 
                >{mes.message}</p>
                <p 
                  className={
                    mes.author === username 
                    ? "mes-me__info" 
                    : "mes-orther__info"
                }>{mes.time} | {mes.date} - {mes.author}</p>
              </div>
            ))}
          </ScrollToBottom>
          <div className="chat__input">
            <input 
            className="chat__input-message"
              type="text" 
              value={currentMessage}
              onChange={e => setCurrentMessage(e.target.value)} 
              onKeyDown={e => e.keyCode === 13 && sendMessage()}
            />
            <i 
              className="fas fa-plane-departure"
              onClick={sendMessage}
            ></i>
          </div>
          
        </div>
      }
      
    </div>
  );
}

export default Chat;