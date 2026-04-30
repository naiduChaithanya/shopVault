import { createSlice } from "@reduxjs/toolkit";
import { fetchCategories, fetchProductById, fetchProducts, fetchProductsByCategory } from "./productsThunks";


const initialState = {
    items: [],
    categories: [],
    selectedProduct: null,
    activeCategory: "all",
    searchQuery: "",
    sortBy: "default",
    isLoading: false,
    isLoadingProduct: false,
    error: null,
};

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        setActiveCategory(state, action){
            state.activeCategory = action.payload;
        },
        setSearchQuery(state, action){
            state.searchQuery = action.payload;
        },
        setSortBy(state, action){
            state.sortBy = action.payload;
        },
        clearSelectedProduct(state){
            state.selectedProduct = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {state.isLoading = true; state.error = null})
            .addCase(fetchProducts.fulfilled, (state, action) => {state.isLoading = false; state.items = action.payload})
            .addCase(fetchProducts.rejected, (state, action) => {state.isLoading = false; state.error = action.payload})

        builder
            .addCase(fetchCategories.fulfilled, (state, action) => {state.categories = action.payload})

        builder
            .addCase(fetchProductsByCategory.pending, (state) => {state.isLoading = true; })
            .addCase(fetchProductsByCategory.fulfilled, (state, action) => {state.isLoading = false; state.items = action.payload })
            .addCase(fetchProductsByCategory.rejected, (state, action) => {state.isLoading = false; state.error = action.payload})

        builder
            .addCase(fetchProductById.pending, (state) => {state.isLoadingProduct = true; state.selectedProduct = null})
            .addCase(fetchProductById.fulfilled, (state, action) => {state.isLoadingProduct = false; state.selectedProduct = action.payload})
            .addCase(fetchProductById.rejected, (state, action) => {state.isLoadingProduct = false; state.error = action.payload})
    }
});

export const {setActiveCategory, setSearchQuery, setSortBy, clearSelectedProduct} = productsSlice.actions;
export default productsSlice.reducer
