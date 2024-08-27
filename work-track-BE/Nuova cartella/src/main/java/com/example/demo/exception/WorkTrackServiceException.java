package com.example.demo.exception;

import org.springframework.http.HttpStatus;

public class WorkTrackServiceException  extends RuntimeException{

	private static final long serialVersionUID = 1L;
	
	public HttpStatus status;
	
	public WorkTrackServiceException(String message) {
		super(message);
	}

	public WorkTrackServiceException(String message, HttpStatus status) {
		super(message);
		this.status = status;
	}

	public WorkTrackServiceException(String message, Throwable t) {
		super(message, t);
	}

	public WorkTrackServiceException(String message, HttpStatus status, Throwable t) {
		super(message, t);
		this.status = status;
	}

	public HttpStatus getStatus() {
		return this.status;
	}


}
