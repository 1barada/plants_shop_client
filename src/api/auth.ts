import axios from "axios";
import { baseServerURL } from "../config";
import ILoginRequest from "../models/ILoginRequestData";
import IRegisterRequest from "../models/IRegisterRequestData";

export const loginRequest = async (loginData: ILoginRequest) => {
    const response = await axios.post(
        baseServerURL + '/auth/login',
        loginData
    );

    return response;
};

export const registerRequest = async (registerData: IRegisterRequest) => {
    const response = await axios.post(
        baseServerURL + '/auth/register',
        registerData
    );

    return response;
};