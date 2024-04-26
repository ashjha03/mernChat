import { IoIosCloseCircle } from "react-icons/io";

const ProfileModel = ({ loadProfile, setLoadProfile, user }) => {
  return (
    <div className="absolute top-0 left-0 mt-[25vh] ml-[30vw] rounded-3xl bg-[#32967a] px-24 py-5 text-white font-bold text-center">
      <IoIosCloseCircle
        onClick={() => {
          setLoadProfile(!loadProfile);
        }}
        className="relative left-full top-0 text-4xl cursor-pointer"
      />
      <h1 className="text-4xl py-3">{user.name}</h1>
      <div className="profile">
        <img src={user.pic} className="rounded-full w-32 mx-auto" alt="" />
      </div>
      <h1 className="text-4xl py-3">Email: {user.email}</h1>
    </div>
  );
};

export default ProfileModel;
