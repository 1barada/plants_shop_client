import { combineReducers } from "redux";
import productSlice from "./slices/productSlice/productSlice";
import userSlice from "./slices/userSlice/userSlice";

export default combineReducers({
    user: userSlice,
    products: productSlice
});