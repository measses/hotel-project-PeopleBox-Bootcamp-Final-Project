import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL =
  "http://localhost/hotel-project-PeopleBox-Bootcamp-Final-Project/public/api/expense";

// Thunks
export const fetchExpenses = createAsyncThunk(
  "expenses/fetchExpenses",
  async () => {
    const response = await axios.get(`${API_URL}/expenses.php`);
    return response.data;
  }
);

export const addExpense = createAsyncThunk(
  "expenses/addExpense",
  async (expense) => {
    const response = await axios.post(
      `${API_URL}/create_expense.php`,
      expense,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  }
);

export const updateExpense = createAsyncThunk(
  "expenses/updateExpense",
  async (expense) => {
    const response = await axios.put(`${API_URL}/update_expense.php`, expense, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  }
);

export const deleteExpense = createAsyncThunk(
  "expenses/deleteExpense",
  async (id) => {
    const response = await axios.delete(`${API_URL}/delete_expense.php`, {
      data: { id },
      headers: {
        "Content-Type": "application/json",
      },
    });
    return id;
  }
);

// Slice
const expensesSlice = createSlice({
  name: "expenses",
  initialState: {
    expenses: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExpenses.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchExpenses.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.expenses = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchExpenses.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addExpense.fulfilled, (state, action) => {
        state.expenses.push(action.payload);
      })
      .addCase(updateExpense.fulfilled, (state, action) => { //fulfilled durumunda güncelleme işlemi başarılı olursa state'de güncelleme işlemi yapılıyor
        const index = state.expenses.findIndex( //findIndex metodu ile güncellenmek istenen id'yi buluyoruz
          (expense) => expense.id === action.payload.id //action.payload'dan gelen id'yi buluyoruz
        );
        if (index !== -1) {
          state.expenses[index] = action.payload;
        }
      })
      .addCase(deleteExpense.fulfilled, (state, action) => { //fulfilled durumunda silme işlemi başarılı olursa state'den silme işlemi yapılıyor
        state.expenses = state.expenses.filter( //filter metodu ile silinmek istenen id'yi filtreleyerek state'den siliyoruz
          (expense) => expense.id !== action.payload //action.payload'dan gelen id'yi filtreleyerek state'den siliyoruz
        );
      });
  },
});

export default expensesSlice.reducer;
