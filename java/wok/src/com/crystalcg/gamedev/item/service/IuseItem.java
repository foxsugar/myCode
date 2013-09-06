package com.crystalcg.gamedev.item.service;

import com.crystalcg.gamedev.Exception.AppException;
import com.crystalcg.gamedev.item.domain.UserItem;
import com.crystalcg.gamedev.user.domain.UserCharacter;

public interface IuseItem {
	Object doUse(UserItem userItem, UserCharacter character, int usingCounts) throws AppException;
}
