import { createAsyncThunk } from "@reduxjs/toolkit";
import { getShoppingCartRequest } from "../../../../api/profile";
import IError from "../../../../models/IError";
import IUser from "../../../../models/IUser";

export default createAsyncThunk(
    'user/getProfileShoppingCartStatus/',
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
            const response = await getShoppingCartRequest(user);

            return response.data;
        } catch (error: any) {
            console.log(error)
            return thunkApi.rejectWithValue(error.response.data);
        }
    }
);