package com.example.demo.utils;

import java.awt.print.Pageable;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;

import com.example.demo.dto.PaginatorDto;
import com.example.demo.dto.PaginatorOutDto;

public class Paginator {
	public <T, V> PaginatorOutDto<List<T>> createPaginatedOutputGeneric(PaginatorDto dtoIn, List<T> lst,
			Page<V> pg) {
		PaginatorOutDto<List<T>> pdtout = new PaginatorOutDto<>();
		pdtout.setColumnSorterName(dtoIn.getColumnSorterName());
		pdtout.setDescendingAscending(dtoIn.getDescendingAscending());
		pdtout.setResult(lst);
		pdtout.setPages(pg.getTotalPages());
		pdtout.setTotItems(pg.getTotalElements());
		pdtout.setItemsPerPage(pg.getNumberOfElements());
		pdtout.setPageNumber(pg.getNumber());
		return pdtout;
	}
	
	public  Pageable createPageable(PaginatorDto dtoIn) {
		// Creo e inizializzo un pageable
		Pageable pdb = null;
		// verifico l'ordinamento asc o desc
		String ascendingOrDescending = dtoIn.getDescendingAscending();
		if (ascendingOrDescending == null
				|| ascendingOrDescending.toLowerCase().equals(Costants.ASCENDING.toLowerCase())) {
			Sort sortOrderIgnoreCase = Sort.by(new Sort.Order(Direction.ASC, dtoIn.getColumnSorterName()).ignoreCase());
			pdb = (Pageable) PageRequest.of(dtoIn.getPageNumber(), dtoIn.getItemPerPage(), sortOrderIgnoreCase);
		} else {
			Sort sortOrderIgnoreCase = Sort
					.by(new Sort.Order(Direction.DESC, dtoIn.getColumnSorterName()).ignoreCase());
			pdb = (Pageable) PageRequest.of(dtoIn.getPageNumber(), dtoIn.getItemPerPage(), sortOrderIgnoreCase);
		}
		return pdb;
	}
	
	
}
