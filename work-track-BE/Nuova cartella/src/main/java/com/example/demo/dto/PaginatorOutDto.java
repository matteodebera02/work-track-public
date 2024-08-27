package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class PaginatorOutDto<T> {
	
	private int pageNumber;
	private int itemsPerPage = 1;
	private String columnSorterName;
	private String descendingAscending;
	private int pages = 1;
	private long totItems;
	private T result;
	
	public void setItemsPerPage(int itemsPerPage) {
		if (itemsPerPage > 0) {
			this.itemsPerPage = itemsPerPage;
		} else {
			this.itemsPerPage = 1;
		}
	}
	public void setDescendingAscending(String descendingAscending) {
		this.descendingAscending = descendingAscending;
	}
	public void setPages(int pages) {
		if (pages > 0) {
			this.pages = pages;
		} else {
			this.pages = 1;
		}
	}
}
