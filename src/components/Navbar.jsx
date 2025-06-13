import logo from "../assets/logo.webp";
import ico_search from "../assets/ico_search.png";
import ico_user from "../assets/ico_user.png";
import ico_heart from "../assets/ico_heart.png";
import ico_bag from "../assets/ico_bag.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { doLogout } from "../store/features/authenSlice";
// import PaymentIcon from "@mui/icons-material/Payment";
export const Navbar = () => {
  const dataCart = useSelector((state) => state.cartSlice.cart);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const info = useSelector((state) => state.authenSlice.info);
  const isLogin = info?.role === "ADMIN";
  const handleLogout = () => {
    dispatch(doLogout());
    navigate("/login");
  };
  return (
    <div>
      <div className="flex justify-between items-center py-8">
        <h1>
          <Link to={"/"} className="block max-w-[130px]">
            <img className="max-w-full" src={logo} alt="Darion" />
          </Link>
        </h1>
        <div className="relative ml-auto lg:mr-20 max-w-[500px] w-full hidden xl:block">
          <input
            className="border-2 w-[500px] py-2 pl-10 pr-4 rounded-full focus:outline-2 focus:outline-blue-500"
            type="text"
            name=""
            id=""
            placeholder="Search..."
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <span>
              <img className="size-5" src={ico_search} alt="" />
            </span>
          </div>
        </div>
        <nav className="mr-28 hidden lg:block ml-auto">
          <ul className="flex items-center gap-10">
            <li className="relative after:absolute after:h-[1.5px] after:bg-black after:left-0 after:bottom-[-2px] after:transition-all after:duration-300 after:w-full after:scale-x-0 hover:after:-scale-x-100">
              <Link to={"/"}>Trang chủ</Link>
            </li>
            <li className="relative after:absolute after:h-[1.5px] after:bg-black after:left-0 after:bottom-[-2px] after:transition-all after:duration-300 after:w-full after:scale-x-0 hover:after:-scale-x-100">
              <Link to={"/about"}>Về chúng tôi</Link>
            </li>
            <li className="relative after:absolute after:h-[1.5px] after:bg-black after:left-0 after:bottom-[-2px] after:transition-all after:duration-300 after:w-full after:scale-x-0 hover:after:-scale-x-100">
              <Link to={"/product"}>Sản phẩm</Link>
            </li>
            <li className="relative after:absolute after:h-[1.5px] after:bg-black after:left-0 after:bottom-[-2px] after:transition-all after:duration-300 after:w-full after:scale-x-0 hover:after:-scale-x-100">
              <Link to={"/checkout"}>Thanh toán</Link>
            </li>
          </ul>
        </nav>
        <ul className="flex items-center gap-6 ml-auto lg:ml-0 shrink-0">
          <li className="relative group after:content-[''] after:absolute after:w-[40px] after:h-[10px] after:bg-[#fff] after:top-[20px] after:z-10">
            {info ? (
              <span>Xin Chào, {info.name.toUpperCase()}</span>
            ) : (
              <Link to={"/login"}>
                <img className="size-5 image" src={ico_user} alt="" />
              </Link>
            )}
            {info && (
              <ul className="absolute opacity-0 bg-[red] p-[10px] w-[117px] h-[100px] top-[30px] group-hover:opacity-100 transition-all duration-700 translate-y-[-20px] group-hover:translate-y-0 z-50 scale-95 group-hover:scale-100 delay-100 rounded-[8px]">
                <li className="mb-2 text-[20px]">
                  {" "}
                  <Link to={"/infomation"}>Thông tin</Link>
                </li>
                {isLogin && (
                  <Link to={"/admin"} className="text-[20px]">
                    Quản trị
                  </Link>
                )}
                <li onClick={handleLogout} className="mt-2 text-[20px]">
                  Đăng xuất
                </li>
              </ul>
            )}
          </li>
          <li className="relative">
            <Link to={"/cart"}>
              <img className="size-5 image" src={ico_bag} alt="" />
              <span className="absolute size-[18px] bg-black text-white rounded-full flex justify-center items-center -top-[8px] -right-[9.5px] text-xs">
                {dataCart.length}
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
