import React from "react";
import { IoIosCloseCircle } from "react-icons/io";

const UserBadgeItem = ({ handleFunction, user }) => {
  return (
    <div className="flex gap-1 my-2 items-center bg-[#EA6F8B] text-white p-1 rounded-lg ">
      <img src={user.pic} className="w-5 h-5 rounded-full" alt="" />
      <h1 className="text-md">{user.name}</h1>
      <IoIosCloseCircle className="cursor-pointer" onClick={handleFunction} />
    </div>
  );
};

export default UserBadgeItem;
