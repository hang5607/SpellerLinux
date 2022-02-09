package org.narainfo.dto;

//에러정보 vo
public class ErrInfo {

	int ErrorIdx;
	String OrgStr;
	String CandWord;
	String Help;
	int Start;
	int End;

	public int getErrorIdx() {
		return ErrorIdx;
	}

	public void setErrorIdx(int errorIdx) {
		ErrorIdx = errorIdx;
	}

	public String getOrgStr() {
		return OrgStr;
	}

	public void setOrgStr(String orgStr) {
		OrgStr = orgStr;
	}

	public String getCandWord() {
		return CandWord;
	}

	public void setCandWord(String candWord) {
		CandWord = candWord;
	}

	public String getHelp() {
		return Help;
	}

	public void setHelp(String help) {
		Help = help;
	}

	public int getStart() {
		return Start;
	}

	public void setStart(int start) {
		Start = start;
	}

	public int getEnd() {
		return End;
	}

	public void setEnd(int end) {
		End = end;
	}



	public ErrInfo(int errorIdx, String orgStr, String candWord, String help, int start, int end) {
		super();
		ErrorIdx = errorIdx;
		OrgStr = orgStr;
		CandWord = candWord;
		Help = help;
		Start = start;
		End = end;
	}

	@Override
	public String toString() {
		return "ErrInfoDTO [ErrorIdx=" + ErrorIdx + ", OrgStr=" + OrgStr + ", CandWord=" + CandWord + ", Help=" + Help
				+ ", Start=" + Start + ", End=" + End + "]";
	}

}
