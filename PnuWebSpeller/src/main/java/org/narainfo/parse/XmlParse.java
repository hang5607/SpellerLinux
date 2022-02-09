package org.narainfo.parse;

import java.io.IOException;
import java.io.StringReader;
import java.util.ArrayList;
import java.util.List;

import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.xpath.XPath;
import javax.xml.xpath.XPathConstants;
import javax.xml.xpath.XPathExpression;
import javax.xml.xpath.XPathExpressionException;
import javax.xml.xpath.XPathFactory;

import org.narainfo.dto.ErrInfo;
import org.w3c.dom.Document;
import org.w3c.dom.NodeList;
import org.xml.sax.InputSource;
import org.xml.sax.SAXException;

public class XmlParse {
	
	public List<ErrInfo> xmlParsing(String xml) {
		InputSource is = new InputSource(new StringReader(xml));
		List<ErrInfo> infoList = new ArrayList<ErrInfo>();
		try {
			Document doc = DocumentBuilderFactory.newInstance().newDocumentBuilder().parse(is);
			XPath xpath = XPathFactory.newInstance().newXPath();

			XPathExpression expr = xpath.compile("//PnuNlpSpeller/PnuErrorWordList");
			NodeList nodeList = (NodeList) expr.evaluate(doc, XPathConstants.NODESET);
			
			for(int i=0;i<nodeList.getLength();i++) {
				String repeatChk = nodeList.item(i).getAttributes().item(0).getTextContent();

				if(repeatChk.equals("no")) {
					expr = xpath.compile("//*[@repeat=\"no\"]/PnuErrorWord");
					NodeList childNode = (NodeList) expr.evaluate(doc, XPathConstants.NODESET);

					for (int j = 0; j < childNode.getLength(); j++) {
						String ErrorIdx = childNode.item(j).getAttributes().item(2).getTextContent();
						int Start = Integer.parseInt(childNode.item(j).getAttributes().item(1).getTextContent());
						int End = Integer.parseInt(childNode.item(j).getAttributes().item(0).getTextContent());
		
						String expression = "//*[@nErrorIdx=" + ErrorIdx + "]/OrgStr";
						String OrgStr = xpath.compile(expression).evaluate(doc);
	
						expression = "//*[@nErrorIdx=" + ErrorIdx + "]/CandWordList/CandWord";
						NodeList candWordList = (NodeList) xpath.compile(expression).evaluate(doc, XPathConstants.NODESET);
						StringBuffer sb = new StringBuffer();
		
						expression = "//*[@nErrorIdx=" + ErrorIdx + "]/CandWordList";
						NodeList CandNodes = (NodeList) xpath.compile(expression).evaluate(doc, XPathConstants.NODESET);
						int m_nCount = Integer.parseInt(CandNodes.item(0).getAttributes().item(0).getTextContent());

						for (int n = 0; n < m_nCount; n++) {
							sb.append(candWordList.item(n).getTextContent());
							if(n<candWordList.getLength()-1) {
								sb.append("|");
							}
						}
						
						String CandWordList = sb.toString();
						
						expression = "//*[@nErrorIdx=" + ErrorIdx + "]/Help";
						String helpStr = xpath.compile(expression).evaluate(doc);
						
						ErrInfo errInfo = new ErrInfo(Integer.parseInt(ErrorIdx),OrgStr,CandWordList,helpStr, Start, End);
						infoList.add(errInfo);
					
					}						
				}
			}
		} catch (SAXException | IOException | ParserConfigurationException | XPathExpressionException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return infoList;
	}
}
