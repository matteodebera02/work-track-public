import { UtenteDto } from "./utente-dto";

export interface RapportiniDto{
    id?: number;
    data?: string;
    commissionatoDa?: string;
    cliente?: string;
    telefono?: string;
    localita?: string;
    descrizione?: string;
    ore?: number;
    oreNotturne?: number
    annotazioni?: string;
    utente?: UtenteDto
    letto?: boolean
    notturno?: boolean
    straordinari?: number;
    oreViaggio?: number;
}