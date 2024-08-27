package com.example.demo.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.example.demo.dto.PaginatorDto;
import com.example.demo.dto.PaginatorOutDto;
import com.example.demo.dto.RapportiniDto;
import com.example.demo.entity.RapportiniEntity;
import com.example.demo.exception.WorkTrackServiceException;
import com.example.demo.mapper.RapportiniMapper;
import com.example.demo.repository.RapportiniRepository;
import com.example.demo.utils.Messages;

@Service
public class RapportiniService {
	@Autowired
	RapportiniRepository rapportiniRepo;

	public List<RapportiniEntity> findAll() {
		return rapportiniRepo.findAll();
	}

	public Optional<RapportiniEntity> findById(Long id) {
		return rapportiniRepo.findById(id);
	}

	// metodo che mi fa creare un rapportino
	public RapportiniDto save(RapportiniEntity rapportini) {
		// Controllo se i campi obbligatori sono nulli
		if (rapportini.getData() == null || rapportini.getData() == "") {
			throw new WorkTrackServiceException("Il campo 'data' è obbligatorio", HttpStatus.BAD_REQUEST);
		}
		if (rapportini.getCommissionatoDa() == null || rapportini.getCommissionatoDa() == "") {
			throw new WorkTrackServiceException("Il campo 'commissionatoDa' è obbligatorio", HttpStatus.BAD_REQUEST);
		}
		if (rapportini.getCliente() == null || rapportini.getCliente() == "") {
			throw new WorkTrackServiceException("Il campo 'cliente' è obbligatorio", HttpStatus.BAD_REQUEST);
		}
		if (rapportini.getDescrizione() == null || rapportini.getDescrizione() == "") {
			throw new WorkTrackServiceException("Il campo 'descrizione' è obbligatorio", HttpStatus.BAD_REQUEST);
		}
		if (rapportini.getLocalita() == null || rapportini.getLocalita() == "") {
			throw new WorkTrackServiceException("Il campo 'localita' è obbligatorio", HttpStatus.BAD_REQUEST);
		}
		if (rapportini.getOre() <= 0 && rapportini.getOreNotturne() <= 0) {
			throw new WorkTrackServiceException("Il campo 'ore' deve essere maggiore di zero", HttpStatus.BAD_REQUEST);
		}
		// nel caso ha l id vuol dire che sara un rapportino gia esistente 
		if(rapportini.getId() != null && rapportini.getUtente().isAdmin() == true) {
			// settiamo il letto boolean a false
			rapportini.setLetto(true);
		}
		else {
			// settiamo il letto boolean a true
			rapportini.setLetto(false);
		}
	
		

		// Continua con il salvataggio se tutti i campi obbligatori sono presenti
		RapportiniEntity entity = rapportiniRepo.save(rapportini);
		if (entity == null) {
			throw new WorkTrackServiceException(Messages.SALVATAGGIO_RAPPORTINO_FALLITO,
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return RapportiniMapper.toDto(entity);
	}

	public void deleteById(Long id) {
		rapportiniRepo.deleteById(id);
	}

	// metodo che mi restituisce una lista paginata di rapportini
	public PaginatorOutDto<List<RapportiniDto>> getUserRapp(PaginatorDto paginator) {
	    // Creo e inizializzo un pageable
	    Pageable pdb = createPageable(paginator);
	    String searchTerm = trimResult(paginator);
	    
	    // Eseguo la query per ottenere una pagina di rapportini
	    Page<RapportiniEntity> pg = rapportiniRepo.findByUserEmail(paginator.getUserEmail(), pdb);
	    
	    // Converto ogni RapportiniEntity in RapportiniDto
	    List<RapportiniDto> dtoList = pg.getContent().stream()
	                                     .map(RapportiniMapper::toDto)
	                                     .collect(Collectors.toList());
	    
	    // Creo l'oggetto PaginatorOutDto per la risposta
	    return createPaginatedOutputGeneric(paginator, dtoList, pg);
	}


	// metodo che mi restiuisce lista non paginata di rapp di un utente 
	public List<RapportiniDto> getUserRappByEmailNotP(String email) {
		List<RapportiniEntity> listEntity = rapportiniRepo.findRapportiniByUtente_Email(email);
		List<RapportiniDto> dtoList = new ArrayList<RapportiniDto>();
		for(RapportiniEntity entity: listEntity) {
			dtoList.add(RapportiniMapper.toDto(entity));
		}
		return dtoList;
	}
	
	
	// Metodo che mi checka il rapportino a letto 
	public RapportiniDto checkRapportino(Long idRapp) {
		RapportiniEntity entity = rapportiniRepo.findById(idRapp)
			    .orElseThrow(() -> new WorkTrackServiceException(Messages.RAPPORTINO_NON_TROVATO, HttpStatus.NOT_FOUND));
		entity.setLetto(true);
		rapportiniRepo.save(entity);
		return RapportiniMapper.toDto(entity);
	}
	
	
	
	
	//METODI PER IL PAGINATOR 
	public Pageable createPageable(PaginatorDto dtoIn) {
	    Sort.Direction direction = Sort.Direction.ASC; // Default to ascending
	    if ("desc".equalsIgnoreCase(dtoIn.getDescendingAscending())) {
	        direction = Sort.Direction.DESC;
	    }
	    Sort sort = Sort.by(new Sort.Order(direction, dtoIn.getColumnSorterName()).ignoreCase());
	    return PageRequest.of(dtoIn.getPageNumber(), dtoIn.getItemPerPage(), sort);
	}

	
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
	
	private String trimResult(PaginatorDto dtoIn) {
	    String searchTerm = dtoIn.getSearchTerm();
	    if (searchTerm != null) {
	        searchTerm = searchTerm.trim();
	    }
	    return searchTerm;
	}

	public List<RapportiniDto> getUserRappByEmail(String email) {
		// TODO Auto-generated method stub
		return null;
	}
	// metodo che mi restiuisce le ora di tutti gli utenti in base al mese e anno 
	 public List<Object[]> getUserOreByMounthAndYear(int mese, int anno) {
	        return rapportiniRepo.findTotalAndNightHoursByMonthAndYear(mese, anno);
	    }

	public List<RapportiniDto> getRappOreByMounthAndYear(int mese, int anno) {
		// TODO Auto-generated method stub
		
		List<RapportiniEntity> lista = rapportiniRepo.findRapportiniByMonthAndYear(mese, anno);
		List<RapportiniDto> listaDto = new ArrayList<RapportiniDto>();
		lista.forEach(x -> {
			listaDto.add(RapportiniMapper.toDto(x));
		});
		return listaDto;
	}

	public List<RapportiniDto> getRappOreByMounthAndYearByUserId(int mese, int anno, int userId) {
	    List<RapportiniEntity> lista = rapportiniRepo.findRapportiniByMonthAndYearAndUserId(mese, anno, userId);
	    List<RapportiniDto> listaDto = new ArrayList<>();
	    lista.forEach(x -> {
	        listaDto.add(RapportiniMapper.toDto(x));
	    });
	    return listaDto;
	}

	public List<RapportiniDto> getRappOreByMounthAndYearAndUser(String searchTerm) {
		  List<RapportiniEntity> lista = rapportiniRepo.findBySearchTerm(searchTerm);
		    List<RapportiniDto> listaDto = new ArrayList<>();
		    lista.forEach(x -> {
		        listaDto.add(RapportiniMapper.toDto(x));
		    });
		    return listaDto;
	}




}
