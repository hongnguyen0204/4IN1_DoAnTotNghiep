package com.bezkoder.springjwt.payload.response;

import java.util.List;

public class JwtResponse {
	private String token;
	private String type = "Bearer";
	private Long id;
	private String username;
	private String email;
	private List<String> roles;
	private Boolean status_acc;
	private Boolean ban;

	public JwtResponse(String token, Long id, String username, String email, List<String> roles, Boolean status_acc, Boolean ban) {
		this.token = token;
		this.id = id;
		this.username = username;
		this.email = email;
		this.roles = roles;
		this.status_acc = status_acc;
		this.ban = ban;
	}

	public Boolean getBan() {
		return ban;
	}

	public void setBan(Boolean ban) {
		this.ban = ban;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public Boolean getStatus_acc() {
		return status_acc;
	}

	public void setStatus_acc(Boolean status_acc) {
		this.status_acc = status_acc;
	}

	public String getAccessToken() {
		return token;
	}

	public void setAccessToken(String accessToken) {
		this.token = accessToken;
	}

	public String getTokenType() {
		return type;
	}

	public void setTokenType(String tokenType) {
		this.type = tokenType;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public List<String> getRoles() {
		return roles;
	}
}
