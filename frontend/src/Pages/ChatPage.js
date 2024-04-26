import { ChatState } from "../Context/ChatProvider";
import ChatBox from "../components/ChatBox";
import MyChats from "../components/MyChats";
import SearchBar from "../components/miscellaneous/SearchBar";
import SideDrawer from "../components/miscellaneous/SideDrawer";

const ChatPage = () => {
  const { user } = ChatState();
  return (
    <div className="p-5 flex gap-5">
      {user && <SideDrawer />}
      <div className="flex justify-between">
        <div className="w-[30vw] p-4">
          {user && <SearchBar />}
          {user && <MyChats />}
        </div>
        {user && <ChatBox />}
      </div>
    </div>
  );
};

export default ChatPage;
