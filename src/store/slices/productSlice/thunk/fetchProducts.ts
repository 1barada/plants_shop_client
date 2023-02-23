import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllProductsRequest } from "../../../../api/product";
import IGetPageResponse from "../../../../models/IGetPageResponse";

export default createAsyncThunk(
    'products/getProductsStatus/',
    async (page: number, thunkApi) => {
        try {
            const products: IGetPageResponse = (await getAllProductsRequest(page)).data;
            return products;
        } catch (error: any) {
            return thunkApi.rejectWithValue(error.response.data);
        }
    }
);