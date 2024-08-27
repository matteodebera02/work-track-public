import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateRappComponent } from './page/create-rapp/create-rapp.component';
import { FormsModule } from '@angular/forms'; // Importa FormsModule
import { UtilsModule } from '../utils/utils.module';
import { ListaMieiRapportiniComponent } from './page/lista-miei-rapportini/lista-miei-rapportini.component';
import { EditRapportinoComponent } from './page/edit-rapportino/edit-rapportino.component';
import { AdminTuttiIRapportiniComponent } from './page/admin-all-rapportini/admin-tutti-irapportini.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';



@NgModule({
  declarations: [
    CreateRappComponent,
    ListaMieiRapportiniComponent,
    EditRapportinoComponent,
    AdminTuttiIRapportiniComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    UtilsModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  exports: [
    CreateRappComponent,
    ListaMieiRapportiniComponent,
    EditRapportinoComponent,
    AdminTuttiIRapportiniComponent,
  ]
})
export class RapportiniModule { }
