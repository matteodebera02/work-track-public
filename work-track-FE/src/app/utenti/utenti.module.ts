import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AcettaUtentiComponent } from './page/acetta-utenti/acetta-utenti.component';
import { UtilsModule } from '../utils/utils.module';
import { MonitoringUserAdminComponent } from './page/monitoring-user-admin/monitoring-user-admin.component';
import { FormsModule } from '@angular/forms';
import { UtenteResocontoMensileComponent } from './page/utente-resoconto-mensile/utente-resoconto-mensile.component';



@NgModule({
  declarations: [
    AcettaUtentiComponent,
    MonitoringUserAdminComponent,
    UtenteResocontoMensileComponent
  ],
  imports: [
    CommonModule,
    UtilsModule,
    FormsModule
  ],
  exports: [
    AcettaUtentiComponent,
    UtenteResocontoMensileComponent
  ]
})
export class UtentiModule { }
