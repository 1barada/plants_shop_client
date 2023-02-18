import { createAsyncThunk } from "@reduxjs/toolkit";
import { addToShoppingCartRequest } from "../../../../api/profile";
import IError from "../../../../models/IError";
import IProduct from "../../../../models/IProduct";
import IUser from "../../../../models/IUser";

export default createAsyncThunk(
    'user/addToProfileShoppingCartStatus/',
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
            const response = await addToShoppingCartRequest(user, product.id);

            return response.data;
        } catch (error: any) {
            console.log(error)
            return thunkApi.rejectWithValue(error.response.data);
        }
    }
);