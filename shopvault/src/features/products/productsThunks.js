import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";


export const fetchProducts = createAsyncThunk(
    "products/fetchAll",
    async(_, {rejectWitValue}) => {
        try {
            const{data} = await axiosInstance.get("/products");
            return data;
        } catch(err){
            return rejectWitValue(err.response?.data || "Failed to fetch products")
        }
    }
);

export const fetchCategories = createAsyncThunk(
    "products/fetchCategories",
    async(_, {rejectWitValue}) => {
        try {
            const {data} = await axiosInstance.get("/products/categories");
            return data;
        }catch(err){
            return rejectWitValue(err.response?.data || "Failed to fetch categories")
        }
    }
);

export const fetchProductsByCategory = createAsyncThunk(
    "products/fetchByCategory",
    async(category, {rejectWitValue}) => {
        try {
            const {data} = await axiosInstance.get(`/products/category/${category}`);
            return data;
        } catch(err){
            return rejectWitValue(err.response?.data || "Failed to fetch category products");
        }
    }
);

export const fetchProductById = createAsyncThunk(
    "products/fetchById",
    async(id, {rejectWitValue}) => {
        try{
            const {data} = await axiosInstance.get(`/products/${id}`);
            return data;
        } catch(err){
            return rejectWitValue(err.response?.data || "Failed to fetch product");
        }
    }
)