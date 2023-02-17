import { configureStore } from "@reduxjs/toolkit";
import rootReducer from './rootReducer';
import { initialState as userInitialState } from "./slices/userSlice";

const userText = localStorage.getItem('user');
const preloadedData = userText ? JSON.parse(userText) : userInitialState;

const store = configureStore({
    preloadedState: {user: preloadedData},
    reducer: rootReducer
});

export default store;

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;