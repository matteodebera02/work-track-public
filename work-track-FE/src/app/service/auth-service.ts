import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UtenteDto } from '../dto/utente-dto';
import * as jsonwebtoken from 'jsonwebtoken'; // Importa la libreria jsonwebtoken
import { Route, Router } from '@angular/router';
import { PaginatorDTO } from '../dto/paginator-dto';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    // Dichiarazione del Subject
    private timerExpiredSubject: Subject<boolean> = new Subject<boolean>();

    // subject per paginator 
    private paginatorSubject = new Subject<PaginatorDTO>();

    constructor(private http: HttpClient, private router: Router) { }

    // Metodo per ottenere l'Observable del Subject
    getTimerExpiredObservable(): Observable<boolean> {
        return this.timerExpiredSubject.asObservable();
    }

    // Metodo per avviare il timer per il logout dopo 3 ore
    startTokenExpirationTimer() {
        // Tempo di scadenza del token (3 ore in millisecondi)
        const expirationTime = 3 * 60 * 60 * 1000; // 3 ore
        // Avvia il timer
        setTimeout(() => {
            // Quando il timer scatta, emetti true tramite il Subject
            this.timerExpiredSubject.next(true);
            // Quando il timer scatta, esegui il logout
            this.logout();
        }, expirationTime);
    }

    // Metodo per effettuare il logout
    logout() {
        // Rimuoviamo il token JWT dal localStorage
        localStorage.removeItem('jwt-token');
        // Esegui altre operazioni di logout se necessario, come reindirizzare l'utente alla pagina di accesso
        this.router.navigate(['/login']);
    }

    // Metodo per verificare se l'utente è loggato
    isLoggedIn(): boolean {
        // Controlla se il token JWT è presente nel localStorage
        const token = localStorage.getItem('jwt-token');
        // Ritorna true se il token esiste, altrimenti false
        return token !== null;
    }

    // Metodo per inviare i dati del paginatore
    sendPaginatorData(paginatorData: PaginatorDTO) {
        this.paginatorSubject.next(paginatorData);
    }

    // Metodo per ricevere i dati del paginatore
    getPaginatorData() {
        return this.paginatorSubject.asObservable();
    }
}