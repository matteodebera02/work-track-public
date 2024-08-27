import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaginatorDTO } from 'src/app/dto/paginator-dto';
import { PaginatorOutDTO } from 'src/app/dto/paginator-out-dto'; // Assicurati di avere questo DTO
import { RapportiniDto } from 'src/app/dto/rapportino-dto';
import { UtenteDto } from 'src/app/dto/utente-dto';
import { AuthService } from 'src/app/service/auth-service';
import { RapportiniService } from 'src/app/service/rapportini-service';
import { UtenteService } from 'src/app/service/utente-service';

@Component({
  selector: 'app-lista-miei-rapportini',
  templateUrl: './lista-miei-rapportini.component.html',
  styleUrls: ['./lista-miei-rapportini.component.scss']
})
export class ListaMieiRapportiniComponent implements OnInit {
  userEmail?: string; // Email dell'utente

  utenteDto?: UtenteDto

  paginator: PaginatorDTO = {
    userEmail: this.userEmail, // Questo sarà undefined qui, vedi ngOnInit
    columnSorterName: "id",
    descendingAscending: "ASC",
    itemPerPage: 5,
    pageNumber: 1,
    totalItem: 0

  };

  listOfRapp: RapportiniDto[] = []; // Usa il DTO corretto qui

  constructor(private router: Router, private authService: AuthService, private rappService: RapportiniService, private utenteService: UtenteService) { }

  ngOnInit(): void {
    this.userEmail = localStorage.getItem('jwt-token')!; // Assicurati che il token sia effettivamente l'email
    this.paginator.userEmail = this.userEmail; // Imposta l'email nel paginator qui
    // metodo che mi restiuisce lista di rapportini non paginata 
    this.getListOfUserRapp();
  }

  goToHomePage() {
    this.router.navigate(['home-page']);
  }

  logout() {
    localStorage.removeItem('jwt-token');
    this.router.navigate(['/login']);
  }

  // metodo che ti manda alla modifica del rapportino ti passa l id 
  goToRapportino(rapportinoId: number) {
    this.router.navigate(['/edit-rapp', rapportinoId]);
  }

  goToProfile() {
    this.router.navigate(['profile'])
  }

  getListOfUserRapp() {
    this.rappService.getUserRapportiniByEmail(this.userEmail!).subscribe({
      next: (data) => {
        // Assegna i dati ricevuti alla lista di rapportini
        this.listOfRapp = data;
  
        // Ordina la lista di rapportini per ID in ordine decrescente
        this.listOfRapp.sort((a, b) => b.id! - a.id!);
  
        // Imposta il numero totale di elementi nella paginazione
        this.paginator.totalItem = this.listOfRapp.length;
  
        // Invia i dati del paginatore
        this.authService.sendPaginatorData(this.paginator);
      },
      error: (err) => {
        // Gestisci l'errore qui
      }
    });
  }
  
  // metodo che pagina i dati 
  get paginateData() {
    const start = (this.paginator.pageNumber - 1) * (this.paginator.itemPerPage)
    const end = start + this.paginator.itemPerPage
    return this.listOfRapp.slice(start, end)
  }
  // metodo che cambia pagina
  changePage(page: number) {
    this.paginator.pageNumber = page
    if (this.paginator.pageNumber <= -1 || 0) {
      this.paginator.pageNumber = 1
    }
  }

  // metodo che mi trova l utente data la email 
getActualUser(){
  this.utenteService.findByEmail(this.userEmail!).subscribe({
    next: (data) => {
      this.utenteDto = data
    },error: (err) => {
      console.error(err)
    }
  })
}



}
