import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent {

  @Input() type?: 'success' | 'error' ; // Tipo di messaggio: successo o errore
  @Input() message: string = ''; // Messaggio da mostrare nell'alert
  show: boolean = false; // Variabile per mostrare/nascondere l'alert

  // Metodo per mostrare l'alert
  showAlert(message: string, type: 'success' | 'error' = 'success') {
    this.message = message;
    this.type = type;
    this.show = true;
  }

  // Metodo per chiudere l'alert
  closeAlert() {
    this.show = false;
  }
}

