import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { UtenteDto } from "../dto/utente-dto";

@Injectable({
  providedIn: 'root'
})
export class UtenteService {


  baseUrl: string = "http://localhost:8080/";
  constructor(private http: HttpClient) {}

  // Metodo per il login 
  public login(utenteDto: UtenteDto): Observable<UtenteDto> {
    return this.http.post<UtenteDto>(this.baseUrl + 'utenti/login', utenteDto);
  }

  // Metodo per la registrazione 
  public register(utenteDto: UtenteDto): Observable<UtenteDto> {
    return this.http.post<UtenteDto>(this.baseUrl + 'utenti/register', utenteDto);
  }

    // Metodo per l edit  
    public edit(utenteDto: UtenteDto): Observable<UtenteDto> {
      return this.http.post<UtenteDto>(this.baseUrl + 'utenti/edit', utenteDto);
    }

  // Metodo per trovare l'utente per email
  public findByEmail(email: string): Observable<UtenteDto> {
    return this.http.get<UtenteDto>(this.baseUrl + 'utenti/find-by-email/' + email);
  }
  // metodo che mi restiuisce la lista di utenti non acettati 
  public gettAllUserNotAcept(): Observable<UtenteDto[]>{
    return this.http.get<UtenteDto[]>(this.baseUrl + 'utenti/find-all-not-acept-user');
  }

  // metodo che mi acetta un utente 
  public aceptUser(id: number): Observable<UtenteDto>{
    return this.http.get<UtenteDto>(this.baseUrl + 'utenti/acept-user/' + id);
  }
  // metodo che mi cancella un utente 
  public deleteUserById(id: number) : Observable<UtenteDto>{
    return this.http.get<UtenteDto>(this.baseUrl + 'utenti/delete-by-id/' + id);
  }

  
}
