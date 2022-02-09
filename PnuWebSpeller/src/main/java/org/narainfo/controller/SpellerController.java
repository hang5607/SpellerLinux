package org.narainfo.controller;

import java.util.List;

import org.json.JSONArray;
import org.narainfo.WebSpeller;
import org.narainfo.dto.Page;
import org.narainfo.mapper.SpellerMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;



@Controller
public class SpellerController {
	
	@Autowired
	private SpellerMapper spellerMapper;
	
	//결과화면
	@RequestMapping("/results")
	public String results(@RequestParam(value="text1", required=false) String value, String btnModeChange, Model model) throws Exception {
		boolean bWeakOpt = false;
		
		if(btnModeChange == null) {
			bWeakOpt = true;
		}
		
		System.out.println(bWeakOpt);
		
		//원본값 DB 전송
		//spellerMapper.insertSentence(value);
		
		
		WebSpeller webSpeller = new WebSpeller();
		List<Page> str = webSpeller.getResultHTML(value, bWeakOpt);

		if(str == null) {
			return "ErrorResult";
		}
		int pageCnt = str.size();

		model.addAttribute("pageCnt", pageCnt);// page 수
		model.addAttribute("result", new JSONArray(str)); //json으로 변경해서 return
		return "results";
	}

}
