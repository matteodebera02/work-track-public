export interface PaginatorDTO {

    pageNumber: number;
    itemPerPage: number;
    searchTerm?: string;
    descendingAscending: string;
    columnSorterName: string;
    //facoltativo 
    userEmail?: string
    totalItem: number

}