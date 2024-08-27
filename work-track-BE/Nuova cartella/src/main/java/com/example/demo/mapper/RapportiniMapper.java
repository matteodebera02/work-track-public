package com.example.demo.mapper;

import com.example.demo.dto.RapportiniDto;
import com.example.demo.entity.RapportiniEntity;

public class RapportiniMapper {

    public static RapportiniDto toDto(RapportiniEntity entity) {
        RapportiniDto dto = new RapportiniDto();
        dto.setId(entity.getId());
        dto.setData(entity.getData());
        dto.setCommissionatoDa(entity.getCommissionatoDa());
        dto.setCliente(entity.getCliente());
        dto.setTelefono(entity.getTelefono());
        dto.setLocalita(entity.getLocalita());
        dto.setDescrizione(entity.getDescrizione());
        dto.setOre(entity.getOre());
        dto.setAnnotazioni(entity.getAnnotazioni());
        dto.setUtente(UtenteMapper.toDto(entity.getUtente()));
        dto.setLetto(entity.getLetto());
        dto.setNotturno(entity.getNotturno());
        dto.setOreNotturne(entity.getOreNotturne());
        dto.setStraordinari(entity.getStraordinari());
        dto.setOreViaggio(entity.getOreViaggio());
        return dto;
    }

    public static RapportiniEntity toEntity(RapportiniDto dto) {
        RapportiniEntity entity = new RapportiniEntity();
        entity.setId(dto.getId());
        entity.setData(dto.getData());
        entity.setCommissionatoDa(dto.getCommissionatoDa());
        entity.setCliente(dto.getCliente());
        entity.setTelefono(dto.getTelefono());
        entity.setLocalita(dto.getLocalita());
        entity.setDescrizione(dto.getDescrizione());
        entity.setOre(dto.getOre());
        entity.setAnnotazioni(dto.getAnnotazioni());
        entity.setUtente(UtenteMapper.toEntity(dto.getUtente()));
        entity.setLetto(dto.getLetto());
        entity.setNotturno(dto.getNotturno());
        entity.setOreNotturne(dto.getOreNotturne());
        entity.setStraordinari(dto.getStraordinari());
        entity.setOreViaggio(dto.getOreViaggio());
        return entity;
    }
}

