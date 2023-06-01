
export type HttpMethod = 'post' | 'get' | 'put' | 'delete'

export enum HttpStatusCode {
    // eslint-disable-next-line no-unused-vars
    ok = 200,
    // eslint-disable-next-line no-unused-vars
    created = 201,
    // eslint-disable-next-line no-unused-vars
    noContent = 204,
    // eslint-disable-next-line no-unused-vars
    badRequest = 400,
    // eslint-disable-next-line no-unused-vars
    unauthorized = 401,
    // eslint-disable-next-line no-unused-vars
    forbidden = 403,
    // eslint-disable-next-line no-unused-vars
    notFound = 404,
    // eslint-disable-next-line no-unused-vars
    serverError = 500,
}

export type HttpRequest = {
    body?: any
    method: HttpMethod
    resource: string
}

export type HttpResponse<T = any> = {
    body: T
    statusCode: HttpStatusCode
}

export interface IHttpClient {
    request<T = any>(data: HttpRequest): Promise<HttpResponse<T>>
    requestFormData<T = any>(data: HttpRequest): Promise<HttpResponse<T>>
}
