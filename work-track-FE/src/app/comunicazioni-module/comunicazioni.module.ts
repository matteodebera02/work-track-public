import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComunicazioniComponent } from './page/comunicazioni/comunicazioni.component';
import { FormsModule } from '@angular/forms';
import { UtilsModule } from '../utils/utils.module';



@NgModule({
  declarations: [
    ComunicazioniComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    UtilsModule
  ]
})
export class ComunicazioniModule { }
