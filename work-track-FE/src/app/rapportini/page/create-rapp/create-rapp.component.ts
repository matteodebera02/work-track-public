import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { RapportiniDto } from 'src/app/dto/rapportino-dto';
import { UtenteDto } from 'src/app/dto/utente-dto';
import { RapportiniService } from 'src/app/service/rapportini-service';
import { UtenteService } from 'src/app/service/utente-service';
import { AlertComponent } from 'src/app/utils/alert/alert.component';

@Component({
  selector: 'app-create-rapp',
  templateUrl: './create-rapp.component.html',
  styleUrls: ['./create-rapp.component.scss']
})
export class CreateRappComponent implements OnInit {

    // ci creiamo l ogetto rapportino 
    rapportino: RapportiniDto = {}
    // utente email che prendermo dal token 
    userEmail: string = ""
    // utente dto 
    utenteDto?: UtenteDto

    // alert componenet
    @ViewChild("alert")
    alert?: AlertComponent
  
  constructor(private router: Router, private rapportinoService: RapportiniService, private utenteService: UtenteService){

  }

  ngOnInit(): void {
    this.userEmail = localStorage.getItem("jwt-token")!
    // ci prendiamo l attuale utente 
    this.getActualUser()
  }



  // metodo dell hader che ti porta alla home page 
  goToHomePage(){
    this.router.navigate(['home-page'])
  }

  goToProfile(){
    this.router.navigate(['profile'])
  }

  // Metodo per effettuare il logout
logout() {
  // Rimuoviamo il token JWT dal localStorage
  localStorage.removeItem('jwt-token');
  // Esegui altre operazioni di logout se necessario, come reindirizzare l'utente alla pagina di accesso
  this.router.navigate(['/login'])
}

// metodo che mi trova l utente data la email 
getActualUser(){
  this.utenteService.findByEmail(this.userEmail).subscribe({
    next: (data) => {
      this.utenteDto = data
    },error: (err) => {
      console.error(err)
    }
  })
}
// metodo che crea il rapportino 
createRapp() {
  // Verifica se la data è nel formato corretto (gg/mm/yyyy)
  const regex = /^\d{2}\/\d{2}\/\d{4}$/;
  if (!regex.test(this.rapportino.data!)) {
    // Se la data non è nel formato corretto, mostra un alert e interrompi il metodo
    this.alert?.showAlert("Il formato della data non è corretto. Utilizzare il formato gg/mm/yyyy", 'error');
    return;
  }

  // Settiamo l'utente al rapportino 
  this.rapportino.utente = this.utenteDto;

  // controlliamo se notturno è undefined 
  if(this.rapportino.oreNotturne == undefined){
    this.rapportino.oreNotturne = 0 
  }

  
  // Chiamiamo il service per creare il rapportino 
  this.rapportinoService.createRapportino(this.rapportino).subscribe({
    next: (data) => {
      this.alert?.showAlert("Operazione Andata a Buon Fine", 'success');
      
      // Aggiungiamo un ritardo di 2 secondi prima di andare alla home
      setTimeout(() => {
        this.goToHomePage();
      }, 1000);
    },
    error: (err) => {
      this.alert?.showAlert(err.error.MESSAGGIO, 'error');
      console.error(err);
    }
  });
}


}
