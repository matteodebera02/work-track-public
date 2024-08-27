import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaginatorDTO } from 'src/app/dto/paginator-dto';
import { UtenteDto } from 'src/app/dto/utente-dto';
import { AuthService } from 'src/app/service/auth-service';
import { RapportiniService } from 'src/app/service/rapportini-service';
import { UtenteService } from 'src/app/service/utente-service';

@Component({
  selector: 'app-acetta-utenti',
  templateUrl: './acetta-utenti.component.html',
  styleUrls: ['./acetta-utenti.component.scss']
})
export class AcettaUtentiComponent implements OnInit {
  userEmail?: string; // Email dell'utente

  listOfUtenti: UtenteDto[] = []

  // paginator 
  paginator: PaginatorDTO = {
    userEmail: this.userEmail, // Questo sarà undefined qui, vedi ngOnInit
    columnSorterName: "id",
    descendingAscending: "ASC",
    itemPerPage: 5,
    pageNumber: 1,
    totalItem: 0

  };

  constructor(private route: ActivatedRoute, private router: Router, private rapportinoService: RapportiniService, private utenteService: UtenteService, private authService: AuthService) {
    this.userEmail = localStorage.getItem('jwt-token')!; // Assicurati che il token sia effettivamente l'email
    this.paginator.userEmail = this.userEmail; // Imposta l'email nel paginator qui

  }
  ngOnInit(): void {
    this.getAllUserNotAcept()
  }


  // metodo dell hader che ti porta alla home page 
  goToHomePage() {
    this.router.navigate(['home-page'])
  }

  // Metodo per effettuare il logout
  logout() {
    // Rimuoviamo il token JWT dal localStorage
    localStorage.removeItem('jwt-token');
    // Esegui altre operazioni di logout se necessario, come reindirizzare l'utente alla pagina di accesso
    this.router.navigate(['/login'])
  }


  goToProfile(){
    this.router.navigate(['profile'])
  }

  getAllUserNotAcept(){
    this.utenteService.gettAllUserNotAcept().subscribe({
      next: (data) => {
        this.listOfUtenti = data 
        this.paginator.totalItem = this.listOfUtenti.length
        this.authService.sendPaginatorData(this.paginator)
      },
      error: (err) => {
        console.error(err)
      }
    })
  }
  // metodo per eliminare un utente se non acettato 
  deleteUser(id: number) {
    this.utenteService.deleteUserById(id).subscribe({
      next: (data) => {
        this.getAllUserNotAcept();
      },
      error: (err) => {
        console.error(err);
      }
    })
    }
    // metodo per acettare utente 
    aceptUser(id: number) {
      this.utenteService.aceptUser(id).subscribe({
        next: (data) => {
          this.getAllUserNotAcept();
        },
        error: (err) => {
          console.error(err);
        }
      })
    }

    // metodo che pagina i dati 
    get paginateData() {
      const start = (this.paginator.pageNumber - 1) * (this.paginator.itemPerPage)
      const end = start + this.paginator.itemPerPage
      return this.listOfUtenti.slice(start, end)
    }
    // metodo che cambia pagina
    changePage(page: number) {
      this.paginator.pageNumber = page
      if (this.paginator.pageNumber <= -1 || 0) {
        this.paginator.pageNumber = 1
      }
    }
}
