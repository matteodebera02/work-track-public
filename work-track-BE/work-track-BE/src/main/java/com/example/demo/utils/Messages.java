package com.example.demo.utils;

import java.lang.reflect.Field;

public class Messages {

	public static final String MESSAGG = "MESSAGGIO";
	public static final String EMAIL_NON_TROVATA = "email non trovata ";
	public static final String PASSWORD_SBAGLIATA = "password errata  ";
	public static final String EMAIL_IN_USE = "Email gia in uso ";
	public static final String UTENTE_NON_TROVATO = "utente non trovato";
	public static final String SALVATAGGIO_RAPPORTINO_FALLITO = "salvataggio rapportino fallito";
	public static final String RAPPORTINO_NON_TROVATO = "rapportino non trovato ";
	public static final String USER_NOT_FOUND = "utente non trovatp ";
	
	
	

	public Messages() {} // deve nascondere quello di super 
	
	public static String getValueOf (String value,Object o) {
		Field field;
		String s = value;
		try {
			field = o.getClass().getDeclaredField(value);
			field.setAccessible(true);
			s = (String)  field.get(o);
		} catch (NoSuchFieldException | SecurityException | IllegalArgumentException | IllegalAccessException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return s;
	}
	
}
