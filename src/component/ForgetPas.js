import React from 'react'
import { useState } from 'react';

export default function ForgetPas() {

    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const url = `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBKgJHQ2FKkDZ_JHWUlBCBL1I1Ry-bSEOw`;
  
      const requestData = {
        requestType: "PASSWORD_RESET",
        email: email,
      };
  
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        });
  
        const data = await response.json();
        console.log(data);
  
        if (response.ok) {
          setMessage("Password reset email sent! Check your inbox.");

        } else {
          throw new Error(data.error.message || "Failed to send reset email.");
        }
      } catch (error) {
        setMessage(`Error: ${error.message}`);
      }
    };

  return (
    <div className="flex flex-col justify-center items-center bg-gray-100 min-h-screen">
     <div className="bg-white w-96 p-8 rounded-lg shadow-lg m-9 h-[15rem] ">
      <h2 className='text-xl font-bold flex justify-center my-4'>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            className='border-solid border-2 border-black m-1 w-[16rem] px-2'
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" className='flex justify-center'>Send Password Reset Email</button>
      </form>
      {message && <p>{message}</p>}
    </div>
    </div>
  )
}
