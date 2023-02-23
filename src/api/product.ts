import axios from "axios";
import { baseServerURL } from "../config";
import IProduct from "../models/IProduct";
import ISearchInfo from "../models/ISearchInfo";
import IUser from "../models/IUser";

export const getAllProductsRequest = async (page: number) => {
    const response = await axios.get(
        baseServerURL + '/product?page=' + page
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

export const searchProdcutsRequest = async (params: ISearchInfo) => {
    const queryParams = new URLSearchParams({...params} as Record<string, string>).toString();

    const response = await axios.get(
        baseServerURL + '/product/search?' + queryParams
    );

    return response;
}