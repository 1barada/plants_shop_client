import { createSlice } from "@reduxjs/toolkit";
import IError from "../../../models/IError";
import IProduct from "../../../models/IProduct";
import IRejectedResponse from "../../../models/IRejectedResponse";
import IUser from "../../../models/IUser";
import getPurchases from "./thunk/getPurchases";
import getShoppingCart from "./thunk/getShoppingCart";
import login from "./thunk/login";
import register from "./thunk/register";

export type UserSliceType = ReturnType<typeof userSlice.reducer>;

export const initialState = {
    info: {} as IUser,
    authorized: false,
    loading: false,
    errors: [] as IError[],
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout() {
            localStorage.removeItem('user');
            return initialState;
        }
    },
    extraReducers: builder => {
        builder.addCase(login.pending, (state) => {
            state.errors = [] as IError[];
            state.loading = true;
        });
        builder.addCase(login.fulfilled, (state, {payload}: {payload: IUser}) => {
            state.info = payload;
            state.authorized = true;
            state.loading = false;
            localStorage.setItem('user', JSON.stringify(state));
        });
        builder.addCase(login.rejected, (state, action) => {
            const payload = action.payload as IRejectedResponse;
            console.error(payload)
            state.errors = payload.errors;
            state.loading = false;
        });



        builder.addCase(register.pending, (state) => {
            state.errors = [] as IError[];
            state.loading = true;
        });
        builder.addCase(register.fulfilled, (state) => {
            state.loading = false;
            alert('succsesfully registered\nnow you can log in your account')
        });
        builder.addCase(register.rejected, (state, action) => {
            const payload = action.payload as IRejectedResponse;
            console.error(payload)
            state.errors = payload.errors;
            state.loading = false;
        });



        builder.addCase(getShoppingCart.pending, (state) => {
            state.errors = [] as IError[];
            state.loading = true;
        });
        builder.addCase(getShoppingCart.fulfilled, (state, {payload}: {payload: IProduct[]}) => {
            state.info.shoppingCart = payload;
            state.loading = false;
        });
        builder.addCase(getShoppingCart.rejected, (state, action) => {
            const payload = action.payload as IRejectedResponse;
            console.error(payload)
            state.errors = payload.errors;
            state.loading = false;
        });



        builder.addCase(getPurchases.pending, (state) => {
            state.errors = [] as IError[];
            state.loading = true;
        });
        builder.addCase(getPurchases.fulfilled, (state, {payload}: {payload: IProduct[]}) => {
            state.info.purchases = payload;
            state.loading = false;
        });
        builder.addCase(getPurchases.rejected, (state, action) => {
            const payload = action.payload as IRejectedResponse;
            console.error(payload)
            state.errors = payload.errors;
            state.loading = false;
        });
    }
});


export const {logout} = userSlice.actions;
export default userSlice.reducer;