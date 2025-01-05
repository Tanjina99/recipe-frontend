import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import AuthProvider from "../../utils/authProvider/AuthProvider";
import Cookies from "js-cookie";

const Navbar = () => {
  const { user, setUser } = AuthProvider();
  const navigate = useNavigate();
  console.log("user from navbar", user);

  const handleLogout = () => {
    Cookies.remove("accessToken");
    setUser(null);
    navigate("/");
  };
  return (
    <div className="bg-gray-100 w-full">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex items-center justify-between p-4">
          <div className="dropdown lg:hidden">
            <div tabIndex={0} role="button" className="btn btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-black"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-black rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? "text-red-500" : "text-white"
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/recipes"
                  className={({ isActive }) =>
                    isActive ? "text-red-500" : "text-white"
                  }
                >
                  Recipes
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/blog"
                  className={({ isActive }) =>
                    isActive ? "text-red-500" : "text-white"
                  }
                >
                  Blog
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about-us"
                  className={({ isActive }) =>
                    isActive ? "text-red-500" : "text-white"
                  }
                >
                  About Us
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/author"
                  className={({ isActive }) =>
                    isActive ? "text-red-500" : "text-white"
                  }
                >
                  Author
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    isActive ? "text-red-500" : "text-white"
                  }
                >
                  Contact Us
                </NavLink>
              </li>
            </ul>
          </div>

          <div className="flex flex-col items-center">
            <Link to="/">
              <img
                src="https://cdn-icons-png.flaticon.com/512/1830/1830839.png"
                alt="Logo"
                className="w-10 h-10"
              />
            </Link>
            <p className="text-sm font-bold text-black">Sizzle & Spice</p>
          </div>

          <div className="hidden lg:flex space-x-6">
            <ul className="flex space-x-6">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? "text-red-500" : "text-black"
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/recipes"
                  className={({ isActive }) =>
                    isActive ? "text-red-500" : "text-black"
                  }
                >
                  Recipes
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/blog"
                  className={({ isActive }) =>
                    isActive ? "text-red-500" : "text-black"
                  }
                >
                  Blog
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about-us"
                  className={({ isActive }) =>
                    isActive ? "text-red-500" : "text-black"
                  }
                >
                  About Us
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/author"
                  className={({ isActive }) =>
                    isActive ? "text-red-500" : "text-black"
                  }
                >
                  Author
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    isActive ? "text-red-500" : "text-black"
                  }
                >
                  Contact Us
                </NavLink>
              </li>
            </ul>
          </div>

          <div>
            {user ? (
              <div className="dropdown">
                <div tabIndex={0} role="button" className="btn m-1">
                  <div
                    className="tooltip tooltip-bottom"
                    data-tip={user.fullName}
                  >
                    <div className="avatar">
                      <div className="ring-offset-base-100 w-10 h-10 rounded-full ring ring-offset-2">
                        <img
                          src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                          alt="User Avatar"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
                >
                  <li>
                    <a>My Profile</a>
                  </li>
                  <li>
                    <a>Saved Blogs</a>
                  </li>
                  <li>
                    <a>Saved Recipes</a>
                  </li>
                  <li>
                    <button
                      className="btn btn-error btn-sm text-white"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/login">
                <button className="btn bg-gray-200">Login</button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
