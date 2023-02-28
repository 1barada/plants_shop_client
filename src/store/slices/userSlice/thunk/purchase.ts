import { createAsyncThunk } from "@reduxjs/toolkit";
import { purchaseRequest } from "../../../../api/profile";
import IError from "../../../../models/IError";
import IPurchaseRequest from "../../../../models/IPurchaseRequest";
import IUser from "../../../../models/IUser";

export default createAsyncThunk(
    'user/purchaseStatus/',
    async (_, thunkApi) => {
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
            const purchases = {
                purchases: user.shoppingCart.map(({product, quantity}) => {
                    return {
                        id: product.id,
                        quantity
                    };
                }
            )} as IPurchaseRequest;
            const response = await purchaseRequest(user, purchases);
            return response.data;
        } catch (error: any) {
            return thunkApi.rejectWithValue(error.response.data);
        }
    }
);