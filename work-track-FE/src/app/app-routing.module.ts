import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './registration-module/components/registration/registration.component';
import { LoginComponent } from './registration-module/login/login.component';
import { HomePageComponent } from './home/page/home-page/home-page.component';
import { CreateRappComponent } from './rapportini/page/create-rapp/create-rapp.component';
import { AuthGuard } from './Guard/AuthGuard';
import { ListaMieiRapportiniComponent } from './rapportini/page/lista-miei-rapportini/lista-miei-rapportini.component';
import { EditRapportinoComponent } from './rapportini/page/edit-rapportino/edit-rapportino.component';
import { ProfileComponent } from './home/page/profile/profile.component';
import { AdminTuttiIRapportiniComponent } from './rapportini/page/admin-all-rapportini/admin-tutti-irapportini.component';
import { AcettaUtentiComponent } from './utenti/page/acetta-utenti/acetta-utenti.component';
import { MonitoringUserAdminComponent } from './utenti/page/monitoring-user-admin/monitoring-user-admin.component';
import { UtenteResocontoMensileComponent } from './utenti/page/utente-resoconto-mensile/utente-resoconto-mensile.component';
import { ComunicazioniComponent } from './comunicazioni-module/page/comunicazioni/comunicazioni.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Reindirizza alla rotta '/login'
  { path: 'register', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home-page', component: HomePageComponent, canActivate: [AuthGuard] }, // Utilizza canActivate per applicare la guardia all'accesso a questa rotta
  { path: 'create-rapportino', component: CreateRappComponent, canActivate: [AuthGuard] }, // Utilizza canActivate per applicare la guardia all'accesso a questa rotta
  { path: 'my-rapp-page', component: ListaMieiRapportiniComponent, canActivate: [AuthGuard]}, // Utilizza canActivate per applicare la guardia all'accesso a questa rotta
  { path: 'edit-rapp/:id', component: EditRapportinoComponent, canActivate: [AuthGuard]}, // Utilizza canActivate per applicare la guardia all'accesso a questa rotta
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},// Utilizza canActivate per applicare la guardia all'accesso a questa rotta
  { path: 'all-rapp', component: AdminTuttiIRapportiniComponent, canActivate: [AuthGuard]},// Utilizza canActivate per applicare la guardia all'accesso a questa rotta
  { path: 'acpt-user', component: AcettaUtentiComponent, canActivate: [AuthGuard]},// Utilizza canActivate per applicare la guardia all'accesso a questa rotta
  { path: 'monitoring-users', component: MonitoringUserAdminComponent, canActivate: [AuthGuard]},// Utilizza canActivate per applicare la guardia all'accesso a questa rotta
  { path: 'comunicazioni', component: ComunicazioniComponent, canActivate: [AuthGuard]},// Utilizza canActivate per applicare la guardia all'accesso a questa rotta
  { path: 'resoconto-mensile/:id/:mese/:anno', component: UtenteResocontoMensileComponent, canActivate: [AuthGuard]}// Utilizza canActivate per applicare la guardia all'accesso a questa rotta
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
