import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
  name: "themeUse",
  initialState: { isDarkMode: false },
  reducers: {
    toggleTheme: (state) => {
      // console.log("theme use");
      state.isDarkMode = !state.isDarkMode;
    },
  },
});

export const themeActions = themeSlice.actions;
export default themeSlice;
