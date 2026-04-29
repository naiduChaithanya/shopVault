import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";


export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async({username, password}, {rejectWithValue}) => {
        try{
            const {data} = await axiosInstance.post("/auth/login", {
                username,
                password
            });

            const usersRes = await axiosInstance.get("/users");
            const matchedUser = usersRes.data.find(
                (u) => u.username.toLowerCase() === username.toLowerCase()
            )

            const user = matchedUser || {
                id : 1,
                username,
                email: `${username}@shopvault.com`,
                name: {firstname: username, lastname: ""}
            };

            return {token: data.token, user}
        }catch(err){
            return rejectWithValue(
                err.response?.data?.message || "Invalid credesntials. Try : mor_2314 / 83r5^_"
            )
        }
    }
);

export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async({email, username, password, firstname, lastname}, {rejectWithValue}) => {
        try{
            const {data} = await axiosInstance.post("/users", {
                email,
                username,
                password,
                name: {firstname, lastname},
                address: {city: "", street: "", number: 0, zipcode: "", geolocation: {lat: "", long: ""}},
                phone: "",
            });
            const loginRes = await axiosInstance.post("/auth/login",{
                username: "mor_2314",
                password: "83r5^_",
            });

            const user = {
                id: data.id,
                username,
                email,
                name: {firstname, lastname},
            };
            return{token: loginRes.data.token, user};
        }catch(err){
            return rejectWithValue(
                err.response?.data?.message || "Registration failed. Please try again."
            )
        }
    }
)