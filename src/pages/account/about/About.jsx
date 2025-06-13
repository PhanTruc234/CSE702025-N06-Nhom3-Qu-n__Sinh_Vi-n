import PersonIcon from "@mui/icons-material/Person";
import FlightIcon from "@mui/icons-material/Flight";
import ChangeHistoryIcon from "@mui/icons-material/ChangeHistory";

export const About = () => {
  return (
    <section>
      <div>
        <img
          src="https://lh3.googleusercontent.com/82jIzoTB5r-yQL69inuE6pA0QO7FmNpZJed8aB646itxxhDg38wu1C4yINUDeDS8TM_5_h99ucvEDfvQzNQ4wxyEtsIxPAg=w1920"
          className="w-full"
          alt="About us cover"
        />
      </div>
      <div className="container grid grid-cols-1 md:grid-cols-3 gap-8 mt-40 mb-40">
        <div>
          <PersonIcon fontSize="large" />
          <h2 className="text-[24px] font-normal mb-4 mt-4">OUR VISION</h2>
          <p>
            Chúng tôi hướng tới việc trở thành đơn vị dẫn đầu trong lĩnh vực đổi
            mới sáng tạo, mang đến các giải pháp tối ưu và bền vững cho cộng
            đồng.
          </p>
        </div>
        <div>
          <FlightIcon fontSize="large" />
          <h2 className="text-[24px] font-normal mb-4 mt-4">WHAT WE DO</h2>
          <p>
            Chúng tôi cung cấp các dịch vụ và sản phẩm công nghệ chất lượng cao,
            kết hợp giữa sáng tạo và hiệu quả nhằm phục vụ khách hàng tốt nhất.
          </p>
        </div>
        <div>
          <ChangeHistoryIcon fontSize="large" />
          <h2 className="text-[24px] font-normal mb-4 mt-4">HISTORY</h2>
          <p>
            Được thành lập từ năm 2010, chúng tôi đã không ngừng phát triển và
            mở rộng quy mô, trở thành đối tác tin cậy của hàng nghìn khách hàng
            trên toàn quốc.
          </p>
        </div>
      </div>
      <div className="mt-10">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14897.803196511604!2d105.80985141333713!3d21.014641020698537!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab82178be9eb%3A0x429104feae49bd75!2zxJDhu5FuZyDEkGEsIEjDoCBO4buZaSwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1749801221289!5m2!1svi!2s"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </section>
  );
};
