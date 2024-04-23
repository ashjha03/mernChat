import React, { useState } from "react";
import Signup from "../components/Authentication/Signup";
import Login from "../components/Authentication/Login";

const HomePage = () => {
  const [login, setLogin] = useState(false);
  const [loginBgColor, setLoginBgColor] = useState("black");
  const [singupBgColor, setSingupBgColor] = useState("[#E06685]");
  const changeToLogin = () => {
    setLogin(true);
    setLoginBgColor("[#E06685]");
    setSingupBgColor("black");
  };
  const changeToSignup = () => {
    setLogin(false);
    setSingupBgColor("[#E06685]");
    setLoginBgColor("black");
  };
  return (
    <div className="p-5">
      <div className="container grid gap-8 grid-cols-2 mx-auto pt-5 ">
        <div className="pt-10">
          <h1 className="text-5xl text-center font-bold pb-12 text-[#5D43FD]">
            Welcome to Chat Room
          </h1>
          <div className="flex w-full justify-around pb-5">
            <h1
              onClick={changeToSignup}
              className={`text-3xl text-${singupBgColor} font-bold cursor-pointer`}
            >
              Signup
            </h1>
            <h1
              onClick={changeToLogin}
              className={`text-3xl text-${loginBgColor} font-bold cursor-pointer`}
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
