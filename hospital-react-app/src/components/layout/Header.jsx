import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Avatar from "../common/Avatar";

const Header = () => {
  const [isSticky, setSticky] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Get user from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    const handleScroll = () => {
      if (window.scrollY > 50) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  return (
    <header id="header" className={isSticky ? "sticky" : ""}>
      {/* Top Header */}
      <div className="py-3" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-3 col-md-3 col-sm-12">
              <Link className="navbar-brand" to="/">
                <img src="/images/main-logo.png" alt="Insove Medical Healthcare" height="50" />
              </Link>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12">
              <div className="d-flex justify-content-center gap-5">
                <div className="d-flex align-items-center">
                  <i className="fas fa-map-marker-alt text-primary me-2"></i>
                  <span>123 Arling, Miola, NY</span>
                </div>
                <div className="d-flex align-items-center">
                  <i className="fas fa-phone text-primary me-2"></i>
                  <span>(+487) 384 9452</span>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-12">
              <div className="d-flex justify-content-end gap-2">
                {user ? (
                  <div className="d-flex align-items-center">
                    <div className="dropdown">
                      <button 
                        className="btn btn-link text-dark text-decoration-none d-flex align-items-center gap-2" 
                        type="button" 
                        data-bs-toggle="dropdown"
                      >
                        <Avatar name={user.name} size={35} />
                        <span className="d-none d-md-inline">{user.name}</span>
                        <i className="fas fa-chevron-down fs-12"></i>
                      </button>
                      <ul className="dropdown-menu dropdown-menu-end">
                        {user.role === 'admin' && (
                          <li>
                            <Link to="/admin" className="dropdown-item">
                              <i className="fas fa-dashboard me-2"></i>
                              Admin Dashboard
                            </Link>
                          </li>
                        )}
                        <li>
                          <Link to="/profile" className="dropdown-item">
                            <i className="fas fa-user me-2"></i>
                            Profile
                          </Link>
                        </li>
                        <li><hr className="dropdown-divider" /></li>
                        <li>
                          <button onClick={handleLogout} className="dropdown-item text-danger">
                            <i className="fas fa-sign-out-alt me-2"></i>
                            Logout
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                ) : (
                  <>
                    <Link to="/login" className="btn btn-primary rounded-pill px-4">
                      Login
                    </Link>
                    <Link to="/register" className="btn btn-outline-primary rounded-pill px-4">
                      Register
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="position-relative" style={{ backgroundColor: '#EDF3F8', paddingTop: '30px', paddingBottom: '30px' }}>
        <div className="container">
          <div className="bg-white rounded-3 shadow-sm">
            <div className="d-flex justify-content-between align-items-center px-5 py-3">
              <ul className="nav gap-5 m-0">
                <li className="nav-item">
                  <NavLink 
                    to="/" 
                    className={({ isActive }) => 
                      `nav-link fs-6 ${isActive ? 'text-info' : 'text-secondary'}`
                    }
                  >
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink 
                    to="/about" 
                    className={({ isActive }) => 
                      `nav-link fs-6 ${isActive ? 'text-info' : 'text-secondary'}`
                    }
                  >
                    About
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink 
                    to="/booking" 
                    className={({ isActive }) => 
                      `nav-link fs-6 ${isActive ? 'text-info' : 'text-secondary'}`
                    }
                  >
                    Booking
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink 
                    to="/services" 
                    className={({ isActive }) => 
                      `nav-link fs-6 ${isActive ? 'text-info' : 'text-secondary'}`
                    }
                  >
                    Services
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink 
                    to="/pricing" 
                    className={({ isActive }) => 
                      `nav-link fs-6 ${isActive ? 'text-info' : 'text-secondary'}`
                    }
                  >
                    Pricing
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink 
                    to="/team" 
                    className={({ isActive }) => 
                      `nav-link fs-6 ${isActive ? 'text-info' : 'text-secondary'}`
                    }
                  >
                    Teams
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink 
                    to="/blog" 
                    className={({ isActive }) => 
                      `nav-link fs-6 ${isActive ? 'text-info' : 'text-secondary'}`
                    }
                  >
                    Blog
                  </NavLink>
                </li>
              </ul>
              <div className="position-relative">
                <input 
                  type="text" 
                  className="form-control bg-light border-0 rounded-pill py-2"
                  placeholder="Search..." 
                  style={{ 
                    paddingRight: '40px',
                    paddingLeft: '20px',
                    width: '250px',
                    fontSize: '0.95rem'
                  }}
                />
                <i className="fas fa-search position-absolute" 
                   style={{ 
                     right: '15px', 
                     top: '50%', 
                     transform: 'translateY(-50%)',
                     color: '#6c757d'
                   }}
                ></i>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
