package com.crystalcg.gamedev.Exception;

public class ClientError{
	public ClientError(String error) {
		this.error = error;
	}

	private String error;

	public String getError() {
		return error;
	}

	public void setError(String error) {
		this.error = error;
	}
}
