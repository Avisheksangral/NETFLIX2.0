import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { API_END_POINT } from "../utils/constant";
import axios from "axios";
import { setUser } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { setToggle } from "../redux/movieSlice";

const Header = () => {
  const user = useSelector((store) => store.app.user);
  const toggle = useSelector((store) => store.movie.toggle);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${API_END_POINT}/logout`);
      if (res.data.success) {
        toast.success(res.data.message);
      }
      dispatch(setUser(null));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const toggleHandler = () => {
    dispatch(setToggle());
  };

  return (
    <>
      <div
        className={`z-50 flex items-center justify-between w-full h-20 px-6  ${
          user ? "backdrop-blur-xl sticky top-0" : "absolute"
        }`}>
        <img
          className="w-56"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1198px-Netflix_2015_logo.svg.png"
          alt="netflix-logo"
        />
        {user && (
          <div className="flex items-center">
            <h1 className="text-lg font-medium text-white">{user.fullName}</h1>
            <div className="ml-4">
              <button
                onClick={logoutHandler}
                className="px-4 py-2 text-white bg-red-700
                            rounded-lg ">
                Logout
              </button>
              <button
                onClick={toggleHandler}
                className="px-4 py-2 ml-2 text-white bg-red-700 rounded-lg ">
                {toggle ? "Home" : "Search Movie"}
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
