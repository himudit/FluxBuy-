import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
    totalAmount: 0,
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            state.items.push(action.payload);
            state.totalAmount += action.payload.price;
        },
        clearCart: (state) => {
            state.items = [];
            state.totalAmount = 0;
        },
    }
});

export const { addToCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;