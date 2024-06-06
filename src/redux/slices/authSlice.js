import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL =
  "http://localhost/hotel-project-PeopleBox-Bootcamp-Final-Project/public/api/auth";

// Thunks
export const login = createAsyncThunk("auth/login", async (user) => {
  const response = await axios.post(`${API_URL}/login.php`, user, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.data.success) {
    localStorage.setItem("token", response.data.token);
  }
  return response.data;
});

export const register = createAsyncThunk("auth/register", async (user) => {
  const response = await axios.post(`${API_URL}/register.php`, user, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
});

export const logout = createAsyncThunk("auth/logout", async () => {
  localStorage.removeItem("token");
  return { success: true };
});

export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (formData) => {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      "http://localhost/hotel-project-PeopleBox-Bootcamp-Final-Project/public/api/user/update_user.php",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
);

// Slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(sessionStorage.getItem("user")) || null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.error = action.payload.success ? null : action.payload.message;
        if (state.user) {
          sessionStorage.setItem("user", JSON.stringify(state.user));
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.error = action.payload.success ? null : action.payload.message;
        if (state.user) {
          sessionStorage.setItem("user", JSON.stringify(state.user));
        }
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        sessionStorage.removeItem("user");
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.user = action.payload.user;
          sessionStorage.setItem("user", JSON.stringify(state.user));
        } else {
          state.error = action.payload.message;
        }
      });
  },
});

export default authSlice.reducer;
