import { useEffect, useState } from "react";
import cart from "../../../../services/cart";
import { useDispatch, useSelector } from "react-redux";
import {
  decrement,
  deleteCart,
  increment,
  resetCart,
  setCart,
} from "../../../../store/features/cartSlice";
import { formatBigNumber } from "../../../../utils/format-big-number";
import { Button, Checkbox, IconButton, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import dayjs from "dayjs";
import { Label } from "@mui/icons-material";
import payment from "../../../../services/payment";
import { setPayment } from "../../../../store/features/paymentSlice";
import SendIcon from "@mui/icons-material/Send";
import { useNavigate } from "react-router-dom";
export const CartProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dataCart = useSelector((state) => state.cartSlice.cart);
  const [loading, setLoading] = useState(false);
  const [checkItems, setCheckItems] = useState([]);
  const handleIncrement = async (key) => {
    const item = dataCart.find((i) => i.id === key.id);
    console.log(item);
    const newQuantity = item.quantity + 1;

    try {
      const res = await cart.updateQuantity(key.id, newQuantity);
      if (res.status === 200) {
        dispatch(increment(key.id));
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleDecrement = async (key) => {
    const item = dataCart.find((i) => i.id === key.id);
    const newQuantity = item.quantity > 1 ? item.quantity - 1 : 1;

    try {
      const res = await cart.updateQuantity(key.id, newQuantity);
      if (res.status === 200) {
        dispatch(decrement(key.id));
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeleteCart = async (item) => {
    try {
      const res = await cart.removeCart(item.id);
      if (res.status === 200) {
        dispatch(deleteCart(item.id));
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const render = async () => {
      try {
        dispatch(resetCart()); // Reset giỏ hàng
        const res = await cart.renderCart();
        console.log("Dữ liệu từ API cart.renderCart:", res.data);
        if (res.status === 200) {
          dispatch(setCart(res.data));
        }
      } catch (error) {
        console.log(error);
      }
    };
    render();
  }, []);
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const handleChangeCheckout = (item) => {
    console.log(item, "ppppppppppp");
    const isChecked = checkItems.some((i) => i.id === item.id);
    console.log(isChecked, "isChecked");
    if (isChecked) {
      setCheckItems(checkItems.filter((i) => i.id !== item.id));
    } else {
      setCheckItems([...checkItems, item]);
    }
  };
  const totalPrice = checkItems.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );
  const infomation = localStorage.getItem("info");
  const handleCheckout = () => {
    setLoading(true);
    if (infomation) {
      localStorage.setItem("pay", JSON.stringify(checkItems));
      setTimeout(async () => {
        alert("Thanh toán thành công");
        navigate("/checkout");
        checkItems.forEach(async (i) => {
          try {
            const res = await cart.removeCart(i.id);
            //   dispatch(setCart(res.data));
          } catch (error) {
            console.log(error);
          } finally {
            setLoading(false);
          }
        });
      }, 2000);
    } else {
      navigate("/infomation");
    }
  };
  //   console.log(totalPrice, "dfkrrg");
  return (
    <div className="container mt-[100px] mb-[100px]">
      <table className="w-full table-auto border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th>
              <Checkbox {...label} />
              <span>All</span>
            </th>
            <th className="p-4 text-left border-b">Hình ảnh</th>
            <th className="p-4 text-left border-b">Tên sản phẩm</th>
            <th className="p-4 text-left border-b">Giá</th>
            <th className="p-4 text-left border-b">Số lượng</th>
            <th className="p-4 text-left border-b">khởi tạo</th>
            <th className="p-4 text-left border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          {dataCart &&
            dataCart.map((item) => (
              <tr key={item.id} className="border-b hover:bg-gray-50">
                <td>
                  <Checkbox
                    {...label}
                    onChange={() => handleChangeCheckout(item)}
                  />
                </td>
                <td className="p-4">
                  <img
                    src={item.images[0]?.name}
                    alt={item.name}
                    className="w-[80px] h-[80px] object-cover rounded-md border"
                  />
                </td>
                <td className="p-4">{item.name}</td>
                <td className="p-4">
                  {formatBigNumber(Number(item.price * item.quantity), true)}
                </td>
                <td className="p-4">
                  <div className="flex items-center w-max relative">
                    <button
                      type="button"
                      className="text-lg block text-[0px] absolute left-4"
                    >
                      <span
                        className="text-2xl leading-[24px]"
                        onClick={() => handleDecrement(item)}
                      >
                        -
                      </span>
                    </button>
                    <input
                      type="text"
                      className="w-[120px] h-[50px] border px-10 border-gray rounded-full text-center"
                      value={item.quantity >= 1 ? item.quantity : "1"}
                    />
                    <button
                      type="button"
                      className="text-lg block text-[0px] absolute right-4"
                    >
                      <span
                        className="text-2xl leading-[24px]"
                        onClick={() => handleIncrement(item)}
                      >
                        +
                      </span>
                    </button>
                  </div>
                </td>
                <td>
                  {item.createdAt
                    ? dayjs(item.createdAt).format("DD/MM/YYYY HH:mm")
                    : "-"}
                </td>
                <td>
                  <Tooltip
                    title="Delete"
                    onClick={() => handleDeleteCart(item)}
                  >
                    <IconButton>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="mt-[20px]">
        Tổng :
        {totalPrice ? (
          <div>
            <span>{formatBigNumber(totalPrice, true)}</span>
            <Button
              fullWidth
              onClick={handleCheckout}
              endIcon={<SendIcon />}
              disabled={loading || checkItems.length === 0}
              variant="contained"
            >
              {loading ? "Đang xử lý..." : "Thanh toán khi nhận hàng"}
            </Button>
          </div>
        ) : (
          "0đ"
        )}
      </div>
    </div>
  );
};
