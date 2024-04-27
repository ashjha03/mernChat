import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const notify = (msg) => toast(msg);

  const handleClick = () => setShow(!show);
  const submitHandler = async (e) => {
    setLoading(true);
    if (!email || !password) {
      notify("Please fill all the fields");
      setLoading(false);
      return;
    }

    try {
      e.preventDefault();
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "api/user/login",
        { email, password },
        config
      );
      notify("Login Successful");
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      history.push("/chats");
    } catch (error) {
      notify("Error Occured");
      setLoading(false);
    }
  };

  return (
    <div>
      <form>
        <div className="input email flex flex-col p-2">
          <label htmlFor="email">Email</label>
          <input
            className="border rounded-lg h-9 p-2"
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className="input password flex flex-col p-2">
          <label htmlFor="password">Password</label>
          <div className="flex gap-2 items-center">
            <input
              className="border rounded-lg w-full h-9 p-2"
              type={show ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="cursor-pointer" onClick={handleClick}>
              {show ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>
        </div>
        <button
          onClick={submitHandler}
          className="border p-2 bg-[#5D43FD] hover:bg-[#6A6BFC] text-white font-bold rounded-lg w-full mt-2"
        >
          Login
        </button>
      </form>
      <button
        onClick={() => {
          setEmail("guest@gmail.com");
          setPassword("123456");
        }}
        className="border p-2 bg-[#E06685] hover:bg-[#ea859e] text-white font-bold rounded-lg w-full mt-2"
      >
        Get Guest User Credentials
      </button>
      {loading ? <h1>Loading</h1> : null}
    </div>
  );
};

export default Login;
