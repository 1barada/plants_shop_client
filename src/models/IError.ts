export default interface IError {
    status: number,
    message: string,
    detail?: string,
    type?: string,
    instance?: string
}