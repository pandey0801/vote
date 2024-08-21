import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import logAction from "../component/store/LogStatus";

export default function LogOut() {
// const url = "https://media.istockphoto.com/id/826588658/video/woman-fanning-through-large-stack-of-usa-currency.mp4?s=mp4-640x640-is&k=20&c=vcrfA5LkqHo9RNZ_1UUxJgas0_PCgwFDU04QwEj7W88=";
  const dispatch = useDispatch();

  const history = useHistory();

  const LogOutSwitch = () => {
    dispatch(logAction.logOut());

    localStorage.removeItem("token");
    localStorage.removeItem("email");
    history.replace("/login");
  };
  return (
 
    <div className="relative h-screen">
    
   

    <div className="relative z-10 flex justify-center items-center h-full bg-black bg-opacity-50">
      <button
        className="border border-2 border-red-400 text-red-600 px-4 py-2 bg-white bg-opacity-75 rounded hover:bg-opacity-100"
        onClick={LogOutSwitch}
      >
        LogOut
      </button>
    </div>
  </div>
  );
}
