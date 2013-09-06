package com.crystalcg.gamedev.quest.action;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.crystalcg.gamedev.Exception.AppException;
import com.crystalcg.gamedev.quest.domain.Quest;
import com.crystalcg.gamedev.quest.service.QuestService;
import com.crystalcg.gamedev.user.domain.UserCharacter;

@Controller
public class QuestAction {
	private QuestService questService;
	
	@RequestMapping(value="getUserQuest")
	public @ResponseBody Map<String, List<Map<String, Object>>> getUserQuest(HttpSession session) throws AppException{
		UserCharacter userCharacter = (UserCharacter)session.getAttribute("character");
		return questService.getUserQuest(userCharacter.getId());
	}
	@RequestMapping(value="submitQuest")
	public @ResponseBody Map<String, List<Map<String, Object>>> submitQuest(HttpSession session, int questId) throws AppException{
		UserCharacter userCharacter = (UserCharacter)session.getAttribute("character");
		questService.submitQuest(userCharacter.getId(), questId);
		return questService.getUserQuest(userCharacter.getId());
	}
	@RequestMapping(value="getSpecficQuest")
	public @ResponseBody Map<String, Object> getSpecficQuest(HttpSession session, int questId) throws AppException{
		UserCharacter userCharacter = (UserCharacter)session.getAttribute("character");
		return changeQuestToMap(questService.getSpecficQuest(userCharacter.getId(), questId));
	}
	private Map<String, Object> changeQuestToMap(Quest quest) throws AppException{
		if(quest==null){
			throw new AppException("不存在该任务");
		}
		Map<String, Object> retMap = new HashMap<String, Object>();
		retMap.put("description", quest.getStaticQuest().getQuestDesc());
		retMap.put("targetDesc", quest.getStaticQuest().getTargetDesc());
		retMap.put("targetNeedAmount", quest.getStaticQuest().getTargetNum());
		retMap.put("targetAmount", quest.getTargetAmount());
		retMap.put("resetType", quest.getStaticQuest().getResetTyp());
		retMap.put("status", quest.getStatus());
		return retMap;
	}

	public QuestService getQuestService() {
		return questService;
	}

	public void setQuestService(QuestService questService) {
		this.questService = questService;
	}
}
