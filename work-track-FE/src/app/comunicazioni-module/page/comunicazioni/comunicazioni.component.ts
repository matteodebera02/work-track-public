import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { ComunicazioniDto } from "src/app/dto/comunicazione-dto";
import { UtenteDto } from "src/app/dto/utente-dto";
import { AuthService } from "src/app/service/auth-service";
import { ComunicazoniService } from "src/app/service/comunicazioni-service";
import { UtenteService } from "src/app/service/utente-service";
import { AlertComponent } from "src/app/utils/alert/alert.component";

@Component({
  selector: 'app-comunicazioni',
  templateUrl: './comunicazioni.component.html',
  styleUrls: ['./comunicazioni.component.scss']
})
export class ComunicazioniComponent implements OnInit {


  userEmail?: string; // Email dell'utente

  newComunicationDiv: boolean = false

  // dto della nuova comunicazione 
  nuovaComunicazione: ComunicazioniDto = {
    descrizione: "",
    data: "",
    titolo: "",
    utente: {}
  }

  // utente dto 
  utenteDto?: UtenteDto

  // lista di tutte le comunicazioni 
  listOfAllComunications: ComunicazioniDto[] = []

  // alert componenet
  @ViewChild("alert")
  alert?: AlertComponent

  constructor(private router: Router, private authService: AuthService, private comService: ComunicazoniService, private utenteService: UtenteService) { }

  ngOnInit(): void {
    this.userEmail = localStorage.getItem('jwt-token')!; // Assicurati che il token sia effettivamente l'email
    this.getActualUser();
    this.getAllComunication();
  }

  goToHomePage() {
    this.router.navigate(['home-page']);
  }

  logout() {
    localStorage.removeItem('jwt-token');
    this.router.navigate(['/login']);
  }

  goToProfile() {
    this.router.navigate(['profile'])
  }

  //metodo per aprire div per la creazione 
  openComunicationDiv() {
    this.newComunicationDiv = true
  }
  //metodo per chiudere il div 
  closeComunicationDiv() {
    this.newComunicationDiv = false
  }
  //metodo per creare una comunicazione 
  saveComunicazione() {
    // Controllo che il titolo e la descrizione non siano vuoti o nulli
    if (!this.nuovaComunicazione.titolo || !this.nuovaComunicazione.descrizione) {
      // Mostra un messaggio di errore
      this.alert?.showAlert("Il campo titolo e descrizione devono essere compilati", 'error');
      return; // Esci dalla funzione se uno dei campi è vuoto o nullo
    }
  
    // Controllo che il titolo non superi la lunghezza massima consentita
    if (this.nuovaComunicazione.titolo.length > 25) {
      // Mostra un messaggio di errore
      this.alert?.showAlert("Il titolo non può superare i 25 caratteri", 'error');
      return; // Esci dalla funzione se il titolo è troppo lungo
    }

     // Controllo che il testo  non superi la lunghezza massima consentita
     if (this.nuovaComunicazione.titolo.length > 50) {
      // Mostra un messaggio di errore
      this.alert?.showAlert("la descrizione non puo superare i 50 caratteri ", 'error');
      return; // Esci dalla funzione se il titolo è troppo lungo
    }
  
  
    // Settiamo le cose alla comunicazione 
    this.nuovaComunicazione.utente = this.utenteDto;
  
    // Otteniamo la data attuale
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Gennaio è 0!
    const year = today.getFullYear();
  
    // Costruiamo la data nel formato "gg/mm/aaaa"
    const currentDate = `${day}/${month}/${year}`;
  
    // Assegniamo la data alla nuova comunicazione
    this.nuovaComunicazione.data = currentDate;
  
    // Chiamiamo il servizio per creare la comunicazione
    this.comService.createComunicazione(this.nuovaComunicazione).subscribe({
      next: (data) => {
  
        this.alert?.showAlert("operazione andata a buon fine", 'success')
        this.newComunicationDiv = false
        this.nuovaComunicazione.descrizione = "";
        this.nuovaComunicazione.titolo = "";
        this.getAllComunication()
      },
      error: (error) => {
        // Gestisci gli errori se necessario
      }
    });
  }
  




  // metodo che mi trova l utente data la email 
  getActualUser() {
    this.utenteService.findByEmail(this.userEmail!).subscribe({
      next: (data) => {
        this.utenteDto = data
      }, error: (err) => {
        console.error(err)
      }
    })
  }

  getAllComunication() {
    this.comService.getAll().subscribe({
      next: (data) => {
        this.listOfAllComunications = data
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  deleteComunication(comunicationToDelete: ComunicazioniDto) {
    this.comService.deleteById(comunicationToDelete.id!).subscribe({
      next: (data) => {
        this.getAllComunication()
        this.alert?.showAlert("operazione andata a buon fine", 'success')
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

}
