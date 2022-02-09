<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<title>의견 보내기 - 한국어 맞춤법/문법 검사기</title>
<meta http-equiv='Content-Type' content='text/html; charset=UTF-8'>
<link rel='stylesheet' type='text/css' href='../css/speller.css'>
<script type="text/javascript" src="../js/jquery-3.3.1.min.js"></script>
<script type="text/javascript" src="../js/speller.js"></script>
</head>


<body text="#333333" onload="document.formOthReport.txtCommentOth.focus();" leftmargin="0"
	topmargin="0">

	<!--기타 보고를 위한 post 변수값-->
	<table height=100% width=100%>
		<tr>
			<td id='rightHead'>
		<TR>
			<TD id='popLayout' style='vertical-align: middle; text-align: left;'>

				<p
					style="margin-left: 90px; font-size: 30px; font-face: 'arial'; font-color: 'DarkGreen'; font-weight: bold;">
					의견 보내기</p>

				<form id='formOthReport' name='formOthReport'
					action='/' method='post'
					style='margin-left: 130px;'>

					<font size='2' face='arial' color='DarkGreen'> <b> <br>
							사용자 요구에 따라 인터페이스를 수정하는 중입니다.<br> 사용에 불편함이 있으시면 의견 보내주세요.<br>
							이메일 주소를 함께 알려주시면 수정 사항에 대해 답변을 보내드리겠습니다. <br>
					</b>
					</font> <br>

					<textarea id='txtCommentOth' class='tdBugReport'
						style='width: 600px; height: 280px; vertical-align: middle;'
						onclick='onCommentOthClick(this);'></textarea>
					<br>

					<p style='margin-left: 540px;'>
						<input type='hidden' id='hiddenCommentOth' name='hiddenCommentOth' /><br> 
						<input type='button' value='보내기' class='btnBugReport' onclick='onReportOth();' />
						<!--<input type='button' value='닫기' class='btnBugReport' onclick='javascript:self.close()' />-->
					</p>

				</form>

			</TD>
		</TR>
	</table>

	<iframe id='ifHidden' name='ifHidden'
		style='display: none; width: 300px; height: 200px;'></iframe>

</body>
</html>