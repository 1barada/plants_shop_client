import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ILoginRequestData from "../../models/ILoginRequestData";
import { loginRequest, registerRequest } from "../../api/auth";
import IError from "../../models/IError";
import IRejectedResponse from "../../models/IRejectedResponse";
import IRegisterRequestData from "../../models/IRegisterRequestData";
import IUser from "../../models/IUser";

export type UserSliceType = ReturnType<typeof userSlice.reducer>;

export const initialState = {
    info: {} as IUser,
    authorized: false,
    loading: false,
    errors: [] as IError[],
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout() {
            localStorage.removeItem('user');
            return initialState;
        }
    },
    extraReducers: builder => {
        builder.addCase(login.pending, (state) => {
            state.errors = [] as IError[];
            state.loading = true;
        });
        builder.addCase(login.fulfilled, (state, {payload}: {payload: IUser}) => {
            state.info = payload;
            state.authorized = true;
            state.loading = false;
            localStorage.setItem('user', JSON.stringify(state));
        });
        builder.addCase(login.rejected, (state, action) => {
            const payload = action.payload as IRejectedResponse;
            console.error(payload)
            state.errors = payload.errors;
            state.loading = false;
        });

        builder.addCase(register.pending, (state) => {
            state.errors = [] as IError[];
            state.loading = true;
        });
        builder.addCase(register.fulfilled, (state) => {
            state.loading = false;
        });
        builder.addCase(register.rejected, (state, action) => {
            const payload = action.payload as IRejectedResponse;
            console.error(payload)
            state.errors = payload.errors;
            state.loading = false;
        });
    }
});

export const login = createAsyncThunk(
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

export const register = createAsyncThunk(
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


export const {logout} = userSlice.actions;
export default userSlice.reducer;