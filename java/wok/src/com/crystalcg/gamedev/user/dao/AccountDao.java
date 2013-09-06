package com.crystalcg.gamedev.user.dao;

import com.crystalcg.gamedev.user.domain.Account;
import com.crystalcg.gamedev.user.mapper.AccountMapper;

public class AccountDao {
	
	private AccountMapper accountMapper;
	
	public void insertAccount(Account account){
		accountMapper.insertAccount(account);
	}
	
	public Account getAccountById(int id){
		return accountMapper.getAccountById(id);
	}
	
	public Account getAccountByName(String username){
		return accountMapper.getAccountByName(username);
	}

	public void updateLastCharId(Account account){
		accountMapper.updateLastCharId(account);
	}

	public void updateLastLoginTime(Account account){
		accountMapper.updateLastLoginTime(account);
	}

	public AccountMapper getAccountMapper() {
		return accountMapper;
	}

	public void setAccountMapper(AccountMapper accountMapper) {
		this.accountMapper = accountMapper;
	}
}
