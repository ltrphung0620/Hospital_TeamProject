import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from '../services/api';

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "username") {
      setUsername(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   setError(null);

  //   // For demo: Simple validation
  //   if (username === "demo" && password === "demo") {
  //     localStorage.setItem("isLoggedIn", "true");
  //     navigate("/");
  //   } else {
  //     setError("Invalid username or password. Try demo/demo");
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/Auth/login`, {
        username,
        password,
      });

      if (response.data.token) {
        localStorage.setItem("authToken", response.data.token);
        navigate("/");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Login failed");
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
                    {error && (
                      <div
                        style={{
                          color: "red",
                          textAlign: "center",
                          marginBottom: "10px",
                        }}
                      >
                        {error}
                      </div>
                    )}
                    <div className="row">
                      <div className="col-md-12 mb-3">
                        <input
                          type="text"
                          name="username"
                          placeholder="Your Username *"
                          value={username}
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
                          value={password}
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
