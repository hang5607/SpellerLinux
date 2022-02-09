<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>한국어 맞춤법/문법 검사기</title>
<link rel='stylesheet' type='text/css' href='css/speller.css'>
<link rel='stylesheet' type='text/css' href='css/redesign.css'>
<script type="text/javascript" src="js/jquery-3.3.1.min.js"></script>
<script type="text/javascript" src="js/speller.js"></script>
<<<<<<< HEAD

<!-- Google 통계 Analytics 수집 삽입 스크립트 시작  -->
<meta name='google-site-verification' content='O10g1CUkQY4e8HJygeA4hfVN3Lb0TryxgxyV0HT_dnA'/>
<script type="text/javascript">
	var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www.");
	document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E"));
</script>
<script type="text/javascript">
	try {
	var pageTracker = _gat._getTracker("UA-12496734-2");
	pageTracker._trackPageview();
} catch(err) {}</script>
<!-- 구글 통계 스크립트 끝  -->

</head>
<body leftmargin='0' topmargin='0' text='#333333' onload="fShowPopupMsgIfFirst();">
=======
</head>
<body leftmargin='0' topmargin='0' text='#333333'>
>>>>>>> faf3283c0d40e9f8335faf5956c4d60003855fe2
	<div id="divPopupMsg"
		style="position: absolute; left: 377px; top: 140px; z-index: 99; visibility: hidden;"></div>
	<table id='tableMain'>
		<tr id='trMain'>
			<td id='tdHead' background='images/title.gif'>
<<<<<<< HEAD
				<a href='javascript:void(0);' onclick='fShowHelpPopup("");' tabindex=5>온라인 검사기
					사용법</a> &nbsp;|&nbsp; <a href='javascript:void(0);' onclick='fShowUserReportPopup("");'
=======
				<a href='#none' onclick='fShowHelpPopup("");' tabindex=5>온라인 검사기
					사용법</a> &nbsp;|&nbsp; <a href='#none' onclick='fShowUserReportPopup("");'
>>>>>>> faf3283c0d40e9f8335faf5956c4d60003855fe2
				tabindex=6>의견 보내기</a>
			</td>
		</tr>
		<tr id='trMain'>
			<td id='tdBody'>
				<table id='tableInputDesc'>
					<tr>
						<td>검사할 문장을 입력하세요.</td>
<<<<<<< HEAD
						<td align='right'>마지막 깁고 더함: 19/03/15</td>
=======
						<td align='right'>마지막 깁고 더함: 18/06/03</td>
>>>>>>> faf3283c0d40e9f8335faf5956c4d60003855fe2
					</tr>
				</table>
				<form name='inputForm' action='/results' method='post'>
					<TEXTAREA id='text1' name='text1' onKeyDown="return isEnter(event)"
						onKeyUp="fRefreshTextLen()" tabindex=1></TEXTAREA>
				</form> <img id='bgInputMenu' src='images/bgInputMenu.gif'>
				<input id='btnCheck' type='image' tabindex=2 title="검사: ctrl+enter"
				src='images/btnCheck.gif'
				ONMOUSEOUT="this.src='images/btnCheck.gif';"
				ONMOUSEOVER="this.src='images/btnCheck_over.gif';"
				ONMOUSEDOWN="this.src='images/btnCheck_click.gif';"
<<<<<<< HEAD
				ONCLICK='fFirstSpell()' /> 
=======
				ONCLICK='fFirstSpell();' /> 
>>>>>>> faf3283c0d40e9f8335faf5956c4d60003855fe2
				<input id='btnRenew' type='image'
				tabindex=3 title="입력 내용 지우기" src='images/btnRenew.gif'
				ONMOUSEOUT="this.src='images/btnRenew.gif';"
				ONMOUSEOVER="this.src='images/btnRenew_over.gif';"
				ONMOUSEDOWN="this.src='images/btnRenew_click.gif';"
				ONCLICK='document.inputForm.text1.value="";document.inputForm.text1.focus();' />
				<div id='divUIChange'>
				</div>
				<div id='divTextLen'>[총 글자 수]</div> 
			</td>
		</tr>
		<tr id='trMain'>
			<td id='tdTail'>
				<table id='tableTail'>
					<tr id='trMain'>
						<td id='tdLogo' rowspan=3
							background='images/logo.jpg'></td>
						<td id='tdCopyright'>Copyrightⓒ2001 AI Lab & Narainfotech. All Rights Reserved</td>
						<td id='tdTailMenu'>
							<p style='margin-left: 90px;'>
<<<<<<< HEAD
								<a href='#' onclick='fShowOrderPopup("./");' tabindex=7>맞춤법/문법 검사기 구매 문의<br>(MS Word/아래아 한글용)</a>
=======
								<a href='#' onclick='fShowOrderPopup("./");' tabindex=7>맞춤법/문법
									검사기 문의 </a>
>>>>>>> faf3283c0d40e9f8335faf5956c4d60003855fe2
							</p>
						</td>
					</tr>
					<tr id='trMain'>
						<td id='tdTailDesc' colspan=2>한국어 맞춤법/문법 검사기는 부산대학교 인공지능연구실과
							(주)나라인포테크가 함께 만들고 있습니다.</td>
					</tr>
					<tr id='trMain'>
						<td id='tdTailDesc' colspan=2>이 검사기는 개인이나 학생만 무료로 사용할 수 있습니다.
						</td>
					</tr>
				</table>
			</td>
		</tr>
	</table>
	<table id='tableTitleGoHome'>
		<tr>
			<td>
				<a href="http://speller.cs.pusan.ac.kr"> <img id='btntitleGoHome' src='images/titleGoHome.gif' title='home' border="0" /></a>
			</td>
		</tr>
	</table>
	<div id='divPopupBackground'></div>
	<div id='divClosePopup'>
		<input id='btnClosePopup' type='button' value='이전 화면' ONCLICK='fHidePopup();' />
	</div>
<<<<<<< HEAD
	<div>
		<img id='imgPopup' />
	</div>
=======
	<img id='imgPopup' />
>>>>>>> faf3283c0d40e9f8335faf5956c4d60003855fe2
	<iframe id='framePopup' class='noScrolling'></iframe>
</body>
</html>