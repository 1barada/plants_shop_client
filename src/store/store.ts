import { configureStore } from "@reduxjs/toolkit";
import rootReducer from './rootReducer';
import { initialState as userInitialState, UserSliceType } from "./slices/userSlice/userSlice";

const userText = localStorage.getItem('user');
const userData = userText ? JSON.parse(userText) : userInitialState;

const shoppingCartText = localStorage.getItem('shoppingCart');
const shoppingCartData = shoppingCartText ? JSON.parse(shoppingCartText) : userInitialState.info.shoppingCart;

const store = configureStore({
    preloadedState: {
        user: {
            ...userData,
            info: {
                ...userData.info,
                shoppingCart: shoppingCartData
            }
        } as UserSliceType
    },
    reducer: rootReducer
});

export default store;

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;