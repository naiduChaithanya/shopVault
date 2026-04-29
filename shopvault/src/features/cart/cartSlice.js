import { createSlice } from "@reduxjs/toolkit";

const storedCart = localStorage.getItem("shopvault_cart");
const initialItems = storedCart ? JSON.parse(storedCart) : [];

const save = (items) => localStorage.setItem("shopvault_cart", JSON.stringify(items));

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: initialItems,
    },
    reducers: {
        addToCart(state,action) {
            const product = action.payload;
            const existing = state.items.find((i) => i.id === product.id);
            if(existing){
                existing.quantity += 1
            }else{
                state.items.push({ ...product, quantity: 1})
            }
            save(state.items)
        },
        removeFromCart(state, action) {
            state.items = state.items.filter((i) => i.id !== action.payload);
            save(state.items)
        },
        IncreaseQty(state, action){
            const item = state.items.find((i) => i.id === action.payload);
            if(item) item.quantity += 1;
            save(state.items)
        },
        decreaseQty(state, action){
            const item = state.items.find((i) => i.id === action.payload);
            if(item) {
                if(item.quantity === 1){
                    state.items = state.items.filter((i) => i.id !== action.payload);
                }else{
                    item.quantity -= 1;
                }
            }
            save(state.items);
        },
        clearCart(state){
            state.items = [];
            localStorage.removeItem("shopvault_cart")
        }
    }
});

export const selectCartItems = (state) => state.cart.items;
export const selectCartCount = (state) => state.cart.items.reduce((sum, i) => sum + i.quantity, 0);
export const selectCartTotal = (state) => state.cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0);

export const {addToCart, removeFromCart, IncreaseQty, decreaseQty, clearCart } = cartSlice.actions;
export default cartSlice.reducer;