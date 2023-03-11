export default interface IProductForm {
    title: string,
    description: string,
    price: number,
    img?: Blob | null,
    weight?: number,
    height?: number,
    needs: {
        water: string,
        soil: string,
        sun: string
    }
}