import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BACKEND_URL } from "../../config";

// Fetch all todos
export const fetchTodos = createAsyncThunk("todos/fetchTodos", async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${BACKEND_URL}/api/v1/todo/todos`, {
            headers: { Authorization: `${localStorage.getItem("token")}` },
        });
        return response.data.todos;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// Add a new todo with file uploads
export const addTodo = createAsyncThunk("todos/addTodo", async (todoData, { rejectWithValue }) => {
    const { title, description, files } = todoData;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    files.forEach((file) => formData.append("files", file)); // Append each file to the FormData

    try {
        const response = await axios.post(`${BACKEND_URL}/api/v1/todo/todos`, formData, {
            headers: {
                Authorization: `${localStorage.getItem("token")}`,
                "Content-Type": "multipart/form-data", // Required for file uploads
            },
        });
        return response.data.todo; // Assuming the backend returns the created todo with files
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// Delete a todo
export const deleteTodo = createAsyncThunk("todos/deleteTodo", async (todoId, { rejectWithValue }) => {
    try {
        await axios.delete(`${BACKEND_URL}/api/v1/todo/todos/${todoId}`, {
            headers: { Authorization: `${localStorage.getItem("token")}` },
        });
        return todoId;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// Toggle the completed status of a todo
export const toggleTodo = createAsyncThunk("todos/toggleTodo", async (todoId, { rejectWithValue }) => {
    try {
        const response = await axios.patch(`${BACKEND_URL}/api/v1/todo/todos/toggle/${todoId}`, {}, {
            headers: { Authorization: `${localStorage.getItem("token")}` },
        });
        return response.data.todo; // Assuming the backend returns the updated todo
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

const todoSlice = createSlice({
    name: "todos",
    initialState: { todos: [], loading: false, error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodos.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.loading = false;
                state.todos = action.payload;
            })
            .addCase(fetchTodos.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(addTodo.fulfilled, (state, action) => {
                state.todos.push(action.payload); // Add the new todo with files to the state
            })

            .addCase(deleteTodo.fulfilled, (state, action) => {
                state.todos = state.todos.filter(todo => todo.id !== action.payload);
            })

            .addCase(toggleTodo.fulfilled, (state, action) => {
                const updatedTodo = action.payload;
                const index = state.todos.findIndex(todo => todo.id === updatedTodo.id);
                if (index !== -1) {
                    state.todos[index] = updatedTodo; // Update the todo with the new completed status
                }
            });
    },
});

export default todoSlice.reducer;