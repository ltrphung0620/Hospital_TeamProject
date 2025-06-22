import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { 
    FaTachometerAlt, 
    FaUsers, 
    FaCalendarCheck, 
    FaPills, 
    FaSignOutAlt 
} from 'react-icons/fa';
import './AdminStyles.css';

const Sidebar = ({ isOpen }) => {
  return (
    <div className={`admin-sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="admin-sidebar-header">
        <Link to="/admin">
          <img src="/images/main-logo.png" alt="logo" className="admin-sidebar-logo" />
          <h3 className="admin-sidebar-title">Hospital Admin</h3>
        </Link>
      </div>
      <nav className="admin-menu">
        <ul className="admin-menu-list">
          <li>
            <NavLink to="/admin/dashboard" className="admin-menu-link">
              <FaTachometerAlt className="admin-menu-icon" />
              <span className="admin-menu-text">Tổng quan</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/users" className="admin-menu-link">
              <FaUsers className="admin-menu-icon" />
              <span className="admin-menu-text">Người dùng</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/appointments" className="admin-menu-link">
              <FaCalendarCheck className="admin-menu-icon" />
              <span className="admin-menu-text">Lịch hẹn</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/medicines" className="admin-menu-link">
              <FaPills className="admin-menu-icon" />
              <span className="admin-menu-text">Thuốc</span>
            </NavLink>
          </li>
        </ul>
      </nav>
      
      <div className="admin-sidebar-footer">
        <ul className="admin-menu-list">
            <li>
                <NavLink to="/" className="admin-menu-link">
                    <FaSignOutAlt className="admin-menu-icon" />
                    <span className="admin-menu-text">Về trang chủ</span>
                </NavLink>
            </li>
        </ul>
        <div className="admin-footer-text">
            © {new Date().getFullYear()} Hospital Project.
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
