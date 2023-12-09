import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slice/cartSlice";
import locationSlice from "./slice/locationSlice";

const appStrore = configureStore({
  reducer: {
    cart: cartSlice,
    location: locationSlice,
  },
});

export default appStrore;
