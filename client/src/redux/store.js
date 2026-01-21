import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice"; // We will create this next

export const store = configureStore({
  reducer: {
    auth: authReducer, // This matches the (state) => state.auth in your Chat.jsx
  },
});
