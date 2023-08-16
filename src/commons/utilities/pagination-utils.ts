import { ListRequestDto } from '@common/dtos/list.request.dto';
import { ClassConstructor, plainToInstance } from 'class-transformer';

export interface PagingResponse {
  offset: number;
  limit: number;
  page: number;
  keyword: string;
}

export const PAGING_KEYS = ['offset', 'limit', 'page', 'keyword', 'sortBy', 'sortType'];

export function getFilterParamsQuery<T>(query: ListRequestDto) {
  const { page, keyword, size, ...others } = query;
  const _page = page && page > 0 ? Number(page) : 1;
  const _keyword = keyword || '';
  const _limit = size && size > 0 ? Number(size) : 10;
  const _offset = _limit * (_page - 1);
  return {
    offset: _offset | 0,
    limit: _limit,
    page: _page,
    keyword: _keyword,
    ...others,
  } as PagingResponse & Omit<T, 'size'>;
}

export function plainToPagingResponse<T>(
  cls: ClassConstructor<T>,
  paging: PagingResponse,
  response: { total: number; data: T[] },
) {
  const { page, limit } = paging;
  const { total, data } = response;

  const dataInstance = plainToInstance(cls, data, { excludeExtraneousValues: true });

  return {
    data: dataInstance,
    currentPage: page,
    totalPage: Math.ceil(total / limit),
    pageSize: limit,
    totalRecord: total,
  };
}
