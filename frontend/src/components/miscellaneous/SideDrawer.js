import { useState } from "react";
import { AiFillMessage } from "react-icons/ai";
import { FaBell } from "react-icons/fa";
import { IoSettings, IoLogOut } from "react-icons/io5";
import ProfileModel from "./ProfileModel";
import { useHistory } from "react-router-dom";

const SideDrawer = () => {
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const [loadProfile, setLoadProfile] = useState(false);
  const history = useHistory();

  const logOut = () => {
    localStorage.removeItem("userInfo");
    history.push("/");
  };

  return (
    <div>
      <div className="flex flex-col h-[95vh] bg-[#1ECC9C] py-4 px-3 rounded-3xl gap-5 items-center justify-between">
        <div className="icons flex flex-col gap-6 items-center">
          <div className="image pb-6">
            <img
              onClick={() => setLoadProfile(!loadProfile)}
              src={user.pic}
              className="rounded-full w-14 cursor-pointer"
              alt=""
            />
          </div>
          <AiFillMessage className="text-[55px] text-white cursor-pointer hover:bg-[#1EE3AC] px-2 rounded-3xl" />
          <FaBell className="text-[55px] text-white cursor-pointer hover:bg-[#1EE3AC] px-2 rounded-3xl" />
          <IoSettings className="text-[55px] text-white cursor-pointer hover:bg-[#1EE3AC] px-2 rounded-3xl" />
        </div>
        <IoLogOut
          onClick={logOut}
          className="text-[55px] text-white cursor-pointer hover:bg-[#1EE3AC] px-2 rounded-3xl"
        />
      </div>
      {loadProfile && (
        <ProfileModel
          loadProfile={loadProfile}
          setLoadProfile={setLoadProfile}
          user={user}
        />
      )}
    </div>
  );
};

export default SideDrawer;
