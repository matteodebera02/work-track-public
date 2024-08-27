import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UtenteDto } from 'src/app/dto/utente-dto';
import { UtenteService } from 'src/app/service/utente-service';
import { AlertComponent } from 'src/app/utils/alert/alert.component';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  utente = {
    nome: "",
    cognome: "",
    email: "",
    password: ""
  }
  // wiew child per aler 
  @ViewChild("alert")
  alert?: AlertComponent

  
  constructor(private router: Router, private utenteService: UtenteService) { 
  
  }

  // metodo di registrazione 
  Registration() {
    // Verifica se il nome e il cognome sono validi
    if (!this.utente.nome || this.utente.nome.trim() === "") {
      this.alert?.showAlert("Errore: Nome non valido.", "error");
      return;
    }
    if (!this.utente.cognome || this.utente.cognome.trim() === "") {
      this.alert?.showAlert("Errore: Cognome non valido.","error");
      return;
    }
  
    // Verifica se l'email è valida
    if (!this.isValidEmail(this.utente.email)) {
      this.alert?.showAlert("Errore: Email non valida.", "error");
      return;
    }
  
    // Verifica se la password è valida
    if (!this.isValidPassword(this.utente.password)) {
      this.alert?.showAlert("Errore: Password non valida. La password deve essere lunga almeno 6 caratteri e contenere almeno una lettera maiuscola.", "error");
      return;
    }
  
    // Creiamo l'oggetto DTO da mandare al backend
    let UtenteDto: UtenteDto = {
      nome: this.utente.nome,
      cognome: this.utente.cognome,
      email: this.utente.email,
      password: this.utente.password
    };
  
    // Richiamiamo il metodo del backend per salvare l'utente 
    this.utenteService.register(UtenteDto).subscribe({
      next: (data) => {
        debugger;
        // Rimandiamo al login solo se la registrazione ha avuto successo
        this.alert?.showAlert("registrazione completata con sucesso ",'success')
        setTimeout(() => {
          this.goToLogin();
        }, 1500); // Ritardo di 1,5 secondi 
      },
      error: (err) => {
        console.error(err);
        // Mostrare l'errore tramite showAlert solo se c'è un errore dal backend
        this.alert?.showAlert(err.error.MESSAGGIO,'error');
      }
    });
  }
  
  isValidEmail(email: string): boolean {
    // Validazione email tramite espressione regolare
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  isValidPassword(password: string): boolean {
    // Controllo lunghezza minima della password e presenza di almeno una maiuscola
    return password.length >= 6 && /[A-Z]/.test(password);
  }
  


  // metodo che dopo la registrazione ti manda al login 
  goToLogin(){
    this.router.navigate(["/login"])
  }
}

