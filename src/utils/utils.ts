import axios, { AxiosError } from "axios";
import { HttpStatusCode } from "../constants/httpStatusCode.enum";


export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
    return axios.isAxiosError(error)
}

export function isAxiosUnprocessableEntityError<FormError>(error: unknown): error is AxiosError<FormError> {
    return isAxiosError(error) && error.response?.status === HttpStatusCode.UNPROCESSABLE_ENTITY
}

