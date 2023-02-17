import IError from "./IError";

export default interface IRejectedResponse {
    errors: IError[]
}