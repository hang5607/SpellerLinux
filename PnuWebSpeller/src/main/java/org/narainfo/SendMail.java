package org.narainfo;

import java.util.Properties;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.springframework.stereotype.Component;

@Component
public class SendMail {
	//메일 보내기
	public void send(String contents) {
		final String user = "aidocu.backup@gmail.com"; // 네이버일 경우 네이버 계정, gmail경우 gmail 계정
        final String password = "ailab316";   // 패스워드

        // SMTP 서버 정보를 설정한다.
        Properties prop = new Properties();
        prop.put("mail.smtp.host", "smtp.gmail.com"); 
        prop.put("mail.smtp.port", 465); 
        prop.put("mail.smtp.auth", "true"); 
        prop.put("mail.smtp.ssl.enable", "true"); 
        prop.put("mail.smtp.ssl.trust", "smtp.gmail.com");
        
        Session session = Session.getInstance(prop, new javax.mail.Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(user, password);
            }
        });

        try {
            MimeMessage message = new MimeMessage(session);
            message.setFrom(new InternetAddress(user));

            //수신자메일주소
            message.addRecipient(Message.RecipientType.TO, new InternetAddress("urimal@pusan.ac.kr")); 

            // Subject
            StringBuffer subJect = new StringBuffer();
            subJect.append("[기타 사용자 의견] ");
            if(contents.length()<13) {
            	subJect.append(contents);
            }else {
            	subJect.append(contents.substring(0, 13));
            }
            message.setSubject(subJect.toString()); //메일 제목을 입력

            // Text
            message.setText(contents);    //메일 내용을 입력

            // send the message
            Transport.send(message); ////전송
            
        } catch (AddressException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (MessagingException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
	}
}
