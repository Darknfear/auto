export interface IPagination<T> {
  items: T[];
  readonly total: number;
}
