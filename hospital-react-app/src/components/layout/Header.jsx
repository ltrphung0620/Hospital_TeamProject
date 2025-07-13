import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Avatar from "../common/Avatar";
import "./Header.css";

const Header = () => {
  const [isSticky, setSticky] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };

    const handleClickOutside = (event) => {
      const nav = document.querySelector(".nav");
      const menuToggle = document.querySelector(".menu-toggle");
      if (
        isMenuOpen &&
        nav &&
        !nav.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    };

    // Lấy thông tin user từ localStorage
    const authData = localStorage.getItem("authData");
    if (authData) {
      try {
        const userData = JSON.parse(authData);
        if (userData && userData.token) {
          setUser({
            fullName: userData.username || "User",
            username: userData.username || "",
            roles: userData.roles || [],
            avatar: userData.avatar || ""
          });
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Error parsing auth data:", error);
        setUser(null);
      }
    } else {
      setUser(null);
    }

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  const handleLogout = () => {
    localStorage.removeItem("authData");
    localStorage.removeItem("authToken");
    setUser(null);
    navigate("/login");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className={`header ${isSticky ? "sticky" : ""}`}>
      <div className="py-3" style={{ backgroundColor: "#f8f9fa" }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-3 col-md-3 col-sm-12">
              <Link className="navbar-brand" to="/">
                <img
                  src="/images/main-logo.png"
                  alt="Insove Medical Healthcare"
                  height="50"
                />
              </Link>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12">
              <div className="d-flex justify-content-center gap-5">
                <div className="d-flex align-items-center">
                  <i className="fas fa-map-marker-alt text-primary me-2"></i>
                  <span>355 Đường 3/2 , phường 3, Quận 10</span>
                </div>
                <div className="d-flex align-items-center">
                  <i className="fas fa-phone text-primary me-2"></i>
                  <span>19001566</span>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-3 col-sm-12">
              <div className="d-flex justify-content-end gap-2">
                {user ? (
                  <div className="dropdown">
                    <button
                      className="btn btn-link text-dark text-decoration-none d-flex align-items-center gap-2 p-1 dropdown-toggle"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <div className="position-relative">
                        {user.avatar ? (
                          <img
                            src={user.avatar}
                            alt={user.fullName}
                            className="rounded-circle"
                            width="40"
                            height="40"
                          />
                        ) : (
                          <Avatar
                            name={user.fullName}
                            size={40}
                            className="border-2 border-primary"
                          />
                        )}
                        <span className="avatar-status"></span>
                      </div>
                      <div className="d-none d-md-block text-start">
                        <div className="fw-semibold">{user?.fullName || "User"}</div>
                        <div className="text-muted small">{user?.username || ""}</div>
                      </div>
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end animate slideIn">
                      <li>
                        <Link to="/user-info" className="dropdown-item">
                          <span className="item-icon">
                            <i className="fas fa-user"></i>
                          </span>
                          <div className="item-content">
                            <div className="item-title">
                              Thông tin tài khoản
                            </div>
                            <div className="item-subtitle">
                              Xem và cập nhật thông tin của bạn
                            </div>
                          </div>
                        </Link>
                      </li>
                      {user.roles.includes("Admin") && (
                        <li>
                          <Link to="/admin" className="dropdown-item">
                            <span className="item-icon">
                              <i className="fas fa-cog"></i>
                            </span>
                            <div className="item-content">
                              <div className="item-title">Quản trị hệ thống</div>
                              <div className="item-subtitle">Truy cập trang quản trị</div>
                            </div>
                          </Link>
                        </li>
                      )}
                      <li>
                        <Link
                          to="/user-info?tab=appointments"
                          className="dropdown-item"
                        >
                          <span className="item-icon">
                            <i className="fas fa-calendar-check"></i>
                          </span>
                          <div className="item-content">
                            <div className="item-title">Lịch hẹn</div>
                            <div className="item-subtitle">
                              Xem tất cả lịch hẹn của bạn
                            </div>
                          </div>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/user-info?tab=prescriptions"
                          className="dropdown-item"
                        >
                          <span className="item-icon">
                            <i className="fas fa-prescription-bottle-alt"></i>
                          </span>
                          <div className="item-content">
                            <div className="item-title">Đơn thuốc</div>
                            <div className="item-subtitle">
                              Xem tất cả đơn thuốc của bạn
                            </div>
                          </div>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/user-info?tab=invoices"
                          className="dropdown-item"
                        >
                          <span className="item-icon">
                            <i className="fas fa-file-invoice-dollar"></i>
                          </span>
                          <div className="item-content">
                            <div className="item-title">Hóa đơn</div>
                            <div className="item-subtitle">
                              Xem tất cả hóa đơn của bạn
                            </div>
                          </div>
                        </Link>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <button
                          onClick={handleLogout}
                          className="dropdown-item logout-item"
                        >
                          <span className="item-icon">
                            <i className="fas fa-sign-out-alt"></i>
                          </span>
                          <div className="item-content">
                            <div className="item-title">Đăng xuất</div>
                            <div className="item-subtitle">
                              Đăng xuất tài khoản của bạn
                            </div>
                          </div>
                        </button>
                      </li>
                    </ul>
                  </div>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="btn btn-primary rounded-pill px-4"
                    >
                      Đăng nhập
                    </Link>
                    <Link
                      to="/register"
                      className="btn btn-outline-primary rounded-pill px-4"
                    >
                      Đăng ký
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <nav
        className="position-relative"
        style={{
          backgroundColor: "#EDF3F8",
          paddingTop: "30px",
          paddingBottom: "30px",
        }}
      >
        <div className="container">
          <div className="bg-white rounded-3 shadow-sm">
            <div className="nav-container px-4 py-3">
              <button
                className="menu-toggle d-lg-none"
                onClick={toggleMenu}
                aria-label="Toggle navigation"
                aria-expanded={isMenuOpen}
              >
                <i className={`fas ${isMenuOpen ? "fa-times" : "fa-bars"}`}></i>
              </button>

              <ul className={`nav ${isMenuOpen ? "show" : ""}`}>
                <li className="nav-item">
                  <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? "active text-info" : "text-secondary"}`} onClick={closeMenu}>
                    Trang chủ
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? "active text-info" : "text-secondary"}`} onClick={closeMenu}>
                    Giới thiệu
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/booking" className={({ isActive }) => `nav-link ${isActive ? "active text-info" : "text-secondary"}`} onClick={closeMenu}>
                    Đặt lịch khám
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/services" className={({ isActive }) => `nav-link ${isActive ? "active text-info" : "text-secondary"}`} onClick={closeMenu}>
                    Dịch vụ
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/pricing" className={({ isActive }) => `nav-link ${isActive ? "active text-info" : "text-secondary"}`} onClick={closeMenu}>
                    Bảng giá
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/doctors" className={({ isActive }) => `nav-link ${isActive ? "active text-info" : "text-secondary"}`} onClick={closeMenu}>
                    Đội ngũ bác sĩ
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/blog" className={({ isActive }) => `nav-link ${isActive ? "active text-info" : "text-secondary"}`} onClick={closeMenu}>
                    Blog
                  </NavLink>
                </li>
              </ul>

              <div className="search-container">
                <input
                  type="text"
                  className="form-control search-input"
                  placeholder="Tìm kiếm..."
                />
                <span className="search-icon">
                  <i className="fas fa-search"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
