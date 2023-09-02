export interface Query {
    product_id?: number;
    account_id: number;
    currentPage: number;
    pageSize?: number;
    startDate?: string;
    endDate?: string;
    orderBy?: string;
    orderByDirection?: string;
    searchTerm?: string;
}
