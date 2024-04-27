import { useState } from "react";
import axios from "axios";
import { IoIosCloseCircle } from "react-icons/io";
import { toast } from "react-toastify";
import { ChatState } from "../../Context/ChatProvider";
import UserListItem from "../UserAvatar/UserListItem";
import UserBadgeItem from "../UserAvatar/UserBadgeItem";

const GroupChatModal = ({ setOpenGroupChatModal }) => {
  const [groupChatName, setGroupChatName] = useState();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const notify = (msg) => toast(msg);
  const { user, chats, setChats } = ChatState();

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
      setLoading(false);
      console.log(data);
      setSearchResults(data);
    } catch (error) {
      notify("Error Fetching User");
      return;
    }
  };

  const handleGroup = (userToAdd) => {
    if (selectedUsers.includes(userToAdd)) {
      notify("User Already Added");
      return;
    }
    setSelectedUsers([...selectedUsers, userToAdd]);
  };

  const handleDelete = (delUser) => {
    setSelectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id));
  };

  const handleSubmit = async () => {
    if (!groupChatName || !selectedUsers) {
      notify("Please fill all the fields");
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(
        `/api/chat/group`,
        {
          name: groupChatName,
          users: JSON.stringify(selectedUsers.map((u) => u._id)),
        },
        config
      );
      setChats([data, ...chats]);
      setOpenGroupChatModal(false);
      notify("New Group Chat Created");
    } catch (error) {
      notify("Failed to Create the Chat!");
    }
  };

  return (
    <div className="absolute top-[20vh] flex flex-col gap-4 left-[30vw] w-[40vw] bg-[#CACCE9] p-5 rounded-2xl text-center">
      <div className="flex justify-between items-center pl-[8vw]">
        <h1 className="text-4xl">New Group Chat</h1>
        <IoIosCloseCircle
          onClick={() => setOpenGroupChatModal(false)}
          className="text-4xl cursor-pointer"
        />
      </div>
      <div className="input">
        <input
          className="p-3 w-full rounded-lg mt-5 outline-none"
          type="text"
          placeholder="Chat Name"
          onChange={(e) => setGroupChatName(e.target.value)}
        />
        <input
          className="p-3 w-full rounded-lg mt-5 outline-none"
          type="text"
          placeholder="Add Users eg: Ashish, Ajay, Aakash"
          onChange={(e) => handleSearch(e.target.value)}
        />
        <div className="flex gap-2">
          {selectedUsers.map((user) => (
            <UserBadgeItem
              key={user._id}
              user={user}
              handleFunction={() => handleDelete(user)}
            />
          ))}
        </div>
        <div className="flex flex-col gap-2">
          {loading ? (
            <div>Loading...</div>
          ) : (
            searchResults
              ?.slice(0, 4)
              .map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => handleGroup(user)}
                />
              ))
          )}
        </div>
      </div>
      <button
        onClick={handleSubmit}
        className="p-3 bg-[#1ECC9C] mt-5 rounded-lg font-semibold"
      >
        Create Group
      </button>
    </div>
  );
};

export default GroupChatModal;
