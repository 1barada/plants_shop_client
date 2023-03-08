import axios from "axios";
import { baseServerURL } from "../config";
import IPurchaseRequest from "../models/IPurchaseRequest";
import IUser from "../models/IUser";

export const profileInfoRequest = async (user: IUser) => {
    const response = await axios.get(
        baseServerURL + '/profile',
        {
            headers: {
                Authorization: `Bearer ${user.token}`
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
                Authorization: `Bearer ${user.token}`
            }
        }
    );

    return response;
}

export const purchaseRequest = async (user: IUser, purchaseData: IPurchaseRequest) => {
    const response = await axios.patch(
        baseServerURL + '/profile/purchases',
        purchaseData,
        {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        }
    );

    return response;
}