import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TEXT_DECORATION_LINE } from 'html2canvas/dist/types/css/property-descriptors/text-decoration-line';
import { PaginatorDTO } from 'src/app/dto/paginator-dto';
import { RapportiniDto } from 'src/app/dto/rapportino-dto';
import { UtenteDto } from 'src/app/dto/utente-dto';
import { UtenteOreTotDto } from 'src/app/dto/utente-ore-tot-dto';
import { AuthService } from 'src/app/service/auth-service';
import { RapportiniService } from 'src/app/service/rapportini-service';
import { UtenteService } from 'src/app/service/utente-service';

@Component({
  selector: 'app-monitoring-user-admin',
  templateUrl: './monitoring-user-admin.component.html',
  styleUrls: ['./monitoring-user-admin.component.scss']
})
export class MonitoringUserAdminComponent implements OnInit {
  // lista di utenti e ore totali
  listOfUserWhitTotalHours: UtenteOreTotDto[] = []

  // lista rapportini in base al mese 
  listOfRapp: RapportiniDto[] = []

  //lista utente con ore 
  userMounthRappList: UserMonthResult[] = []

  // paginator 
  paginator: PaginatorDTO = {
    columnSorterName: "id",
    descendingAscending: "ASC",
    itemPerPage: 5,
    pageNumber: 1,
    totalItem: 0

  };

  defoultDate?: MeseAnno

  months: number[] = Array.from({ length: 12 }, (_, i) => i + 1); // Array di numeri da 1 a 12 rappresentanti i mesi
  years: number[] = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - 5 + i); // Array di anni 


  constructor(private route: ActivatedRoute, private router: Router, private rapportinoService: RapportiniService, private utenteService: UtenteService, private authService: AuthService) {

  }
  ngOnInit(): void {
    this.defoultDate = getMeseAnnoDefault();
    // this.getUsersAndTotalHoursByMounthandYear()
    this.getRappByMounthAndYear()

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


  goToProfile() {
    this.router.navigate(['profile'])
  }

  goToUserDetail(idUtente: number|undefined) {
    this.router.navigate(['resoconto-mensile', idUtente, this.defoultDate?.mese, this.defoultDate?.anno]);
    }

  // metodo che mi rida i rapportini in base al mese e anno 

  getRappByMounthAndYear() {
    this.rapportinoService.getRappByMounthAndYear(this.defoultDate!.mese, this.defoultDate!.anno).subscribe({
      next: (data: RapportiniDto[]) => {
        const userResultsMap = new Map<number, UserMonthResult>();
  
        data.forEach((rapportino: RapportiniDto) => {
          const userId = rapportino.utente?.id;
          const oreDiurne = rapportino.ore || 0;
          const oreNotturne = rapportino.oreNotturne || 0;
          const straordinari = rapportino.straordinari || 0;
          const oreTotali = oreDiurne + oreNotturne + straordinari;
          const oreViaggio = rapportino.oreViaggio || 0;
  
          if (!userId) {
            console.error("userId non definito per il rapportino:", rapportino);
            return;
          }
  
          if (!userResultsMap.has(userId)) {
            const userResult: UserMonthResult = {
              oreTotali: oreTotali,
              oreNotturne: oreNotturne,
              oreDiurne: oreDiurne,
              straordinari: straordinari,
              user: rapportino.utente!,
              oreViaggio: oreViaggio
            };
            userResultsMap.set(userId, userResult);
          } else {
            const userResult = userResultsMap.get(userId)!;
            userResult.oreTotali += oreTotali;
            userResult.oreNotturne += oreNotturne;
            userResult.oreDiurne += oreDiurne;
            userResult.straordinari += straordinari
            userResult.oreViaggio += oreViaggio
          }
        });
  
        // Aggiungi i risultati alla lista userMounthRappList
        this.userMounthRappList = Array.from(userResultsMap.values());
  
        // Aggiorna il paginatore
        this.paginator.totalItem = this.userMounthRappList.length;
        this.authService.sendPaginatorData(this.paginator);
      },
      error: (err) => {
        console.error("Errore durante il recupero dei rapportini:", err);
        // Gestisci l'errore in modo appropriato, ad esempio informando l'utente
      }
    });
  }
  




  // metodo quando cambio mese e anno 
  updateUserOreTot() {
    this.getRappByMounthAndYear()
  }


  // metodo che pagina i dati 
  get paginateData() {
    const start = (this.paginator.pageNumber - 1) * (this.paginator.itemPerPage)
    const end = start + this.paginator.itemPerPage
    return this.userMounthRappList.slice(start, end)
  }
  // metodo che cambia pagina
  changePage(page: number) {
    this.paginator.pageNumber = page
    if (this.paginator.pageNumber <= -1 || 0) {
      this.paginator.pageNumber = 1
    }
  }



}


export interface MeseAnno {
  mese: number;
  anno: number;
}

export interface UserMonthResult {
  oreTotali: number,
  oreNotturne: number,
  oreDiurne: number,
  straordinari: number
  user: UtenteDto
  oreViaggio: number
}

// Funzione per ottenere il mese e l'anno di oggi
function getMeseAnnoDefault(): MeseAnno {
  const today = new Date();
  return {
    mese: today.getMonth() + 1, // getMonth restituisce un numero da 0 a 11, quindi aggiungi 1 per ottenere il mese corrente
    anno: today.getFullYear()
  };
}