package com.crystalcg.gamedev.user.service;

import java.util.Date;

import com.crystalcg.gamedev.user.dao.AccountDao;
import com.crystalcg.gamedev.user.domain.Account;

public class AccountService {
	
	private AccountDao accountDao;

	public Account insertAccount(String username,String password) {
		Date date = new Date();
		Account account = new Account();
		account.setUsername(username);
		account.setPassword(password);
		account.setCreateTime(date);
		this.accountDao.insertAccount(account);
		return account;
	}

	public Account getAccountById(int id) {
		return this.accountDao.getAccountById(id);
	}
	
	public Account getAccountByName(String name) {
		return this.accountDao.getAccountByName(name);
	}
	
	public void updateLastLoginTime(Account account) {
		Date date = new Date();
		account.setLastLoginTime(date);
		this.accountDao.updateLastLoginTime(account);
	}
	
	public void updateLastCharId(Account account) {
		this.accountDao.updateLastCharId(account);
	}
	
	public AccountDao getAccountDao() {
		return accountDao;
	}

	public void setAccountDao(AccountDao accountDao) {
		this.accountDao = accountDao;
	}

}
