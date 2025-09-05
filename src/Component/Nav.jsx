import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "./ReduxToolKit/authSlice";

function Nav() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const user = useSelector(state => state.auth.user);
  const totalItems = useSelector(state => state.cart.totalItems);
  

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };
  
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand text-secondary fs-4" href="/">
          Navbar
        </a>
        <button
          className="navbar-toggler text-secondary bg-body"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse " id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 ">
            <li className="nav-item text-secondary">
              <NavLink
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active" : ""} text-danger`
                }
                to="/"
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active" : ""} text-secondary`
                }
                to="/About"
              >
                About
              </NavLink>
            </li>
            {user ? (
              <>
                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) =>
                      `nav-link ${isActive ? "active" : ""} text-secondary`
                    }
                    to="/cart"
                  >
                    Cart ({totalItems})
                  </NavLink>
                </li>
                <li className="nav-item">
                  <span className="nav-link text-secondary">
                    Hello <span className="text-secondary fw-bold">{user.username.charAt(0).toUpperCase() + user.username.slice(1)}</span> 
                  </span>
                </li>
                <li className="nav-item">
                  <button
                    onClick={handleLogout}
                    className="btn btn-secondary ms-2"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    `btn btn-danger ms-2 ${isActive ? "active" : ""}`
                  }
                  to="/login"
                >
                  Login
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;