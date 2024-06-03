import { configureStore } from "@reduxjs/toolkit";
import roomsReducer from "../slices/roomsSlice";

const store = configureStore({
  reducer: {
    rooms: roomsReducer,
  },
});

export default store;
