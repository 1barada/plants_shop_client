import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllProductsRequest } from "../../../../api/product";
import { getShoppingCartRequest } from "../../../../api/profile";
import IProduct from "../../../../models/IProduct";
import IUser from "../../../../models/IUser";
import { RootState } from "../../../store";

export default createAsyncThunk(
    'products/getProductsStatus/',
    async (_, thunkApi) => {
        try {
            let shoopingCartIds: string[] = [];
            const user = (thunkApi.getState() as RootState).user.info as IUser;
            if (user.token) {
                shoopingCartIds = (await getShoppingCartRequest(user)).data.map((product: IProduct) => product.id);
            }

            const products: IProduct[] = (await getAllProductsRequest()).data;
            return {products, shoopingCartIds};
        } catch (error: any) {
            return thunkApi.rejectWithValue(error.response.data);
        }
    }
);