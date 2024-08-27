package com.example.demo.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class PaginatorDto {
	private int pageNumber;
	private int itemPerPage = 10;
	private String columnSorterName;
	private String descendingAscending;
	private String searchTerm;
	private String userEmail;

	public PaginatorDto(int pageNumber, int itemPerPage, String columnSorterName, String descendingAscending) {
		this.pageNumber = pageNumber;
		this.itemPerPage = itemPerPage;
		this.columnSorterName = columnSorterName;
		this.descendingAscending = descendingAscending;
	}
}
