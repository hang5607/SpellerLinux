	var data; // json데이터
	var text; // 원문
	var pages;
	var incorrectArr = new Map();
		
	$(function(){
		$(document).on("click", ".tableErrCorrect .nav a", function(){
			fApplyCandidate($(this));
		});
	});

	//교정(오른쪽) 테이블 생성
	function makeHTML(idx){
		//console.log("idx : " + idx);
		text =data[idx].str;
		var CorrectionTable ="<table style='border:0; cellpadding:0; cellspacing:0; width:411; height:480;'>";
		CorrectionTable +="<tbody>";
		CorrectionTable +="<tr>";
		CorrectionTable +="<td align='center' valign='center'><br>";
		var length = data[idx].errInfo.length;
		
		for(var i=0;i<length;i++){
			var CorrectionSetId = data[idx].errInfo[i].errorIdx;
			
			CorrectionTable += "<table id='tableErr_"+ CorrectionSetId +"' class='tableErrCorrect' onclick='fShowSelText("+ CorrectionSetId +")' style='border:1; cellpadding:3; cellspacing:0;'>";
			CorrectionTable += "<tbody>";
			CorrectionTable += "<tr>";
			CorrectionTable += "<td class='tdLT' title='0'>입력 내용</td>";
			CorrectionTable += "<td id='tdErrorWord_"+ CorrectionSetId +"' class='tdErrWord' style='color: #FF0000;'>";
			CorrectionTable += "<ul class='nav nav-stacked'><li><a href='#none' style='color: #FF0000;'>"+data[idx].errInfo[i].orgStr+"</a></li>";
			CorrectionTable += "</ul></td>";
			CorrectionTable +="<tr>";
			CorrectionTable +="<td class='tdLT' style='vertical-align: top;'>대치어</td>";
			CorrectionTable +="<td id='tdReplaceWord_"+ CorrectionSetId +"' class='tdReplace'><ul class='nav nav-stacked'>";
			
			var replaceList = data[idx].errInfo[i].candWord;
			var replaceWord = replaceList.split('|');
			
			for(var j in replaceWord){
				CorrectionTable +="		<li><a href='#none'>"+ replaceWord[j] +"</a></li>";
			}
			
			CorrectionTable +="	</ul></td>";
			CorrectionTable +="</tr>";
			// 직접수정은 나중에 넣기.
 			CorrectionTable +="<tr>";
			CorrectionTable +="<td class='tdLT'>직접 수정</td>";
			CorrectionTable +="<td class='tdReplace'><ul class='nav nav-stacked'>";
			CorrectionTable +="<li><textarea id='userReplace_"+ CorrectionSetId +"' class='tdUserReplace' onkeypress='if(event.keyCode==13){return false;}' placeholder='원하는 대치어를 직접 입력하세요.'></textarea>";
			CorrectionTable +="<button class='btnUserReplace' onclick='onUserReplace("+ CorrectionSetId +");'>적용</button></li>";
			CorrectionTable +="</ul></td></tr>";		
			
			CorrectionTable +="<tr>";
			CorrectionTable +="<td class='tdLT'>도움말</td>";
			CorrectionTable +="<td id='tdHelp_"+ CorrectionSetId +"' class='tdETNor'><br>"+data[idx].errInfo[i].help+"</td>";
			CorrectionTable +="</tr>";

 			CorrectionTable +="<tr id='trBugReport_"+ CorrectionSetId +"'>";
			CorrectionTable +="<td class='tdLT'>의견</td>";
			CorrectionTable +="<td id='tdBugReport_"+ CorrectionSetId +"' class='tdETNor'>";
			CorrectionTable +="<textarea id='comment_"+ CorrectionSetId +"' class='tdBugReport' style='width: 258px;' placeholder='대치어가 맞지 않거나, 다른 의견이 있으면 내용을 적어서 [보내기]를 눌러 주세요.'></textarea>";
			CorrectionTable +="<button class='btnBugReport' onclick='onBugReport("+ CorrectionSetId +");'>보내기</button>";
			CorrectionTable +="</td></tr>";			
			CorrectionTable +="</tbody>";
			CorrectionTable +="</table>";
			CorrectionTable +="<br>"; 
		}
		
		CorrectionTable +="</td>";
		CorrectionTable +="</tr>";
		CorrectionTable +="</tbody>";
		CorrectionTable +="</table>";
		document.getElementById('divCorrectionTableBox1st').innerHTML = CorrectionTable;
		
		designText(idx);
		pageMoveBtn(idx);
		fRefreshResultTextLen();
		
	}
	
	function ConvertSystemSourcetoHtml(str){
//		 str = str.replace(/</g,"&lt;");
//		 str = str.replace(/>/g,"&gt;");
//		 str = str.replace(/\"/g,"&quot;");
//		 str = str.replace(/\'/g,"&#39;");
		 str = str.replace(/\n/g,"<br>");
		 return str;
		}
	
	//원문(왼쪽) 테이블 정보 생성
	function designText(idx){
		var designText = text;
		
		for(var i=data[idx].errInfo.length-1;i>=0;i--){
			var errorIdx = data[idx].errInfo[i].errorIdx;
			var start = data[idx].errInfo[i].start;
			var end = data[idx].errInfo[i].end;
			// console.log(data[idx].errInfo[i].orgStr + " : " +
			// designText.substring(start,end));
			var replace = "<font id='ul_"+errorIdx+"' color='red' class='ul' onclick='fShowHelp("+errorIdx+")'>"+data[idx].errInfo[i].orgStr+"</font>";
			designText = designText.substr(0,start) + replace + designText.substr(end,designText.length);
		}
		console.log("text : "+designText);
		document.getElementById('tdCorrection1stBox').innerHTML = designText;
		redesign();
	}
	
	function fApplyCandidate(obj) {
		console.log("obj : " + obj);
	    var objLI = obj.parent();
	    var objUL = objLI.parent();
	    var objTD = objUL.parent();
	    var objTR = objTD.parent();
	    var objTable = objTR.parent();
	    var tdid = obj.closest('td').attr('id');
	    console.log("tdid : " + tdid);
	    var a = document.getElementById(tdid);

	    var strDigitID = fGetStrDigitID(objTD[0].id.toString());
	    var errText = $('#tdErrorWord_' + strDigitID).text();

	    objTable.find('li').removeClass('selectedCand');
	    objLI.addClass('selectedCand');

	    $('#ul_' + strDigitID).html(objLI.text());
	    $('#ul_' + strDigitID).css('color', 'black');

	    fRefreshResultTextLen();
	}
	
	//버그리포트
	function onBugReport(idx){
		
		var errorWord = $('#tdErrorWord_' + idx).find('li').eq(0).text();
		var sentence = makeSentence(errorWord);
		var comment = $('#comment_' + idx).val();
		
		
		
		var replaceList= $('#tdReplaceWord_' + idx).find('li');

		var replaceWord = '';
		for(var i=0;i<replaceList.length; i++){
			replaceWord += replaceList.eq(i).text();
			
			if(i<(replaceList.length-1)){
				replaceWord +='<br>';
			}
		}

		var jsonArr = new Array();
		
		var data = new Object();
		
		data.strTitle = sentence;
		data.inputStr = text;		
		data.errorWord = errorWord;
		data.replaceWord = replaceWord;
		data.comment = comment;

		jsonArr.push(data);
		
       	$.ajax({
    		type : 'post',
    		url : '/results/bugreport',
    		contentType: 'application/json',
    		data : JSON.stringify(jsonArr),
    		error : onError,
    		success : onSuccess
    	});  
	}
	
	//사용자가 대치어를 직접 수정
	function onUserReplace(idx){
		
		var errorWord = $('#tdErrorWord_' + idx).text();
		var replaceWord = $('#userReplace_' + idx).val();
		var sentence;
		
	    $('#ul_' + idx).html(replaceWord);
	    $('#ul_' + idx).css('color', 'black');
	    
	    $('#tableErr_' + idx).find('li').removeClass('selectedCand');
	    
	    fRefreshResultTextLen();
	    
        if (errorWord != replaceWord) {
            if(errorWord !=" " || replaceWord !="  "){
				// console.log('사용자 대치어 클릭');
               sentence = makeSentence(errorWord);
               //console.log(sentence);
               //ajax
               
               var spellerData = JSON.stringify(makeJSON(errorWord, replaceWord, sentence));
               //console.log(spellerData);
               
	           	$.ajax({
	        		type : 'post',
	        		url : '/results/userReplace',
	        		contentType: 'application/json',
	        		data : JSON.stringify(makeJSON(errorWord, replaceWord, sentence)),
	        		error : onError,
	        		success : onSuccess
	        	});               
            }
        }
	}
	
	//수정하지 않은 오류어 저장
	function inputIncorrect(){
		var lastArrSize = incorrectArr.size;
		var jsonArr = new Array();
		var sentence;
		if(incorrectArrSize != lastArrSize) {
			incorrectArr.forEach(function(value, key) {
				
				sentence = makeSentence(key);
				
				var data = new Object();
				
				data.errorWord = key;
				data.replaceWord = value;
				data.sentence = sentence;
				
				jsonArr.push(data);
			});
			//ajax
           	$.ajax({
        		type : 'post',
        		url : '/results/notChange',
        		contentType: 'application/json',
        		data : JSON.stringify(jsonArr),
        		error : onError,
        		success : onSuccess
        	});
		}
	}
	//DB에 저장하기 위한 JSON 데이터 생성
	function makeJSON(errorWord, replaceWord, sentence){
		var jsonArr = new Array();
		
		var data = new Object();
		
		data.errorWord = errorWord;
		data.replaceWord = replaceWord;
		data.sentence = sentence;

		jsonArr.push(data);
		
		return jsonArr;
	}
	
	//압뒤 4어절씩해서 문장 만듬
	function makeSentence(errorWord) {

		var delTag = text.replace(/(<([^>]+)>)/ig, "");
		// console.log(delTag);

		var pos = delTag.indexOf(errorWord);
		// console.log("errWord 위치 : " + pos);
		var cnt = 0;
		var startPos = 0, endPos = 0;
		for (var i = pos; i > 0; i--) {
			var chk = delTag.charAt(i);
			if (chk == ' ') {
				cnt += 1;
			}
			if (cnt == 4) {
				startPos = i;
				break;
			}
		}
		cnt = 0;
		var endStart = pos + errorWord.length;
		for (var i = endStart; i <= delTag.length; i++) {
			var chk = delTag.charAt(i);
			if (chk == ' ') {
				cnt += 1;
			}
			if (cnt == 4) {
				endPos = i;
				break;
			}
			endPos=i;
		}
		var sentence = delTag.substring(startPos, endPos).toString();
		sentence = sentence.replace(/(\r\n\t|\n|\r\t)/gm,"");
		if(sentence.length == 0){
			sentence = delTag;
		}
		
		return sentence;
	}
	
	//ajax 에러 로그
	function onError() {
		//console.log("ajax fail")
	}
	
	//ajax 성공 로그
	function onSuccess(data, status) {
		//console.log("성공");
	}
	
	//돌아가기
	function fRenew() {
		document.location.href="http://speller.cs.pusan.ac.kr";
		
	}
	
	//오류단어 위에 대치어 생성.
	function redesign() {
	    $("#tdCorrection1stBox .ul").each(function () {
	        var word = $(this);
	        
	        var id = $(word).attr("id");
	        var color = $(word).attr("color");
	        word.addClass(color);
	        var id_no = id.replace("ul_", "");
	        // console.log(id_no);
	        var correct_id = "tdReplaceWord_" + id_no;
	        var correct_item = $("#" + correct_id);
	        var correct_word = $("li:nth-child(1) a", correct_item).text(); // 대치어 목록 중 젤 위에 있는 것을 대치어로 표시.
	        if (correct_word == "대치어 없음") correct_word = "?";
	        // console.log(correct_word);
	        word.prepend($("<span class=correction>" + correct_word + "</span>"));

	        check_minor_change($(this));

	        word.on("mouseover", function () {
	            var offset = $("#tableErr_" + id_no).offset().top - 136 + $("#divCorrectionTableBox1st").scrollTop();
	            $("#divCorrectionTableBox1st").scrollTop(offset);
	        });
	    });

	    $(".correction").bind('click', {}, function (event) {
	        replace_correction(this);
	        event.stopPropagation();
	    });

	    $(".tdErrWord").each(function () {
	        var word = $(this);
	        var id = $(word).attr("id");
	        var id_no = id.replace("tdErrorWord_", "");
	        var correct_id = "ul_" + id_no;

			//오류목록 저장
			var incorrect_id = "tdErrorWord_" + id_no;
			var incorrect_item = $("#" + incorrect_id);
			var incorrect_word = $("li:nth-child(1) a", incorrect_item).text();
			// console.log(incorrect_word);
			// incorrectArr.push(incorrect_word);

	        var correct_id = "tdReplaceWord_" + id_no;
	        var correct_item = $("#" + correct_id);
			var listLi= correct_item.find('li');

			var str = '';
			for(var i=0;i<listLi.length; i++){
				str += listLi.eq(i).text();
				
				if(i<(listLi.length-1)){
					str+='|';
				}
			}
			//console.log(str);
			incorrectArr.set(incorrect_word,str);
			// console.log(str);
			// console.log("--------------------");
	        var color = $("#" + correct_id).attr("color");
	        // if($("#"+correct_id).hasClass("Olive")) color="red";
	        // console.log(color);
	        var parent = $(this).parents("table").eq(0);
	        $(".tdReplace", parent).addClass(color);
	        // $(".tdReplace li a",parent).css("color",color);
	    });
		
		incorrectArrSize = incorrectArr.size;
	    $(".btnBugReport").each(function () {
	        var word = $(this);
	        word.addClass("btnBugReport2");
	        word.removeClass("btnBugReport");
	    });

	    g_idxTableForScroll_1 = 0;
	    // fAddClickEventToCopy_noflash();
	}

	//페이지 이동버튼 생성
	function pageMoveBtn(idx){
		// pages
		var prev;
		var next;
		var page;
		if(pages == 1 || idx == 0){
			prev = "<input id='btnPrev' type='image' tabindex='4' title='첫 결과입니다.' src='/images/btnPrev_disable.gif' style='cursor: default;''>";
				
		}else {
			page = idx-1;
			prev = "<input id='btnPrev' "; 
			prev += "type='image' tabindex='4' title='이전 결과' "; 
			prev += "src='/images/btnPrev.gif' "; 
			prev += "onmouseout='this.src=\"/images/btnPrev.gif\";' "; 
			prev += "onmouseover='this.src=\"/images/btnPrev_over.gif\";' "; 
			prev += "onmousedown='this.src=\"/images/btnPrev_click.gif\";' "; 
			prev += "onclick='makeHTML("+page+");'>";
		}
		if(idx == (pages-1)){
			next = "<input id='btnNext' type='image' tabindex='5' title='마지막 결과입니다.' src='/images/btnNext_disable.gif' style='cursor: default;'>";		
		}else{
			page = idx+1;
			next = "<input id='btnNext' ";
			next += "type='image' tabindex='5' title='다음 결과' ";
			next += "src='/images/btnNext.gif' ";
			next += "onmouseout='this.src=\"/images/btnNext.gif\";' ";
			next += "onmouseover='this.src=\"/images/btnNext_over.gif\";' ";
			next += "onmousedown='this.src=\"/images/btnNext_click.gif\";' ";
			next += "onclick='makeHTML("+page+")'>";
		}
		document.getElementById('prevBtn').innerHTML=prev;
		document.getElementById('nextBtn').innerHTML=next;
	}
	
	function check_minor_change(word) {
	    var correction = $(".correction", word);
	    var correction_word = correction.text();
	    var org_word = word.clone().find(".correction").remove().end().text()
		
	    if (correction_word.replace(/[^a-zA-Z0-9가-힣]/ig, "") == org_word.replace(/[^a-zA-Z0-9가-힣]/ig, "")) {
	        correction.addClass("minor");
	        var c2 = "";
	        var j = 0;
	        for (var i = 0; i < correction_word.length; i++) {
	            var current_char = correction_word.charAt(i);

	            if (current_char != org_word.charAt(j)) {
	                if (current_char == " ") {
	                    c2 += "<span class=sp></span>" + current_char;
	                    j--;
	                }
	                else if (org_word.charAt(j) == " " && current_char == org_word.charAt(j + 1)) {
	                    c2 += "<span class=tie></span>";
	                    i--;
	                }
	                else if (current_char.match(/[^a-zA-Z0-9가-힣 ]/)) {
	                    c2 += "<span class=puct>" + current_char + "</span>";
	                    j--;
	                }
	                else if (org_word.charAt(j) != " " && current_char == org_word.charAt(j + 1)) {
	                    i--;
	                }
	                else if (current_char.match(/[a-zA-Z0-9가-힣]/) && org_word.charAt(j).match(/[^a-zA-Z0-9가-힣]/)) {
	                    i--;
	                }

	            } else {
	                c2 += current_char;
	            }
	            j++;
	        }
	        correction.html(c2);
	    }
	}

	function check_same(id, check_word) {

	    $(".ul").each(function () {
	        // console.log($(this).attr("id"),id,$(this).text(),check_word);
	        // console.log($(this).text(),check_word);
	        // var repLen = $(this).text().length;
	        // var errText = check_word.substr(check_word.length - repLen -
			// 1,check_word.length);

	        if ($(this).attr("id") == id) {
	            // console.log($(this).text(),check_word);
	            // console.log("같음");
	            // console.log($(this).text(),check_word);
	            // console.log($(this).text() + " " + errText);
	            return;
	        }
	        if ($(this).text() == check_word) {
	            // console.log("클릭");
	            replace_correction($(".correction", this)[0]);
	            return false;
	        }
	    });
	}
	
	function fShowHelp(idx) {
		// do nothing
		    var obj = $("#ul_" + idx + " .correction");
		    // console.log(obj);
		    replace_correction(obj);
	}
	
	function replace_correction(obj) {
	    var parent = $(obj).parent();
	    var strText = $(obj).text();
	    if (!parent.hasClass("ul")) return;

	    var check_word = parent.text();
	    var repLen = strText.length;
	    var errText = check_word.substr(repLen, check_word.length);

	    if(errText != strText){
			incorrectArr.delete(errText);
	    }
	    parent.animate({
	            color: "#fff"
	        },
	        150,
	        function () {
	        });

	    $(obj).animate({
	            marginTop: 0
	        },
	        300,
	        function () {
	            // Animation complete.
	            parent.html(strText);
	            parent.css('color', "inherit");
	            parent.addClass("done");
	            check_same($(parent).attr("id"), check_word);

	        });
	    fRefreshResultTextLen();
	}
	
	//글자 수 체크
	function fRefreshResultTextLen() {
		textOrgLen =$('#tdCorrection1stBox').clone().find(".correction").remove().end().text().length;
	    $('#tResultLTitle1').text('[총 ' + fMakeCommaNum(textOrgLen) + '자]');
	}
	
	
	//복사하기 기능
	function fAddClickEventToCopy() {
/*
 * console.log("복사"); $('#btnOrgCopy').unbind(); $('#btnOrgCopy').bind('click',
 * function () {
 */
	        var copyText = $('#tdCorrection1stBox').clone().find(".correction").remove().end().text();
	        var textArea = document.createElement("textarea");
	        textArea.value = copyText;
	        document.body.appendChild(textArea);
	        textArea.focus();
	        textArea.select();

	        try {
	            var successful = document.execCommand('copy');
	            var msg = successful ? 'successful' : 'unsuccessful';
	            // console.log('Fallback: Copying text command was ' + msg);
	        } catch (err) {
	            //console.error('Fallback: Oops, unable to copy', err);
	        }

	        document.body.removeChild(textArea);
			
			inputIncorrect();
	        toast("복사가 완료되었습니다.");
/* }); */
	}
	
	function toast(msg) {
	    $("<div class='ui-loader ui-overlay-shadow ui-body-e ui-corner-all'><h3>" + msg + "</h3></div>")
	        .css({
	            display: "block",
	            opacity: 0.90,
	            position: "fixed",
	            "z-index": "1000",
	            padding: "7px",
	            "text-align": "center",
	            width: "270px",
	            left: ($(window).width() - 284) / 2,
	            top: $(window).height() * 1.5
	        })

	        .appendTo($("body"))
	        .animate({
	            top: $(window).height() * 0.4
	        }, 300, function () {
	        })

	        .delay(1000)
	        .animate({
	            top: $(window).height() * 1.5
	        }, 300, function () {
	            $(this).remove();
	        });
	}
	
	// 테이블 클릭 시 색 변경
	function fShowSelText(idx) {
	    // alert(idx);
	    fClearTableHilight(false);
	    fTableHilight(idx, '#ffffcc');
	    fClearULHilight();
	    fULHilight(idx);
	    g_ScrollAniDepth = 0;
	    g_idxWordForScroll = idx;

	    var forLeft1 = ((idx == "" || idx < 1000) ? true : false);
	    if (forLeft1) g_idxTableForScroll_1 = idx;
	    else g_idxTableForScroll_2 = idx;
	    g_idxTableForScroll = idx;

        fTextScrollAni();
	}
	
	function fTableHilight(idx, color) {
	    var idUL = "tableErr_" + idx;
	    var fontUL = document.getElementById(idUL);
	    fontUL.style.backgroundColor = color;
	}
	
	function fULHilight(idx) {
	    var idUL = "ul_" + idx;
	    var fontUL = document.getElementById(idUL);
	    fontUL.style.backgroundColor = 'rgb(255, 255, 204)';
	    // fontUL.style.backgroundColor = '#ffffcc';
	}
	
	function fClearTableHilight(bIfNoneSel) {
	    var bgColor = document.getElementById('tdCorrection1stBox').style.backgroundColor;

	    var i;
	    for (i = 0; i < 1000; i++) {
	        if (bIfNoneSel && g_idxTableForScroll == i) continue;
	        var idUL = "tableErr_" + i;
	        var fontUL = document.getElementById(idUL);
	        if (fontUL == null) continue;
	        fontUL.style.backgroundColor = bgColor;
	    }

	    for (i = 0; i < 1000; i++) {
	        if (bIfNoneSel && g_idxTableForScroll == Number(String("1000") + i)) continue;

	        var idUL = "tableErr_1000" + i;
	        var fontUL = document.getElementById(idUL);
	        if (fontUL == null) continue;
	        fontUL.style.backgroundColor = bgColor;
	    }
	}
	
	function fClearULHilight() {
	    var bgColor = document.getElementById('tdCorrection1stBox').style.backgroundColor;

	    var i;
	    for (i = 0; i < 1000; i++) {
	        var idUL = "ul_" + i;
	        var fontUL = document.getElementById(idUL);
	        if (fontUL == null) continue;
	        fontUL.style.backgroundColor = bgColor;
	    }

	    for (i = 0; i < 1000; i++) {
	        var idUL = "ul_1000" + i;
	        var fontUL = document.getElementById(idUL);
	        if (fontUL == null) continue;
	        fontUL.style.backgroundColor = bgColor;
	    }
	}
	
	function fTextScrollAni() {
	    g_ScrollAniDepth++;

	    var s1;
	    if (g_idxWordForScroll < 1000) s1 = document.getElementById('divLeft1');
	    else s1 = document.getElementById('divLeft2');

	    var halfBound = fPixelToNum(s1.clientHeight) / 2;	// 창 중간에 보이게
	    var ul = document.getElementById("ul_" + g_idxWordForScroll);
	    var offTopTable = Math.min(Math.max(ul.offsetTop - halfBound, 0), s1.scrollHeight - s1.clientHeight);

	    // alert( g_ScrollAniDepth);

	    var oldScrollTop = s1.scrollTop;
	    var maxGap = 0;
	    if (g_ScrollAniDepth < 7) {
	        maxGap = Math.abs(fComeCloseScrollTopS(s1, offTopTable, g_ScrollAniDepth * 20, g_ScrollAniDepth * 20, halfBound));
	        if (maxGap > halfBound && oldScrollTop == s1.scrollTop)
	            maxGap = Math.abs(fComeCloseScrollTop(s1, offTopTable, 0.5, 4, halfBound));
	    }
	    else
	        maxGap = Math.abs(fComeCloseScrollTop(s1, offTopTable, 0.5, 4, halfBound));

	    if (g_ScrollAniDepth > 100
	        || maxGap < 4
	    ) {
	        g_ScrollAniDepth = 0;
	        s1.scrollTop = offTopTable;

	        // alert("x");
	        return;
	    }

	    if (maxGap < 50) setTimeout("fTextScrollAni();", 100);
	    else setTimeout("fTextScrollAni();", 20);
	}
	
	function fComeCloseScrollTop(element, to, _nRatio, _nThreshold, _nTargetHeight) {
	    var obj = element.scrollTop;
	    var newPos;

	    if (obj == to) return 0;
	    if (obj < to) newPos = obj + (to - obj) * _nRatio;
	    else newPos = obj - (obj - to) * _nRatio;

	    if (Math.abs(to - obj) < _nThreshold) return to - obj;


	    element.scrollTop = newPos;
	    return to - newPos;
	}
	
	function fComeCloseScrollTopS(element, to, _step, _nThreshold, _nTargetHeight) {
	    var obj = element.scrollTop;
	    var newPos;

	    if (obj == to) return 0;
	    if (obj < to) newPos = obj + _step;
	    else newPos = obj - _step;

	    if (Math.abs(to - newPos) < _nThreshold) return to - obj;

	    element.scrollTop = newPos;
	    return to - newPos;
	}	
	
	function fPixelToNum(pixel) {
	    if (typeof pixel != "string")
	        return pixel;

	    pixel = pixel.replace("px", "");
	    pixel = pixel.replace("PX", "");
	    return Number(pixel);
	}
	
	function fScroll1() {
	    return;

	    if (g_idxSCrol == 2) return;
	    g_idxSCrol = 1;

	    var s1 = document.getElementById('divLeft1');
	    var s2 = document.getElementById('divLeft2');

	    var posRat1 = parseFloat(s1.scrollTop) / parseFloat(s1.scrollHeight);
	    var pos2 = parseInt(posRat1 * parseFloat(s2.scrollHeight));

	    if (s2.scrollTop != pos2) s2.scrollTop = pos2;

	    var t = setTimeout("g_idxSCrol=0;", 500);
	}
	
	function fMakeCommaNum(n) {
	    return (!n || n == Infinity || n == 'NaN') ? 0 : String(n).replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
	}
	
	function fGetStrDigitID(strID) {
	    var posUL = strID.lastIndexOf('_');
	    if (0 > posUL) return -1;

	    var strDigitID = strID.substring(posUL + 1, strID.length);

	    var nDigitID = parseInt(strDigitID);
	    if (isNaN(nDigitID) || 0 > nDigitID) {
	        return -1;
	    }

	    return strDigitID;
	}
	
	
	function fShowHelpPopup(strPath, x, y, w, h) {
	    fShowImgPopup(3, 83, 844, 559, strPath + "images/WebSpellerHelp_newUI.jpg", true, true);
	}
	
	function fShowFramePopup(x, y, w, h, strPath) {
	    fShowPopupBackground();
	    fShowFrameElement("framePopup", x, y, w, h, strPath);
	    fShowCloseBtn(x, y, w);
	}
	
	function fShowImgPopup(x, y, w, h, strPath, bWithBackround, bShowCloseButton) {
	    //alert(strPath);
	    fShowFrameElement("imgPopup", x, y, w, h, strPath);
	    if (bWithBackround != false)
	        fShowPopupBackground();
	    if (bShowCloseButton != false)
	        fShowCloseBtn(x, y, w);
	}
	
	function fFirstSpell() {
	    fShowLoadingAniPopup(350, 300, 130, 130, true);

	    var nextText = fClearGarbageBlank(document.getElementById('text1').value);
	    document.getElementById('text1').value = nextText;
	    document.inputForm.submit();
	}
	
	function fShowFrameElement(elementID, x, y, w, h, strPath) {
	    //alert(elementID);
		console.log("strPath : " + strPath);
	    var element = document.getElementById(elementID);
	    //if(element==null)		alert("null");
	    element.src = strPath;
	    element.style.top = y + "px";
	    element.style.left = x + "px";
	    element.style.width = w + "px";
	    element.style.height = h + "px";
	    element.style.visibility = "visible";
	}
	
	function fClearGarbageBlank(inputText) {
	    var newTable = new String(inputText);
	    var newTable2 = new String("");

	    while (newTable != newTable2) {
	        newTable2 = newTable;
	        newTable = newTable.replace(" \n", "\n");
	        newTable = newTable.replace(" \r", "\r");
	        newTable = newTable.replace("\n  ", "\n ");
	        newTable = newTable.replace("\r  ", "\r ");

	        newTable = newTable.replace("\t\n", "\n");
	        newTable = newTable.replace("\t\r", "\r");
	        newTable = newTable.replace("\n\t\t", "\n\t");
	        newTable = newTable.replace("\r\t\t", "\r\t");
	    }

	    return newTable2;
	}
	
	function fShowPopupBackground() {
	    var tableMain = document.getElementById("tableMain");
	    var background = document.getElementById("divPopupBackground");
//	    background.style.left = tableMain.style.left;
//	    background.style.top = tableMain.style.top;
//	    background.style.width = tableMain.style.width;
//	    background.style.height = tableMain.style.height;
//	    background.style.opacity = '0.0';
//	    background.style.visibility = "visible";
	}

	function fShowCloseBtn(x, y, w) {
	    var tableClose = document.getElementById("divClosePopup");
	    tableClose.style.top = y + 20 + "px";//-25;
	    //tableClose.style.left = x+w - 30 + "px";
	    tableClose.style.left = x + w - 150 + "px";
	    tableClose.style.visibility = "visible";
	}
	
	function fShowUserReportPopup(strPath) {
	    fShowFramePopup(0, 80, 850, 565, strPath + "/UserReport");
	}
	
	function isEnter(key) {
	    keyValue = (navigator.appName == 'Netscape') ? key.which : key.keyCode;
	    if (keyValue == 13 && key.ctrlKey
	        || keyValue == 13 && key.shiftKey
	    ) {
			
	        inputForm.submit();
	    }
	    else if (keyValue == 13) {
			//console.log("엔터");
	    }
	}
	//메인화면 글자 수 체크
	function fRefreshTextLen() {
	    textLen = $('#text1').val().length;
	    //nrLen = $('#text1').text().split('\r').length-1;
	    //nrLen2 = $('#text1').text().split('\n').length-1;
	    //nrLen3 = $('#text1').text().split('30일').length-1;
	    //if(textLen==0)	$('#textInputFormMsg').text( '검사할 문장을 입력하세요.' );
	    $('#divTextLen').text('[총 ' + fMakeCommaNum(textLen) + '자]');
	}
	
	function fShowOrderPopup(strPath) {
	    fShowFramePopup(0, 80, 850, 565, strPath + "/SpellerOrder");
	}
	
	function fShowFramePopup(x, y, w, h, strPath) {
	    fShowPopupBackground();
	    fShowFrameElement("framePopup", x, y, w, h, strPath);
	    fShowCloseBtn(x, y, w);
	}
	
	function fHidePopup() {
	    document.getElementById("divPopupBackground").style.visibility = "hidden";
	    document.getElementById("framePopup").style.visibility = "hidden";
	    document.getElementById("imgPopup").style.visibility = "hidden";
	    document.getElementById("divClosePopup").style.visibility = "hidden";
	}
	
	function fShowLoadingAniPopup(x, y, w, h, bWithBackround) {

	    if (0 <= navigator.userAgent.indexOf('Opera'))	// 동작을 안 하나?
	    {
	        return;
	    }

	    if (document.getElementById('formNext') == null) {
	        fShowImgPopup(x, y, w, h, 'images/loadingAnimation.gif', bWithBackround, false);
	    }
	    else {
	        fShowImgPopup(x, y, w, h, '../images/loadingAnimation.gif', bWithBackround, false);
	    }
	}

	function isEnter(key) 
	{
		keyValue = (navigator.appName=='Netscape') ? key.which : key.keyCode;
		if	(	keyValue==13 && key.ctrlKey  
			||	keyValue==13 && key.shiftKey 
			) 
		{
			inputForm.submit();
		}
		else if (keyValue==13)
		{
			
		}
	}

	function onCommentOthClick(intake) {
//		window.opener.resizeTo(440, 200);
	    if (intake.value == "소중한 의견 고맙게 받겠습니다.") {
	        intake.value = "";
	    }
	}
	//의견 보내기
	function onReportOth() {
	    var strComment = new String(document.getElementById('txtCommentOth').value);
	    console.log(strComment);
	    if (strComment == "소중한 의견 고맙게 받겠습니다.") {
	        alert("의견을 입력해 주세요.");
	        return;
	    }
	    if (strComment == "") {
	        alert("의견을 입력해 주세요.");
	        return;
	    }
	    
       	$.ajax({
    		type : 'post',
    		url : '/SendMail',
    		data : {
    			content:strComment
    			},
    		error : function(){
    			toast("보내기 실패");
    		},
    		success: function(data){
    			toast("보내기 성공");
    			fHidePopup();
    		}
    	});
       	

	}