import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../service/auth-service';
import { UtenteService } from '../service/utente-service';
import { UtenteDto } from '../dto/utente-dto';


@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {


    constructor(private authService: AuthService, private router: Router, private utenteService: UtenteService) {
    }

    canActivate(): boolean {
        // controllo se il token è in sessione 
        if (this.authService.isLoggedIn()) {
            return true;
        } else {
            this.router.navigate(['/login']);
            return false;
        }
    }

}
