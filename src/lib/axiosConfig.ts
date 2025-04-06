import axios, { type AxiosResponse, type InternalAxiosRequestConfig, AxiosError } from "axios";
import type { ApiResponse } from "@/types/common/ApiResponse";

// 公共 API（无 Token）
export const publicApiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://localhost:5000/api",
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

// 需要 Token 的 API
export const authApiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://localhost:5000/api",
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

// 专门用于文件上传/下载的 API
export const fileApiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://localhost:5000/api",
  timeout: 30000, // ⏳ 文件请求通常需要更长的超时时间
  responseType: "blob", // ⬇️ 处理文件流数据
});

// 处理 accessToken
const attachToken = (config: InternalAxiosRequestConfig) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // 使用 set() 方法有误，应该直接设置 headers 对象的值
    }
  }
  return config;
};

// 拦截请求，给 `authApiClient` 和 `fileApiClient` 自动加 Token
authApiClient.interceptors.request.use(attachToken);
fileApiClient.interceptors.request.use(attachToken);

// 统一处理后端 `ApiResponse<T>` 结构（仅用于 JSON 响应）
const handleResponse = <T>(response: AxiosResponse<ApiResponse<T>>) => {
  const { data } = response;
  if (data.status === "success") {
    return data.data; // 返回解析后的数据
  }
  return Promise.reject(new Error(data.message ?? "请求失败")); // 如果返回的状态不是成功，抛出错误
};

// 错误拦截器，用于捕获并处理请求/响应中的错误
const handleError = (error: AxiosError) => {
  if (error.response) {
    // 服务器返回了响应
    console.error("API Error Response:", error.response);
    const errorMessage = (error.response?.data as { message?: string })?.message ?? "请求失败";
    return Promise.reject(new Error(errorMessage)); // 返回统一的错误信息
  } else if (error.request) {
    // 请求已经发出，但没有收到响应
    console.error("API Error Request:", error.request);
    return Promise.reject(new Error("请求没有收到响应"));
  } else {
    // 发生了其他错误
    console.error("API Error:", error.message);
    return Promise.reject(new Error("请求出错"));
  }
};

// 处理 `publicApiClient` 和 `authApiClient` 的响应
publicApiClient.interceptors.response.use(handleResponse, handleError);
authApiClient.interceptors.response.use(handleResponse, handleError);

// 只需要处理响应体为文件流的 `fileApiClient`
fileApiClient.interceptors.response.use(
  (response: AxiosResponse) => response.data, // 直接返回文件流数据
  handleError // 错误处理
);
