import { createAsyncThunk } from "@reduxjs/toolkit";
import { getProductByIdRequest } from "../../../../api/product";

export default createAsyncThunk(
    'products/getProductByIdStatus/',
    async (id: string, thunkApi) => {
        try {
            const product = (await getProductByIdRequest(id)).data;
            return product;
        } catch (error: any) {
            return thunkApi.rejectWithValue(error.response.data);
        }
    }
);