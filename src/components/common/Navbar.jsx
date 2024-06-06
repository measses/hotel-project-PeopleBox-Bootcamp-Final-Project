import React from "react";
import { Link, useNavigate } from "react-router-dom";
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
} from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      navigate("/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

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
                aria-expanded="false"
              >
                <svg
                  className="block h-6 w-6"
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
                  className="hidden h-6 w-6"
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
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  <Link
                    to="/"
                    className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium flex items-center"
                    aria-current="page"
                  >
                    <FaHome className="mr-2" /> Anasayfa
                  </Link>

                  {user?.user_type === "admin" && (
                    <Link
                      to="/finance"
                      className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium flex items-center"
                    >
                      <FaMoneyBillWave className="mr-2" /> Gelir-Gider Yönetimi
                    </Link>
                  )}
                  {user && (
                    <>
                      <Link
                        to="/rooms"
                        className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium flex items-center"
                      >
                        <FaBed className="mr-2" /> Odaların Durumu
                      </Link>
                      <Link
                        to="/reservations"
                        className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium flex items-center"
                      >
                        <FaCalendarCheck className="mr-2" /> Rezervasyonlar
                      </Link>
                      {user.user_type === "admin" && (
                        <Link
                          to="/user-management"
                          className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium flex items-center"
                        >
                          <FaUserCog className="mr-2" /> Kullanıcı Yönetimi
                        </Link>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              {user ? (
                <>
                  <Link
                    to="/profile"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium flex items-center"
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
                    className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium flex items-center"
                  >
                    <FaSignInAlt className="mr-2" /> Giriş Yap
                  </Link>
                  <Link
                    to="/register"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium flex items-center"
                  >
                    <FaUserPlus className="mr-2" /> Kayıt Ol
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="sm:hidden" id="mobile-menu">
          <div className="space-y-1 px-2 pb-3 pt-2">
            <Link
              to="/"
              className="bg-gray-900 text-white  rounded-md px-3 py-2 text-base font-medium flex items-center"
              aria-current="page"
            >
              <FaHome className="mr-2" /> Anasayfa
            </Link>
            {user?.user_type === "admin" && (
              <Link
                to="/finance"
                className="text-gray-300 hover:bg-gray-700 hover:text-white  rounded-md px-3 py-2 text-base font-medium flex items-center"
              >
                <FaMoneyBillWave className="mr-2" /> Gelir-Gider Yönetimi
              </Link>
            )}
            {user && (
              <>
                <Link
                  to="/rooms"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white  rounded-md px-3 py-2 text-base font-medium flex items-center"
                >
                  <FaBed className="mr-2" /> Odaların Durumu
                </Link>
                <Link
                  to="/reservations"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white  rounded-md px-3 py-2 text-base font-medium flex items-center"
                >
                  <FaCalendarCheck className="mr-2" /> Rezervasyonlar
                </Link>
                {user.user_type === "admin" && (
                  <Link
                    to="/user-management"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white  rounded-md px-3 py-2 text-base font-medium flex items-center"
                  >
                    <FaUserCog className="mr-2" /> Kullanıcı Yönetimi
                  </Link>
                )}
              </>
            )}
            {!user && (
              <>
                <Link
                  to="/login"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white  rounded-md px-3 py-2 text-base font-medium flex items-center"
                >
                  <FaSignInAlt className="mr-2" /> Giriş Yap
                </Link>
                <Link
                  to="/register"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white  rounded-md px-3 py-2 text-base font-medium flex items-center"
                >
                  <FaUserPlus className="mr-2" /> Kayıt Ol
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
