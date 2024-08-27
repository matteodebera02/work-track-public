import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RapportiniDto } from '../dto/rapportino-dto';
import { Observable, ObservedValueOf } from 'rxjs';
import { PaginatorDTO } from '../dto/paginator-dto';
import { PaginatorOutDTO } from '../dto/paginator-out-dto';
import { UtenteOreTotDto } from '../dto/utente-ore-tot-dto';

@Injectable({
  providedIn: 'root'
})
export class RapportiniService {
  baseUrl: string = "http://localhost:8080/";

  constructor(private http: HttpClient) { }

  // metodo per creare un nuovo rapportino 
  createRapportino(newRapportino: RapportiniDto): Observable<RapportiniDto>{
    return this.http.post<RapportiniDto>(this.baseUrl + "rapportini/save", newRapportino);
  }

  // metodo che mi restiuisce una lista di rapportini paginati dell utente 
  getUserRapportini(paginator: PaginatorDTO): Observable<RapportiniDto[]> {
    return this.http.post<RapportiniDto[]>(this.baseUrl + "rapportini/user/rapp/paginator", paginator);
}

// metodo che mi restiuisce la lista non paginata dei rapportini di un utente tramite email
getUserRapportiniByEmail(email: string): Observable<RapportiniDto[]> {
  return this.http.get<RapportiniDto[]>(this.baseUrl + "rapportini/user/rapp/" + email);
}

// metodo che mi restiuisce il rapportino dato il suo id 
getRapportinoById(idRapp: number): Observable<RapportiniDto> {
  return this.http.get<RapportiniDto>(this.baseUrl+ "rapportini/get-by-id/" +idRapp)
}

// metodo che mi restiuisce tutti i rapportini ù
findAll(): Observable<RapportiniDto[]> {
  return this.http.get<RapportiniDto[]>(this.baseUrl+"rapportini/find-all")
}

// metodo che mi setta il rapportino a letto 
checkRapp(idRapp: number): Observable<RapportiniDto> {
  return this.http.get<RapportiniDto>(this.baseUrl+"rapportini/check-rapp/" + idRapp)
}

// metodo che mi restituisce la lista di utenti con le ore ore totali in base al mese 
getUserOreByMounthAndYear(mese: number, anno: number): Observable<UtenteOreTotDto[]> {
  return this.http.get<UtenteOreTotDto[]>(`${this.baseUrl}rapportini/user-ore-${mese}/${anno}`);
}

// metodo che mi restituisce la lista di rapportini  in base a mese e anno 
getRappByMounthAndYear(mese: number, anno: number): Observable<RapportiniDto[]> {
  return this.http.get<RapportiniDto[]>(`${this.baseUrl}rapportini/rapp-ore-${mese}/${anno}`);
}

// metodo che mi restituisce la lista di rapportini  in base a mese e anno 
getRappByMounthAndYearAndUserId(mese: number, anno: number, userId: number): Observable<RapportiniDto[]> {
  return this.http.get<RapportiniDto[]>(`${this.baseUrl}rapportini/user-rapp-mese-${mese}/${anno}/${userId}`);
}
// metodo che mi restituisce la lista di rapportini  in base a mese e anno e serachterm per la barra di ricerca 
getRappBySearchTerm(searchTerm: string): Observable<RapportiniDto[]> {
  return this.http.get<RapportiniDto[]>(`${this.baseUrl}rapportini/rapp-search/${searchTerm}`);
}

}
