import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaginatorDTO } from 'src/app/dto/paginator-dto';
import { RapportiniDto } from 'src/app/dto/rapportino-dto';
import { AuthService } from 'src/app/service/auth-service';
import { RapportiniService } from 'src/app/service/rapportini-service';
import { UtenteService } from 'src/app/service/utente-service';
import html2canvas from 'html2canvas';
import { UtenteDto } from 'src/app/dto/utente-dto';
import { MeseAnno } from '../monitoring-user-admin/monitoring-user-admin.component';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-utente-resoconto-mensile',
  templateUrl: './utente-resoconto-mensile.component.html',
  styleUrls: ['./utente-resoconto-mensile.component.scss']
})
export class UtenteResocontoMensileComponent implements OnInit {
  paginator: PaginatorDTO = {
    columnSorterName: "id",
    descendingAscending: "ASC",
    itemPerPage: 30,
    pageNumber: 1,
    totalItem: 0
  };

  listOfRapp: RapportiniDto[] = []

  idUtente?: number;
  mese?: number;
  anno?: number;

  userEmail?: string;

  utenteDto?: UtenteDto

  defoultDate?: MeseAnno

  months: number[] = Array.from({ length: 12 }, (_, i) => i + 1);
  years: number[] = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - 5 + i);

  constructor(private route: ActivatedRoute, private router: Router, private rapportinoService: RapportiniService, private utenteService: UtenteService, private authService: AuthService) {}

  ngOnInit(): void {
    this.userEmail = localStorage.getItem('jwt-token')!;
    this.route.params.subscribe(params => {
      this.idUtente = params['id'];
      this.mese = params['mese'];
      this.anno = params['anno'];
    });
    this.getUserMounthRapp();
    this.getActualUser();
    this.defoultDate = this.getMeseAnnoDefault();
  }

  goToHomePage() {
    this.router.navigate(['home-page']);
  }

  goTolistOfUserMonitorin() {
    this.router.navigate(['monitoring-users']);
  }

  logout() {
    localStorage.removeItem('jwt-token');
    this.router.navigate(['/login']);
  }

  goToProfile() {
    this.router.navigate(['profile']);
  }

  getActualUser() {
    this.utenteService.findByEmail(this.userEmail!).subscribe({
      next: (data) => {
        this.utenteDto = data;
      }, error: (err) => {
        console.error(err);
      }
    });
  }

  getUserMounthRapp() {
    this.rapportinoService.getRappByMounthAndYearAndUserId(this.mese!, this.anno!, this.idUtente!)
      .subscribe({
        next: (data) => {
          const rapportiniPerData: { [data: string]: RapportiniDto } = {};
          data.forEach(rapportino => {
            const dataRapportino = rapportino.data || '';
            if (!rapportiniPerData[dataRapportino]) {
              rapportiniPerData[dataRapportino] = rapportino;
            } else {
              rapportiniPerData[dataRapportino].ore! += rapportino.ore!;
              rapportiniPerData[dataRapportino].oreNotturne! += rapportino.oreNotturne!;
              rapportiniPerData[dataRapportino].straordinari! += rapportino.straordinari!;
              rapportiniPerData[dataRapportino].oreViaggio! += rapportino.oreViaggio!;
            }
          });
          this.listOfRapp = Object.values(rapportiniPerData);
        },
        error: (err) => {
          console.error(err);
        }
      });
  }

  get paginateData() {
    const start = (this.paginator.pageNumber - 1) * (this.paginator.itemPerPage);
    const end = start + this.paginator.itemPerPage;
    return this.listOfRapp.slice(start, end);
  }

  changePage(page: number) {
    this.paginator.pageNumber = page;
    if (this.paginator.pageNumber <= -1 || 0) {
      this.paginator.pageNumber = 1;
    }
  }

  downloadTableAsImage() {
    const element = document.getElementById('tabella')!;
    const filename = `resoconto-mensile${this.mese}_${this.anno}_${this.utenteDto?.nome}_${this.utenteDto?.cognome}.png`;
    html2canvas(element).then((canvas) => {
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = filename;
      link.href = dataUrl;
      link.click();
    });
  }

  // Metodo per scaricare la tabella in Excel
  downloadTableAsExel() {
    const data: any[] = this.listOfRapp.map(item => ({
      'Data': item.data,
      'Nome': item.utente?.nome,
      'Cognome': item.utente?.cognome,
      'Ore diurne': item.ore,
      'Ore notturne': item.oreNotturne,
      'Ore di straordinari': item.straordinari,
      'Ore totali': item.ore! + item.oreNotturne! + item.straordinari!,
      'Ore viaggio': item.oreViaggio
    }));

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Resoconto Mensile');

    const wbout: ArrayBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

    const filename = `resoconto-mensile${this.mese}_${this.anno}_${this.utenteDto?.nome}_${this.utenteDto?.cognome}.xlsx`;
    saveAs(new Blob([wbout], { type: 'application/octet-stream' }), filename);
  }

  getMeseAnnoDefault(): MeseAnno {
    const today = new Date();
    return {
      mese: today.getMonth() + 1,
      anno: today.getFullYear()
    };
  }

  updateUserOreTot() {
    this.anno = this.defoultDate?.anno;
    this.mese = this.defoultDate?.mese;
    this.getUserMounthRapp();
  }
}
