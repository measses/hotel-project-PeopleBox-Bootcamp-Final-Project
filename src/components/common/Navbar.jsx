import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/slices/authSlice";
import {
  FaSignOutAlt,
  FaSignInAlt,
  FaUserPlus,
  FaHome,
  FaUserCog,
  FaBed,
  FaCalendarCheck,
  FaMoneyBillWave,
  FaClipboardList,
} from "react-icons/fa";

const Navbar = ({ isAuthenticated }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await dispatch(logout()).unwrap();
      navigate("/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div>
      <nav className="bg-gray-800">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <button
                type="button"
                className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded={menuOpen ? "true" : "false"}
                onClick={toggleMenu}
              >
                <svg
                  className={`${menuOpen ? "hidden" : "block"} h-6 w-6`}
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
                <svg
                  className={`${menuOpen ? "block" : "hidden"} h-6 w-6`}
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex flex-shrink-0 items-center">
                <img
                  className="block lg:hidden h-8 w-auto"
                  src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                  alt="Workflow"
                />
              </div>
              {isAuthenticated && (
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    <Link
                      to="/"
                      className={`rounded-md px-3 py-2 text-sm font-medium flex items-center ${
                        isActive("/")
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white"
                      }`}
                      aria-current={isActive("/") ? "page" : undefined}
                    >
                      <FaHome className="mr-2" /> Anasayfa
                    </Link>
                    {user?.user_type === "admin" && (
                      <Link
                        to="/finance"
                        className={`rounded-md px-3 py-2 text-sm font-medium flex items-center ${
                          isActive("/finance")
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white"
                        }`}
                      >
                        <FaMoneyBillWave className="mr-2" /> Gelir-Gider
                        Yönetimi
                      </Link>
                    )}
                    <Link
                      to="/rooms"
                      className={`rounded-md px-3 py-2 text-sm font-medium flex items-center ${
                        isActive("/rooms")
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white"
                      }`}
                    >
                      <FaBed className="mr-2" /> Odaların Durumu
                    </Link>
                    <Link
                      to="/reservations"
                      className={`rounded-md px-3 py-2 text-sm font-medium flex items-center ${
                        isActive("/reservations")
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white"
                      }`}
                    >
                      <FaCalendarCheck className="mr-2" /> Rezervasyonlar
                    </Link>
                    <Link
                      to="/todos"
                      className={`rounded-md px-3 py-2 text-sm font-medium flex items-center ${
                        isActive("/todos")
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white"
                      }`}
                    >
                      <FaClipboardList className="mr-2" /> Görevler
                    </Link>
                    {user?.user_type === "admin" && (
                      <Link
                        to="/user-management"
                        className={`rounded-md px-3 py-2 text-sm font-medium flex items-center ${
                          isActive("/user-management")
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white"
                        }`}
                      >
                        <FaUserCog className="mr-2" /> Kullanıcı Yönetimi
                      </Link>
                    )}
                  </div>
                </div>
              )}
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/profile"
                    className={`rounded-md px-3 py-2 text-sm font-medium flex items-center ${
                      isActive("/profile")
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white"
                    }`}
                  >
                    <FaUserCog className="mr-2" /> Profil
                  </Link>
                  <a
                    href="#"
                    onClick={handleLogout}
                    className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium flex items-center"
                  >
                    <FaSignOutAlt className="mr-2" /> Çıkış Yap
                  </a>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className={`rounded-md px-3 py-2 text-sm font-medium flex items-center ${
                      isActive("/login")
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white"
                    }`}
                  >
                    <FaSignInAlt className="mr-2" /> Giriş Yap
                  </Link>
                  <Link
                    to="/register"
                    className={`rounded-md px-3 py-2 text-sm font-medium flex items-center ${
                      isActive("/register")
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white"
                    }`}
                  >
                    <FaUserPlus className="mr-2" /> Kayıt Ol
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
        {isAuthenticated && (
          <div
            className={`${menuOpen ? "block" : "hidden"} sm:hidden`}
            id="mobile-menu"
          >
            <div className="space-y-1 px-2 pb-3 pt-2">
              <Link
                to="/"
                className={`rounded-md px-3 py-2 text-base font-medium flex items-center ${
                  isActive("/")
                    ? "bg-gray-900 text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }`}
                aria-current={isActive("/") ? "page" : undefined}
              >
                <FaHome className="mr-2" /> Anasayfa
              </Link>
              {user?.user_type === "admin" && (
                <Link
                  to="/finance"
                  className={`rounded-md px-3 py-2 text-base font-medium flex items-center ${
                    isActive("/finance")
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  <FaMoneyBillWave className="mr-2" /> Gelir-Gider Yönetimi
                </Link>
              )}
              <Link
                to="/rooms"
                className={`rounded-md px-3 py-2 text-base font-medium flex items-center ${
                  isActive("/rooms")
                    ? "bg-gray-900 text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }`}
              >
                <FaBed className="mr-2" /> Odaların Durumu
              </Link>
              <Link
                to="/reservations"
                className={`rounded-md px-3 py-2 text-base font-medium flex items-center ${
                  isActive("/reservations")
                    ? "bg-gray-900 text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }`}
              >
                <FaCalendarCheck className="mr-2" /> Rezervasyonlar
              </Link>
              <Link
                to="/todos"
                className={`rounded-md px-3 py-2 text-base font-medium flex items-center ${
                  isActive("/todos")
                    ? "bg-gray-900 text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }`}
              >
                <FaClipboardList className="mr-2" /> Görevler
              </Link>
              {user?.user_type === "admin" && (
                <Link
                  to="/user-management"
                  className={`rounded-md px-3 py-2 text-base font-medium flex items-center ${
                    isActive("/user-management")
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  <FaUserCog className="mr-2" /> Kullanıcı Yönetimi
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
