import { instance } from "@main/config/axiosConfig"
import { HttpRequest, HttpResponse, IHttpClient } from "@main/api/api.interface"

import { AxiosResponse, AxiosError } from "axios"

export class AxiosHttpClient implements IHttpClient {
    async request<T>(data: HttpRequest): Promise<HttpResponse<T>> {
      const response: HttpResponse<T> = await instance
        .request({
          url: data.resource,
          method: data.method,
          data: data.body,
        })
        .then((axiosResponse: AxiosResponse) => {
          return {
            body: axiosResponse.data?.body ?? axiosResponse.data,
            statusCode: axiosResponse.status,
          }
        })
        .catch((axiosError: AxiosError) => {
          const code = axiosError.response?.status
            ? axiosError.response.status
            : 500
          return {
            statusCode: code,
            body: axiosError.response
              ? axiosError.response.data
              : (undefined as any),
          }
        })
      return response
    }

    async requestFormData<T>(data: HttpRequest): Promise<HttpResponse<T>> {
        const response: HttpResponse<T> = await instance
        .request({
          url: data.resource,
          method: data.method,
          data: data.body,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((axiosResponse: AxiosResponse) => {
          return {
            body: axiosResponse.data?.body ?? axiosResponse.data,
            statusCode: axiosResponse.status,
          }
        })
        .catch((axiosError: AxiosError) => {
          const code = axiosError.response?.status
            ? axiosError.response.status
            : 500
          return {
            statusCode: code,
            body: axiosError.response
              ? axiosError.response.data
              : (undefined as any),
          }
        })
      return response
    }
  }
  