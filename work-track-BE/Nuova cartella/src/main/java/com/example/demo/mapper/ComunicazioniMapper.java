package com.example.demo.mapper;

import com.example.demo.dto.ComunicazioniDto;
import com.example.demo.entity.ComunicazioniEntity;

public class ComunicazioniMapper {

	public static ComunicazioniDto toDto(ComunicazioniEntity entity) {
		ComunicazioniDto dto = new ComunicazioniDto();
        dto.setId(entity.getId());
        dto.setData(entity.getData());
        dto.setUtente(UtenteMapper.toDto(entity.getUtente()));
        dto.setDescrizione(entity.getDescrizione());
        dto.setTitolo(entity.getTitolo());
        return dto;
    }
	
	public static ComunicazioniEntity toDto(ComunicazioniDto dto) {
		ComunicazioniEntity entity = new ComunicazioniEntity();
		entity.setId(dto.getId());
		entity.setData(dto.getData());
		entity.setUtente(UtenteMapper.toEntity(dto.getUtente()));
		entity.setDescrizione(dto.getDescrizione());
		entity.setTitolo(dto.getTitolo());
        return entity;
    }

}
