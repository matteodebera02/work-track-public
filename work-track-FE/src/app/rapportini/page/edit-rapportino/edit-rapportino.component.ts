import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RapportiniDto } from 'src/app/dto/rapportino-dto';
import { RapportiniService } from 'src/app/service/rapportini-service';
import { UtenteService } from 'src/app/service/utente-service';
import { AlertComponent } from 'src/app/utils/alert/alert.component';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { UtenteDto } from 'src/app/dto/utente-dto';






@Component({
  selector: 'app-edit-rapportino',
  templateUrl: './edit-rapportino.component.html',
  styleUrls: ['./edit-rapportino.component.scss']
})
export class EditRapportinoComponent {
  // ci creiamo l ogetto rapportino 
  rapportino: RapportiniDto = {}
  // id che prendermo dall url 
  rapportinoId?: number

  utenteDto?: UtenteDto

  userEmail?: string; // Email dell'utente

  // alert componenet
  @ViewChild("alert")
  alert?: AlertComponent

  constructor(private route: ActivatedRoute, private router: Router, private rapportinoService: RapportiniService, private utenteService: UtenteService) {
    this.userEmail = localStorage.getItem('jwt-token')!; // Assicurati che il token sia effettivamente l'email
    // ci prendiamo l utente attuale 
    this.getActualUser()
    // Ottieni l'ID del rapportino dall'URL
    this.route.params.subscribe(params => {
      // Controlla se l'ID è presente nei parametri dell'URL
      if (params['id']) {
        // Assegna l'ID del rapportino alla variabile rapportinoId
        this.rapportinoId = +params['id']; // Il + converte il parametro in un numero
        // richiamiamo metodo che ci popula l ogetto rapportini
        this.getRappById();
      }
    });
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

  // metodo che mi manda alla lista dei miei rapportini
  goToMyRapportini() {
    if (!this.rapportino.letto) {
      this.router.navigate(['my-rapp-page'])
    }
    else {
      this.router.navigate(['all-rapp'])
    }

  }



  goToProfile() {
    this.router.navigate(['profile'])
  }

  getRappById() {
    this.rapportinoService.getRapportinoById(this.rapportinoId!).subscribe({
      next: (data) => {
        this.rapportino = data
      }, error: (err) => {
        console.error(err)
      }
    })
  }

  EditRapp() {
    // Verifica se la data è nel formato corretto (gg/mm/yyyy)
    const regex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!regex.test(this.rapportino.data!)) {
      // Se la data non è nel formato corretto, mostra un alert e interrompi il metodo
      this.alert?.showAlert("Il formato della data non è corretto. Utilizzare il formato gg/mm/yyyy", 'error');
      return;
    }

    // controlliamo se notturno è undefined 
    if (this.rapportino.oreNotturne == undefined) {
      this.rapportino.oreNotturne = 0
    }
    // Chiamiamo il service per creare il rapportino 
    // settiamo chi sta modificando e è l admin 
    this.rapportino.utente!.admin = this.utenteDto?.admin!
    this.rapportinoService.createRapportino(this.rapportino).subscribe({
      next: (data) => {
        this.alert?.showAlert("Operazione Andata a Buon Fine", 'success');

        // Aggiungiamo un ritardo di 2 secondi prima di andare alla home
        setTimeout(() => {
          this.goToMyRapportini();
        }, 1000);
      },
      error: (err) => {
        this.alert?.showAlert(err.error.MESSAGGIO, 'error');
        console.error(err);
      }
    });
  }

  // metodo che mi trova l utente data la email 
  getActualUser() {
    this.utenteService.findByEmail(this.userEmail!).subscribe({
      next: (data) => {
        this.utenteDto = data
      }, error: (err) => {
        console.error(err)
      }
    })
  }

  //-------------metodo per scarica file in img---------------//////////

  // Aggiungi il codice necessario per il tuo componente Angular

  downloadPDF() {
    const element = document.getElementById('content-to-img');

    if (element) {
      // Salva temporaneamente il testo della textarea
      const textarea = element.querySelector('textarea') as HTMLTextAreaElement;
      const textareaText = textarea.value;

      // Sostituisci la textarea con un div contenente il suo testo
      const textareaDiv = document.createElement('div');
      textareaDiv.textContent = textareaText;
      textarea.parentNode?.replaceChild(textareaDiv, textarea);

      // Salva temporaneamente gli input trasformati in label
      const inputsBackup: HTMLInputElement[] = [];
      const inputs = element.querySelectorAll('input');
      inputs.forEach((input: HTMLInputElement) => {
        const label = document.createElement('label');
        label.textContent = input.value;
        label.style.display = 'block'; // Imposta la visualizzazione su "block" per disporre le label in colonna
        label.style.width = `${input.offsetWidth}px`;
        label.style.height = `${input.offsetHeight}px`;
        input.parentNode?.replaceChild(label, input);
        inputsBackup.push(input);
      });

      // Aggiunge un ritardo prima di generare il PDF
      setTimeout(() => {
        // Genera un nuovo documento PDF
        const doc = new jsPDF();

        // Aggiunge il contenuto HTML come pagina al documento PDF
        html2canvas(element).then((canvas) => {
          const contentDataURL = canvas.toDataURL('image/png');
          const imgWidth = 210; // Larghezza del documento PDF
          const imgHeight = canvas.height * imgWidth / canvas.width; // Altezza proporzionale

          doc.addImage(contentDataURL, 'PNG', 0, 0, imgWidth, imgHeight);

          // Ripristina la textarea
          textareaDiv.parentNode?.replaceChild(textarea, textareaDiv);

          // Ripristina gli input trasformati
          inputsBackup.forEach((input: HTMLInputElement, index: number) => {
            const inputClone = input.cloneNode(true) as HTMLInputElement;
            input.parentNode?.replaceChild(inputClone, element.querySelectorAll('label')[index]);
          });

          // Salva il documento PDF
          doc.save(`rapportino_${this.rapportino.id}_${this.rapportino.cliente}_${this.rapportino.localita}.pdf`);
          this.router.navigate(['all-rapp']);
        });
      }, 500); // Aggiungi un ritardo di 500 millisecondi (puoi regolare questo valore se necessario)
    } else {
      console.error('Element with id "content-to-img" not found.');
    }
  }

















}

