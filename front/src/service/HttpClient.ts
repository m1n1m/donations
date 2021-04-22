import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import HttpResponse from "@/service/HttpResponse";

const ARI_URL = 'http://localhost:3000'

export class HttpClient {
    private axios: AxiosInstance;

    private tokenExpiryListeners: { (): void }[] = [];

    constructor() {
        this.tokenExpiryListeners = [];

        this.axios = axios.create({
            baseURL: ARI_URL,
            responseType: 'json',
            headers: {
                'content-type': 'application/json',
            },
        });
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    get<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<HttpResponse> {
        return this.axios
            .get(url, config)
            .then((response: any) => {
                return new HttpResponse(response.data);
            })
            .catch((error: any) => {
                return new HttpResponse(undefined, error);
            });
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    delete<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<HttpResponse> {
        return this.axios
            .delete(url, config)
            .then((response: any) => {
                return new HttpResponse(response.data);
            })
            .catch((error: any) => {
                return new HttpResponse(undefined, error);
            });
    }

    head<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
        return this.axios.head(url, config);
    }

    options<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
        return this.axios.options(url, config);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    post<T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<HttpResponse> {
        return this.axios
            .post(url, data, config)
            .then((response: any) => {
                return new HttpResponse(response.data);
            })
            .catch((error: any) => {
                return new HttpResponse(undefined, error);
            });
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    put<T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<HttpResponse> {
        return this.axios
            .put(url, data, config)
            .then((response: any) => {
                return new HttpResponse(response.data);
            })
            .catch((error: any) => {
                return new HttpResponse(undefined, error);
            });
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    patch<T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<HttpResponse> {
        return this.axios
            .patch(url, data, config)
            .then((response: any) => {
                return new HttpResponse(response.data);
            })
            .catch((error: any) => {
                return new HttpResponse(undefined, error);
            });
    }
}

const httpClient = new HttpClient();
export default httpClient;
