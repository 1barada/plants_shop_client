import { createAsyncThunk } from "@reduxjs/toolkit";
import { profileInfoRequest } from "../../../../api/profile";
import IError from "../../../../models/IError";
import IUser from "../../../../models/IUser";

export default createAsyncThunk(
    'user/profileInfoStatus/',
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
            const response = await profileInfoRequest(user);
            return response.data;
        } catch (error: any) {
            return thunkApi.rejectWithValue(error.response.data);
        }
    }
);