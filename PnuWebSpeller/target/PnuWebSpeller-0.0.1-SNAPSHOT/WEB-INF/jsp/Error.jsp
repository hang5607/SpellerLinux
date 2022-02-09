<%@ page language="java" contentType="text/html; charset=EUC-KR"
	pageEncoding="EUC-KR"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link rel='stylesheet' type='text/css' href='css/speller.css'>
<link rel='stylesheet' type='text/css' href='css/redesign.css'>
<script type="text/javascript" src="js/jquery-3.3.1.min.js"></script>
<script type="text/javascript" src="js/speller.js"></script>
<title>Insert title here</title>
</head>
<body>
	<table id="tableMain">
		<tbody>
			<tr id="trMain">
				<td id="tdHead"
					style="background-image: url('/images/title.gif');"><a
					href="#" onclick="fShowHelpPopup('../');">온라인 검사기 사용법</a>
					&nbsp;|&nbsp; <a href="#" onclick="fShowUserReportPopup('../');">의견
						보내기</a></td>
			</tr>
			<tr id="trMain">
				<td id="tdBody" style="text-align: center;">맞춤법과 문법 오류를 찾지
					못했습니다.<br>
				<br>기술적 한계로 찾지 못한 맞춤법 오류나 문법 오류가 있을 수 있습니다. <br>
				<br>
				<input id="btnGoBackEditor" type="image" tabindex="2" title="돌아가기"
					src="../images/btnGoBackEditor.gif"
					onmouseout="this.src='../images/btnGoBackEditor.gif';"
					onmouseover="this.src='../images/btnGoBackEditor_over.gif';"
					onmousedown="this.src='../images/btnGoBackEditor_click.gif';"
					onclick="history.go(-1);">&nbsp;&nbsp;&nbsp;&nbsp;<input
					id="btnRenew2" type="image" tabindex="1" title="새 문서 검사하기"
					src="../images/btnRenew2.gif"
					onmouseout="this.src='../images/btnRenew2.gif';"
					onmouseover="this.src='../images/btnRenew2_over.gif';"
					onmousedown="this.src='../images/btnRenew2_click.gif';"
					onclick="fRenew();">
				</td>
			</tr>
			<tr id="trMain">
				<td id="tdTail">

					<table id="tableTail">
						<tbody>
							<tr id="trMain">
								<td id="tdLogo" rowspan="3"
									style="background-image: url('../images/logo.jpg');"></td>
								<td id="tdCopyright">Copyrightⓒ2001 AI Lab &amp;
									Narainfotech. All Rights Reserved.</td>
								<td id="tdTailMenu">
									<p style="margin-left: 90px;">
										<a href="#" onclick="fShowOrderPopup(&quot;../&quot;);">맞춤법/문법
											검사기 문의</a>
									</p>
								</td>
							</tr>
							<tr id="trMain">
								<td id="tdTailDesc" colspan="2">한국어 맞춤법/문법 검사기는 부산대학교
									인공지능연구실과 (주)나라인포테크가 공동으로 만들고 있습니다.</td>
							</tr>
							<tr id="trMain">
								<td id="tdTailDesc" colspan="2">새 인터페이스는 <a
									href="http://pxd.co.kr/">pxd. inc.</a>의 <a
									href="http://story.pxd.co.kr/1096">無異</a>님께서 제공해주셨습니다.
								</td>
							</tr>
						</tbody>
					</table>
				</td>
			</tr>
		</tbody>
	</table>
</body>
</html>