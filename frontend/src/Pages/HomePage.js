import React, { useEffect, useState } from "react";
import Signup from "../components/Authentication/Signup";
import Login from "../components/Authentication/Login";
import { useHistory } from "react-router-dom";

const HomePage = () => {
  const [login, setLogin] = useState(false);
  const [loginBgColor, setLoginBgColor] = useState("text-black");
  const [singupBgColor, setSingupBgColor] = useState("text-[#E06685]");

  const history = useHistory();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (user) history.push("/chats");
  }, [history]);

  const changeToLogin = () => {
    setLogin(true);
    setLoginBgColor("text-[#E06685]");
    setSingupBgColor("text-black");
  };
  const changeToSignup = () => {
    setLogin(false);
    setSingupBgColor("text-[#E06685]");
    setLoginBgColor("text-black");
  };

  return (
    <div className="p-5">
      <div className="container grid gap-8 grid-cols-2 mx-auto text- pt-5 ">
        <div className="pt-10">
          <h1 className="text-5xl text-center font-bold pb-12 text-[#5D43FD]">
            Welcome to Chat Room
          </h1>
          <div className="flex w-full justify-around pb-5">
            <h1
              onClick={() => changeToSignup()}
              className={`text-3xl ${singupBgColor} font-bold cursor-pointer`}
            >
              Signup
            </h1>
            <h1
              onClick={() => changeToLogin()}
              className={`text-3xl ${loginBgColor} font-bold cursor-pointer`}
            >
              Login
            </h1>
          </div>
          {login ? <Login /> : <Signup />}
        </div>
        <div>
          <img src="/back.jpg" className="w-full" alt="Background" />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
