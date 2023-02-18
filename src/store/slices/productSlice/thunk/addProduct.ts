import { createAsyncThunk } from "@reduxjs/toolkit";
import { createProductRequest } from "../../../../api/product";
import IError from "../../../../models/IError";
import IProduct from "../../../../models/IProduct";
import IUser from "../../../../models/IUser";

export default createAsyncThunk(
    'products/addProductsStatus/',
    async (product: IProduct, thunkApi) => {
        try {
            const user = (thunkApi.getState() as any).user.info as IUser;
            if (!user.token) {
                return thunkApi.rejectWithValue({
                    errors: [
                        {
                            status: 400,
                            message: 'user not authorized'
                        } as IError
                    ] as IError[]
                });
            }
            const response = await createProductRequest(product, user);

            return response.data;
        } catch (error: any) {
            return thunkApi.rejectWithValue(error.response.data);
        }
    }
);