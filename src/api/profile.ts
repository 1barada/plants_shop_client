import axios from "axios";
import { baseServerURL } from "../config";
import IUser from "../models/IUser";

export const getShoppingCartRequest = async (user: IUser) => {
    const response = await axios.get(
        baseServerURL + '/profile/shoppingCart',
        {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        }
    );

    return response;
}

export const removeFromShoppingCartRequest = async (user: IUser, productId: string) => {
    const response = await axios.delete(
        baseServerURL + '/profile/shoppingCart/' + productId,
        {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        }
    );

    return response;
}

export const addToShoppingCartRequest = async (user: IUser, productId: string) => {
    const response = await axios({
        method: 'patch',
        url: baseServerURL + '/profile/shoppingCart/' + productId,
        headers: {
            Authorization: `Bearer ${user.token}`
        }
    });

    return response;
}

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