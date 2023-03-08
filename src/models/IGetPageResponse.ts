import IMaxValues from "./IMaxValues";
import IProduct from "./IProduct";

export default interface IGetPageResponse{
    items: IProduct[],
    totalPages: number,
    page: number,
    maxValues: IMaxValues
}