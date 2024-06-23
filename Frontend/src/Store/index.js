// myStore.js
import { configureStore } from "@reduxjs/toolkit";
import menuListSlice from "./menuListSlice";
import food_listSlice from "./food_listSlice";
import CartSlice from "./CartSlice";
import theme from "./theme";
import tokenReducer from "./tokenSlice";

const myStore = configureStore({
  reducer: {
    item: menuListSlice.reducer,
    food_list: food_listSlice,
    CartSlice: CartSlice.reducer,
    theme: theme,
    token: tokenReducer,
  },
});

export default myStore;
