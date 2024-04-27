import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ChatState } from "../Context/ChatProvider";
import axios from "axios";
import { getSender } from "./config/chatLogic";

const MyChats = () => {
  const notify = (msg) => toast(msg);
  const [loggedUser, setLoggedUser] = useState();
  const { user, setSelectedChat, chats, setChats } = ChatState();

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get("/api/chat", config);
      setChats(data);
    } catch (error) {
      notify("Error Occured!!!");
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  }, []);

  return (
    <div>
      <div className="chats pt-4 flex flex-col gap-2">
        {chats ? (
          chats.map((chat) => {
            return (
              <div
                className="flex items-center gap-3 p-1 cursor-pointer rounded-xl hover:bg-[#1ECC9C] hover:text-white"
                key={chat._id}
              >
                <img
                  src={chat.users[0].pic}
                  className="h-16 w-16 border rounded-full border-white"
                  alt=""
                />
                <div>
                  <h1 className="text-lg font-semibold">
                    {chat.isGroupChat
                      ? chat.chatName
                      : getSender(loggedUser, chat.users)}
                  </h1>
                  <h1 className="text-sm pl-2">
                    You: Lorem ipsum dolor sit amet consectetur.
                  </h1>
                </div>
              </div>
            );
          })
        ) : (
          <h1>No chats to display</h1>
        )}
      </div>
    </div>
  );
};

export default MyChats;
