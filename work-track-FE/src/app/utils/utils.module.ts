import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './alert/alert.component';
import { PaginatorComponent } from './paginator/paginator.component';



@NgModule({
  declarations: [
    AlertComponent,
    PaginatorComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AlertComponent,
    PaginatorComponent
  ]
})
export class UtilsModule { }
