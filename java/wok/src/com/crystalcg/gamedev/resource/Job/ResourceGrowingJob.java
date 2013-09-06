package com.crystalcg.gamedev.resource.Job;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;

import com.crystalcg.gamedev.Exception.AppException;
import com.crystalcg.gamedev.cometD.UserComet;
import com.crystalcg.gamedev.resource.domain.UserField;
import com.crystalcg.gamedev.resource.service.ResourceService;
import com.crystalcg.gamedev.util.Const;
import com.crystalcg.gamedev.util.ServiceLocator;

public class ResourceGrowingJob implements Job{

	@Override
	public void execute(JobExecutionContext context) throws JobExecutionException {
		// TODO Auto-generated method stub
		@SuppressWarnings("unchecked")
		List<UserField> userFields = (List<UserField>)context.getJobDetail().getJobDataMap().get("userFields");
		ResourceService rs = (ResourceService)ServiceLocator.getSpringBean("resourceService");
		UserComet userComet = (UserComet)ServiceLocator.getSpringBean("userComet");
		List<Map<String, Object>> retList = new ArrayList<Map<String,Object>>();
		try {
			for(UserField userField:userFields){
				userField.setFieldStatus(Const.FIELD_STATUS_ADULTNESS);
				userField.setBatchKey(0);
				rs.updateResourceField(userField);
				Map<String, Object> temp = rs.changeFieldToMap(userField);
				temp.put("fieldId", userField.getFieldId());
				retList.add(temp);
			}
		} catch (AppException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		int characterId = userFields.get(0).getCharacterId();
		if(ResourceService.SUBURB_UI_OPEN_STATUS.get(characterId)!=null){
			userComet.deliverToGameChannel(Const.GAME_CHANNEL_SUBURB, characterId, retList);
		}
	}

}
