import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer id="footer" className="bg-dark-grey">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-md-6 col-sm-6 pb-3">
            <div className="footer-menu">
              <img src="/images/main-logo.png" alt="logo" className="pb-3" />
              <p>
                Chúng tôi tận tâm mang đến dịch vụ chăm sóc sức khỏe toàn diện
                và chất lượng cao cho mọi bệnh nhân.
              </p>
              <div className="contact-item">
                <p>
                  <svg
                    className="location primary-color"
                    width="25"
                    height="25"
                  >
                    <use xlinkHref="#location"></use>
                  </svg>
                  <span>355 Đường 3/2 , phường 3, Quận 10</span>
                </p>
                <p>
                  <svg className="email primary-color" width="25" height="25">
                    <use xlinkHref="#email"></use>
                  </svg>
                  <a href="mailto:">lienhe@benhvienabc.com</a>
                </p>
                <p>
                  <svg className="phone primary-color" width="25" height="25">
                    <use xlinkHref="#phone"></use>
                  </svg>
                  <span>(+84) 123 456 789</span>
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-6 pb-3">
            <div className="footer-menu">
              <h5 className="widget-title pb-2 fw-semibold">Liên kết nhanh</h5>
              <ul className="menu-list list-unstyled">
                <li className="pb-2">
                  <Link to="/">Trang chủ</Link>
                </li>
                <li className="pb-2">
                  <Link to="/about">Giới thiệu</Link>
                </li>
                <li className="pb-2">
                  <Link to="/services">Dịch vụ</Link>
                </li>
                <li className="pb-2">
                  <Link to="/booking">Đặt lịch hẹn</Link>
                </li>
                <li className="pb-2">
                  <Link to="/review">Đánh giá</Link>
                </li>
                <li className="pb-2">
                  <Link to="/team">Đội ngũ</Link>
                </li>
                <li className="pb-2">
                  <Link to="/faq">Câu hỏi thường gặp</Link>
                </li>
                <li className="pb-2">
                  <Link to="/departments">Chuyên khoa</Link>
                </li>
                <li className="pb-2">
                  <Link to="/blog">Tin tức</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-6 pb-3">
            <div className="footer-menu">
              <h5 className="widget-title fw-semibold">Giờ mở cửa</h5>
              <table className="schedule">
                <tbody>
                  <tr className="d-flex justify-content-between border-bottom py-2">
                    <td>Thứ Hai - Thứ Năm</td>
                    <td className="text-primary">8:00 - 18:00</td>
                  </tr>
                  <tr className="d-flex justify-content-between border-bottom py-2">
                    <td>Thứ Sáu - Thứ Bảy</td>
                    <td className="text-primary">10:00 - 16:00</td>
                  </tr>
                  <tr className="d-flex justify-content-between border-bottom py-2">
                    <td>Chủ Nhật</td>
                    <td className="text-primary">Chỉ nhận cấp cứu</td>
                  </tr>
                  <tr className="d-flex justify-content-between border-bottom py-2">
                    <td>Khám cá nhân</td>
                    <td className="text-primary">19:00 - 21:00</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
