-- Crea lo schema del database
CREATE SCHEMA IF NOT EXISTS worktrack;

-- Crea la tabella per gli utenti
CREATE TABLE IF NOT EXISTS utente (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    cognome VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL,
    admin BOOLEAN,
    active BOOLEAN
);

-- Crea la tabella per i rapportini
CREATE TABLE IF NOT EXISTS rapportini (
    id INT AUTO_INCREMENT PRIMARY KEY,
    data VARCHAR(20) NOT NULL,
    commissionato_da VARCHAR(100) NOT NULL,
    cliente VARCHAR(100) NOT NULL,
    telefono VARCHAR(20) NULL,
    localita VARCHAR(50) NOT NULL,
    descrizione TEXT,
    ore INT NOT NULL,
    ore_notturne INT,
    straordinari INT,
    annotazioni TEXT,
    notturno BOOLEAN,
    utente_id INT,
    letto TINYINT NULL,
    FOREIGN KEY (utente_id) REFERENCES utente(id)
);

-- Crea la tabella per le comunicazioni 
CREATE TABLE IF NOT EXISTS comunicazioni (
    id INT AUTO_INCREMENT PRIMARY KEY,
    data VARCHAR(20) NOT NULL,
     titolo VARCHAR(100) NOT NULL,
    descrizione TEXT,
    utente_id INT,
    FOREIGN KEY (utente_id) REFERENCES utente(id)
);

-- aggiunta ore viaggio 
ALTER TABLE rapportini ADD COLUMN ore_viaggio INT NULL;



