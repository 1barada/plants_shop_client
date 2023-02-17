import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllProductsRequest } from "../../../../../api/product";

export default createAsyncThunk(
    'products/getProductsStatus/',
    async (_, thunkApi) => {
        try {
            const response = await getAllProductsRequest();
            return response.data;
        } catch (error: any) {
            return thunkApi.rejectWithValue(error.response.data);
        }
    }
);