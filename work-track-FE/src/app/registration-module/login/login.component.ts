import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UtenteDto } from 'src/app/dto/utente-dto';
import { AuthService } from 'src/app/service/auth-service';
import { UtenteService } from 'src/app/service/utente-service';
import { AlertComponent } from 'src/app/utils/alert/alert.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  utente = {
    email: '',
    password: ''
  };
  nome?: string

  // wiew child per aler 
  @ViewChild("alert")
  alert?: AlertComponent

  // Sottoscrizione all'Observable
  private timerExpiredSubscription?: Subscription;

  constructor(private utenteService: UtenteService, private router: Router, private authService: AuthService) { // Modifica qui
  }
  ngOnInit() {
    // Sottoscrivi al Subject dell'AuthService per ricevere notifiche quando il timer scade
    this.timerExpiredSubscription = this.authService.getTimerExpiredObservable().subscribe((timerExpired) => {
      if (timerExpired) {
        this.showAlert()
      }
    });
  }

  ngOnDestroy() {
    // Annulla la sottoscrizione quando il componente viene distrutto per evitare memory leaks
    // this.timerExpiredSubscription?.unsubscribe();
  }

  // metodo per loggarsi 
  login() {
    this.utenteService.login(this.utente).subscribe({
      next: (data) => {
        // Gestire la risposta positiva
        // Salviamo il token JWT nel localStorage
        localStorage.setItem('jwt-token', data.email!);
        // Andiamo alla homePage
        this.goToHomePage();
        // settiamo il timer per il logaouth 
        this.authService.startTokenExpirationTimer();
      },
      error: (err) => {
        // Gestire l'errore
        // Mostrare l'errore tramite showAlert solo se c'è un errore dal backend
        this.alert?.showAlert(err.error.MESSAGGIO, 'error');
        console.error(err);
      }
    });
  }

  showAlert() {
    // Mostra l'alert con il messaggio "Sessione scaduta, ripetere il login"
    debugger
    this.alert?.showAlert("Sessione scaduta, ripetere il login", 'error');
  }

  // metodo che ti porta alla pagina di registrazione 
  goToRegistration() {
    this.router.navigate(['/register']); // Utilizza il router per navigare alla pagina di registrazione
  }

  goToHomePage() {
    this.router.navigate(['/home-page'])
  }
}
