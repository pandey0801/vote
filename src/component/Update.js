import React, { useState, useRef } from "react";
import { FaGithub } from "react-icons/fa";
import { IoPlanetSharp } from "react-icons/io5";
import { GiPlagueDoctorProfile, GiRamProfile } from "react-icons/gi";
import { FcContacts } from "react-icons/fc";
import LogOut from "./LogOut";
import { useSelector } from "react-redux";

export default function Update() {
  const name = useRef();
  const profile = useRef();
  const [Change, setChange] = useState(false);
  const [print, Setprint] = useState([]);
  const token = localStorage.getItem("token");

  const theme = useSelector((state) => state.themeUse.isDarkMode);

  const switchHandle = () => {
    setChange((prevState) => !prevState);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const dataSet = {
      name: name.current.value,
      profile: profile.current.value,
    };

    fetch("https://expensetrackerv1-eb334-default-rtdb.firebaseio.com/profile.json", {
      method: "POST",
      body: JSON.stringify(dataSet),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        console.log(res.json());
      } else {
        console.log("error");
      }
    });
  };

  const fetchData = () => {
    if (!token) {
      console.error("No token found");
      return;
    }

    fetch("https://expensetrackerv1-eb334-default-rtdb.firebaseio.com/profile.json", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Failed to fetch data.");
        }
      })
      .then((data) => {
        console.log(data);
        const dataArray = Array.isArray(data) ? data : Object.values(data);
        Setprint(dataArray);
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });
  };

  const sendVerificationEmail = () => {
    fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBKgJHQ2FKkDZ_JHWUlBCBL1I1Ry-bSEOw`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          requestType: "VERIFY_EMAIL",
          idToken: token,
        }),
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to send verification email.");
        }
      })
      .then((data) => {
        console.log("Verification email sent:", data);
      })
      .catch((error) => {
        console.error("Error sending verification email:", error);
      });

    alert("Check your Mail");
  };

  return (
    <div className={`min-h-screen p-6 ${theme ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}>
      <div className={`flex justify-between items-center shadow p-6 px-5 rounded-md ${theme ? "bg-gray-700" : "bg-gray-100"}`}>
        <h1 className="text-2xl font-bold">Welcome to Expense Tracker</h1>
        <button
          className={`${
            theme ? "text-yellow-400" : "text-blue-600"
          } hover:underline`}
          type="button"
          onClick={switchHandle}
        >
          Your profile is incomplete <span className="font-semibold">Complete now</span>
        </button>
       
      </div>

      {Change && (
        <div className={`shadow p-6 rounded-md mt-6 ${theme ? "bg-gray-700" : "bg-gray-100"}`}>
          <h2 className="text-xl font-bold mb-4">Contact details</h2>
          <form className="space-y-4">
            <div className="flex items-center">
              <GiRamProfile className="mr-3 size-9" />
              <label htmlFor="name" className="font-medium mr-3">
                Enter name
              </label>
              <input
                type="text"
                className={`border rounded-md p-2 flex-1 ${
                  theme ? "border-gray-600 bg-gray-800 text-white" : "border-gray-300"
                }`}
                ref={name}
              />
            </div>
            <div className="flex items-center">
              <FcContacts className="mr-3 size-8" />
              <label htmlFor="profile" className="font-medium mr-3">
                Contact Details
              </label>
              <input
                type="text"
                className={`border rounded-md p-2 flex-1 ${
                  theme ? "border-gray-600 bg-gray-800 text-white" : "border-gray-300"
                }`}
                ref={profile}
              />
            </div>
            <div className="flex space-x-4">
              <button
                className={`py-2 px-4 rounded-md ${theme ? "bg-blue-500 hover:bg-blue-600" : "bg-blue-600 hover:bg-blue-700"} text-white`}
                type="button"
                onClick={handleSubmit}
              >
                Update
              </button>
              <button
                className={`py-2 px-4 rounded-md ${theme ? "bg-red-500 hover:bg-red-600" : "bg-red-600 hover:bg-red-700"} text-white`}
                type="button"
                onClick={switchHandle}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="mt-6">
        <button
          className={`py-2 px-4 rounded-md ${theme ? "bg-blue-500 hover:bg-blue-600" : "bg-blue-600 hover:bg-blue-700"} text-white`}
          type="button"
          onClick={fetchData}
        >
          Fetch Data
        </button>
        <div className="mt-4">
          {print.map((item, index) => (
            <div
              key={index}
              className={`shadow p-4 rounded-md mb-4 ${theme ? "bg-gray-700" : "bg-gray-100"} space-y-2`}
            >
              <p className="font-medium">Name: {item.name}</p>
              <p className="font-normal">Profile: {item.profile}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <button
          className={`py-2 px-4 rounded-md ${theme ? "bg-green-500 hover:bg-green-600" : "bg-green-600 hover:bg-green-700"} text-white`}
          type="button"
          onClick={sendVerificationEmail}
        >
          Send Verification Email
        </button>
      </div>
    </div>
  );
}
