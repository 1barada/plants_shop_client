export default interface IUser {
    username: string,
    token: string,
    role: string,
    balance: number,
    purchases: string[],
	shoppingCart: string[]
};