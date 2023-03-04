import { createSlice } from "@reduxjs/toolkit";
import IError from "../../../models/IError";
import IRejectedResponse from "../../../models/IRejectedResponse";
import IProductQuantity from "../../../models/IProductQuantity";
import IUser from "../../../models/IUser";
import getPurchases from "./thunk/getPurchases";
import login from "./thunk/login";
import register from "./thunk/register";
import purchase from "./thunk/purchase";

export type UserSliceType = ReturnType<typeof userSlice.reducer>;

export const initialState = {
    info: {
        shoppingCart: [] as IProductQuantity[],
        purchases: [] as IProductQuantity[]
    } as IUser,
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
            localStorage.removeItem('shoppingCart');
            return initialState;
        },
        changeInShoppingCart(state, {payload}: {payload: IProductQuantity}) {
            const productId = state.info.shoppingCart.map(productQuantity => productQuantity.product.id).indexOf(payload.product.id);

            if (productId === -1) {
                state.info.shoppingCart.push(payload);
            } else if (!(payload.quantity + state.info.shoppingCart[productId].quantity < 1)) {
                state.info.shoppingCart[productId].quantity += payload.quantity;
            }

            localStorage.setItem('shoppingCart', JSON.stringify(state.info.shoppingCart));
        },
        removeFromShoppingCart(state, {payload}: {payload: string}) {
            const shoppingCart = state.info.shoppingCart.filter(productQuantity => productQuantity.product.id !== payload);
            state.info.shoppingCart = shoppingCart;
            localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));
        },
        getShoppingCart(state) {
            const data = localStorage.getItem('shoppingCart');
            state.info.shoppingCart = data 
                ? JSON.parse(data!) 
                : [];
        }
    },
    extraReducers: builder => {
        builder.addCase(login.pending, (state) => {
            state.errors = [] as IError[];
            state.loading = true;
        });
        builder.addCase(login.fulfilled, (state, {payload}: {payload: IUser}) => {
            state.info = {...state.info, ...payload};
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



        builder.addCase(getPurchases.pending, (state) => {
            state.errors = [] as IError[];
            state.loading = true;
        });
        builder.addCase(getPurchases.fulfilled, (state, {payload}: {payload: IProductQuantity[]}) => {
            state.info.purchases = payload;
            state.loading = false;
        });
        builder.addCase(getPurchases.rejected, (state, action) => {
            const payload = action.payload as IRejectedResponse;
            console.error(payload)
            state.errors = payload.errors;
            state.loading = false;
        });



        builder.addCase(purchase.pending, (state) => {
            state.errors = [] as IError[];
            state.loading = true;
        });
        builder.addCase(purchase.fulfilled, (state, {payload}: {payload: IProductQuantity[]}) => {
            state.info.shoppingCart = [];
            localStorage.removeItem('shoppingCart');
            state.loading = false;
        });
        builder.addCase(purchase.rejected, (state, action) => {
            const payload = action.payload as IRejectedResponse;
            console.error(payload)
            state.errors = payload.errors;
            state.loading = false;
        });
    }
});


export const {logout, changeInShoppingCart, removeFromShoppingCart, getShoppingCart} = userSlice.actions;
export default userSlice.reducer;