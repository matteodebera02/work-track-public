package com.example.demo.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.demo.dto.UtenteDto;
import com.example.demo.entity.UtenteEntity;
import com.example.demo.exception.WorkTrackServiceException;
import com.example.demo.mapper.UtenteMapper;
import com.example.demo.repository.UtenteRepository;
import com.example.demo.utils.Messages;

@Service
public class UtenteService {
	@Autowired
	UtenteRepository utenteRepository;

	public List<UtenteEntity> findAll() {
		return utenteRepository.findAll();
	}

	public UtenteEntity findById(Long id) {
		UtenteEntity u = utenteRepository.findById(id)
				.orElseThrow(() -> new WorkTrackServiceException("Utente non trovato ", HttpStatus.BAD_REQUEST));
		return u;
	}

	public UtenteEntity save(UtenteEntity utente) {
		return utenteRepository.save(utente);
	}

	public UtenteEntity deleteById(Long id) {
		 UtenteEntity entity = utenteRepository.findById(id)
		            .orElseThrow(() -> new WorkTrackServiceException(Messages.UTENTE_NON_TROVATO));    
		utenteRepository.deleteById(id);
		return entity;
	}

	// METODO DI LOGIN
	public UtenteDto login(UtenteDto utenteDto) {
		// Cerchiamo nel repository se esiste un utente con questa email
		UtenteEntity entity = utenteRepository.findByEmail(utenteDto.getEmail())
				.orElseThrow(() -> new WorkTrackServiceException(Messages.EMAIL_NON_TROVATA, HttpStatus.BAD_REQUEST));

		// Verifica se la password fornita corrisponde alla password dell'utente trovato
		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
		if (!encoder.matches(utenteDto.getPassword(), entity.getPassword())) {
			throw new WorkTrackServiceException(Messages.PASSWORD_SBAGLIATA, HttpStatus.BAD_REQUEST);
		}

		// Convertiamo l'entità in un DTO e lo restituiamo
		return convertToDto(entity);
	}

	// METODO DI REGISTRAZIONE
	public UtenteDto register(UtenteDto utenteDto) {
		// Controlla se esiste già un utente con la stessa email
		if (utenteRepository.findByEmail(utenteDto.getEmail()).isPresent()) {
			throw new WorkTrackServiceException(Messages.EMAIL_IN_USE, HttpStatus.BAD_REQUEST);
		} else {
			// Cripta la password prima di salvarla nel database
			String hashedPassword = encryptPassword(utenteDto.getPassword());

			// Converte il DTO in un'entità e imposta la password criptata
			UtenteEntity entity = convertToEntity(utenteDto);
			entity.setPassword(hashedPassword);
			
			// settiamo l admin a falso e active a falso alla registrazione 
			entity.setActive(false);
			entity.setAdmin(false);

			// Salva l'entità nel repository
			utenteRepository.save(entity);

			// Rimuove la password dal DTO prima di restituirlo al frontend
			utenteDto.setPassword(null);

			// Restituisce il DTO registrato
			return utenteDto;
		}
	}
	
	// metodo che mi trova l utente tramite l email 
    public UtenteDto findByEmail(String email) {
        UtenteEntity entity =  utenteRepository.findByEmail(email)
                .orElseThrow(() -> new WorkTrackServiceException(Messages.UTENTE_NON_TROVATO, HttpStatus.BAD_REQUEST));
        return convertToDto(entity);
    }

	// Metodo per criptare la password
	private String encryptPassword(String password) {
		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
		return encoder.encode(password);
	}
	
	
	
	// metodo di edit del profilo 
	public UtenteDto updateProfile(UtenteDto utenteDto) {
	    // Trova l'utente esistente nel database
	    Optional<UtenteEntity> optionalUtente = utenteRepository.findById(utenteDto.getId());
	    if (!optionalUtente.isPresent()) {
	        throw new WorkTrackServiceException(Messages.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
	    }

	    UtenteEntity entity = optionalUtente.get();

	    // Se l'email viene modificata, controlla se la nuova email è già in uso
	    if (!entity.getEmail().equals(utenteDto.getEmail())) {
	        if (utenteRepository.findByEmail(utenteDto.getEmail()).isPresent()) {
	            throw new WorkTrackServiceException(Messages.EMAIL_IN_USE, HttpStatus.BAD_REQUEST);
	        }
	        entity.setEmail(utenteDto.getEmail());
	    }

	    // Cripta la nuova password se viene fornita
	    if (utenteDto.getPassword() != null && !utenteDto.getPassword().isEmpty()) {
	        String hashedPassword = encryptPassword(utenteDto.getPassword());
	        entity.setPassword(hashedPassword);
	    }

	    // Aggiorna altri dettagli del profilo
	    entity.setNome(utenteDto.getNome());
	    entity.setCognome(utenteDto.getCognome());
	    // Aggiorna altri campi se necessari
	    // entity.setAltroCampo(utenteDto.getAltroCampo());

	    // Salva l'entità aggiornata nel repository
	    utenteRepository.save(entity);

	    // Rimuove la password dal DTO prima di restituirlo al frontend
	    utenteDto.setPassword(null);

	    // Restituisce il DTO aggiornato
	    return utenteDto;
	}


	// Metodo per convertire un'entità in un DTO
	private UtenteDto convertToDto(UtenteEntity entity) {
		UtenteDto dto = new UtenteDto();
		// Copia i campi dall'entità al DTO
		dto.setId(entity.getId());
		dto.setNome(entity.getNome());
		dto.setCognome(entity.getCognome());
		dto.setEmail(entity.getEmail());
		dto.setPassword(entity.getPassword());
		dto.setAdmin(entity.isAdmin());
		dto.setActive(entity.isActive());		
		return dto;
	}

	// Metodo per convertire un DTO in un'entità
	private UtenteEntity convertToEntity(UtenteDto dto) {
		UtenteEntity entity = new UtenteEntity();
		entity.setId(dto.getId());
		entity.setNome(dto.getNome());
		entity.setCognome(dto.getCognome());
		entity.setEmail(dto.getEmail());
		entity.setPassword(dto.getPassword());
		entity.setAdmin(dto.isAdmin());
		entity.setActive(dto.isActive());
		return entity;
	}
	// metodo che mi restiuisce la lista di utenti non ancora cettati 
	public List<UtenteDto> getAllNotAceptUser() {
		boolean active = false;
		List<UtenteEntity> listaEntity  = utenteRepository.findByActive(active);
		List<UtenteDto> listaDto = new ArrayList<UtenteDto>();
		listaEntity.forEach(x -> { 
			 listaDto.add(UtenteMapper.toDto(x));
		});
		 return listaDto;
	}
	
	
	// metodo che mi acetta un utente 
	public UtenteDto acceptUser(Long id) {
	    UtenteEntity entity = utenteRepository.findById(id)
	            .orElseThrow(() -> new WorkTrackServiceException(Messages.UTENTE_NON_TROVATO));    
	   entity.setActive(true);
	   utenteRepository.save(entity);
	    // Ritorna un oggetto UtenteDto, potenzialmente contenente informazioni aggiornate sull'utente accettato
	    return convertToDto(entity);
	}

}
