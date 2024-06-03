import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL =
  "http://localhost/hotel-project-PeopleBox-Bootcamp-Final-Project/public/api/room";

export const fetchRooms = createAsyncThunk("rooms/fetchRooms", async () => {
  const response = await axios.get(`${API_URL}/rooms.php`);
  return response.data;
});

export const addRoom = createAsyncThunk("rooms/addRoom", async (room) => {
  const response = await axios.post(`${API_URL}/create_room.php`, room, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
});

export const updateRoom = createAsyncThunk("rooms/updateRoom", async (room) => {
  const response = await axios.put(`${API_URL}/update_room.php`, room, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
});

export const deleteRoom = createAsyncThunk("rooms/deleteRoom", async (id) => {
  await axios.delete(`${API_URL}/delete_room.php`, {
    data: { id },
    headers: {
      "Content-Type": "application/json",
    },
  });
  return id;
});

const roomsSlice = createSlice({
  name: "rooms",
  initialState: {
    rooms: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRooms.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRooms.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.rooms = action.payload;
      })
      .addCase(fetchRooms.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addRoom.fulfilled, (state, action) => {
        state.rooms.push(action.payload);
      })
      .addCase(updateRoom.fulfilled, (state, action) => {
        const index = state.rooms.findIndex(
          (room) => room.id === action.payload.id
        );
        if (index !== -1) {
          state.rooms[index] = action.payload;
        }
      })
      .addCase(deleteRoom.fulfilled, (state, action) => {
        state.rooms = state.rooms.filter((room) => room.id !== action.payload);
      });
  },
});

export default roomsSlice.reducer;
