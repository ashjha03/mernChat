import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";

const SearchBar = () => {
  //   const [search, setSearch] = useState("");
  //   const [setsearchResult, setSetsearchResult] = useState([]);
  //   const [loading, setLoading] = useState(false);
  //   const [loadingChat, setLoadingChat] = useState();

  return (
    <div className="pb-4">
      <div className="px-4 border rounded-2xl shadow-lg shadow-[#EBDAFF] text-xl flex gap-4 items-center">
        <CiSearch className="text-4xl" />
        <input
          type="text"
          className="w-full py-4 px-2 outline-none"
          placeholder="Search User"
        />
      </div>
    </div>
  );
};

export default SearchBar;
