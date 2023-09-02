
export interface Response {
    orderingColumns: Array<any>,
    orderingBy: Array<any>,
    result: Array<any>,
    total: number
    currentPage?: number
    pageSize?: number
    offset?: number
    totalPages?: number,
    prevPage: number | null,
    nextPage: number | null
  }