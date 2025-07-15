import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import axios from "axios";
import { API_BASE_URL } from '../services/api';

const LoginPage = () => {
  const { setLoading, showNotification } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(`${API_BASE_URL}/Auth/login`, formData);
      
      // Lưu thông tin auth vào localStorage
      const authData = {
        token: response.data.token.token,
        userId: response.data.token.userId,
        username: response.data.token.username,
        roles: response.data.token.roles,
        avatar: response.data.token.avatar || ""
      };
      
      localStorage.setItem('authData', JSON.stringify(authData));
      localStorage.setItem('authToken', authData.token); // Giữ lại cho các API calls

      showNotification('Đăng nhập thành công');

      // Redirect về trang trước đó hoặc trang chủ
      navigate(from, { replace: true });
    } catch (err) {
      console.error('Login error:', err);
      showNotification(
        err.response?.data?.message || 'Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.',
        'danger'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section id="intro" style={{ backgroundColor: "#E8F0F1" }}>
        <div className="container">
          <div className="banner-content padding-large">
            <h1 className="display-3 fw-bold text-dark">Login</h1>
            <span className="item">
              <Link to="/" className="">
                Home
              </Link>
            </span>{" "}
            &nbsp; <span className="">/</span> &nbsp;
            <span className="item">Login</span>
          </div>
        </div>
      </section>

      <section className="contact-us-wrap py-5 mt-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="page-content">
                <div className="contact-form">
                  <form
                    name="login-form"
                    action="#"
                    method="post"
                    className="form-group"
                    onSubmit={handleSubmit}
                  >
                    <div className="row">
                      <div className="col-md-12 mb-3">
                        <input
                          type="text"
                          name="username"
                          placeholder="Your Username *"
                          value={formData.username}
                          onChange={handleInputChange}
                          className="form-control"
                          required
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12 mb-3">
                        <input
                          type="password"
                          name="password"
                          placeholder="Your Password *"
                          value={formData.password}
                          className="form-control"
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="d-grid">
                      <button
                        className="btn btn-primary btn-pill btn-lg mt-3"
                        type="submit"
                      >
                        Login
                      </button>
                    </div>
                  </form>
                  <div className="text-center mt-3">
                    <p>
                      Don't have an account?{" "}
                      <Link to="/register">Register here</Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginPage;
