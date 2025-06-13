import React from 'react';
import { Link } from 'react-router-dom';

const RegisterPage = () => {
  return (
    <>
      <section id="intro" style={{ backgroundColor: "#E8F0F1" }}>
        <div className="container">
          <div className="banner-content padding-large">
            <h1 className="display-3 fw-bold text-dark">Register</h1>
            <span className="item">
              <Link to="/" className="">Home</Link>
            </span>{" "}
            &nbsp; <span className="">/</span> &nbsp;
            <span className="item">Register</span>
          </div>
        </div>
      </section>

      <section className="contact-us-wrap py-5 mt-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="page-content">
                <div className="contact-form">
                  <form name="register-form" action="#" method="post" className="form-group">
                    <div className="row">
                      <div className="col-md-12 mb-3">
                        <input
                          type="text"
                          name="name"
                          placeholder="Your Name *"
                          className="form-control"
                          required
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12 mb-3">
                        <input
                          type="email"
                          name="email"
                          placeholder="Your Email *"
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
                          className="form-control"
                          required
                        />
                      </div>
                    </div>
                     <div className="row">
                      <div className="col-md-12 mb-3">
                        <input
                          type="password"
                          name="confirm-password"
                          placeholder="Confirm Password *"
                          className="form-control"
                          required
                        />
                      </div>
                    </div>

                    <div className="d-grid">
                      <button className="btn btn-primary btn-pill btn-lg mt-3" type="submit">
                        Register
                      </button>
                    </div>
                  </form>
                  <div className="text-center mt-3">
                    <p>
                      Already have an account? <Link to="/login">Login here</Link>
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

export default RegisterPage; 