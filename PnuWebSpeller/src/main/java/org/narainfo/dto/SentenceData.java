package org.narainfo.dto;

public class SentenceData {
	
	int idx;
	private String sentence;
	public int getIdx() {
		return idx;
	}
	public void setIdx(int idx) {
		this.idx = idx;
	}
	public String getSentence() {
		return sentence;
	}
	public void setSentence(String sentence) {
		this.sentence = sentence;
	}
	@Override
	public String toString() {
		return "SentenceData [idx=" + idx + ", sentence=" + sentence + "]";
	}

}
