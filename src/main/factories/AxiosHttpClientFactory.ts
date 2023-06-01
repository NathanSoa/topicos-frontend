import { AxiosHttpClient } from "@infra/http/axiosAdapter";
import { IHttpClient } from "@main/api/api.interface";

export const getAxiosHttpClient = (): IHttpClient => {
    return new AxiosHttpClient()
}