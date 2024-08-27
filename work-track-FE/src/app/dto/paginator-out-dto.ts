export interface PaginatorOutDTO<T> {

    pageNumber: number;
    itemsPerPage: number;
    columnSorterName: string;
    pages: number;
    totItems: number;
    descendingAscending: string;
    result: T[];

}
