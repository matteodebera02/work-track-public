export interface UtenteDto{
    id?: number;
    nome?: string;
    cognome?: string;
    email?: string;
    password?: string; 
    admin?: boolean;
    active?: boolean;
}