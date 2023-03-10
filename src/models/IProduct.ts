export default interface IProduct {
    id: string,
    title: string,
    description: string,
    price: number,
    imgUrl?: string,
    weight?: number,
    height?: number,
    isInShoppingCart: boolean,
    needs: {
        water: string,
        soil: string,
        sun: string
    }
};