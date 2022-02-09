package org.narainfo.controller;

import java.util.Iterator;
import java.util.List;

import org.narainfo.dto.ReportData;
import org.narainfo.dto.SpellerData;
import org.narainfo.dto.ReplaceData;
import org.narainfo.mapper.SpellerMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/results")
public class InsertController {
	
	@Autowired
	private SpellerMapper spellerMapper;
	
	//사용자 대치어 클릭
	@RequestMapping(value="/clickReplace", method=RequestMethod.POST)
	public String clickReplace(@RequestBody List<ReplaceData> Data) throws Exception{
		ReplaceData spellerData = Data.get(0);
		spellerMapper.insertClickReplace(spellerData);
		return "redirect:/";
	}	
	
	//사용자가 직접 수정한 대치어 저장 @ModelAttribute("SpellerData") SpellerData spellerData
	@RequestMapping(value="/userReplace", method=RequestMethod.POST)
	public String userReplace(@RequestBody List<SpellerData> Data) throws Exception{
		SpellerData spellerData = Data.get(0);
		spellerMapper.insertUserReplace(spellerData);
		return "redirect:/";
	}

	//대치어를 제시했지만 수정하지 않은 것 저장
	@RequestMapping(value="/notChange", method=RequestMethod.POST)
	public String notChange(@RequestBody List<SpellerData> Data) throws Exception {
		Iterator<SpellerData> iter = Data.iterator();
		while(iter.hasNext()) {
			SpellerData spellerData = iter.next();
			if(spellerData.getSentence().length() < 1000) {
				spellerMapper.insertNoChange(spellerData);
			}
		}
		
		return "redirect:/";
	}
	
	//교정 관련 사용자 의견
	@RequestMapping(value="/bugreport", method=RequestMethod.POST)
	public String bugReport(@RequestBody List<ReportData> Data) throws Exception {
		ReportData reportData = Data.get(0);
		spellerMapper.insertBugreport(reportData);
		return "redirect:/";
	}

}
