import { configureStore } from "@reduxjs/toolkit";
import fileReducer from "./fileSlice"; // Adjust the path as necessary

const store = configureStore({
  reducer: {
    file: fileReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
