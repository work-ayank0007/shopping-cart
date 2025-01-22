import { createSlice } from "@reduxjs/toolkit";

const setState=()=>{
    const data=localStorage.getItem("cart");
    return data?JSON.parse(data):[];
}
const setData=(state)=>{
    localStorage.setItem("cart",JSON.stringify(state))
}
export const cartSlice = createSlice({
    name: "cart",
    initialState: setState(),
    reducers: {
        addToCart: (state, action) => {
            const existingItem = state.find(item => item.id === action.payload.id);
            if (existingItem) {
                existingItem.quantity += 1; 
            } else {
                state.push({ ...action.payload, quantity: 1 });

            }
            setData(state);
        },
        removeFromCart: (state, action) => {
            return state.filter(item => item.id !== action.payload);
        },
        incrementQuantity: (state, action) => {
            const item = state.find(item => item.id === action.payload);
            if (item) {
                item.quantity += 1;
            }
            setData(state);
        },
        decrementQuantity: (state, action) => {
            const item = state.find(item => item.id === action.payload);
            if (item && item.quantity > 1) {
                item.quantity -= 1;
            }
            setData(state);
        }
    }
});

export const { addToCart, removeFromCart, incrementQuantity, decrementQuantity } = cartSlice.actions;
export default cartSlice.reducer;
