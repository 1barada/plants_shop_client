import { createAsyncThunk } from "@reduxjs/toolkit";
import { searchProdcutsRequest } from "../../../../api/product";
import ISearchInfo from "../../../../models/ISearchInfo";

export default createAsyncThunk(
    'products/searchProductsStatus/',
    async (params: ISearchInfo, thunkApi) => {
        try {
            const response = await searchProdcutsRequest(params);
            return response.data;
        } catch (error: any) {
            return thunkApi.rejectWithValue(error.response.data);
        }
    }
);