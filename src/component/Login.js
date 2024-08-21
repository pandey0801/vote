import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Update from "./Update";
import logAction from "../component/store/LogStatus";



function Login() {
  const email = useRef("");
  const password1 = useRef("");
  const password2 = useRef("");

  const [isLogIn, setIsLogIn] = useState(true);
  const theme = useSelector((state)=>state.themeUse.isDarkMode)

  const dispatch = useDispatch();
  const authState = useSelector((state) => state.log);

  // Function to switch between login and signup modes
  const switchMood = () => {
    setIsLogIn((prevState) => !prevState);
  };

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    const pas1 = password1.current.value;
    const pas2 = password2.current.value;
    const enteredEmail = email.current.value;

    if (pas1 === pas2) {
      let url;
      if (isLogIn) {
        // Log in
        url =
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBKgJHQ2FKkDZ_JHWUlBCBL1I1Ry-bSEOw";
      } else {
        // Sign up
        url =
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDPFq-SUKb5VgtCQVzzLrwXCUaeSj8XGKk";
      }

      fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: pas1,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            return res.json().then((data) => {
              let errorMessage = "Authentication failed!";
              if (data && data.error && data.error.message) {
                errorMessage = data.error.message;
              }
              throw new Error(errorMessage);
            });
          }
        })
        .then((data) => {
          console.log("idToken:", data.idToken);
          const token = data.idToken;
          console.log("login");
          dispatch(logAction.login({ bearerToken: token, userId: enteredEmail }));
          // setWelcome(true);
          localStorage.setItem('token', token);
        })
        .catch((err) => {
          alert(err.message);
        });
    } else {
      alert("Password mismatch");
      password1.current.value = "";
      password2.current.value = "";
    }
  };

  // Function to handle forgot password
  const forgotPassword = () => {
    return <NavLink to="/Forget" className={`${theme?'text-white':'text-gray-900'}`}>Forgot Password</NavLink>;
  };

  // console.log(authState);

  return (
    <>
      {!authState.isLoggedIn ? (
    
            <div className={`flex flex-col justify-center items-center min-h-screen ${theme ? 'bg-gray-900':'bg-gray-100'} `}>
          <div className={`w-96 p-8 rounded-lg shadow-lg m-9 h-[28rem] ${theme ?'bg-gray-800':'bg-white'}`}>
            {isLogIn ? (
              <h1 className={`text-2xl mb-8 font-bold text-center ${theme? 'text-white':'text-gray-900'}`} >Log in</h1>
            ) : (
              <h1 className={`text-2xl mb-8 font-bold text-center ${theme? 'text-white':'text-gray-900'}`}>Sign Up</h1>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className={`display-block text-sm font-medium mb-2 ${theme?'text-white':'text-gray-900'}`}
                >
                  Email
                </label>
                <input
                  type="email"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
                  ref={email}
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="password"
                  className={`display-block text-sm font-medium mb-2 ${theme?'text-white':'text-gray-900'}`}
                >
                  Enter Password
                </label>
                <input
                  type="password"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
                  ref={password1}
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="password"
                  className={`display-block text-sm font-medium mb-2 ${theme?'text-white':'text-gray-900'}`}
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
                  ref={password2}
                />
              </div>

              <div className="mb-4">
                <button
                  type="submit"
                  className="w-full text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                >
                  {isLogIn ? "Log In" : "Sign Up"}
                </button>
                <div className="flex justify-center">
                  {forgotPassword()}
                </div>
              </div>
            </form>
          </div>

          <button
            className="w-80 relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-green-800 dark:text-gray-600 focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
            onClick={switchMood}
          >
            <span className="w-80 relative px-5 py-2.5 transition-all ease-in duration-75 bg-gray-700 dark:bg-green-200 rounded-md group-hover:bg-opacity-0">
              Have an account? Login
            </span>
          </button>
        </div>
       ) : (
         <Update />
       )}
    </>
  );
}

export default Login;



