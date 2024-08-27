import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ComunicazioniDto } from "../dto/comunicazione-dto";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class ComunicazoniService {
    baseUrl: string = "http://localhost:8080/";

    constructor(private http: HttpClient) { }

    // metodo per creare una nuova comunicazione  
    createComunicazione(newComunicazione: ComunicazioniDto): Observable<ComunicazioniDto> {
        return this.http.post<ComunicazioniDto>(this.baseUrl + "comunicazioni/save", newComunicazione);
    }

    // metodo per creare tutte le comunicazioni
    getAll(): Observable<ComunicazioniDto[]> {
        return this.http.get<ComunicazioniDto[]>(this.baseUrl + "comunicazioni/find-all");
    }

    // metodo per creare tutte le comunicazioni
    deleteById(id: number): Observable<ComunicazioniDto> {
        return this.http.get<ComunicazioniDto>(`${this.baseUrl}comunicazioni/delete-by-id/${id}`);
    }
}