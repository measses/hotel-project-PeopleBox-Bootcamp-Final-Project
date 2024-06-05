import { configureStore } from "@reduxjs/toolkit";
import roomsReducer from "../slices/roomsSlice";
import reservationsReducer from "../slices/reservationSlice";
import expenseeReducer from "../slices/expenseSlice";
import revenueReducer from "../slices/revenueSlice";

const store = configureStore({
  reducer: {
    rooms: roomsReducer,
    reservations: reservationsReducer,
    expenses: expenseeReducer,
    revenue: revenueReducer,
  },
});

export default store;
