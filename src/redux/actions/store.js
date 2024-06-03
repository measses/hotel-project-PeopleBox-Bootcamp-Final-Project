import { configureStore } from "@reduxjs/toolkit";
import roomsReducer from "../slices/roomsSlice";
import reservationsReducer from "../slices/reservationSlice";

const store = configureStore({
  reducer: {
    rooms: roomsReducer,
    reservations: reservationsReducer,
  },
});

export default store;
