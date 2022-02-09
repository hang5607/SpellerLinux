package org.narainfo.dto;

import java.util.List;

//page정보 vo
public class Page {

	private int idx;
	private String str;
	private List<ErrInfo> errInfo;
	public int getIdx() {
		return idx;
	}
	public void setIdx(int idx) {
		this.idx = idx;
	}
	public String getStr() {
		return str;
	}
	public void setStr(String str) {
		this.str = str;
	}
	public List<ErrInfo> getErrInfo() {
		return errInfo;
	}
	public void setErrInfo(List<ErrInfo> errInfo) {
		this.errInfo = errInfo;
	}
	
	public Page(int idx, String str, List<ErrInfo> errList) {
		super();
		this.idx = idx;
		this.str = str;
		this.errInfo = errList;
	}
	@Override
	public String toString() {
		return "Page [idx=" + idx + ", str=" + str + ", errInfo=" + errInfo + "]";
	}
	
	
}
