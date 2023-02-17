import axios from "axios";
import { baseServerURL } from "../config";
import IUser from "../models/IUser";

export const getShoppingCartRequest = async (user: IUser) => {
    const response = await axios.get(
        baseServerURL + '/profile/shoppingCart',
        {
            headers: {
                Authorization: `${user.token}`
            }
        }
    );

    return response;
}

export const getPurchasesRequest = async (user: IUser) => {
    const response = await axios.get(
        baseServerURL + '/profile/purchases',
        {
            headers: {
                Authorization: `${user.token}`
            }
        }
    );

    return response;
}