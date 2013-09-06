package com.crystalcg.gamedev.resource.mapper;

import java.util.List;
import java.util.Map;

import com.crystalcg.gamedev.resource.domain.UserField;

public interface ResourceMapper {
	void insertNewField(UserField userField);
	void updateResourceField(UserField userField);
	List<UserField> getUserFieldByCharId(int charId);
	List<UserField> getUserFieldByCharIdAndStatus(Map<String, Object> param);
	UserField getSpecificUserField(Map<String, Object> param);
	List<UserField> getUserFieldWithSameTime(Map<String, Object> param);
	int getUserResourceCount(Map<String, Object> param);
	void deleteResource(UserField userField);
}
