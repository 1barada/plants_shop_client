import { createSlice } from "@reduxjs/toolkit";
import IProduct from "../../../models/IProduct";
import IError from "../../../models/IError";
import IRejectedResponse from "../../../models/IRejectedResponse";
import fetchProducts from "./thunk/fetchProducts";
import addProduct from "./thunk/addProduct";
import IGetPageResponse from "../../../models/IGetPageResponse";
import ISearchInfo from "../../../models/ISearchInfo";
import getOneProduct from "./thunk/getOneProduct";
import IMaxValues from "../../../models/IMaxValues";

export type ProductsSliceType = ReturnType<typeof productSlice.reducer>;

interface ProductSliceInitState {
    item: IProduct,
    items: IProduct[],
    totalPages: number,
    page: number,
    searchParams: ISearchInfo,
    loading: boolean,
    errors: IError[],
    maxValues: IMaxValues
}

const initialState = {
    item: {},
    items: [] as IProduct[],
    totalPages: 0,
    page: 1,
    searchParams: {},
    loading: false,
    errors: [] as IError[],
    maxValues: {
        maxPrice: 0,
        maxWeight: 0,
        maxHeight: 0
    }
} as ProductSliceInitState;

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setSearchParams(state, {payload}: {payload: ISearchInfo}) {
            state.page = 1;
            state.searchParams = payload;
        },
        resetSearchParams(state) {
            state.page = 1;
            state.searchParams = {} as ISearchInfo;
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchProducts.pending, (state, action) => {
            state.loading = true;
            state.errors = [];
        });
        builder.addCase(fetchProducts.fulfilled, (state, {payload}: {payload: IGetPageResponse}) => {
            const {items, totalPages, page, maxValues} = payload;
            state.maxValues = maxValues;
            state.items = items;
            state.totalPages = totalPages;
            state.page = page;
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



        builder.addCase(getOneProduct.pending, (state, action) => {
            state.item = {} as IProduct;
            state.loading = true;
            state.errors = [];
        });
        builder.addCase(getOneProduct.fulfilled, (state, {payload}: {payload: IProduct}) => {
            state.item = payload;
            state.loading = false;
        });
        builder.addCase(getOneProduct.rejected, (state, action) => {
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
    }
});

export const { setSearchParams, resetSearchParams } = productSlice.actions;

export default productSlice.reducer; 
