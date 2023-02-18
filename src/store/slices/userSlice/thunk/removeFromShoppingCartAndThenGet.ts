import { createAsyncThunk } from "@reduxjs/toolkit";
import { getShoppingCartRequest, removeFromShoppingCartRequest } from "../../../../api/profile";
import IError from "../../../../models/IError";
import IProduct from "../../../../models/IProduct";
import IUser from "../../../../models/IUser";

export default createAsyncThunk(
    'user/removeFromProfileShoppingCartAndThanGetStatus/',
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
            await removeFromShoppingCartRequest(user, product.id);
            const response = await getShoppingCartRequest(user);
            
            return response.data;
        } catch (error: any) {
            console.log(error)
            return thunkApi.rejectWithValue(error.response.data);
        }
    }
);