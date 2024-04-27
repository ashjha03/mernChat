import React, { useState } from "react";
import axios from "axios";
import { CiSearch } from "react-icons/ci";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ChatState } from "../../Context/ChatProvider";
import UserListItem from "../UserAvatar/UserListItem";
import { MdOutlineGroups } from "react-icons/md";
import GroupChatModal from "./GroupChatModal";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();
  const [openGroupChatModal, setOpenGroupChatModal] = useState(false);
  const notify = (msg) => toast(msg);
  const { user, setSelectedChat, chats, setChats } = ChatState();

  const handleSearch = async () => {
    if (!search) {
      setSearchResult([]);
      notify("Please enter something to search");
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
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      notify("Failed to load the searched results");
      return;
    }
  };

  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post("/api/chat", { userId }, config);

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);

      setSelectedChat(data);
      setLoadingChat(false);
    } catch (error) {
      notify("Error in fetching Chat");
      return;
    }
  };

  return (
    <div className="pb-4">
      <div className="flex items-center gap-2">
        <div className="px-6 border rounded-2xl shadow-lg shadow-[#EBDAFF] text-xl flex gap-4 items-center">
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            className="w-full py-4 outline-none"
            placeholder="Search User"
          />
          <CiSearch
            onClick={handleSearch}
            className="text-4xl cursor-pointer"
          />
        </div>
        <div className="newGrp bg-[#1ECC9C] text-white p-2 mx-2 rounded-xl w-[17%] cursor-pointer font-semibold">
          <div
            onClick={() => setOpenGroupChatModal(!openGroupChatModal)}
            className="flex items-center justify-between"
          >
            <h1 className="text-xl">+</h1>
            <MdOutlineGroups className="text-4xl" />
          </div>
        </div>
        {openGroupChatModal && (
          <GroupChatModal setOpenGroupChatModal={setOpenGroupChatModal} />
        )}
      </div>
      {searchResult?.length ? (
        <div className="flex flex-col gap-2 overflow-scroll max-h-[40vh] px-2 pt-4 border mt-2 rounded-xl p-3 shadow-lg bg-[#f3f3f3] absolute w-[27vw]">
          {loading
            ? null
            : searchResult?.map((user) => {
                return (
                  <button key={user._id} onClick={() => accessChat(user._id)}>
                    <UserListItem key={user._id} user={user} />
                  </button>
                );
              })}
        </div>
      ) : null}
      {loadingChat && <h1>loading ...</h1>}
    </div>
  );
};

export default SearchBar;
