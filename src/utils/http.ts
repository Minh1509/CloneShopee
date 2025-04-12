import axios, { AxiosError, AxiosInstance } from 'axios'
import { HttpStatusCode } from '../constants/httpStatusCode.enum';
import { toast } from 'react-toastify';

class Http {
    instance: AxiosInstance
    constructor() {
        this.instance = axios.create({
            baseURL: "http://localhost:8080/api/v1",
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json'
            }
        })
        this.instance.interceptors.response.use(function (response) {
            return response;
        }, function (error: AxiosError) {
            if (error.response?.status !== HttpStatusCode.UNPROCESSABLE_ENTITY) {
                const data: any | undefined = error.response?.data
                const message = data.message || error.message
                toast.error(message)
            }
            return Promise.reject(error);
        });

    }
    get<T>(url: string, params?: any) {
        return this.instance.get<T>(url, { params });
    }

    post<T>(url: string, data?: any) {
        return this.instance.post<T>(url, data);
    }

    put<T>(url: string, data?: any) {
        return this.instance.put<T>(url, data);
    }

    patch<T>(url: string, data?: any) {
        return this.instance.patch<T>(url, data);
    }

    delete<T>(url: string) {
        return this.instance.delete<T>(url);
    }
}

const http = new Http()
export default http;
