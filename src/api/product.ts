import axios from "axios";
import { baseServerURL } from "../config";
import IProduct from "../models/IProduct";
import ISearchInfo from "../models/ISearchInfo";
import IUser from "../models/IUser";

export const getProductsRequest = async (page: number, searchParams?: ISearchInfo) => {
    let urlReq = baseServerURL + '/product?page=' + page;
    if (searchParams) {
        const queryParams = new URLSearchParams({...searchParams} as Record<string, string>).toString();
        urlReq += '&' + queryParams;
    }

    const response = await axios.get(
        urlReq
    );

    return response;
};

export const createProductRequest = async (product: IProduct, user: IUser) => {
    const response = await axios.post(
        baseServerURL + '/product',
        product, {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        }
    );

    return response;
};