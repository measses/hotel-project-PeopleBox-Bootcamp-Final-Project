import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL =
  "http://localhost/hotel-project-PeopleBox-Bootcamp-Final-Project/public/api/todo";

// Thunks
export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const response = await axios.get(`${API_URL}/todos.php`);
  return response.data;
});

export const createTodo = createAsyncThunk("todos/createTodo", async (todo) => {
  const response = await axios.post(`${API_URL}/create_todo.php`, todo, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
});

export const updateTodo = createAsyncThunk("todos/updateTodo", async (todo) => {
  const response = await axios.put(`${API_URL}/update_todo.php`, todo, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
});

export const deleteTodo = createAsyncThunk("todos/deleteTodo", async (id) => {
  const response = await axios.delete(`${API_URL}/delete_todo.php`, {
    data: { id },
    headers: {
      "Content-Type": "application/json",
    },
  });
  return id; // Return the ID to filter it out from the state
});

const todoSlice = createSlice({
  name: "todos",
  initialState: {
    todos: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = action.payload; // Assume the payload is the list of todos
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createTodo.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.todos.push(action.payload.todo); // Push the new todo to the state
        }
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        if (action.payload.success) {
          const index = state.todos.findIndex(
            (todo) => todo.id === action.payload.todo.id
          );
          if (index !== -1) {
            state.todos[index] = action.payload.todo; // Update the existing todo in the state
          }
        }
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter((todo) => todo.id !== action.payload); // Filter out the deleted todo by ID
      });
  },
});

export default todoSlice.reducer;
