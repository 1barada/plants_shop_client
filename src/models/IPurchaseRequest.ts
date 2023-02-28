export default interface IPurchaseRequest {
    purchases: [{
        id: string,
        quantity: number
    }]
}