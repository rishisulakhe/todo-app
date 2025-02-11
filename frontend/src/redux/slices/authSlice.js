import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BACKEND_URL } from "../../config";

// Async thunk for handling signup and signin
export const authUser = createAsyncThunk("auth/authUser", async ({ type, postInputs }, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type}`, {
            username: postInputs.username,
            password: postInputs.password,
        });
        const jwt = response.data.token;
        localStorage.setItem("token", "Bearer " + jwt);
        localStorage.setItem("name ",postInputs.name);
        return jwt;
    } catch (error) {
        return rejectWithValue("Error while signing up. Please try again.",error);
    }
});

const authSlice = createSlice({
    name: "auth",
    initialState: {
        postInputs: { name: "", username: "", password: "" },
        loading: false,
        error: "",
    },
    reducers: {
        updateInputs: (state, action) => {
            state.postInputs = { ...state.postInputs, ...action.payload };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(authUser.pending, (state) => {
                state.loading = true;
                state.error = "";
            })
            .addCase(authUser.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(authUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { updateInputs } = authSlice.actions;
export default authSlice.reducer;
