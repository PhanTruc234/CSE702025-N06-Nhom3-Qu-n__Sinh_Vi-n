export const Footer = () => {
  return (
    <div className="container bg-[#fff]">
      <div className="py-10">
        <ul className="flex justify-between">
          <li className="">
            <h3 className="font-bold">Về Chúng Tôi</h3>
            <p className="hover:underline cursor-pointer mt-2">
              Cửa Hàng Của Chúng Tôi
            </p>
            <p className="hover:underline cursor-pointer mt-2">Liên Hệ</p>
            <p className="hover:underline cursor-pointer mt-2">Tác Giả</p>
            <p className="hover:underline cursor-pointer mt-2">
              Hỗ Trợ Cộng Đồng
            </p>
            <p className="hover:underline cursor-pointer mt-2">
              Tin Tức & Sự Kiện
            </p>
          </li>
          <li className="w-[672px]">
            <h3 className="font-bold text-[20px] text-center">
              Đăng ký nhận bản tin của chúng tôi để nhận thông báo và các chương
              trình khuyến mãi khác
            </h3>
            <div className="relative">
              <form action="">
                <input
                  className="border-[1px] border-black mt-8 w-full py-4 px-2 rounded-full"
                  type="email"
                  placeholder="Email address..."
                />
              </form>
              <div>
                <button
                  type="button"
                  className="bg-black text-white py-4 px-4 rounded-tr-full rounded-br-full absolute top-[33px] right-0"
                >
                  Subscribe
                </button>
              </div>
            </div>
          </li>
          <li className="">
            <h3 className="font-bold">Dịch Vụ Khách Hàng</h3>
            <p className="hover:underline cursor-pointer mt-2">
              Câu Hỏi Thường Gặp
            </p>
            <p className="hover:underline cursor-pointer mt-2">
              Hệ Thống Cửa Hàng
            </p>
            <p className="hover:underline cursor-pointer mt-2">
              Trả Hàng & Hoàn Tiền{" "}
            </p>
            <p className="hover:underline cursor-pointer mt-2">
              Chính Sách Giao Hàng
            </p>
            <p className="hover:underline cursor-pointer mt-2">
              Hợp Tác Phân Phối
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
};
