import { createAsyncThunk } from "@reduxjs/toolkit";
import { getPurchasesRequest } from "../../../../api/profile";
import IError from "../../../../models/IError";
import IUser from "../../../../models/IUser";

export default createAsyncThunk(
    'user/getProfilePurchasesStatus/',
    async (_, thunkApi) => {
        try {
            const user = (thunkApi.getState() as any).user as IUser;
            console.log(user)
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
            const response = await getPurchasesRequest(user);

            return response.data;
        } catch (error: any) {
            return thunkApi.rejectWithValue(error.response.data);
        }
    }
);