import axios from "axios";
import { useState } from "react";
import { API_REGISTER } from "../../constants/api";
import auth from "../../services/auth";
import { axiosClient } from "../../services/axiosClient";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { toast } from "react-toastify";
export const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [eye, setEye] = useState(false);
  const [formRegister, setFormRegister] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });
  const handleChange = (e) => {
    console.log(e, "eeeeeeee");
    const { name, value } = e.target;
    setFormRegister({
      ...formRegister,
      [name]: value,
      role: "USER",
    });
  };
  const handleEye = () => {
    setEye(!eye);
  };
  console.log(formRegister, "bfgjbg");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const checkRes = await auth.authRegisterCheck(formRegister);
      const exists = checkRes.data.find(
        (user) =>
          user.name === formRegister.name && user.email === formRegister.email
      );
      if (exists) {
        toast.warn("Người dùng đã tồn tại");
        return;
      }
      const postRes = await auth.authRegister(formRegister);
      if (postRes.status === 201) {
        toast.success("Đăng kí thành công");
        navigate("/login");
      }
    } catch (error) {
      toast.error("Tài khoản đã tồn tại");
      console.log(error);
    }
  };
  return (
    <div className="container flex items-center justify-center min-h-[800px]">
      <div className="w-full my-0 mx-auto p-[20px]  max-w-[650px]">
        <h2 className="text-[35px] text-center font-bold">Đăng kí</h2>
        <div className="mt-7">
          <form action="" onSubmit={handleSubmit}>
            <input
              type="text"
              value={formRegister.name}
              className="w-full mt-[20px] border-2 py-3 pl-5 pr-4 rounded-[10px] focus:outline-2 focus:outline-blue-500 bg-white"
              name="name"
              placeholder="User name*"
              onChange={handleChange}
            />
            <input
              type="text"
              name="email"
              value={formRegister.email}
              placeholder="Email*"
              className="w-full mt-[20px] border-2 py-3 pl-5 pr-4 rounded-[10px] focus:outline-2 focus:outline-blue-500 bg-white"
              onChange={handleChange}
            />
            <div className="relative">
              <input
                type={eye ? "text" : "password"}
                name="password"
                value={formRegister.password}
                className="w-full mt-[20px] border-2 py-3 pl-5 pr-4 rounded-[10px] focus:outline-2 focus:outline-blue-500 outline-none"
                placeholder="Password*"
                onChange={handleChange}
              />
              <div
                className="absolute top-1/2 right-[20px] cursor-pointer"
                onClick={handleEye}
              >
                {eye ? <RemoveRedEyeIcon /> : <VisibilityOffIcon />}
              </div>
            </div>
            <Link to={"/login"} className="mt-3 inline-block">
              Đăng nhập
            </Link>
            <button
              type="submit"
              className="w-full mt-[20px] border-2 py-3 rounded-[10px] bg-[black] text-white"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
