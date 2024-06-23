import { createSlice } from "@reduxjs/toolkit";


const CartSlice = createSlice({
    name: 'CartSlice',
    initialState: {},
    reducers: {
        addCartItems: (state, action) => {
            const itemId = action.payload.id;
            if (!state[itemId]) {
                // Creates new entry of product if the product is not already in the cart
                // console.log(itemId, "Cart item added once");
                state[itemId] = 1;
            } else {
                // Increases the quantity of item in cart
                // console.log(itemId, "Cart item added Again");
                state[itemId] += 1;
            }
        },
        removeCartItems: (state, action) => {
            const itemId = action.payload.id;
            // console.log(itemId, "Id removed");
            if (state[itemId]) {
                state[itemId] -= 1;
                if (state[itemId] === 0) {
                    delete state[itemId];
                }
            }
        }
    }
});

export const CartSliceAction = CartSlice.actions;

export default CartSlice;
