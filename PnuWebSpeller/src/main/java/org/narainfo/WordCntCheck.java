package org.narainfo;

import java.util.ArrayList;

public class WordCntCheck {

	//300어절씩 나누기 위한 메소드
	public ArrayList<String> splitStr(String query){
		ArrayList<String> splitStr = new ArrayList<String>();
		//300어절 나누기

		int cnt = 0;
		String[] splitQuery = query.split(" ");
		StringBuffer sb = new StringBuffer();
		if(splitQuery.length<=300) {
			for(int i=0;i<splitQuery.length;i++) {
				sb.append(splitQuery[i]);
				sb.append(" ");
			}
			splitStr.add(sb.toString());
		} else {
			for(int i=0;i<splitQuery.length;i++) {

				if(i%300 == 0 && i != 0) {
					cnt = i+1;
					splitStr.add(sb.toString());
					sb = new StringBuffer();
				}
				
				sb.append(splitQuery[i]);
				sb.append(" ");
			}
			
			if(cnt < splitQuery.length) {
				sb = new StringBuffer();
				for(int i=cnt;i<splitQuery.length;i++) {
					sb.append(splitQuery[i]);
					sb.append(" ");
				}
				splitStr.add(sb.toString());				
			}

		}
		
//		for(int i=0;i<query.length();i++) {
//			System.out.println(query.charAt(i));
//			if(query.charAt(i)==' ') {
//				spaceCnt+=1;
//			}
//			if(spaceCnt%300 == 0) {
//				end = i;
//				splitStr.add(query.substring(start,end));
//				start = i+1;
//			}
//
//		}
//		if(end < query.length()-1) {
//			splitStr.add(query.substring(end,query.length()-1));
//		}
//		
//		System.out.println(splitStr.size());
		return splitStr;
	}
}
