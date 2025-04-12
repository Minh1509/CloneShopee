import axios, { AxiosInstance } from 'axios'

class Http {
    instance: AxiosInstance
    constructor() {
        this.instance = axios.create({
            baseURL: "http://localhost:8080",
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json'
            }
        })
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
