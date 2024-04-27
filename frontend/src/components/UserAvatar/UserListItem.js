import React from "react";

const UserListItem = ({ user, handleFunction }) => {
  return (
    <div
      onClick={handleFunction}
      className="relative p-2 rounded-xl flex items-center gap-4 bg-[#5fcdaf] hover:bg-[#1ECC9C] text-white cursor-pointer"
    >
      <img
        src={user.pic}
        className="w-12 border rounded-full border-white"
        alt=""
      />
      <div>
        <h1 className="text-xl">{user.name}</h1>
        <h1 className="text-md">Email: {user.email}</h1>
      </div>
    </div>
  );
};

export default UserListItem;
