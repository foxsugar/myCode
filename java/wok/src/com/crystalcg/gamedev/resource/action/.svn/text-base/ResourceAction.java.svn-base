package com.crystalcg.gamedev.resource.action;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.crystalcg.gamedev.Exception.AppException;
import com.crystalcg.gamedev.resource.service.ResourceService;
import com.crystalcg.gamedev.user.domain.UserCharacter;

@Controller
public class ResourceAction {
	private ResourceService resourceService;
	@RequestMapping(value="getPlanInfo")
	public @ResponseBody List<Map<String, Object>> getPlanInfo(int fieldType) throws AppException{
		return resourceService.getPlanInfo(fieldType);
	}
	
	@RequestMapping(value="getUserFieldInfo")
	public @ResponseBody Map<String, Object> getUserFieldInfo(HttpSession session) throws AppException{
		UserCharacter userCharacter = (UserCharacter)session.getAttribute("character");
		return resourceService.getUserFieldInfo(userCharacter.getId());
	}
	@RequestMapping(value="plantResource")
	public @ResponseBody Map<String, Object> plantResource(HttpSession session, int fieldId, int fieldType, int growTime) throws AppException{
		UserCharacter userCharacter = (UserCharacter)session.getAttribute("character");
		return resourceService.plantResource(userCharacter.getId(), fieldId, fieldType, growTime);
	}
	@RequestMapping(value="harvestResource")
	public @ResponseBody Map<String, Object> harvestResource(HttpSession session, int fieldId, int fieldType) throws AppException{
		UserCharacter userCharacter = (UserCharacter)session.getAttribute("character");
		return resourceService.harvestResource(userCharacter.getId(), fieldId, fieldType);
	}
	@RequestMapping(value="deleteResourceField")
	public @ResponseBody boolean deleteResourceField(HttpSession session, int fieldId, int fieldType) throws AppException{
		UserCharacter userCharacter = (UserCharacter)session.getAttribute("character");
		resourceService.deleteResourceField(userCharacter.getId(), fieldId, fieldType);
		return true;
	}
	@RequestMapping(value="easyHarvestResource")
	public @ResponseBody Map<String, Object> easyHarvestResource(HttpSession session) throws AppException{
		UserCharacter userCharacter = (UserCharacter)session.getAttribute("character");
		return resourceService.easyHarvestResource(userCharacter.getId());
	}
	@RequestMapping(value="closeSuburbUi")
	public @ResponseBody Object closeSuburbUi(HttpSession session) throws AppException{
		UserCharacter userCharacter = (UserCharacter)session.getAttribute("character");
		if(ResourceService.SUBURB_UI_OPEN_STATUS.get(userCharacter.getId())!=null){
			ResourceService.SUBURB_UI_OPEN_STATUS.remove(userCharacter.getId());
		}
		return null;
	}

	public ResourceService getResourceService() {
		return resourceService;
	}

	public void setResourceService(ResourceService resourceService) {
		this.resourceService = resourceService;
	}

}
