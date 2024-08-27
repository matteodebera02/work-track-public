package com.example.demo.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.PaginatorDto;
import com.example.demo.dto.PaginatorOutDto;
import com.example.demo.dto.RapportiniDto;
import com.example.demo.entity.RapportiniEntity;
import com.example.demo.service.RapportiniService;

@RestController
@RequestMapping("/rapportini")
public class RapportiniController {
    @Autowired
    private RapportiniService rapportiniService;

    @GetMapping("/find-all")
    public ResponseEntity<List<RapportiniEntity>> findAll() {
        List<RapportiniEntity> rapportoni = rapportiniService.findAll();
        return new ResponseEntity<>(rapportoni, HttpStatus.OK);
    }

    @GetMapping("/get-by-id/{id}")
    public ResponseEntity<RapportiniEntity> findById(@PathVariable Long id) {
        Optional<RapportiniEntity> rapportone = rapportiniService.findById(id);
        return rapportone.map(value -> new ResponseEntity<>(value, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/save")
    public ResponseEntity<RapportiniDto> save(@RequestBody RapportiniEntity newRapportino) {
        RapportiniDto savedRapportone = rapportiniService.save(newRapportino);
        return new ResponseEntity<>(savedRapportone, HttpStatus.CREATED);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable Long id) {
        rapportiniService.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    
    // metodo che mi restiuisce la lista paginata dei rapportini di un utente 
    @PostMapping("user/rapp/paginator")
    public ResponseEntity<PaginatorOutDto<List<RapportiniDto>>> getUserRapp(@RequestBody PaginatorDto paginator){
		PaginatorOutDto<List<RapportiniDto>> listOfUserRapp= rapportiniService.getUserRapp(paginator);
		return ResponseEntity.status(HttpStatus.OK).body(listOfUserRapp);
    	
    }
    
    // metodo che mi restiuisce la lista non  paginata dei rapportini di un utente 
    @GetMapping("user/rapp/{email}")
    public ResponseEntity<List<RapportiniDto>> getUserRappByEmail(@PathVariable String email) {
        List<RapportiniDto> listOfUserRapp = rapportiniService.getUserRappByEmailNotP(email);
        return ResponseEntity.status(HttpStatus.OK).body(listOfUserRapp);
    }
    
    // metodo che mi check il rapportino a letto 
    @GetMapping("check-rapp/{idRapp}")
    public ResponseEntity<RapportiniDto> checkRapportino(@PathVariable Long idRapp) {
    	RapportiniDto rapportino = rapportiniService.checkRapportino(idRapp);
    	 return ResponseEntity.status(HttpStatus.OK).body(rapportino);
    }
    
    // metodo che mi rida la lista di utenti in base ai rapportini per mese e anno 
    @GetMapping("user-ore-{mese}/{anno}")
    public ResponseEntity<List<Object[]>> getUserOreByMounthAndYear(@PathVariable int mese, @PathVariable int anno) {
        List<Object[]> list = rapportiniService.getUserOreByMounthAndYear(mese, anno);
        return ResponseEntity.status(HttpStatus.OK).body(list);
    }
    // metodo che mi rida la lista di rapportini per ogni utente in base ai rapportini per mese e anno 
    @GetMapping("rapp-ore-{mese}/{anno}")
    public ResponseEntity<List<RapportiniDto>> getRappOreByMounthAndYear(@PathVariable int mese, @PathVariable int anno) {
        List<RapportiniDto> list = rapportiniService.getRappOreByMounthAndYear(mese, anno);
        return ResponseEntity.status(HttpStatus.OK).body(list);
    }
    
    // metodo che mi rida la lista di rapportini per un utente in base ai rapportini per mese e anno 
    @GetMapping("user-rapp-mese-{mese}/{anno}/{userId}")
    public ResponseEntity<List<RapportiniDto>> getRappOreByMounthAndYearByUserId(@PathVariable int mese, @PathVariable int anno, @PathVariable int userId) {
        List<RapportiniDto> list = rapportiniService.getRappOreByMounthAndYearByUserId(mese, anno, userId);
        return ResponseEntity.status(HttpStatus.OK).body(list);
    }
    
    // metodo che mi rida la lista di rapportini per ogni utente in base ai rapportini per mese e anno 
    @GetMapping("rapp-search/{searchTerm}")
    public ResponseEntity<List<RapportiniDto>> getRappOreByMounthAndYearAndUser(@PathVariable String searchTerm) {
        List<RapportiniDto> list = rapportiniService.getRappOreByMounthAndYearAndUser(searchTerm);
        return ResponseEntity.status(HttpStatus.OK).body(list);
    }

}


