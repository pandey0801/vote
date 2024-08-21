import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { LuToggleLeft } from "react-icons/lu";
import { LuToggleRight } from "react-icons/lu";
import { themeActions } from "./store/Theme";
import { FaYoutube, FaInstagram, FaSpotify } from "react-icons/fa";
import img1 from "../assets/img1.png";

const HomePage = () => {
  const theme = useSelector((state) => state.themeUse.isDarkMode);
  const dispatch = useDispatch();

  const themeHandle = (event) => {
    event.preventDefault();
    dispatch(themeActions.toggleTheme());
  };

  return (
    <>
      <div
        className={`min-h-screen ${
          theme ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
        } transition-colors duration-300 relative`}
        style={{
          backgroundImage:
        // "https://images.unsplash.com/photo-1599340695274-f8a2f344174d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://media.istockphoto.com/id/824359740/photo/indian-flag.jpg?s=1024x1024&w=is&k=20&c=-AP1xB7aP7owtCm3DNj48R1jkggt5kSVHvhVh0u9ZtM=",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          className={`absolute bg-gradient-to-r ${
            theme ? "from-gray-900 to-gray-500" : "from-gray-300 to-gray-50"
          } opacity-75 inset-0 z-0`}
        >
          <div className="flex justify-center m-6">
            <div>
              <h2 className="text-4xl font-bold">
             
              Don’t push buttons on your remote. Rather, push those on the EVM.
              </h2>
              <p className="mt-4">
              Your vote is your voice.
              </p>

              <div className="mt-6 max-w-md text-center w-6">
                <button
                  onClick={themeHandle}
                  className={`flex items-center justify-center w-10 h-10 rounded-full mb-3 ${
                    theme ? "bg-gray-700" : "bg-gray-300"
                  }`}
                >
                  {theme ? (
                    <LuToggleRight className="text-white" />
                  ) : (
                    <LuToggleLeft className="text-black" />
                  )}
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
