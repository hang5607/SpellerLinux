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
					href="#" onclick="fShowHelpPopup('../');">�¶��� �˻�� ����</a>
					&nbsp;|&nbsp; <a href="#" onclick="fShowUserReportPopup('../');">�ǰ�
						������</a></td>
			</tr>
			<tr id="trMain">
				<td id="tdBody" style="text-align: center;">������� ���� ������ ã��
					���߽��ϴ�.<br>
				<br>����� �Ѱ�� ã�� ���� ����� ������ ���� ������ ���� �� �ֽ��ϴ�. <br>
				<br>
				<input id="btnGoBackEditor" type="image" tabindex="2" title="���ư���"
					src="../images/btnGoBackEditor.gif"
					onmouseout="this.src='../images/btnGoBackEditor.gif';"
					onmouseover="this.src='../images/btnGoBackEditor_over.gif';"
					onmousedown="this.src='../images/btnGoBackEditor_click.gif';"
					onclick="history.go(-1);">&nbsp;&nbsp;&nbsp;&nbsp;<input
					id="btnRenew2" type="image" tabindex="1" title="�� ���� �˻��ϱ�"
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
								<td id="tdCopyright">Copyright��2001 AI Lab &amp;
									Narainfotech. All Rights Reserved.</td>
								<td id="tdTailMenu">
									<p style="margin-left: 90px;">
										<a href="#" onclick="fShowOrderPopup(&quot;../&quot;);">�����/����
											�˻�� ����</a>
									</p>
								</td>
							</tr>
							<tr id="trMain">
								<td id="tdTailDesc" colspan="2">�ѱ��� �����/���� �˻��� �λ���б�
									�ΰ����ɿ����ǰ� (��)����������ũ�� �������� ����� �ֽ��ϴ�.</td>
							</tr>
							<tr id="trMain">
								<td id="tdTailDesc" colspan="2">�� �������̽��� <a
									href="http://pxd.co.kr/">pxd. inc.</a>�� <a
									href="http://story.pxd.co.kr/1096">���</a>�Բ��� �������ּ̽��ϴ�.
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