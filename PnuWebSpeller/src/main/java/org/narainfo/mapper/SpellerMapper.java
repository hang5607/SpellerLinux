package org.narainfo.mapper;

import org.narainfo.dto.ReportData;
import org.narainfo.dto.SentenceData;
import org.narainfo.dto.SpellerData;
import org.narainfo.dto.ReplaceData;

public interface SpellerMapper {

	public void insertClickReplace(ReplaceData replaceData) throws Exception;
	public void insertUserReplace(SpellerData spellerData) throws Exception;
	public void insertNoChange(SpellerData spellerData) throws Exception;
	public void insertBugreport(ReportData reportData) throws Exception;
	public void insertSentence(String sentence) throws Exception;
}
