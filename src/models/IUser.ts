import IProduct from "./IProduct";
import IQuantity from "./IQuantity";

export default interface IUser {
    name: string,
    token: string,
    role: string,
    balance: number,
    imgUrl?: string,
    purchases: (IProduct & IQuantity)[],
	shoppingCart: (IProduct & IQuantity)[],
};