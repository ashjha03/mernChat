import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Signup = () => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [pic, setPic] = useState();
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const notify = (msg) => toast(msg);

  const handleClick = () => setShow(!show);
  const postDetails = (pics) => {
    setLoading(true);
    // if (pic === undefined) {
    //   notify("Please select an image");
    //   return;
    // }

    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chatApp");
      data.append("cloud_name", "dkyvnlkqs");

      axios
        .post("https://api.cloudinary.com/v1_1/dkyvnlkqs/image/upload", data)
        .then((res) => {
          console.log("Cloudinary response: ", res);
          setPic(res.data.url.toString());
          setLoading(false);
          notify("Image uploaded successfully");
        })
        .catch((err) => {
          console.log("Cloudinary Error", err);
          setLoading(false);
        });
    } else {
      notify("Please select JPEG or PNG type");
      setLoading(false);
      return;
    }
  };
  const submitHandler = async () => {
    setLoading(true);
    if (!name || !email || !password || !confirmPassword) {
      notify("Please fill all the fields");
      setLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      notify("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/user",
        { name, email, password, pic },
        config
      );
      notify("Registration Successful");
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      history.push("/chats");
    } catch (error) {
      notify("Some error occured");
      setLoading(false);
      return;
    }
  };

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
        {loading ? <h1> loading ...</h1> : null}
      </form>
    </div>
  );
};

export default Signup;
