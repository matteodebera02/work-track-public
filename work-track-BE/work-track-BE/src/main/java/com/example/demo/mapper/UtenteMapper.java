package com.example.demo.mapper;

import com.example.demo.dto.UtenteDto;
import com.example.demo.entity.UtenteEntity;

public class UtenteMapper {

    // Metodo per convertire un'entità in un DTO
    public static UtenteDto toDto(UtenteEntity entity) {
        UtenteDto dto = new UtenteDto();
        dto.setId(entity.getId());
        dto.setNome(entity.getNome());
        dto.setCognome(entity.getCognome());
        dto.setEmail(entity.getEmail());
        dto.setPassword(entity.getPassword());
        dto.setAdmin(entity.isAdmin());
        return dto;
    }

    // Metodo per convertire un DTO in un'entità
    public static UtenteEntity toEntity(UtenteDto dto) {
        UtenteEntity entity = new UtenteEntity();
        entity.setId(dto.getId());
        entity.setNome(dto.getNome());
        entity.setCognome(dto.getCognome());
        entity.setEmail(dto.getEmail());
        entity.setPassword(dto.getPassword());
        entity.setAdmin(dto.isAdmin());
        return entity;
    }
}

