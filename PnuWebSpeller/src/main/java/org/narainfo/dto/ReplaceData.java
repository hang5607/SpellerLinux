package org.narainfo.dto;

public class ReplaceData {
	int idx;
	private String errorWord;
	private String replaceWord;
	private String wordList;
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
	public String getWordList() {
		return wordList;
	}
	public void setWordList(String wordList) {
		this.wordList = wordList;
	}
	@Override
	public String toString() {
		return "replaceData [idx=" + idx + ", errorWord=" + errorWord + ", replaceWord=" + replaceWord + ", sentence="
				+ sentence + ", wordList=" + wordList + "]";
	}
	
	
}
