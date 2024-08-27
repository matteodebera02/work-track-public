import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UtenteDto } from 'src/app/dto/utente-dto';
import { AuthService } from 'src/app/service/auth-service';
import { RapportiniService } from 'src/app/service/rapportini-service';
import { UtenteService } from 'src/app/service/utente-service';
import { AlertComponent } from 'src/app/utils/alert/alert.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  // utente email che prendermo dal token 
  userEmail: string = ""
  // utente dto 
  utenteDto?: UtenteDto
  // pulsnte per l etiding 
  isEditing: boolean = false;
  // wiew child per aler 
  @ViewChild("alert")
  alert?: AlertComponent


  constructor(private router: Router, private rapportinoService: RapportiniService, private utenteService: UtenteService) {

  }


  ngOnInit(): void {
    this.userEmail = localStorage.getItem("jwt-token")!
    // ci prendiamo l attuale utente 
    this.getActualUser()
  }



  // Metodo per effettuare il logout
  logout() {
    // Rimuoviamo il token JWT dal localStorage
    localStorage.removeItem('jwt-token');
    // Esegui altre operazioni di logout se necessario, come reindirizzare l'utente alla pagina di accesso
    this.router.navigate(['/login'])
  }

  goToHomePage() {
    this.router.navigate(['home-page'])
  }

  goToProfile() {
    this.router.navigate(['profile'])
  }

  // metodo che mi trova l utente data la email 
  getActualUser() {
    this.utenteService.findByEmail(this.userEmail).subscribe({
      next: (data) => {
        this.utenteDto = data
      }, error: (err) => {
        console.error(err)
      }
    })
  }
  // metodo per rendere modificabili gli input 
  toggleEdit() {
    this.isEditing = !this.isEditing;
    if(this.isEditing){
      this.utenteDto!.password = ""
    }
  }

  // metodo di edit 
  editProfile() {
    // Verifica se il nome e il cognome sono validi
    if (!this.utenteDto!.nome || this.utenteDto!.nome!.trim() === "") {
      this.alert?.showAlert("Errore: Nome non valido.", "error");
      return;
    }
    if (!this.utenteDto!.cognome || this.utenteDto!.cognome.trim() === "") {
      this.alert?.showAlert("Errore: Cognome non valido.", "error");
      return;
    }

    // Verifica se l'email è valida
    if (!this.isValidEmail(this.utenteDto!.email!)) {
      this.alert?.showAlert("Errore: Email non valida.", "error");
      return;
    }

    // Verifica se la password è valida
    if (!this.isValidPassword(this.utenteDto!.password!)) {
      this.alert?.showAlert("Errore: Password non valida. La password deve essere lunga almeno 6 caratteri e contenere almeno una lettera maiuscola.", "error");
      return;
    }

    // Creiamo l'oggetto DTO da mandare al backend
    let UtenteDto: UtenteDto = {
      nome: this.utenteDto!.nome,
      cognome: this.utenteDto!.cognome,
      email: this.utenteDto!.email,
      password: this.utenteDto!.password,
      id: this.utenteDto!.id
    };

    // Richiamiamo il metodo del backend per salvare l'utente 
    this.utenteService.edit(UtenteDto).subscribe({
      next: (data) => {
        // Rimandiamo al login solo se la registrazione ha avuto successo
        this.alert?.showAlert("Modifiche completate con sucesso ", 'success')
        // ci richiamiamo l utente 
        this.getActualUser();
        //risettiamo is editing a false 
        this.toggleEdit()
        // Rimuoviamo il token JWT dal localStorage
        localStorage.removeItem('jwt-token');
        // Salviamo il token JWT nel localStorage
        localStorage.setItem('jwt-token', data.email!);
      },
      error: (err) => {
        console.error(err);
        // Mostrare l'errore tramite showAlert solo se c'è un errore dal backend
        this.alert?.showAlert(err.error.MESSAGGIO, 'error');
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



}
