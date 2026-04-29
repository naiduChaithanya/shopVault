import {createSlice} from "@reduxjs/toolkit"
import { loginUser, registerUser } from "./authThunks";

const storedUser = localStorage.getItem("shopvault_user");
const storedToken = localStorage.getItem("shopvault_token");

const initialState = {
    user: storedUser ? JSON.parse(storedUser) : null,
    token: storedToken || null,
    isLoading: false,
    error: null,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout(state){
            state.user = null;
            state.token = null;
            state.error = null;
            localStorage.removeItem("shopvault_token");
            localStorage.removeItem("shopvault_user");
        },
        clearError(state){
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.token = action.payload.token;
                state.user = action.payload.user;
                localStorage.setItem("shopvault_token", action.payload.token);
                localStorage.setItem("shopvault_user", JSON.stringify(action.payload.user));
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });

        builder
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.token = action.payload.token;
                state.user = action.payload.user;
                localStorage.setItem("shopvault_token", action.payload.token);
                localStorage.setItem("shopvault_user", JSON.stringify(action.payload.user))
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
    }
})

export const {logout, clearError} = authSlice.actions;
export default authSlice.reducer