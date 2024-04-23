import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Signup = () => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [pic, setPic] = useState();

  const handleClick = () => setShow(!show);
  const postDetails = (pics) => {};
  const submitHandler = () => {};

  return (
    <div>
      <form action="">
        <div className="input name flex flex-col p-2">
          <label htmlFor="name">Name</label>
          <input
            className="border rounded-lg h-9 p-2"
            type="text"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="input email flex flex-col p-2">
          <label htmlFor="email">Email</label>
          <input
            className="border rounded-lg h-9 p-2"
            type="text"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input password flex flex-col p-2">
          <label htmlFor="password">Password</label>
          <div className="flex gap-2 items-center">
            <input
              className="border rounded-lg w-full h-9 p-2"
              type={show ? "text" : "password"}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="cursor-pointer" onClick={handleClick}>
              {show ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>
        </div>
        <div className="input confirmPassword flex flex-col p-2">
          <label htmlFor="confirmPassword"> Confirm Password</label>
          <div className="flex gap-2 items-center">
            <input
              className="border rounded-lg w-full h-9 p-2"
              type={show ? "text" : "password"}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <div className="cursor-pointer" onClick={handleClick}>
              {show ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>
        </div>
        <div className="input pic flex flex-col p-2">
          <label htmlFor="name">Upload your Picture</label>
          <input
            className="py-2"
            type="file"
            accept="image/*"
            onChange={(e) => postDetails(e.target.files[0])}
          />
        </div>

        <button
          onClick={submitHandler}
          className="border p-2 bg-[#5D43FD] hover:bg-[#6A6BFC] text-white font-bold rounded-lg w-full mt-2"
        >
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;
