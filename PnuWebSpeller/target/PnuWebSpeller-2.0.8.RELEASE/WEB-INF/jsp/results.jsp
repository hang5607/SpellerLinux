<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<title>한국어 맞춤법/문법 검사기</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<link rel='stylesheet' type='text/css' href='css/speller.css'>
<link rel='stylesheet' type='text/css' href='css/redesign.css'>
<script type="text/javascript" src="js/jquery-3.3.1.min.js"></script>
<script type="text/javascript" src="js/speller.js"></script>

<script type="text/javascript">
$(document).ready(function(){
	data = ${result};
	pages = data.length;
	makeHTML(0);
<<<<<<< HEAD
	if(pages>1){
		   toast("총 " +pages+"페이지입니다. 아래 화살표를 이용해 이동해주세요.");
		}
=======
>>>>>>> faf3283c0d40e9f8335faf5956c4d60003855fe2
});
</script>

<body leftmargin="0" topmargin="0" text="#333333" style="zoom: 1;">
	<table id="tableMain">
		<!-- <tbody> -->
			<!-- header -->
			<tr id='trMain'>
				<td id='tdHead' background='images/title.gif'>
<<<<<<< HEAD
					<a href='javascript:void(0);' onclick='fShowHelpPopup("");' tabindex=5>온라인 검사기
						사용법</a> &nbsp;|&nbsp; <a href='javascript:void(0);' onclick='fShowUserReportPopup("/results");'
=======
					<a href='#none' onclick='fShowHelpPopup("");' tabindex=5>온라인 검사기
						사용법</a> &nbsp;|&nbsp; <a href='#none' onclick='fShowUserReportPopup("/results");'
>>>>>>> faf3283c0d40e9f8335faf5956c4d60003855fe2
					tabindex=6>의견 보내기</a>
				</td>
			</tr>
			<!-- /header -->
			<tr id="trMain">
				<td id="tdBody">
					<!-- 검사 결과 -->
					<table id="tableResult">

						<!-- 원문 타이틀 / 새 문장 검사 -->
						<tbody>
							<tr>
								<td id="tdResultLTitle1" class="tdBox">
									<div style="width: 88px;">
										<img id="bgResultLTitle1" src="../images/bgResultLTitle1.gif">
									</div>
									<div style="float: right;">
										<font id="tResultLTitle1" value="fRefreshResultTextLen()"
											style="float: right; margin-right: 10px"></font><br>
									</div>
								</td>
								<td><div style="width: 11px;"></div></td>
								<td id="tdResultRTitle" class="tdBox">
									<div style="width: 88px;">
										<img id="bgResultRTitle" src="../images/bgResultRTitle.gif">
									</div>
								</td>
							</tr>

							<!-- 원문 / 오른쪽 결과 테이블 -->
							<tr>
								<td class="tdMainFrame">
									<!-- 원문 -->
									<div id="divLeft1" class="divScrollbarStyle"
										onscroll="fScroll1()">
										<table id="tableLeft1">
											<tbody>
												<tr>
<<<<<<< HEAD
													<td id="tdCorrection1stBox" style="white-space: pre-wrap;"></td>
=======
													<td id="tdCorrection1stBox"></td>
>>>>>>> faf3283c0d40e9f8335faf5956c4d60003855fe2
												</tr>
											</tbody>
										</table>
									</div>
								</td>
								<td><div style="width: 11px;"></div></td>
								<td id="tdRight" class="tdMainFrame" rowspan="4">
									<!-- 교정 테이블  -->
									<table class="divRight">
										<tbody>
											<tr style="border: 0px;">
												<td id="tdCorrectionTable1st">
													<div id="divCorrectionTableBox1st"
														class="divScrollbarStyle divCorrectionTableBoxStyle">
													</div>
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>

							<!-- 바닥글-->
							<tr>
								<td id="tdResultLTitle3" class="tdMainFrame">
									<table>
										<tbody>
											<tr>
												<td id="tdForResultLTitle3"><img id="bgResultLTitle3"
													src="../images/bgResultLTitle3.gif"> <font
													id="pResultLTitle3">한 번에 300어절씩 검사합니다.</font></td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
							<tr>
								<td id="tdResultDesc" class="tdMainFrame" colspan="2"></td>
							</tr>
						</tbody>
					</table> 
					<!-- 버튼  -->
					<table id="tableButton">
						<tbody>
							<tr>
								<td>
									<table style="width: 465px; float: left;">
										<tbody>
											<tr>
												<td width="93px" align="left"><input id="btnRenew2"
													type="image" tabindex="1" title="새 문서 검사하기"
													src="../images/btnRenew2.gif"
													onmouseout="this.src='../images/btnRenew2.gif';"
													onmouseover="this.src='../images/btnRenew2_over.gif';"
													onmousedown="this.src='../images/btnRenew2_click.gif';"
													onclick="fRenew()"></td>
													
												<td width="93px" align="left"><input id="btnOrgCopy"
													type="image" width="88" height="39" tabindex="2"
													title="결과 복사하기" src="../images/btnOrgCopy.gif"
													onmouseout="this.src='../images/btnOrgCopy.gif';"
													onmouseover="this.src='../images/btnOrgCopy_over.gif';"
													onmousedown="this.src='../images/btnOrgCopy_click.gif';"
													onclick="fAddClickEventToCopy()"></td>
													
												<td width="80px" align="left"><input
													id="btnGoBackEditor" type="image" tabindex="3" title="돌아가기"
													src="../images/btnGoBackEditor.gif"
													onmouseout="this.src='../images/btnGoBackEditor.gif';"
													onmouseover="this.src='../images/btnGoBackEditor_over.gif';"
													onmousedown="this.src='../images/btnGoBackEditor_click.gif';"
<<<<<<< HEAD
													onclick="back()"></td>
=======
													onclick="history.go(-1)"></td>
>>>>>>> faf3283c0d40e9f8335faf5956c4d60003855fe2
													
												<td width="60px" align="left">
												<div style="width: 30px;" tabindex="2"></div></td>
												
 												<td id="prevBtn" width="60px" align="left"></td>												
												<td id="nextBtn" width="60px" align="left"></td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
						</tbody>
					</table>
				</td>
			</tr>
			<!-- footer -->
			<tr id="trMain">
				<td id="tdTail">

					<table id="tableTail">
						<tbody>
							<tr id="trMain">
								<td id="tdLogo" rowspan="3"
									style="background-image: url('../images/logo.jpg');"></td>
								<td id="tdCopyright">Copyrightⓒ2001 AI Lab &amp;
									Narainfotech. All Rights Reserved.</td>
								<td id='tdTailMenu'>
									<p style='margin-left: 90px;'>
<<<<<<< HEAD
										<a href='#' onclick='fShowOrderPopup("/results");' tabindex=7>맞춤법/문법 검사기 구매 문의<br>(MS Word/아래아 한글용)</a>
=======
										<a href='#' onclick='fShowOrderPopup("/results");' tabindex=7>맞춤법/문법
											검사기 문의 </a>
>>>>>>> faf3283c0d40e9f8335faf5956c4d60003855fe2
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
			<!-- /footer -->
<!-- 		</tbody> -->
	</table>
<<<<<<< HEAD
	<table id='tableTitleGoHome'>
		<tr>
			<td>
				<a href="http://speller.cs.pusan.ac.kr"> <img id='btntitleGoHome' src='images/titleGoHome.gif' title='home' border="0" /></a>
			</td>
		</tr>
	</table>
=======
>>>>>>> faf3283c0d40e9f8335faf5956c4d60003855fe2
	<div id='divPopupBackground'></div>
	<div id='divClosePopup'>
		<input id='btnClosePopup' type='button' value='이전 화면' ONCLICK='fHidePopup();' />
	</div>
	<img id='imgPopup' />
	<iframe id='framePopup' class='noScrolling'></iframe>
</body>
</html>