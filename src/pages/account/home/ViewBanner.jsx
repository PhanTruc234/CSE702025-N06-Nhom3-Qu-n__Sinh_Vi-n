export const ViewBanner = () => {
  return (
    <section className="relative overflow-hidden">
      <img
        className="animate-zoomIn w-full"
        src="/src/assets/img_banner.webp"
        alt=""
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
        <h2 className="text-xl lg:text-4xl font-bold text-white lg:leading-10 animate-sideLeft">
          Sự Hài Hòa Trong Thiết Kế:
          <br />
          Kết Hợp Giữa Thẩm Mỹ Và Công Năng
        </h2>
        <div className="mt-8">
          <button
            type="button"
            className="animate-sideLeft mt-4 lg:mt-8 h-9 border border-white px-7 inline-flex items-center font-semibold text-white rounded-full text-[15px] hover:bg-white hover:text-black transition-all duration-300"
            style={{ animationDelay: "0.3s" }}
          >
            Khám phá ngay
          </button>
        </div>
      </div>
    </section>
  );
};
