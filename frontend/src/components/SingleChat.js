import React, { useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import { getSender, getSenderFull } from "./config/chatLogic";
import { IoIosMore } from "react-icons/io";
import ProfileModel from "./miscellaneous/ProfileModel";
import UpdateGroupChatModal from "./miscellaneous/UpdateGroupChatModal";

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const { user, selectedChat, setSelectedChat } = ChatState();
  const [loadProfile, setLoadProfile] = useState(false);
  const [loadUpdateGrpChat, setLoadUpdateGrpChat] = useState(false);

  return (
    <div className="p-5">
      {selectedChat ? (
        <div>
          {!selectedChat.isGroupChat ? (
            <div className="flex items-center gap-2">
              <img
                onClick={() => setLoadProfile(!loadProfile)}
                src={getSenderFull(user, selectedChat.users).pic}
                className="w-12 rounded-full"
                alt=""
              />
              <h1 className="text-xl">{getSender(user, selectedChat.users)}</h1>
              {loadProfile && (
                <ProfileModel
                  loadProfile={loadProfile}
                  setLoadProfile={setLoadProfile}
                  user={getSenderFull(user, selectedChat.users)}
                />
              )}
            </div>
          ) : (
            <div>
              <div className="flex w-full justify-between items-center">
                <h1 className="text-xl">
                  {selectedChat.chatName.toUpperCase()}
                </h1>
                <div
                  onClick={() => setLoadUpdateGrpChat(!loadUpdateGrpChat)}
                  className="bg-slate-200 p-2 rounded-lg cursor-pointer"
                >
                  <IoIosMore className="text-xl" />
                </div>
              </div>
              {loadUpdateGrpChat && (
                <UpdateGroupChatModal
                  loadUpdateGrpChat={loadUpdateGrpChat}
                  setLoadUpdateGrpChat={setLoadUpdateGrpChat}
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                />
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="pt-20 pl-20">
          <img className="text-center" src="./preview.png" alt="" />
          <h1 className="text-xl text-center font-semibold">Welcome</h1>
          <h1 className="text-lg text-center text-gray-500">
            Invite your friends to start chatting
          </h1>
        </div>
      )}
    </div>
  );
};

export default SingleChat;
