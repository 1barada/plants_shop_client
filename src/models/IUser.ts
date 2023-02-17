import IProduct from "./IProduct";

export default interface IUser {
    name: string,
    token: string,
    role: string,
    balance: number,
    imgUrl?: string,
    purchases: IProduct[],
	shoppingCart: IProduct[]
};