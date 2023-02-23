import axios from "axios";
import { baseServerURL } from "../config";
import IUser from "../models/IUser";

export const getPurchasesRequest = async (user: IUser) => {
    const response = await axios.get(
        baseServerURL + '/profile/purchases',
        {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        }
    );

    return response;
}