import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL =
  "http://localhost/hotel-project-PeopleBox-Bootcamp-Final-Project/public/api/revenue";

export const fetchRevenue = createAsyncThunk(
  "revenue/fetchRevenue",
  async () => {
    const response = await axios.get(`${API_URL}/revenues.php`);
    return response.data;
  }
);

export const addRevenue = createAsyncThunk(
  "revenue/addRevenue",
  async (revenue) => {
    const response = await axios.post(
      `${API_URL}/create_revenue.php`,
      revenue,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  }
);

export const updateRevenue = createAsyncThunk(
  "revenue/updateRevenue",
  async (revenue) => {
    const response = await axios.put(`${API_URL}/update_revenue.php`, revenue, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  }
);

export const deleteRevenue = createAsyncThunk(
  "revenue/deleteRevenue",
  async (id) => {
    const response = await axios.delete(`${API_URL}/delete_revenue.php`, {
      data: { id },
      headers: {
        "Content-Type": "application/json",
      },
    });
    return id;
  }
);

// Slice
const revenueSlice = createSlice({
  name: "revenue",
  initialState: {
    revenue: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRevenue.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRevenue.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.revenue = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchRevenue.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addRevenue.fulfilled, (state, action) => {
        state.revenue.push(action.payload);
      })
      .addCase(updateRevenue.fulfilled, (state, action) => {
        const index = state.revenue.findIndex(
          (revenue) => revenue.id === action.payload.id
        );
        if (index !== -1) {
          state.revenue[index] = action.payload;
        }
      })
      .addCase(deleteRevenue.fulfilled, (state, action) => {
        state.revenue = state.revenue.filter(
          (revenue) => revenue.id !== action.payload
        );
      });
  },
});

export default revenueSlice.reducer;
