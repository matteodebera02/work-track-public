package com.example.demo.configuration;

import java.util.HashMap;
import java.util.Map;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.example.demo.exception.WorkTrackServiceException;
import com.example.demo.utils.Messages;

@Configuration
@ControllerAdvice
public class WorkTrackExceptionHandler {
	
	@ExceptionHandler({WorkTrackServiceException.class})
	public ResponseEntity<Map<String, Object>> handleExceptionCustomMessage(WorkTrackServiceException e) {
		Map<String, Object> responseMessages = new HashMap<>();
		String mes = Messages.getValueOf(e.getMessage(), new Messages());
		responseMessages.put(Messages.MESSAGG, mes);
		HttpStatus status = HttpStatus.BAD_REQUEST;
		if (e.getStatus() != null) {
			status = e.getStatus();
		}
    	return ResponseEntity.status(status).body(responseMessages);
    }

}
