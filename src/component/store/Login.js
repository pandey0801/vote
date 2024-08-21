import { createSlice, configureStore } from "@reduxjs/toolkit";
import { expensesSl } from "./exp";
import { logSl } from "./LogStatus";
import themeSlice from "./Theme";

const store = configureStore({
  reducer: {
    log: logSl.reducer,
    expenses: expensesSl.reducer,
    themeUse: themeSlice.reducer
  },
});

export default store;
