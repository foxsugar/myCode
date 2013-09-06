package com.crystalcg.gamedev.user.mapper;

import com.crystalcg.gamedev.user.domain.Account;

/**
 * account表 映射类
 * @author xuzhongxing
 *
 */
public interface AccountMapper {
	
	/**
	 * 新建账号(用户名、密码)
	 * @param account
	 */
	void insertAccount(Account account);
	
	Account getAccountById(int id);
	
	Account getAccountByName(String name);

//	void updateAccount(Account account);
	
	void updateLastCharId(Account account);

	void updateLastLoginTime(Account account);
	
	/////////////////////////////////////////////////
	
//	List<DataEntity> getDataByArea(Map<String, Integer> pm);
}
