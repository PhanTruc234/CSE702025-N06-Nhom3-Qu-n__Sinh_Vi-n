import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import auth from "../../services/auth";
import { useDispatch, useSelector } from "react-redux";
import { doLogin } from "../../store/features/authenSlice";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { toast } from "react-toastify";
export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [eye, setEye] = useState(false);
  const [formLogin, setFormLogin] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormLogin({
      ...formLogin,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await auth.authCheck(formLogin);
      if (res.status === 200) {
        dispatch(doLogin(res.data[0]));
        navigate("/");
        toast.success("Đăng nhập thành công");
        console.log(res.data[0], "bgk");
      }
    } catch (error) {
      toast.error("Đăng nhập thất bại");
      console.log(error);
    }
    setFormLogin({
      email: "",
      password: "",
    });
  };
  const handleEye = () => {
    setEye(!eye);
  };

  return (
    <div className="container flex items-center justify-center min-h-[800px]">
      <div className="w-full my-0 mx-auto p-[20px]  max-w-[650px]">
        <h2 className="text-[35px] text-center font-bold">Đăng nhập</h2>
        <div className="mt-7">
          <form action="" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Email*"
              value={formLogin.email}
              name="email"
              className="w-full mt-[20px] border-2 py-3 pl-5 pr-4 rounded-[10px] focus:outline-2 focus:outline-blue-500 bg-white"
              onChange={handleChange}
            />
            <div className="relative">
              <input
                type={eye ? "text" : "password"}
                name="password"
                value={formLogin.password}
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
            <Link to={"/register"} className="text-[20px] inline-block mt-5">
              Đăng kí
            </Link>

            <button
              type="submit"
              className="w-full mt-[20px] border-2 py-3 rounded-[10px] bg-[black] text-white"
            >
              Đăng nhập
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
