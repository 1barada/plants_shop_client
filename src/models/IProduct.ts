export default interface IProduct {
    id: string,
    title: string,
    description: string,
    price: number,
    imageUrl?: string,
    weight?: number,
    height?: number,
    isInShoopingCart: boolean,
    needs?: {
        water?: string,
        soil?: string,
        sun?: string
    }
};