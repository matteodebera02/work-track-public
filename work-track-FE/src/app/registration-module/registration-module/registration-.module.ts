import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Importa FormsModule
import { RegistrationComponent } from '../components/registration/registration.component';
import { LoginComponent } from '../login/login.component';
import { UtilsModule } from 'src/app/utils/utils.module';



@NgModule({
  declarations: [
    RegistrationComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    UtilsModule
  ],
  exports: [
    RegistrationComponent,
    LoginComponent
  ]
})
export class RegistrationModule { }
