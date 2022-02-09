package org.narainfo;

import java.util.ArrayList;
import java.util.List;

import org.narainfo.dto.ErrInfo;
import org.narainfo.dto.Page;
import org.narainfo.parse.XmlParse;

public class WebSpeller {
    // Native method declaration
    native byte[] Check(byte[] _strInput, boolean bWeakOpt);

	

	// Load the library
	static {

		System.load("/data/nara/lib/libWebSpeller.so");
		//System.load("/home/aiuser/SpellerForLinux/libWebSpeller.so");
	}

		
	//입력받은 문장을 검사하여 결과 출력. 300어절씩 나누어서 pageList에 저장.
	public List<Page> getResultHTML(String query, boolean bWeakOpt) {

		int idx = 0;
		byte buf[];
		String tmp = "";
		List<Page> pageList = new ArrayList<Page>();
		WordCntCheck wordCntCheck = new WordCntCheck();
		try {
			ArrayList<String> list = wordCntCheck.splitStr(query);
			for (int i = 0; i < list.size(); i++) {
				String str = list.get(i);
				buf = Check(str.getBytes("UTF-8"), bWeakOpt);
				tmp = new String(buf, "UTF-8");
				XmlParse xmlParse = new XmlParse();
				List<ErrInfo> errList = xmlParse.xmlParsing(tmp);
				
				if(errList.size() == 0 && list.size() == 1) {
					return null;
				}
				
				Page page = new Page(idx++, str, errList);
				pageList.add(page);
			}
			return pageList;
		} catch (Exception e) {
			System.out.println(query);
			e.printStackTrace();
		}

		return null;
	}

	//xml 원문 그대로 유지하여 return, 앱이나 다른 사이트에서 연동해서 파싱 후 사용하는 사람 대상.
	public String getResultXML(String query) {
		
		byte buf[];
		try {
			buf = Check(query.getBytes("UTF-8"), false);
			String result = new String(buf,"EUC-KR");
			return result;
			
		} catch(Exception e) {
			e.printStackTrace();
		}
		
		return null;
	}
	
}
