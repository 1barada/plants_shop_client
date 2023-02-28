import IProductQuantity from "./IProductQuantity";

export default interface IUser {
    name: string,
    token: string,
    role: string,
    balance: number,
    imgUrl?: string,
    purchases: IProductQuantity[],
	shoppingCart: IProductQuantity[],
};