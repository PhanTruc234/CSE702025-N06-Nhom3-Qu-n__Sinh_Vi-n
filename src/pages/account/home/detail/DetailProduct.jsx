import ico_star_active from "../../../../assets/ico_star_active.png";
import ico_star_gray from "../../../../assets/ico_star_gray.png";
import ico_eye from "../../../../assets/ico_eye.png";
import ico_checked from "../../../../assets/ico_checked.png";
import ico_heart from "../../../../assets/ico_heart.png";
import ico_reload from "../../../../assets/ico_reload.png";
import ico_question from "../../../../assets/ico_question.png";
import ico_shipping from "../../../../assets/ico_shipping.png";
import ico_share from "../../../../assets/ico_share.png";
import ico_shipping2 from "../../../../assets/ico_shipping2.png";
import img_payment from "../../../../assets/img_payment.avif";
import ico_check from "../../../../assets/ico_check.png";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { slugify } from "../../../../utils/slugify";
import { Backdrop, Button, CircularProgress } from "@mui/material";
import { formatBigNumber } from "../../../../utils/format-big-number";
import cart from "../../../../services/cart";
import { addCart, increment } from "../../../../store/features/cartSlice";
import SendIcon from "@mui/icons-material/Send";
import { toast } from "react-toastify";

export const DetailProduct = () => {
  const dispatch = useDispatch();
  const { name: encodedName } = useParams();
  const name = decodeURIComponent(encodedName);
  const [loading, setLoading] = useState(false);
  const [cartValue, setCartValue] = useState(null);
  const data = useSelector((state) => state.productSlice.produc);
  const detailProduct = data.find((p) => slugify(p.name) === slugify(name));
  const [selectedImg, setSelectedImg] = useState("");
  const dataCart = useSelector((state) => state.cartSlice.cart);
  const [count, setCount] = useState(1);
  const handleChangeImg = (url) => {
    setSelectedImg(url);
  };
  const handleDecrement = () => {
    setCount(count > 1 ? count - 1 : 1);
  };

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleSubmitCart = async (item) => {
    setLoading(true);
    const existingItem = dataCart.find((i) => i.name === item.name);
    if (existingItem) {
      const newQuantity = existingItem.quantity + count;
      try {
        const res = await cart.updateQuantity(existingItem.id, newQuantity);
        if (res.status === 200) {
          dispatch(increment(existingItem.id));
        }
      } catch (error) {
        console.error("Lỗi cập nhật quantity:", error);
      } finally {
        setLoading(false);
      }
    } else {
      setCartValue({
        id: String(item.id),
        name: item.name,
        quantity: count,
        price: item.price,
        images: item.images,
        createdAt: new Date().toISOString(),
      });
    }
    toast.success(`Thêm ${item.name} vào giỏ hàng thành công`);
  };
  useEffect(() => {
    if (!cartValue) return;
    const fetchCart = async () => {
      try {
        const res = await cart.fetchCart(cartValue);
        console.log("API trả về:", res.data);
        if (res.status === 201) {
          dispatch(addCart({ ...cartValue }));
        }
      } catch (error) {
        console.error("Lỗi thêm giỏ hàng:", error);
      } finally {
        setLoading(false);
        setCartValue(null);
      }
    };

    fetchCart();
  }, [cartValue, dispatch]);
  return detailProduct ? (
    <div className="container">
      <ul className="flex gap-2 items-center py-4">
        <li>
          <Link className="text-sm" to={"/"}>
            Home /{" "}
          </Link>
        </li>
        <li>
          <Link className="text-sm" to={""}>
            {" "}
          </Link>
        </li>
        <li>
          <Link className="text-sm">{detailProduct.name}</Link>
        </li>
      </ul>
      <div className="lg:grid grid-cols-5 gap-7 mt-4">
        <div className="col-span-3 flex gap-3">
          <ul className="flex flex-col gap-4">
            {detailProduct.images.map((image) => (
              <li
                key={image.id}
                className={`w-[82px] cursor-pointer p-2 rounded-md transition-all ${
                  (selectedImg ? selectedImg : detailProduct.images[0].name) ===
                  image.name
                    ? "border-2 border-black"
                    : "hover:border hover:border-black"
                }`}
                onClick={() => handleChangeImg(image.name)}
              >
                <img
                  src={image.name ? image.name : ""}
                  alt=""
                  className="max-w-full object-cover rounded-md"
                />
              </li>
            ))}
          </ul>
          <div className="overflow-hidden">
            <div className="rounded-xl overflow-hidden">
              <img
                src={selectedImg ? selectedImg : detailProduct.images[0].name}
                alt="selected product"
                className="w-full h-auto object-cover rounded-xl"
              />
            </div>
          </div>
        </div>
        <div className="col-span-2 mt-6">
          <h2 className="text-xl lg:text-3xl font-semibold">
            <span>{detailProduct.name}</span>
            <span className="bg-[#DD0000] inline-block p-1 rounded-[20px] text-white ml-2 text-[20px]">
              -{detailProduct.discout}%
            </span>
          </h2>
          <ul className="flex items-center gap-1 mt-4">
            <li>
              <img className="size-[16px]" src={ico_star_active} alt="" />
            </li>
            <li>
              <img className="size-[16px]" src={ico_star_active} alt="" />
            </li>
            <li>
              <img className="size-[16px]" src={ico_star_active} alt="" />
            </li>
            <li>
              <img className="size-[16px]" src={ico_star_active} alt="" />
            </li>
            <li>
              <img className="size-[16px]" src={ico_star_gray} alt="" />
            </li>
          </ul>

          <p className="mt-3 text-xl font-semibold">
            <span className="mr-2 line-through text-[#666666]">
              {formatBigNumber(detailProduct.price, true)}
            </span>
            <span>
              {formatBigNumber(
                detailProduct.price * (1 - detailProduct.discout / 100),
                true
              )}
            </span>
          </p>

          <div className="mt-2 pt-2 border-t border-gray">
            <p className="flex items-center gap-2 mt-4">
              <span className="font-medium text-sm">Danh mục:</span>
              <span className="text-red-600 font-medium text-sm">
                {detailProduct.name}
              </span>
            </p>
            <p className="flex items-center gap-2 mt-2">
              <img className="w-5 block animate-flicker" src={ico_eye} alt="" />
              <span className="font-medium text-sm">
                {Math.floor(Math.random() * 50 + 10)} đang xem
              </span>
            </p>

            <p className="flex items-center gap-2 mt-6">
              <img className="w-5 block" src={ico_checked} alt="" />{" "}
              <span className="text-green font-medium text-sm">Còn hàng</span>
            </p>
            <div className="mt-6 flex items-center gap-3">
              <div className="flex items-center w-max relative">
                <button
                  type="button"
                  className="text-lg block text-[0px] absolute left-4"
                >
                  <span
                    className="text-2xl leading-[24px]"
                    onClick={handleDecrement}
                  >
                    -
                  </span>
                </button>
                <input
                  type="text"
                  className="w-[120px] h-[50px] border px-10 border-gray rounded-full text-center"
                  value={count >= 1 ? count : "1"}
                />
                <button
                  type="button"
                  className="text-lg block text-[0px] absolute right-4"
                >
                  <span
                    className="text-2xl leading-[24px]"
                    onClick={handleIncrement}
                  >
                    +
                  </span>
                </button>
              </div>
              <Button
                fullWidth
                onClick={() => handleSubmitCart(detailProduct)}
                endIcon={<SendIcon />}
                disabled={loading}
                variant="contained"
              >
                {loading ? "Đang thêm..." : "Thêm vào giỏ hàng"}
              </Button>
              <button
                type="button"
                className="p-4 bg-white border border-[#e6e6e6] rounded-full"
              >
                <FavoriteBorderIcon />
              </button>
            </div>

            <ul className="flex items-center gap-4 mt-6">
              <li>
                <button
                  type="button"
                  className="flex items-center gap-4 text-sm font-medium"
                >
                  <img className="w-4" src={ico_reload} alt="" />
                  So sánh
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="flex items-center gap-4 text-sm font-medium"
                >
                  <img className="w-4" src={ico_question} alt="" />
                  Câu hỏi
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="flex items-center gap-4 text-sm font-medium"
                >
                  <img className="w-4" src={ico_shipping} alt="" />
                  Thông tin vận chuyển
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="flex items-center gap-4 text-sm font-medium"
                >
                  <img className="w-4" src={ico_share} alt="" />
                  Chia sẻ
                </button>
              </li>
            </ul>

            <div className="flex items-center mt-6 mb-6 pt-6 pb-6 border-t border-b border-b-gray border-t-gray">
              <div>
                <img className="block w-9" src={ico_shipping2} alt="" />
              </div>
              <p className="flex-1 ml-4 pl-4 border-l border-l-[#d9d9d9] text-sm">
                Đặt hàng trong vòng 22 giờ 45 phút để nhận hàng từ <br />
                <span className="font-semibold underline">
                  Thứ Ba, 22/10{" "}
                </span>{" "}
                <span className="mx-2">đến</span>
                <span className="font-semibold underline"> Thứ Bảy, 26/10</span>
              </p>
            </div>

            <div className="p-[15px] rounded-xl border border-[#dedede] flex items-start gap-3">
              <div>
                <img src={ico_check} className="w-6 block" alt="" />
              </div>
              <div className="text-sm">
                <p className="text-lightGray">
                  Có sẵn tại{" "}
                  <span className="font-semibold text-black">
                    Cửa hàng Akaze
                  </span>
                </p>
                <p className="text-xs text-lightGray mt-1">
                  Thường sẵn sàng trong 24 giờ
                </p>
                <button type="button" className="underline text-xs mt-4">
                  Xem thông tin cửa hàng
                </button>
              </div>
            </div>

            <div className="text-center mt-6 p-6 bg-[#f6f6f6] rounded-lg">
              <p className="text-sm tracking-widest">Thanh toán đảm bảo</p>
              <img className="block mt-3" src={img_payment} alt="" />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-9 lg:mt-24">
        <ul className="flex items-center lg:justify-center gap-6">
          <li>
            <button
              type="button"
              className="text-lg font-semibold py-2 px-4 bg-black text-white rounded-full"
            >
              Mô tả
            </button>
          </li>
          <li>
            <button
              type="button"
              className="lg:block hidden text-lg font-semibold py-2 px-4 text-[#8a8a8a] hover:text-black transition-all"
            >
              Đánh giá
            </button>
          </li>
          <li>
            <button
              type="button"
              className="lg:block hidden text-lg font-semibold py-2 px-4 text-[#8a8a8a] hover:text-black transition-all"
            >
              Vận chuyển
            </button>
          </li>
          <li>
            <button
              type="button"
              className="lg:block hidden text-lg font-semibold py-2 px-4 text-[#8a8a8a] hover:text-black transition-all"
            >
              Đổi trả
            </button>
          </li>
        </ul>

        <div className="mt-5 lg:mt-9">
          <p className="text-[#8a8a8a] leading-7">
            {detailProduct.description}
          </p>
        </div>
      </div>

      <div className="mt-24 mb-24">
        <h2 className="text-center text-lg lg:text-3xl font-semibold">
          Bạn có thể thích
        </h2>
      </div>
    </div>
  ) : (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={true}
    >
      <div className="j-text-center">
        <CircularProgress color="inherit" />
      </div>
    </Backdrop>
  );
};
