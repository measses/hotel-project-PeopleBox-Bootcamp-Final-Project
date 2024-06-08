import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL =
  "http://localhost/hotel-project-PeopleBox-Bootcamp-Final-Project/public/api/auth";

// Thunks
export const login = createAsyncThunk(
  "auth/login",
  async (user, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/login.php`, user, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        sessionStorage.setItem("user", JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (user, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/register.php`, user, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data; // user verisini hemen kaydetmiyoruz
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const verifyEmail = createAsyncThunk(
  "auth/verifyEmail",
  async ({ code, email }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/verify.php`,
        { code, email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.success) {
        sessionStorage.setItem("user", JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  localStorage.removeItem("token");
  sessionStorage.removeItem("user");
  return { success: true };
});

export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (formData, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        "http://localhost/hotel-project-PeopleBox-Bootcamp-Final-Project/public/api/user/update_user.php",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        sessionStorage.setItem("user", JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
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
  extraReducers: (builder) => { //extrareducers ile thunk fonksiyonlarını ekliyoruz çünkü thunk fonksiyonları birer action oluyor ve bunları eklemek için extraReducers kullanıyoruz
    builder
      .addCase(login.pending, (state) => { //pending, fulfilled, rejected durumlarını ekliyoruz, pending: işlem başladı, fulfilled: işlem tamamlandı, rejected: işlem başarısız oldu
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => { //fulfilled durumunda state güncellenir ve action.payload içerisinde gelen veri bulunur
        state.loading = false; //loading durumu false yapılır
        state.user = action.payload.success ? action.payload.user : null; //eğer gelen veri başarılı ise user state'ine gelen veri atanır, değilse null atanır
        state.error = action.payload.success ? null : action.payload.message; //eğer gelen veri başarılı ise error state'ine null atanır, değilse gelen veri atanır
      })
      .addCase(login.rejected, (state, action) => { //rejected durumunda state güncellenir ve action.payload içerisinde gelen veri bulunur
        state.loading = false; //loading durumu false yapılır
        state.error = action.payload.message; //error state'ine gelen veri atanır
      })
      .addCase(register.pending, (state) => { //register thunk fonksiyonu için durumlar eklenir 
        state.loading = true; //loading durumu true yapılır
        state.error = null; //error state'i null yapılır
      })
      .addCase(register.fulfilled, (state, action) => { //register thunk fonksiyonu için durumlar eklenir
        state.loading = false;
        state.error = action.payload.success ? null : action.payload.message; //eğer gelen veri başarılı ise error state'ine null atanır, değilse gelen veri atanır
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.user = action.payload.user;
        } else {
          state.error = action.payload.message;
        }
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.error = action.payload.message;
      })
      .addCase(verifyEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.error = action.payload.success ? null : action.payload.message;
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export default authSlice.reducer;
