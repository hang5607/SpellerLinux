package org.narainfo.dto;

public class SpellerData {

	int idx;
	private String errorWord;
	private String replaceWord;
	private String sentence;
	
	public int getIdx() {
		return idx;
	}
	public void setIdx(int idx) {
		this.idx = idx;
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
	public String getSentence() {
		return sentence;
	}
	public void setSentence(String sentence) {
		this.sentence = sentence;
	}
	@Override
	public String toString() {
		return "SpellerData [errorWord=" + errorWord + ", replaceWord=" + replaceWord + ", sentence="
				+ sentence + "]";
	}



}
