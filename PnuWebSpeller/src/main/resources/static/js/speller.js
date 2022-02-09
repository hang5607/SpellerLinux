	var data; // json데이터
	var text; // 원문
	var pages;
	var incorrectArr = new Map();
	var length;
	
	$(function(){
		$(document).on("click", ".tableErrCorrect .nav a", function(){
			fApplyCandidate($(this));
		});
	});

	//교정(오른쪽) 테이블 생성
	function makeHTML(idx){
		text =data[idx].str;
		var CorrectionTable ="<table style='border:0; cellpadding:0; cellspacing:0; width:411; height:480;'>";
		CorrectionTable +="<tbody>";
		CorrectionTable +="<tr>";
		CorrectionTable +="<td align='center' valign='center'><br>";
		length = data[idx].errInfo.length;
		

		for(var i=0;i<length;i++){
			var CorrectionSetId = data[idx].errInfo[i].errorIdx;
			
			CorrectionTable += "<table id='tableErr_"+ CorrectionSetId +"' class='tableErrCorrect' onclick='fShowSelText("+ CorrectionSetId +")' style='border:1; cellpadding:3; cellspacing:0;'>";
			CorrectionTable += "<tbody>";
			CorrectionTable += "<tr>";
			CorrectionTable += "<td class='tdLT' title='0'>입력 내용</td>";
			CorrectionTable += "<td id='tdErrorWord_"+ CorrectionSetId +"' class='tdErrWord' style='color: #FF0000;'>";
			CorrectionTable += "<ul class='nav nav-stacked'><li><a href='javascript:void(0);' style='color: #FF0000;'>"+data[idx].errInfo[i].orgStr+"</a></li>";
			CorrectionTable += "</ul></td>";
			CorrectionTable +="<tr>";
			CorrectionTable +="<td class='tdLT' style='vertical-align: top;'>대치어</td>";
			CorrectionTable +="<td id='tdReplaceWord_"+ CorrectionSetId +"' class='tdReplace'><ul class='nav nav-stacked'>";
			
			var replaceList = data[idx].errInfo[i].candWord;
			var replaceWord = replaceList.split('|');
			
            if(replaceList == ""){
            	CorrectionTable +="      <li><a href='javascript:void(0);'>대치어 없음</a></li>";
            } else{
    			for(var j in replaceWord){
   				 CorrectionTable +="      <li><a href='javascript:void(0);'>"+ replaceWord[j] +"</a></li>";
    			}            	
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
		
		if(length == 0){
			setTimeout(function() {
				  alert('현재 페이지는 오류가 없습니다.');
				}, 10);
		}
	}
	
	//원문(왼쪽) 테이블 정보 생성
	function designText(idx){
		var designText = text;
		
		for(var i=data[idx].errInfo.length-1;i>=0;i--){
			var errorIdx = data[idx].errInfo[i].errorIdx;
			var start = data[idx].errInfo[i].start;
			var end = data[idx].errInfo[i].end;
			var replace = "<font id='ul_"+errorIdx+"' color='red' class='ul' onclick='fShowHelp("+errorIdx+")'>"+data[idx].errInfo[i].orgStr+"</font>";
			designText = designText.substr(0,start) + replace + designText.substr(end,designText.length);
		}
		document.getElementById('tdCorrection1stBox').innerHTML = designText;
		redesign();
	}
	
	//오른쪽 테이블에서 대치어를 클릭했을 때.
	function fApplyCandidate(obj) {
	    var objLI = obj.parent();
	    var objUL = objLI.parent();
	    var objTD = objUL.parent();
	    var objTR = objTD.parent();
	    var objTable = objTR.parent();
	    var tdid = obj.closest('td').attr('id');
	    var a = document.getElementById(tdid);

	    var strDigitID = fGetStrDigitID(objTD[0].id.toString());
	    var errText = $('#tdErrorWord_' + strDigitID).text();
	    var list = $('#tdReplaceWord_' + strDigitID).find('li');

	    var str="";
		if(errText != objLI.text()){	
			incorrectArr.delete(errText);
			if(list.length>2){
				if(list.eq(0).text() != objLI.text()){
					for(var i=0;i<list.length;i++){
						str += list.eq(i).text();
						if(i<(list.length-1)){
							str+='|';
						}
					}
					clickReplace(errText, objLI.text(),str);					
				}
			}
		}	
		
	    objTable.find('li').removeClass('selectedCand');
	    objLI.addClass('selectedCand');

	    $('#ul_' + strDigitID).html(objLI.text());
	    $('#ul_' + strDigitID).css('color', 'black');

	    fRefreshResultTextLen();
	}
	
	//대치어를 클릭했을 때, 데이터 전송.
	function clickReplace(errorWord, replaceWord, wordList) {
		sentence = makeSentence(errorWord);
		
		var jsonArr = new Array();
		
		var data = new Object();
		
		data.errorWord = errorWord;
		data.replaceWord = replaceWord;
		data.wordList = wordList;
		data.sentence = sentence;

		jsonArr.push(data);
		
       	$.ajax({
    		type : 'post',
    		url : '/results/clickReplace',
    		contentType: 'application/json',
    		data : JSON.stringify(jsonArr),
    		error : onError,
    		success : onSuccess
    	});    
		
	}
	
	//버그리포트 데이터 전송
	function onBugReport(idx){
		
		var errorWord = $('#tdErrorWord_' + idx).find('li').eq(0).text();
		var sentence = makeSentence(errorWord);
		var comment = $('#comment_' + idx).val();
		
		
		if(!comment=="" || !comment==null){
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
			
			data.strTitle = comment;
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
	    		success : function (){
	    			document.getElementById('tdBugReport_' + idx).innerHTML = '<CENTER>보내기 완료</CENTER>';
	    		}
	    	});  
		} else { 
			alert("내용을 입력해주세요.");
		}
		
	}
	
	//사용자가 대치어를 직접 수정한 데이터 전송
	function onUserReplace(idx){
		
		var errorWord = $('#tdErrorWord_' + idx).text();
		var replaceWord = $('#userReplace_' + idx).val();
		var sentence;
		
		
	    $('#ul_' + idx).html(replaceWord);
	    $('#ul_' + idx).css('color', 'black');
	    
	    $('#tableErr_' + idx).find('li').removeClass('selectedCand');
	    
	    fRefreshResultTextLen();
	    
        if (errorWord != replaceWord) {
            if(errorWord !=" " || replaceWord !=""){
               sentence = makeSentence(errorWord);
               
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
	
	//수정하지 않은 오류 데이터 전송
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
	
	function back(){		
		history.back();
		document.getElementById("divPopupBackground").style.visibility = "hidden";
		document.getElementById("divPopupBackground").style.display = "none";
		document.getElementById("imgPopup").style.visibility = "hidden";
	    document.getElementById("imgPopup").style.display = "none";

	}
	
	//오류단어 위에 대치어 생성.
	function redesign() {
	    $("#tdCorrection1stBox .ul").each(function () {
	        var word = $(this);
	        
	        var id = $(word).attr("id");
	        var color = $(word).attr("color");
	        word.addClass(color);
	        var id_no = id.replace("ul_", "");
	        var correct_id = "tdReplaceWord_" + id_no;
	        var correct_item = $("#" + correct_id);
	        var correct_word = $("li:nth-child(1) a", correct_item).text(); // 대치어 목록 중 젤 위에 있는 것을 대치어로 표시.
	        if (correct_word == "대치어 없음") correct_word = "?";
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

			incorrectArr.set(incorrect_word,str);
	        var color = $("#" + correct_id).attr("color");
	        var parent = $(this).parents("table").eq(0);
	        $(".tdReplace", parent).addClass(color);
	    });
		
		incorrectArrSize = incorrectArr.size;
	    $(".btnBugReport").each(function () {
	        var word = $(this);
	        word.addClass("btnBugReport2");
	        word.removeClass("btnBugReport");
	    });

	    g_idxTableForScroll_1 = 0;
	}

	//페이지 이동버튼 생성
	function pageMoveBtn(idx){
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
	        if ($(this).attr("id") == id) {
	            return;
	        }
	        if ($(this).text() == check_word) {
	            replace_correction($(".correction", this)[0]);
	            return false;
	        }
	    });
	}
	
	function fShowHelp(idx) {
		// do nothing
	    var obj = $("#ul_" + idx + " .correction");
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

        var copyText = $('#tdCorrection1stBox').clone().find(".correction").remove().end().text();
        var textArea = document.createElement("textarea");
        textArea.value = copyText;
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
            var successful = document.execCommand('copy');
            var msg = successful ? 'successful' : 'unsuccessful';
        } catch (err) {
        }

        document.body.removeChild(textArea);
		
		inputIncorrect();
        toast("복사가 완료되었습니다.");

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

	        .delay(2500)
	        .animate({
	            top: $(window).height() * 1.5
	        }, 300, function () {
	            $(this).remove();
	        });
	}
	
	// 테이블 클릭 시 색 변경
	function fShowSelText(idx) {
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
	}
	
	function fClearTableHilight(bIfNoneSel) {
	    var bgColor = document.getElementById('tdCorrection1stBox').style.backgroundColor;

	    var i;
	    for (i = 0; i < length; i++) {
	        if (bIfNoneSel && g_idxTableForScroll == i) continue;
	        var idUL = "tableErr_" + i;
	        var fontUL = document.getElementById(idUL);
	        if (fontUL == null) continue;
	        fontUL.style.backgroundColor = bgColor;
	    }
	}
	
	function fClearULHilight() {
	    var bgColor = document.getElementById('tdCorrection1stBox').style.backgroundColor;

	    var i;
	    for (i = 0; i < length; i++) {
	        var idUL = "ul_" + i;
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


	    var oldScrollTop = s1.scrollTop;
	    var maxGap = 0;
	    if (g_ScrollAniDepth < 7) {
	        maxGap = Math.abs(fComeCloseScrollTopS(s1, offTopTable, g_ScrollAniDepth * 20, g_ScrollAniDepth * 20, halfBound));
	        if (maxGap > halfBound && oldScrollTop == s1.scrollTop)
	            maxGap = Math.abs(fComeCloseScrollTop(s1, offTopTable, 0.5, 4, halfBound));
	    }
	    else
	        maxGap = Math.abs(fComeCloseScrollTop(s1, offTopTable, 0.5, 4, halfBound));

	    if (g_ScrollAniDepth > 100 || maxGap < 4) {
	        g_ScrollAniDepth = 0;
	        s1.scrollTop = offTopTable;

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
	    fShowFrameElement("imgPopup", x, y, w, h, strPath);
	    if (bWithBackround != false)
	        fShowPopupBackground();
	    if (bShowCloseButton != false)
	        fShowCloseBtn(x, y, w);
	}
	
	function fFirstSpell() {
	    //fShowLoadingAniPopup(350, 300, 306, 134, true);
		
		if(document.getElementById('text1').value != ""){
			
		    var nextText = fClearGarbageBlank(document.getElementById('text1').value);
		    document.getElementById('text1').value = nextText;
		    document.inputForm.submit();			
		} else{
			alert("검사할 문장을 입력하세요.");
		}
	}
	
	function fShowFrameElement(elementID, x, y, w, h, strPath) {

	    var element = document.getElementById(elementID);

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
	    background.style.left = tableMain.style.left;
	    background.style.top = tableMain.style.top;
	    background.style.width = tableMain.style.width;
	    background.style.height = tableMain.style.height;
	    background.style.opacity = '0.0';
	    background.style.visibility = "visible";
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
        fShowImgPopup(x, y, w, h, '../images/loadingAnimation.gif', bWithBackround, false);
	}

	//의견 보내기
	function onReportOth() {
	    var strComment = new String(document.getElementById('txtCommentOth').value);

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
    			alert("보내기 실패");
    		},
    		success: function(data){
    			alert("보내기 성공");
    		}
    	}); 	
	}
	
	// 쿠키 가져오기
	function getCookie(cName) {
		cName = cName + '=';
		var cookieData = document.cookie;
		var start = cookieData.indexOf(cName);
		var cValue = '';
		if(start != -1){
			start += cName.length;
			var end = cookieData.indexOf(';', start);
			if(end == -1)end = cookieData.length;
			cValue = cookieData.substring(start, end);
		}
		return unescape(cValue);
	}
	
	function fClickCheckBoxModeChange()
	{
		if( $("input:checkbox[id='btnModeChange']").is(":checked") )
		{
			setCookie('ruleMode','strong',7);
		}
		else
		{
			setCookie('ruleMode','weak',7);
		}
	}
	function fClickTextModeChange()
	{
		if( $("input:checkbox[id='btnModeChange']").is(":checked") )
		{
			$("#btnModeChange").prop("checked", false);
			setCookie('ruleMode','strong',7);
		}
		else
		{
			$("#btnModeChange").prop("checked", true);
			setCookie('ruleMode','weak',7);
		}
	}
	
	function fSetModeOptOnLoad()
	{
		if( getCookie('ruleMode') == 'strong' )
		{
			$("#btnModeChange").prop("checked", true);
			setCookie('ruleMode','strong',7);
		}
		else
		{
			$("#btnModeChange").prop("checked", false);
			setCookie('ruleMode','weak',7);
		}
	}
	
////////////////////////////////////////////////////////////////////
	// for Popup

	function setCookie(name, value, expiredays) {
	    var todayDate = new Date();
	    todayDate.setDate(todayDate.getDate() + expiredays);
	    document.cookie = name + "=" + escape(value) + "; path=/; expires=" + todayDate.toGMTString() + ";"
	}

	function fClosePopupMsg() {
	    if (document.formPopup.chkTimer.checked) {
	        setCookie("CloseSpellerPopupMsg", "done", 1);
	    }
	    document.all['divPopupMsg'].style.visibility = "hidden";
	    document.all['divPopupMsg'].innerHTML = "";
	}

	function fShowPopupMsgIfFirst() {
	    cookiedata = document.cookie;
	    if (cookiedata.indexOf("CloseSpellerPopupMsg=done") < 0) {
	        document.all['divPopupMsg'].innerHTML = fMakePopupMsg();
	        document.all['divPopupMsg'].style.visibility = "visible";
	    }
	    else {
	        document.all['divPopupMsg'].style.visibility = "hidden";
	    }
	}

	function fMakePopupMsg() {
	    var strHTML = new String;

	    strHTML += "<table cellpadding='0' cellspacing='0' width='480' bgcolor='#ffffff' style='border:3px #ffffff solid'>";
	    strHTML += "	<tr><td height='252' bgcolor='#ddddff' style='border:1px solid;padding-left:6px;padding-right:3px;font-size:10pt;font-family:돋움;font-weight:bold; text-align:left;'>";

	    strHTML += "		<br/>";
	    strHTML += "		<CENTER style='font-size:11pt; font-family:돋움; font-weight:bold;'>&lt;알리는 글&gt;</CENTER><br/><br/>";

	    strHTML += "		<div style='line-height:1.5em'>&nbsp;&nbsp;현재 내부 구조 변경으로 인한 테스트 때문에 시스템이 불안정할 수 있습니다.<br/>";
	    strHTML += "		&nbsp;&nbsp;검사 결과에 문제 있거나 버튼이 동작하지 않을 경우 아래의 해결 방법을 수행해주시기 바랍니다.<br/><br/>";
	    strHTML += "		&nbsp;&nbsp;1. '우리말 배움터'(<a href='http://urimal.cs.pusan.ac.kr/urimal_new/'>http://urimal.cs.pusan.ac.kr/urimal_new</a>)사이트에 &nbsp;접속 후, 화면 오른쪽 '한국어 맞춤법/문법 검사기' 클릭<br/><br/>";
	    strHTML += "		&nbsp;&nbsp;2. 인터넷 브라우저의 옵션에서 쿠키 삭제<br/><br/>";
	    strHTML += "		&nbsp;&nbsp;불편을 끼쳐 죄송합니다. 빠른 시일 내에 해결하도록 하겠습니다.<br/>";
	    strHTML += "		&nbsp;&nbsp;사용하시면서 불편하거나 수정하고 싶은 내용이 있으시면, 다음의 메일로 의견 남겨주시기 바랍니다. (urimal@pusan.ac.kr)<br/><br/></div>";
	    
	    
	    //strHTML += "		<div style='line-height:1.5em'>&nbsp;&nbsp;맞춤법/문법 검사기에 대한 오해 몇 가지를 알려 드립니다.<br/><br/>";
	    //strHTML += "		&nbsp;&nbsp;- 300어절밖에 검사 안 한다.<br/>";
	    //strHTML += "		&nbsp;&nbsp;&nbsp;: <font color='red'>아닙니다.</font> 검사하는 길이에는 제한이 없습니다. 단, 사용자의 편의를 위해 300어절 단위로 구별하여 찾을 수 있습니다. 검사창 아랫부분에 보면 오른쪽 화살표가 있습니다. 클릭하시면 300자 단위로 차례로 넘어가면서 검사합니다. (곧 1|2|3처럼 해서 선택하실 수 있게 하겠습니다.)<br/><br/>";
//		strHTML += "		&nbsp;&nbsp;- 수정이 안 된다.<br/>";
//		strHTML += "		&nbsp;&nbsp;&nbsp;: <font color='red'>아닙니다.</font> 검사 후 오른쪽에서 제시하는 대치어 중 적합한 것을 클릭하시면, 그 어절로 대치합니다. 다시 원래 어절로 돌리시려면 원래 어절을 클릭하시면 됩니다. 틀렸지만 대치어가 바르지 않으면, 대치어 제시 부분 오른쪽에 연필 모양의 아이콘을 눌러 원하시는 대치어를 입력하시면 고쳐집니다.<br/>";
//		strHTML += "		&nbsp;&nbsp;&nbsp;고친 내용을 가져다 쓰시려면 '현재 페이지 복사'를 하여 붙여 쓰시면 됩니다. 또 음절 개수는 원문 오른쪽 위에서 찾을 수 있습니다. 다른 불편하신 점이 있으시면 연락해 주시기 바랍니다.<br/><br/>";
//		strHTML += "		&nbsp;&nbsp;마지막으로 아래아한글이나 MS-Word에서 이 검사기를 사용하실 분은 (주)나라인포테크에서 사서 쓰실 수 있습니다.<br/>";
//		strHTML += "		&nbsp;&nbsp;아래아한글용은 아래아한글의 맞춤법 검사기를 대치하여 사용할 수 있으며, MS-Word용도 같지만, 오류 종류에 따라 색깔을 달리해 보여줍니다. <br/>";
//		strHTML += "		&nbsp;&nbsp;법원의 결재시스템에서는 문서 작성 과정에서 이 맞춤법 검사기를 사용하며, 우리나라 대부분 언론사도 이 맞춤법 검사기를 기사 작성에 활용합니다. 전자우편(e-mail) 시스템에서 사용하는 기관도 있습니다.<br/><br/></div>";
	    //strHTML += "		<div style='line-height:1.5em'>&nbsp;&nbsp;2015년 4월 27일부터 '한국어 맞춤법/문법 검사기'의 5.6판을 공개합니다.<br/><br/>";
	    //strHTML += "		&nbsp;&nbsp;5.6판은 법률용어, 시사용어, 외래어를 비롯하여 다수 자료가 추가되었습니다.<br/><br/>";
	    //strHTML += "		&nbsp;&nbsp;시스템 불안문제를 해결하려고 새로운 서버를 도입했습니다. 1차로 1대를 추가했으며, 조만간 서버 1대를 추가하겠습니다.<br/><br/>";
	    //strHTML += "		&nbsp;&nbsp;또 통계적 방법에 기반을 둔 기술을 개발하여 현재 적용 중이며, 8월경에 6.0판으로 공개하겠습니다. <br/><br/>";
	    //strHTML += "		&nbsp;&nbsp;혹시 불편하거나 수정하고 싶은 내용이 있으시면, 아래의 연락처로 의견 남겨주시기 바랍니다. <br/><br/>";
	    //strHTML += "		&nbsp;&nbsp;'아래아 한글용'도 함께 5.6판이 나왔으며 자동 업데이트는 이번 주 중에 제공될 예정입니다.<br/><br/>";
	    //strHTML += "		<center>[구매 문의 및 의견 주실 곳]</center><br/><center>urimal@pusan.ac.kr, 051) 516 - 9268</center><br/>";
	    //strHTML += "		<div style='line-height:1.5em'>&nbsp;&nbsp;안녕하십니까? 서비스 장애 시의 대처법을 알려드리려고 합니다.<br/>";
	    //strHTML += "		&nbsp;&nbsp;먼저 '한국어 맞춤법/문법 검사기' 사용에 불편을 끼쳐 죄송합니다.<br/><br/>";
	    //strHTML += "		&nbsp;&nbsp;현재 본 서버에서 정상적으로 결과를 얻기 힘드시다면 아래의 서버를 이용해주시길 부탁하겠습니다.<br/>";
	    //strHTML += "		&nbsp;&nbsp;<center><a href='http://164.125.36.75/PnuSpellerISAPI_201406'><font size='5'>추가 서버</font></a></center></br/>";
	    //strHTML += "		&nbsp;&nbsp;해당 '추가 서버'는 서버 상황에 따라 주소가 수시로 바뀔 수 있으니 가능하면 아래의 '우리말 배움터'를 '<font color='red'>즐겨찾기</font>'해놓으시고 '우리말 배움터' 우측의 '한글 맞춤법/문법 검사기' 배너를 사용해서 접속해주시면 감사하겠습니다.<br/>";
	    //strHTML += "		&nbsp;&nbsp;<center><a href='http://urimal.cs.pusan.ac.kr'><font size='5'>우리말 배움터</a></font></center></br/>";
	    //strHTML += "		&nbsp;&nbsp;다시 한 번, 불편을 끼쳐 죄송합니다.<br/>";
	    //strHTML += "		&nbsp;&nbsp;현재 새 인터페이스에 <font color='red'>브라우저 호환성 문제</font>가 있습니다. 검사 결과가 제대로 보이지 않거나 문제가 있으시면 검사창 메인에 있는 <font color='red'>'기존 검사기 가기'</font> 버튼을 클릭하여 5.0 버전의 인터페이스를 사용해주시길 바랍니다.<br/>";
	    //strHTML += "		&nbsp;&nbsp;불편을 끼쳐 죄송합니다. 빠른 시일 내에 해결하도록 하겠습니다.<br/><br/>";
	    //strHTML += "		&nbsp;&nbsp;사용하시면서 불편하거나 수정하고 싶은 내용이 있으시면, 다음의 메일로 의견 남겨주시기 바랍니다. (urimal@pusan.ac.kr) 새로 바뀐 '한국어 맞춤법/문법 검사기'에도 많은 관심과 좋은 의견 부탁합니다.<br/><br/></div>";
	    //strHTML += "		<div style='line-height:1.5em'>&nbsp;&nbsp;8월 9일(토)~8월 10일(일), 접속 장애에 대해 알립니다. <br/><br/>";
	    //strHTML += "		&nbsp;&nbsp;2014년 8월 9일 오전 8시부터 8월 10일 오후 6시까지 '고압변전실 수변전설비 설치에 따른 휴전'으로, 우리말 배움터 서버가 있는 곳(부산대학교)의 전기가 공급되지 않아 우리말 배움터에 접속하실 수 없습니다.<br/><br/>";
	    //strHTML += "		&nbsp;&nbsp;1. 일시 : 2014-08-09(토) 08:00 ~ 2014-08-10(일) 18:00 <br/>";
	    //strHTML += "		&nbsp;&nbsp;2. 대상 : 부산대학교 자연대연구실험동 <br/><br/>";
	    //strHTML += "		&nbsp;&nbsp;정전 후 서버를 바로 재가동하여 최대한 이용에 불편함이 없도록 하겠습니다. <br/><br/></div>";
//	    strHTML += "		<div style='line-height:1.5em'>&nbsp;&nbsp;MS Word용 '한국어 맞춤법/문법 검사기'의 베타테스터를 모집합니다.<br/><br/>";
//	    strHTML += "		&nbsp;&nbsp;(주)나라인포테크에서는 MS Word용 한국어 맞춤법/문법 검사기를 개발하고 있습니다.<br/>";
//	    strHTML += "		&nbsp;&nbsp;현재 버전으로 시험 사용하실 분들의 신청을 받고자 합니다.<br/>";
//	    strHTML += "		&nbsp;&nbsp;신청을 원하시는 분들은 아래 링크를 통해 신청을 해주시면 됩니다.<br/><br/>";
//	    strHTML += "		&nbsp;&nbsp;사용하시면서 불편한 점들에 대해 메일로 보내주시면 검사기 개발에 큰 도움이 되겠습니다.<br/><br/>";
//		strHTML += "		&nbsp;&nbsp;새로 바뀐 '한국어 맞춤법/문법 검사기'에 많은 관심과 좋은 의견 부탁합니다. <br/>";
//		strHTML += "		&nbsp;&nbsp;현재 사용하시는 온라인 검사기도 새 버전입니다. <br/>";
//		strHTML += "		&nbsp;&nbsp;새 검사기를 사용하시면서 불편하거나 수정하고 싶은 점이 있으시면, 메일로 의견 보내주시기 바랍니다.  <br/><br/>";
//		strHTML += "		&nbsp;&nbsp;상업적인 목적으로 사용하려고 하거나 구매를 하시고자 한다면 나라인포테크로 문의하시면 됩니다. <br/>";
//		strHTML += "		&nbsp;&nbsp;(개인에게 판매하는 한국어 맞춤법/문법 검사기는 '아래아 한글용'입니다.) <br/><br/>";
//		strHTML += "		&nbsp;&nbsp;MS Word 2010 용 한국어 맞춤법/문법 검사기는 내부 테스트용이 있습니다. 테스트해 보고 싶으신 분은 아래의 메일로 연락 주시면 됩니다. <br/><br/></div>";
//	    strHTML += "		<br/><center>[신청하시는 곳]</center><br/><center><a href='https://goo.gl/forms/P4R4P7blO10tusap2'>https://goo.gl/forms/P4R4P7blO10tusap2</a></center><br/><br/>";

	    //strHTML += "		<p style='line-height:13pt;'>";

	    //strHTML += "		&nbsp;&nbsp;[추가된 기능]<br/>";
	    //strHTML += "		&nbsp;&nbsp;복합명사 띄어쓰기 일관성 처리<br/><br/>";

	    //strHTML += "		&nbsp;&nbsp;[내용]<br/>";
	    //strHTML += "		&nbsp;&nbsp;&nbsp;명사구(명사+명사)는 띄어 써야 하지만, 맞춤법 검사기에서는 '고유명사·전문용어'와 '일반 명사구'를 구별하기 어려워 띄어 씀과 붙여 씀을 모두 허용합니다. <br/>";
	    //strHTML += "		&nbsp;&nbsp;&nbsp;또한, 표준국어대사전에서 '^' 기호는 띄어 씀이 원칙이고 붙여 씀도 허용한다는 뜻입니다. <br/>";
	    //strHTML += "		&nbsp;&nbsp;&nbsp;맞춤법 검사기는 이런 단어들이 쓰일 때 한 문서 내에서는 일관성을 유지하고자 처음으로 들어온 단어의 띄어쓰기에 맞춰 교정합니다. <br/>";
	    //strHTML += "		&nbsp;&nbsp;&nbsp;예를 들어 '부분 일치'로 먼저 쓰이면, 그 문서에서는 '부분 일치'로 띄어 쓰도록 하고, '부분일치'로 먼저 쓰이면, 그 문서에서는 '부분일치'로 붙여 쓰도록 합니다.<br/>";
	    //strHTML += "		&nbsp;&nbsp;&nbsp;해당 오류는 회색으로 표시합니다.<br/><br/>";

	    //strHTML += "		</p>";

	    //strHTML += "		<center>urimal@pusan.ac.kr <a href='#' onclick='fClosePopupMsg();fShowUserReportPopup(\"./\");'>[의견 보내기]</a></center><br/><br/>";

//		strHTML += "		&nbsp;&nbsp;<font style='font-weight:normal;'>1년여 동안 많은 고민 끝에 나온 시스템입니다. 많은 관심과 좋은 의견 부탁합니다.</font><br/><br/>";

	    strHTML += "	</td></tr>";
	    strHTML += "	<tr><td align='right' valign='middle' bgcolor='#000000' height='20'>";
	    strHTML += "		<form name='formPopup'>";
	    strHTML += "		<input type='checkbox' name='chkTimer'>";
	    strHTML += "		<font face='돋움' style='font-size:8pt;color:#ffffff;'>오늘 하루 이 창을 열지 않음</font>";
	    strHTML += "		<a href='javascript:fClosePopupMsg();' style='font-size:8pt;color:#ffffff;font-weight:bold;'>[닫기]</a>";
	    strHTML += "		</form>";
	    strHTML += "	</td></tr>";
	    strHTML += "</table>";
	    return strHTML;
	}