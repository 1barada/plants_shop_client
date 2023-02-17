import { createAsyncThunk } from "@reduxjs/toolkit";
import { registerRequest } from "../../../../api/auth";
import IRegisterRequestData from "../../../../models/IRegisterRequestData";

export default createAsyncThunk(
    'user/registerStatus/',
    async (registerDate: IRegisterRequestData, thunkApi) => {
        try {
            const response = await registerRequest(registerDate);
            return response.data;
        } catch (error: any) {
            return thunkApi.rejectWithValue(error.response.data);
        }
    }
);