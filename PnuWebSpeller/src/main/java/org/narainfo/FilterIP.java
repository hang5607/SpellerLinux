package org.narainfo;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

@Component
public class FilterIP {

	//IP 필터
	public boolean filterUserIP(String ip) throws IOException {

		if(ip==null) {
			return false;
		}
		
		boolean checkWhois = false;

		Path path = Paths.get("/data/nara/ipinfo/whois.dat");// IP 대역 정보
		List<String> whois = Files.readAllLines(path, StandardCharsets.UTF_8);
 
		path = Paths.get("/data/nara/ipinfo/confirmAgent.dat");// Agent true, false 정보
		List<String> confirmAgent = Files.readAllLines(path, StandardCharsets.UTF_8);

		path = Paths.get("/data/nara/ipinfo/confirmIP.dat");//IP true, false 정보
		List<String> confirmIP = Files.readAllLines(path, StandardCharsets.UTF_8);

		Long userIP = ipToLong(ip);
		String agent1 = "";
		String agent2 = "";

		for (int i = 0; i < whois.size(); i++) {
			String whoisLine = whois.get(i);

			String[] splitWord = whoisLine.split("	");

//			Long from = ipToLong(splitWord[2]);
//			Long to = ipToLong(splitWord[3]);

			if(ip.compareTo(splitWord[2])>=0 && ip.compareTo(splitWord[3])<=0) {
				checkWhois = true;
				agent1 = splitWord[0];
				agent2 = splitWord[1];
				break;				
			}
			
//			if (userIP >= from && userIP <= to) {
//				checkWhois = true;
//				agent1 = splitWord[0];
//				agent2 = splitWord[1];
//				break;
//			}
		}

		int checkIp = 0; // -1 : false, 0 : not found, 1: true
		for (int i = 0; i < confirmIP.size(); i++) {
			String checkIpLine = confirmIP.get(i);
			String[] splitWord = checkIpLine.split("	");

			if (splitWord[0].equals("false") && splitWord[1].equals(ip)) {
				checkIp = -1;
				break;
			} else if (splitWord[0].equals("true") && splitWord[1].equals(ip)) {
				checkIp = 1;
				break;
			}
		}

		if (checkWhois) {
			for (int i = 0; i < confirmAgent.size(); i++) {
				String confirmAgentLine = confirmAgent.get(i);
				String[] splitWord = confirmAgentLine.split("	");

				if (checkIp < 0 && splitWord[0].equals("false") && agent1.equals(splitWord[1])
						&& agent2.equals(splitWord[2])) {
					return false;
				}
			}
		} else {
			if (checkIp == -1) {
				return false;
			}

		}
		return true;
	}

	//String IP를 Long으로 변경 애플리케이션
	public long ipToLong(String ipAddress) {
		if (ipAddress == null || ipAddress.isEmpty()) {
			throw new IllegalArgumentException("ip address cannot be null or empty");
		}
		String[] octets = ipAddress.split(java.util.regex.Pattern.quote("."));
		if (octets.length != 4) {
			throw new IllegalArgumentException("invalid ip address");
		}
		long ip = 0;
		for (int i = 3; i >= 0; i--) {
			long octet = Long.parseLong(octets[3 - i]);
			if (octet > 255 || octet < 0) {
				throw new IllegalArgumentException("invalid ip address");
			}
			ip |= octet << (i * 8);
		}
		return ip;
	}

}
