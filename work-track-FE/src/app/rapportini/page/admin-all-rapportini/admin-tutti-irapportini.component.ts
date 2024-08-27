import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PaginatorDTO } from 'src/app/dto/paginator-dto';
import { RapportiniDto } from 'src/app/dto/rapportino-dto';
import { UtenteDto } from 'src/app/dto/utente-dto';
import { AuthService } from 'src/app/service/auth-service';
import { RapportiniService } from 'src/app/service/rapportini-service';
import { UtenteService } from 'src/app/service/utente-service';

@Component({
  selector: 'app-admin-tutti-irapportini',
  templateUrl: './admin-tutti-irapportini.component.html',
  styleUrls: ['./admin-tutti-irapportini.component.scss']
})
export class AdminTuttiIRapportiniComponent {
  userEmail?: string; // Email dell'utente

  utenteDto?: UtenteDto

  paginator: PaginatorDTO = {
    userEmail: this.userEmail, // Questo sarà undefined qui, vedi ngOnInit
    columnSorterName: "id",
    descendingAscending: "ASC",
    itemPerPage: 10,
    pageNumber: 1,
    totalItem: 0

  };

  listOfRapp: RapportiniDto[] = []; // Usa il DTO corretto qui

  searchTerm: string = ""

  constructor(private router: Router, private authService: AuthService, private rappService: RapportiniService, private utenteService: UtenteService) { }

  ngOnInit(): void {
    this.userEmail = localStorage.getItem('jwt-token')!; // Assicurati che il token sia effettivamente l'email
    this.paginator.userEmail = this.userEmail; // Imposta l'email nel paginator qui
    // metodo che mi restiuisce lista di rapportini non paginata 
    this.getAllRapp();
  }

  goToHomePage() {
    this.router.navigate(['home-page']);
  }

  logout() {
    localStorage.removeItem('jwt-token');
    this.router.navigate(['/login']);
  }

  // metodo che ti manda alla modifica del rapportino ti passa l id 
  checkAndGoToRapp(rapportinoId: number) {
    this.rappService.checkRapp(rapportinoId).subscribe({
      next: (data) => {
        this.router.navigate(['/edit-rapp', rapportinoId]);
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  goToProfile() {
    this.router.navigate(['profile'])
  }

  getAllRapp() {
    this.rappService.findAll().subscribe({
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

// mettodo della search bar 
onSearch() {
  if (this.searchTerm !== null && this.searchTerm !== undefined && this.searchTerm !== "") {
    this.rappService.getRappBySearchTerm(this.searchTerm).subscribe({
      next: (data) => {
        this.listOfRapp = data
      },
      error: (err) => {
        console.error(err);
      }
    })
  }
  else{
    this.getAllRapp()
  }
}




}
