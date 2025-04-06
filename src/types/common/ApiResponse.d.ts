// 基础响应类型
export interface ApiResponse<T = unknown> {
  status: 'success' | 'error';
  code: number;
  data: T;
  message?: string;
  timestamp?: number;
}

