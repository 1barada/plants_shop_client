import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginRequest } from "../../../../api/auth";
import ILoginRequestData from "../../../../models/ILoginRequestData";

export default createAsyncThunk(
    'user/loginStatus/',
    async (loginData: ILoginRequestData, thunkApi) => {
        try {
            const response = await loginRequest(loginData);

            return response.data;
        } catch (error: any) {
            return thunkApi.rejectWithValue(error.response.data);
        }
    }
);