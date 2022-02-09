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
<body leftmargin='0' topmargin='0' text='#333333' onload="fSetModeOptOnLoad();fShowPopupMsgIfFirst();">
	<div id="divPopupMsg"
		style="position: absolute; left: 377px; top: 140px; z-index: 99; visibility: hidden;"></div>
	<table id='tableMain'>
		<tr id='trMain'>
			<td id='tdHead' background='images/title.gif'>
				<a href='javascript:void(0);' onclick='fShowHelpPopup("");' tabindex=5>온라인 검사기
					사용법</a> &nbsp;|&nbsp; <a href='javascript:void(0);' onclick='fShowUserReportPopup("");'
				tabindex=6>의견 보내기</a>
			</td>
		</tr>
		<tr id='trMain'>
			<td id='tdBody'>
				<table id='tableInputDesc'>
					<tr>
						<td>검사할 문장을 입력하세요.</td>
						<td align='right'>마지막 깁고 더함: 19/03/15</td>
					</tr>
				</table>
				<!-- <form name='inputForm' action='/test' method='post'> -->
				<form name='inputForm' action='/results' method='post'>
					<TEXTAREA id='text1' name='text1' onKeyDown="return isEnter(event)"
						onKeyUp="fRefreshTextLen()" tabindex=1></TEXTAREA>
					<div id='divUIChange'>
						<input id='btnModeChange' name='btnModeChange' type='checkbox' onclick='fClickCheckBoxModeChange()' title='순화용어와 번역 투 문장을 모두 교정하는 옵션입니다.' checked/>
						<span id='textModeChange' onclick='fClickTextModeChange()' title='순화용어와 번역 투 문장을 모두 교정하는 옵션입니다.'>강한 규칙 적용하기</span>
					</div>
				</form> 
				
				<img id='bgInputMenu' src='images/bgInputMenu.gif'>
				<input id='btnCheck' type='image' tabindex=2 title="검사: ctrl+enter"
				src='images/btnCheck.gif'
				ONMOUSEOUT="this.src='images/btnCheck.gif';"
				ONMOUSEOVER="this.src='images/btnCheck_over.gif';"
				ONMOUSEDOWN="this.src='images/btnCheck_click.gif';"
				ONCLICK='fFirstSpell()' /> 
				<input id='btnRenew' type='image'
				tabindex=3 title="입력 내용 지우기" src='images/btnRenew.gif'
				ONMOUSEOUT="this.src='images/btnRenew.gif';"
				ONMOUSEOVER="this.src='images/btnRenew_over.gif';"
				ONMOUSEDOWN="this.src='images/btnRenew_click.gif';"
				ONCLICK='document.inputForm.text1.value="";document.inputForm.text1.focus();' />
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
								<a href='#' onclick='fShowOrderPopup("./");' tabindex=7>맞춤법/문법 검사기 구매 문의<br>(MS Word/아래아 한글용)</a>
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
	<div>
		<img id='imgPopup' />
	</div>
	<iframe id='framePopup' class='noScrolling'></iframe>
</body>
</html>