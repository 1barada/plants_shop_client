import IProduct from "./IProduct";

export default interface IGetPageResponse{
    items: IProduct[],
    totalPages: number
}