
import { createSlice } from "@reduxjs/toolkit";

const logSlice = createSlice({
    name: "log",
    initialState: {
      isLoggedIn: false,
      bearerToken: null,
      userId: null,
    },
    reducers: {
      login: (state, action) => {
        state.isLoggedIn = true;
        state.bearerToken = action.payload.bearerToken;
        state.userId = action.payload.userId;
      },
      logOut: (state) => {
        state.isLoggedIn = false;
        state.bearerToken = null;
        state.userId = null;
      },
    },
  });

export default logSlice.actions;
export const logSl = logSlice;





