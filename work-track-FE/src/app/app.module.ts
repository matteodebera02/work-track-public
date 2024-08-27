
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgModule, isDevMode } from '@angular/core';
import { RegistrationModule } from './registration-module/registration-module/registration-.module';
import { FormsModule } from '@angular/forms';
import { RegistrationComponent } from './registration-module/components/registration/registration.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './registration-module/login/login.component';
import { UtilsModule } from './utils/utils.module';
import { HomeModule } from './home/home.module';
import { RapportiniModule } from './rapportini/rapportini.module';
import { UtentiModule } from './utenti/utenti.module';
import { ComunicazioniModule } from './comunicazioni-module/comunicazioni.module';
import { ServiceWorkerModule } from '@angular/service-worker';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RegistrationModule,
    FormsModule,
    HttpClientModule,
    UtilsModule,
    HomeModule,
    RapportiniModule,
    UtentiModule,
    ComunicazioniModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
