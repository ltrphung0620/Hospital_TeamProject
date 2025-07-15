import React, { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useApp } from '../../contexts/AppContext';

const AdminRoute = ({ children }) => {
  const location = useLocation();
  const { showNotification } = useApp();
  const [isAuthorized, setIsAuthorized] = useState(null);

  // Kiểm tra authentication và role
  const checkAdminAccess = () => {
    try {
      const authData = localStorage.getItem('authData');
      
      // Nếu không có authData, chắc chắn chưa đăng nhập
      if (!authData) {
        showNotification('Vui lòng đăng nhập để tiếp tục', 'warning');
        return false;
      }

      const parsedAuthData = JSON.parse(authData);
      
      // Kiểm tra token
      if (!parsedAuthData.token) {
        showNotification('Phiên đăng nhập không hợp lệ', 'warning');
        localStorage.removeItem('authData');
        localStorage.removeItem('authToken');
        return false;
      }

      // Kiểm tra roles
      if (!parsedAuthData.roles || !Array.isArray(parsedAuthData.roles)) {
        showNotification('Không có thông tin về quyền truy cập', 'error');
        localStorage.removeItem('authData');
        localStorage.removeItem('authToken');
        return false;
      }

      // Kiểm tra role Admin
      if (!parsedAuthData.roles.includes('Admin')) {
        showNotification('Bạn không có quyền truy cập trang này', 'error');
        localStorage.removeItem('authData');
        localStorage.removeItem('authToken');
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error checking admin access:', error);
      showNotification('Có lỗi xảy ra khi kiểm tra quyền truy cập', 'error');
      localStorage.removeItem('authData');
      localStorage.removeItem('authToken');
      return false;
    }
  };

  useEffect(() => {
    // Chỉ kiểm tra một lần khi component mount
    const hasAccess = checkAdminAccess();
    setIsAuthorized(hasAccess);
  }, []); // Empty dependency array

  // Nếu đang kiểm tra (isAuthorized là null), không render gì cả
  if (isAuthorized === null) {
    return null;
  }

  // Nếu không có quyền truy cập
  if (!isAuthorized) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Nếu có quyền truy cập
  return children;
};

export default AdminRoute; 