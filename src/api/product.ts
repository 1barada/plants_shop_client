import axios from "axios";
import { baseServerURL } from "../config";
import IProductForm from "../models/IProductForm";
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

export const getProductByIdRequest = async (id: string) => {
    let urlReq = baseServerURL + '/product/' + id;

    const response = await axios.get(
        urlReq
    );

    return response;
};

export const createProductRequest = async (product: IProductForm, user: IUser) => {
    const body = new FormData();
    body.append('title', product.title);
    body.append('description', product.description);
    body.append('price', product.price.toString());
    if (product.img) body.append('img', product.img);
    if (product.weight) body.append('weight', product.weight.toString());
    if (product.height) body.append('height', product.height.toString());
    body.append('needs.water', product.needs.water);
    body.append('needs.soil', product.needs.soil);
    body.append('needs.sun', product.needs.sun);

    const response = await axios.post(
        baseServerURL + '/product',
        product, 
        {
            headers: {
                Authorization: `Bearer ${user.token}`,
                'content-type': 'multipart/form-data'
            }
        }
    );

    return response;
};