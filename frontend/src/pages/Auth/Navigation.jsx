import React, { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineLogin,
  AiOutlineShopping,
  AiOutlineShoppingCart,
  AiOutlineUserAdd,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Navigation.css";
import { FaHeart } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/usersApiSlice";
import { logout } from "../../redux/features/auth/authSlice";
import FavoritesCount from "../Products/FavoritesCount";
import { IoPersonCircleSharp } from "react-icons/io5";

const Navigation = () => {
  const userInfo = useSelector((state) => state.auth);
  const {cartItems} = useSelector(state => state.cart)

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logOutApicall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logOutApicall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

 

  return (
    <div
      style={{ zIndex: 999 }}
      id="navigation-container"
      className={`${
        showSidebar ? "hidden" : "flex"
      } xl:flex lg:flex  flex-col justify-between p-4 text-white bg-[#000] w-[4%] hover:w-[15%] h-full fixed sm:hidden `}
    >
      <div className="flex flex-col justify-center space-y-2">
        <Link to="/" className="flex relative">
          <div className="flex items-center transition-transform transform hover:translate-x-2">
            <AiOutlineHome className="mr-2 mt-[2rem]" size={26} />
            <span className="hidden nav-item-name mt-[2rem]">HOME</span>
          </div>
        </Link>

        <Link to="/shop" className="flex relative">
          <div className="flex items-center transition-transform transform hover:translate-x-2">
            <AiOutlineShopping className="mr-2 mt-[2rem]" size={26} />
            <span className="hidden nav-item-name mt-[2rem]">SHOP</span>
          </div>
        </Link>

        <Link to="/cart" className="flex relative">
          <div className="flex items-center transition-transform transform hover:translate-x-2">
            <AiOutlineShoppingCart className="mr-2 mt-[2rem]" size={26} />
            <span className="hidden nav-item-name mt-[2rem]">CART</span>

            <div className="absolute top-5">
              {cartItems.length > 0 && (
                <span>
                  <span className="px-1 py-0 text-sm text-white bg-pink-500 rounded-full">
                    {cartItems.reduce((a, c) => a + parseInt(c.qty), 0)}
                  </span>
                </span>
              )}
            </div>
          </div>
        </Link>

        <Link to="/favorite" className="flex relative">
          <div className="flex items-center transition-transform transform hover:translate-x-2">
            <FaHeart className="mr-2 mt-[2rem]" size={26} />
            <span className="hidden nav-item-name mt-[2rem]">FAVORITES</span>
            <FavoritesCount />
          </div>
        </Link>
      </div>

      <div className="relative">
        <button
          onClick={toggleDropdown}
          className="flex items-center text-white focus:outline-none"
        >
          {userInfo.userInfo ? (
            <span className="text-white"><IoPersonCircleSharp size={26} /></span>
          ) : (
            <></>
          )}

          {userInfo.userInfo && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-4 w-4 ml-1 ${
                dropdownOpen ? "transform rotate-180" : "transform rotate-180"
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={dropdownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
              />
            </svg>
          )}
        </button>

        {dropdownOpen && userInfo.userInfo && (
          <ul
            className={`rounded absolute right-6 mt-2 mr-6 space-y-2 bg-white text-gray-600 ${
              !userInfo.userInfo.userType == "ADMIN" ? "-top-20" : "bottom-10"
            }`}
          >
            {userInfo.userInfo.userType == "ADMIN" && (
              <>
                <li>
                  <Link
                    to="/admin/dashboard"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/productlist"
                    className="block px-4 py-1 hover:bg-gray-100"
                  >
                    Products
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/categorylist"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Category
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/orderlist"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Order
                  </Link>
                </li>

                <li>
                  <Link
                    to="/admin/userlist"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Users
                  </Link>
                </li>
              </>
            )}

            <li>
              <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">
                Profile
              </Link>
            </li>

            <li>
              <button
                onClick={logoutHandler}
                className="block w-full px-4 py-2 text-left hover:bg-gray-100"
              >
                Logout
              </button>
            </li>
          </ul>
        )}
      </div>

      {!userInfo.userInfo && (
        <ul>
          <li>
            <Link to="/login" className="flex relative">
              <div className="flex items-center transition-transform transform hover:translate-x-2">
                <AiOutlineLogin className="mr-2 mt-[3rem]" size={26} />
                <span className="hidden nav-item-name mt-[3rem]">Login</span>
              </div>
            </Link>
          </li>

          <li>
            <Link to="/register" className="flex relative">
              <div className="flex items-center transition-transform transform hover:translate-x-2">
                <AiOutlineUserAdd className="mr-2 mt-[3rem]" size={26} />
                <span className="hidden nav-item-name mt-[3rem]">Register</span>
              </div>
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Navigation;


// 2:22:04