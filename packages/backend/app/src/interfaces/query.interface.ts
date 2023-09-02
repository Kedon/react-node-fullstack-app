export interface Query {
    currentPage: number;
    pageSize?: number;
    startDate?: string;
    endDate?: string;
    orderBy?: string;
    orderByDirection?: string;
    searchTerm?: string;
}
