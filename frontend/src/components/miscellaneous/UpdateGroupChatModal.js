import React, { useState } from "react";
import { ChatState } from "../../Context/ChatProvider";
import { toast } from "react-toastify";
import UserBadgeItem from "../UserAvatar/UserBadgeItem";
import UserListItem from "../UserAvatar/UserListItem";
import { IoIosCloseCircle } from "react-icons/io";
import axios from "axios";

const UpdateGroupChatModal = ({
  fetchAgain,
  setFetchAgain,
  loadUpdateGrpChat,
  setLoadUpdateGrpChat,
}) => {
  const { selectedChat, setSelectedChat, user } = ChatState();
  const [groupChatName, setGroupChatName] = useState("");
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [renameloading, setRenameLoading] = useState(false);

  const notify = (msg) => toast(msg);
  const handleRename = async () => {
    if (!groupChatName) return;

    try {
      setRenameLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        `/api/chat/rename`,
        {
          chatId: selectedChat._id,
          chatName: groupChatName,
        },
        config
      );

      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setRenameLoading(false);
    } catch (error) {
      notify("Error Occured");
      setRenameLoading(false);
    }
    setGroupChatName("");
  };
  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) {
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(`/api/user?search=${search}`, config);
      console.log(data);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      notify("Error Occured");
      setLoading(false);
    }
  };
  const handleAddUser = async (user1) => {
    if (selectedChat.users.find((u) => u._id === user1._id)) {
      notify("User already exists in group");
      return;
    }

    if (selectedChat.groupAdmin._id !== user._id) {
      notify("Only admins can add someone!");
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        `/api/chat/groupadd`,
        {
          chatId: selectedChat._id,
          userId: user1._id,
        },
        config
      );

      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setLoading(false);
    } catch (error) {
      notify("Error Occured!");
      setLoading(false);
    }
    setGroupChatName("");
  };
  const handleRemove = async (user1) => {
    if (selectedChat.groupAdmin._id !== user._id && user1._id !== user._id) {
      notify("Only admins can remove someone!");
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        `/api/chat/groupremove`,
        {
          chatId: selectedChat._id,
          userId: user1._id,
        },
        config
      );

      user1._id === user._id ? setSelectedChat() : setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      //   fetchMessages();
      setLoading(false);
    } catch (error) {
      notify("Error Occured!");
      setLoading(false);
    }
    setGroupChatName("");
  };

  return (
    <div className="absolute top-0 left-0 mt-[25vh] ml-[30vw] rounded-3xl bg-[#32967a] px-14 py-5 text-white font-bold">
      <IoIosCloseCircle
        onClick={() => {
          setLoadUpdateGrpChat(!loadUpdateGrpChat);
        }}
        className="relative left-full top-0 text-4xl cursor-pointer"
      />
      <h1 className="text-2xl py-3 text-center">{selectedChat.chatName}</h1>
      <div className="flex gap-2">
        {selectedChat.users.map((u) => (
          <UserBadgeItem
            key={u._id}
            user={u}
            handleFunction={() => handleRemove(u)}
          />
        ))}
      </div>

      <div className="input pt-5">
        <div className="chatname flex gap-2">
          <input
            className="p-2 w-full rounded-lg outline-none text-black"
            value={groupChatName}
            onChange={(e) => setGroupChatName(e.target.value)}
            type="text"
            placeholder="Chat Name"
          />
          <button
            onClick={handleRename}
            className="p-2 bg-[#EA6F8B] hover:bg-[#e97e97] rounded-xl"
          >
            Update
          </button>
        </div>
        <div className="">
          <input
            className="p-3 text-black w-full rounded-lg mt-5 outline-none"
            type="text"
            placeholder="Add Users eg: Ashish, Ajay, Aakash"
            onChange={(e) => handleSearch(e.target.value)}
          />
          <div className="flex flex-col gap-2 pt-2">
            {loading ? (
              <h1>loading ...</h1>
            ) : (
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => handleAddUser(user)}
                />
              ))
            )}
          </div>
        </div>
      </div>

      <div className="leave pt-5 flex justify-end">
        <button
          onClick={() => handleRemove(user)}
          className="p-2 rounded-lg bg-[#e7315c] hover:bg-[#e7315be2]"
        >
          Leave Group
        </button>
      </div>
    </div>
  );
};

export default UpdateGroupChatModal;
