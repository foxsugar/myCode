package com.crystalcg.gamedev.user.domain;

import java.io.Serializable;
import java.util.Date;


/**
 * 账号
 * @author xuzhongxing
 *
 */
public class Account implements Serializable{
	
	private static final long serialVersionUID = 3130381537595428239L;
	private int id;
	private String username;
	private String password;
	private Date createTime;
	private Date lastLoginTime;
	private int lastCharacterId;
	private int status;
	
	public int getId() {
		return id;
	}
	public String getUsername() {
		return username;
	}
	public String getPassword() {
		return password;
	}
	public Date getCreateTime() {
		return createTime;
	}
	public Date getLastLoginTime() {
		return lastLoginTime;
	}
	public int getLastCharacterId() {
		return lastCharacterId;
	}
	public int getStatus() {
		return status;
	}
	public void setId(int id) {
		this.id = id;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}
	public void setLastLoginTime(Date lastLoginTime) {
		this.lastLoginTime = lastLoginTime;
	}
	public void setLastCharacterId(int lastCharacterId) {
		this.lastCharacterId = lastCharacterId;
	}
	public void setStatus(int status) {
		this.status = status;
	}
}
