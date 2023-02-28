import { createAsyncThunk } from "@reduxjs/toolkit";
import { getProductsRequest } from "../../../../api/product";
import IGetPageResponse from "../../../../models/IGetPageResponse";
import ISearchInfo from "../../../../models/ISearchInfo";

export default createAsyncThunk(
    'products/getProductsStatus/',
    async ({page, searchParams}: {page: number, searchParams?: ISearchInfo}, thunkApi) => {
        try {
            const products: IGetPageResponse = (await getProductsRequest(page, searchParams)).data;
            return products;
        } catch (error: any) {
            return thunkApi.rejectWithValue(error.response.data);
        }
    }
);