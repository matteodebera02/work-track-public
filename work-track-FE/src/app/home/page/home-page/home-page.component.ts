import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtenteDto } from 'src/app/dto/utente-dto';
import { AuthService } from 'src/app/service/auth-service';
import { UtenteService } from 'src/app/service/utente-service';
import { MeseAnno } from 'src/app/utenti/page/monitoring-user-admin/monitoring-user-admin.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  // utente email che prendermo dal token 
  userEmail: string = ""
  // utente dto 
  utenteDto?: UtenteDto
  defoultDate?: MeseAnno

  months: number[] = Array.from({ length: 12 }, (_, i) => i + 1); // Array di numeri da 1 a 12 rappresentanti i mesi
  years: number[] = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - 5 + i); // Array di anni 


  constructor(private router: Router, private authService: AuthService, private utenteService: UtenteService) {
    this.userEmail = localStorage.getItem("jwt-token")!
    // ci prendiamo l attuale utente 
    this.getActualUser()
  }

  ngOnInit(): void {
    this.defoultDate = this.getMeseAnnoDefault();
  }
  
  goToLoging() {
    throw new Error('Method not implemented.');
  }

  // Metodo per effettuare il logout
  logout() {
    // Rimuoviamo il token JWT dal localStorage
    localStorage.removeItem('jwt-token');
    // Esegui altre operazioni di logout se necessario, come reindirizzare l'utente alla pagina di accesso
    this.router.navigate(['/login'])
  }

  // metodo che mi porta alla pagina di creazione di rapportini 
  goToCreateRapp() {
    this.router.navigate(['create-rapportino']);
  }

  // metodo che mi manda alla lista dei miei rapportini
  goToMyRapportini() {
    this.router.navigate(['my-rapp-page'])
  }

  goToHomePage() {
    this.router.navigate(['home-page'])
  }

  goToProfile() {
    this.router.navigate(['profile'])
  }

  //Rotte Visualizzabili solo all admin 
  goTOAllRapp() {
    this.router.navigate(['all-rapp'])
  }
  // mandami alla pagina dell accetazione di utenti 
  goToAceptUtenti() {
    this.router.navigate(['acpt-user'])
  }

  goToMonitoraggioUtenti() {
    this.router.navigate(['monitoring-users'])
  }

  goToUserDetail() {
    this.router.navigate(['resoconto-mensile', this.utenteDto?.id, this.defoultDate?.mese, this.defoultDate?.anno]);
  }

  goToComunicazioni() {
    this.router.navigate(['comunicazioni']);
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

  // Funzione per ottenere il mese e l'anno di oggi
 getMeseAnnoDefault(): MeseAnno {
  const today = new Date();
  return {
    mese: today.getMonth() + 1, // getMonth restituisce un numero da 0 a 11, quindi aggiungi 1 per ottenere il mese corrente
    anno: today.getFullYear()
  };

}

}

