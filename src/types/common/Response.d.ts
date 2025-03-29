// 返回类型
export interface Response<T = unknown> {
    status: 'success' | 'error';
    code: number;
    data: T;
    message?: string;
    timestamp?: number;
  }
  // 分页数据扩展类型
export interface PaginatedResponse<T> extends Response<{
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}> {
  hasNextPage: boolean; // 是否有下一页
  hasPreviousPage: boolean; // 是否有上一页
}