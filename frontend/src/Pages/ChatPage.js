import { useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import ChatBox from "../components/ChatBox";
import MyChats from "../components/MyChats";
import SearchBar from "../components/miscellaneous/SearchBar";
import SideDrawer from "../components/miscellaneous/SideDrawer";

const ChatPage = () => {
  const { user } = ChatState();
  const [fetchAgain, setFetchAgain] = useState(false);
  return (
    <div className="p-5 flex gap-5">
      {user && <SideDrawer />}
      <div className="flex w-full">
        <div className="w-[50vw] py-4 px-2">
          {user && <SearchBar />}
          {user && <MyChats fetchAgain={fetchAgain} />}
        </div>
        {user && (
          <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </div>
    </div>
  );
};

export default ChatPage;
