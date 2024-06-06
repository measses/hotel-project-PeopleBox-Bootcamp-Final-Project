import { configureStore } from "@reduxjs/toolkit";
import roomsReducer from "../slices/roomsSlice";
import reservationsReducer from "../slices/reservationSlice";
import expenseeReducer from "../slices/expenseSlice";
import revenueReducer from "../slices/revenueSlice";
import authReducer from "../slices/authSlice";
import userReducer from "../slices/userSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    rooms: roomsReducer,
    reservations: reservationsReducer,
    expenses: expenseeReducer,
    revenue: revenueReducer,
    users: userReducer,
  },
});

export default store;
