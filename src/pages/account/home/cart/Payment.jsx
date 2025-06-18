import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import payment from "../../../../services/payment";
import { setPayment } from "../../../../store/features/paymentSlice";
import { formatBigNumber } from "../../../../utils/format-big-number";

export const Payment = () => {
  const dataPayment = JSON.parse(localStorage.getItem("pay"));
  console.log(dataPayment);

  let totalPrice = 0;
  if (dataPayment) {
    dataPayment.forEach((item) => {
      totalPrice += item.price * item.quantity;
    });
  }
  const infomation = JSON.parse(localStorage.getItem("info"));
  console.log(infomation, "lqlqlqlql");
  return (
    <div className="container mt-[100px] mb-[100px]">
      <h2 className="text-center text-[30px] mb-4">
        Chi tiết sản phẩm đang được giao
      </h2>
      <table className="w-full table-auto border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-4 text-left border-b">Hình ảnh</th>
            <th className="p-4 text-left border-b">Tên sản phẩm</th>
            <th className="p-4 text-left border-b">Giá</th>
            <th className="p-4 text-left border-b">Số lượng</th>
          </tr>
        </thead>
        <tbody>
          {dataPayment &&
            dataPayment.map((item) => (
              <tr key={item.id} className="border-b hover:bg-gray-50">
                <td className="p-4">
                  <img
                    src={
                      typeof item.images[0] === "string"
                        ? item.images[0]
                        : item.images[0]?.name
                    }
                    alt={item.name}
                    className="w-[80px] h-[80px] object-cover rounded-md border"
                  />
                </td>
                <td className="p-4">{item.name}</td>
                <td className="p-4">
                  {formatBigNumber(item.price * item.quantity, true)}
                </td>
                <td className="p-4">{item.quantity}</td>
              </tr>
            ))}
        </tbody>
      </table>
      {(!dataPayment || dataPayment.length === 0) && (
        <p className="text-center">Không có dữ liệu</p>
      )}
      {dataPayment && (
        <div className="mt-[20px] text-[20px] mb-2">
          Tổng :{totalPrice ? formatBigNumber(totalPrice, true) : "0đ"}
        </div>
      )}
      <div className="text-[20px]">
        {infomation && (
          <div>
            <p className="mb-2">Thông tin người nhận</p>
            <p className="mb-2">Khách hành : {infomation.hoTen}</p>
            <p className="mb-2">Số điện thoại :{infomation.soDienThoai}</p>
            <p>Địa chỉ : {infomation.diaChi}</p>
          </div>
        )}
      </div>
    </div>
  );
};
