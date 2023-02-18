import { createSlice } from "@reduxjs/toolkit";
import IProduct from "../../../models/IProduct";
import IError from "../../../models/IError";
import IRejectedResponse from "../../../models/IRejectedResponse";
import fetchProducts from "./thunk/fetchProducts";
import addProduct from "./thunk/addProduct";
import seachProducts from "./thunk/searchProducts";

export type ProductsSliceType = ReturnType<typeof productSlice.reducer>;

const initialState = {
    items: [] as IProduct[],
    loading: false,
    errors: [] as IError[]
};

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        
    },
    extraReducers: builder => {
        builder.addCase(fetchProducts.pending, (state, action) => {
            state.loading = true;
            state.errors = [];
        });
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            const {products, shoopingCartIds} = action.payload;
            products.forEach(product => {
                if (shoopingCartIds.includes(product.id)) {
                    product.isInShoopingCart = true;
                    shoopingCartIds.splice(shoopingCartIds.indexOf(product.id), 1);
                } else {
                    product.isInShoopingCart = false;
                }
            });
            state.items = products;
            state.loading = false;
        });
        builder.addCase(fetchProducts.rejected, (state, action) => {
            const payload = action.payload as IRejectedResponse;
            if (!payload) {
                return console.error('empty rejected response!');
            }
            
            console.error(payload);
            state.errors = payload.errors;
            state.loading = false;
        });



        builder.addCase(addProduct.pending, (state) => {
            state.loading = true;
            state.errors = [];
        });
        builder.addCase(addProduct.fulfilled, (state, action) => {
            state.items.push(action.payload);
            state.loading = false;
        });
        builder.addCase(addProduct.rejected, (state, action) => {
            const payload = action.payload as IRejectedResponse;
            if (!payload) {
                return console.error('empty rejected response!');
            }
            console.error(payload);
            state.errors = payload.errors;
            state.loading = false;
        });



        builder.addCase(seachProducts.pending, (state, action) => {
            state.loading = true;
            state.errors = [];
        });
        builder.addCase(seachProducts.fulfilled, (state, action) => {
            console.log(action.payload)
            const payload = action.payload as IProduct[];
            state.items = payload;
            state.loading = false;
        });
        builder.addCase(seachProducts.rejected, (state, action) => {
            const payload = action.payload as IRejectedResponse;
            if (!payload) {
                return console.error('empty rejected response!');
            }
            console.error(payload);
            state.errors = payload.errors;
            state.loading = false;
        });
    }
});

export default productSlice.reducer; 
