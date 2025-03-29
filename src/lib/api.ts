// app/lib/api.ts
import axios, { AxiosRequestConfig } from "axios";
import type { Response } from "@/types/common/Response";
const axiosInstance = axios.create({
  baseURL: process.env.baseURL ?? "http://localhost:5000/api",
  timeout: 10000,
});

// 请求拦截器保持不变
axiosInstance.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem(
    "access_token"
  )}`;
  return config;
});

// 修改后的响应拦截器
axiosInstance.interceptors.response.use(
  (response) => {
    // 假设后端返回结构已经是 Response<T> 格式
    const backendResponse = response.data as Response;

    // 验证后端响应结构
    if (
      typeof backendResponse !== "object" ||
      backendResponse.code === undefined ||
      backendResponse.data === undefined
    ) {
      throw new Error("Invalid backend response structure");
    }

    // 直接返回后端结构（不再额外包装）
    return {
      ...response,
      data: backendResponse, // 保持后端原始结构
    };
  },
  (error) => {
    // 错误处理（兼容后端错误格式）
    const backendError = error.response?.data as Response | undefined;

    return Promise.reject(
      Object.assign(new Error(backendError?.message ?? error.message), {
        status: "error",
        code: backendError?.code ?? error.response?.status ?? 500,
        data: backendError?.data ?? null,
        timestamp: Date.now(),
      } satisfies Response)
    );
  }
);

export const request = {
  // GET 请求（带查询参数）
  get: <T>(url: string, params?: object, config?: AxiosRequestConfig) =>
    axiosInstance.get<Response<T>>(url, { params, ...config }),

  // POST 请求（JSON 主体）
  post: <T, D = Record<string, unknown>>(url: string, data?: D, config?: AxiosRequestConfig) =>
    axiosInstance.post<Response<T>>(url, data, config),

  // PUT 请求（全量更新）
  put: <T, D = Record<string, unknown>>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ) => axiosInstance.put<Response<T>>(url, data, config),

  // PATCH 请求（部分更新）
  patch: <T, D = Record<string, unknown>>(url: string, data?: D, config?: AxiosRequestConfig) =>
    axiosInstance.patch<Response<T>>(url, data, config),

  // DELETE 请求
  delete: <T>(url: string, config?: AxiosRequestConfig) =>
    axiosInstance.delete<Response<T>>(url, config),

  // 文件上传（multipart/form-data）
  upload: <T>(url: string, file: File, fieldName = "file") => {
    const formData = new FormData();
    formData.append(fieldName, file);
    return axiosInstance.post<Response<T>>(url, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  // 文件下载（返回 Blob）
  download: (url: string, params?: object) =>
    axiosInstance.get(url, {
      params,
      responseType: "blob",
      transformResponse: [(data) => data], // 跳过 JSON 解析
    }),

  // 带取消令牌的请求
  withCancelToken: <T>() => {
    const cancelToken = axios.CancelToken.source();
    const request = (config: AxiosRequestConfig) => ({
      request: axiosInstance({
        ...config,
        cancelToken: cancelToken.token,
      }) as Promise<AxiosResponse<Response<T>>>,
      cancel: cancelToken.cancel,
    });
    return request;
  },

  // 并发请求
  all: <T>(requests: Promise<AxiosResponse<Response<T>>>[]) =>
    axios.all(requests),

  // 自定义请求（原始 Axios 实例）
  raw: axiosInstance,
};
