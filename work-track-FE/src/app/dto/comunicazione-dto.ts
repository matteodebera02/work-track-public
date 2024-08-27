import { UtenteDto } from "./utente-dto";

export interface ComunicazioniDto {
    id?: number;
    data?: string;
    titolo?: string;
    descrizione?: string;
    utente?: UtenteDto;
}