package org.narainfo.dto;

public class ReportData {

	int idx;
	String strTitle;
	String inputStr;
	String errorWord;
	String replaceWord;
	String comment;

	
	public int getIdx() {
		return idx;
	}

	public void setIdx(int idx) {
		this.idx = idx;
	}

	public String getStrTitle() {
		return strTitle;
	}

	public void setStrTitle(String strTitle) {
		this.strTitle = strTitle;
	}

	public String getInputStr() {
		return inputStr;
	}

	public void setInputStr(String inputStr) {
		this.inputStr = inputStr;
	}

	public String getErrorWord() {
		return errorWord;
	}

	public void setErrorWord(String errorWord) {
		this.errorWord = errorWord;
	}

	public String getReplaceWord() {
		return replaceWord;
	}

	public void setReplaceWord(String replaceWord) {
		this.replaceWord = replaceWord;
	}

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	@Override
	public String toString() {
		return "reportData [strTitle=" + strTitle + ", inputStr=" + inputStr + ", errorWord=" + errorWord + ", replaceWord="
				+ replaceWord + ", comment=" + comment + "]";
	}

}
