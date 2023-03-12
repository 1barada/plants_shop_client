import { configureStore } from "@reduxjs/toolkit";
import IProductQuantity from "../models/IProductQuantity";
import rootReducer from './rootReducer';
import { initialState as userInitialState, UserSliceType } from "./slices/userSlice/userSlice";

const userText = localStorage.getItem('user');
const userData = {...userInitialState, ...(userText ? JSON.parse(userText) as UserSliceType : userInitialState)};

const shoppingCartText = localStorage.getItem('shoppingCart');
const shoppingCartData = shoppingCartText ? JSON.parse(shoppingCartText) as IProductQuantity[] : userInitialState.info.shoppingCart;

const preloadedData = {...userData, info: {...userData.info, shoppingCart: shoppingCartData}}

const store = configureStore({
    preloadedState: {
        user: preloadedData
    },
    reducer: rootReducer
});

export default store;

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;