zbdp.moveVerticalCancel = function(label) {
    clearInterval(zbdp['moveVerticalInterval' + label.substring(0, 1).toUpperCase() + label.substring(1)]);
}
zbdp.moveVertical = function(container, selector, label) {
    var intervalName = 'moveVerticalInterval' + label.substring(0, 1).toUpperCase() + label.substring(1);
    zbdp[intervalName] = setInterval(function() {
        var item = container.find('.' + selector + ':last'); //此变量不可放置于函数起始处，li:first取值是变化的
        var item2 = container.find('.' + selector + ':first');
        var _h = item.height(); //取得每次滚动高度
        if (label == "Mod9"){
        	item2.animate({
	            marginTop: -(_h) + 'px'//通过正负值的改变决定下滚还是上滚
	        }, 600, function() { //通过取负margin值，隐藏第一行
	            item2.css('marginTop', 0);
	            item2.appendTo(container); //隐藏后，将该行的margin值置零，并插入到最后，实现无缝滚动
	        })
        } else {
        	$("#messageBoxContent").html("").empty();
        	var title=item.find(".custom-lrmove").text();
        	var titleAll=item.find(".custom-lrmove").html()
        	var pubTime=item.find(".media-heading").html();
        	var web=item.find(".media-web-title").html();
        	var url=item.find(".media-web-title").data("url")
        	var content=item.find(".newsContent").text();
        	var la=item.find(".custom-lrmove").data("la");
        	var lo=item.find(".custom-lrmove").data("lo");       	
            var objLength = title.length;
            var num = 20;
            if(objLength > num){
                title =title.substring(0,num)+"...";            
            }
            var objLength2 = content.length;
            var num2 = 150;
            if(objLength2 > num2){
            	content =content.substring(0,num2)+"...";            
            }
            var html='<div class="messageTitle">'+titleAll+'</div><div class="messageBar clearfix"><div class="pull-left messageWeb">'+web+'</div><div class="pull-right messageTime">'+pubTime+'</div></div><div class="messageZhaiyao" id="messagePlay">'+content+'</div>'+'<div class="messagefootBar clearfix"><div class="pull-right sDetail"><a href="'+url+'" target="_Blank" style="color:#fff;">查看详情</a></div></div>'          
            //var str='<div class="messageTitle">'+title+'</div><div class="messageBar"><div class="pull-left">'+web+'</div><div class="pull-right">'+pubTime+'</div></div>';
        	item2.animate({
	            marginTop: _h + 'px'
	        }, 600, function() { //通过取负margin值，隐藏第一行
	            item2.css('marginTop', 0);
	            item.prependTo(container); //隐藏后，将该行的margin值置零，并插入到最后，实现无缝滚动
	            if(la!==""&&la!=null&&la!=undefined&&lo!==""&&lo!=null&&lo!=undefined){
	            	toAddLeftPoint(la,lo,title,web,6000);
	            	var chance=Math.random();	            		            	
	            	//if(chance<0.3){	            		
			        	leftMove();//selfEarth3;
	            	   //moveLeft(); //selfEarth4;
	            	    setTimeout(xian,500)
	            	    function xian(){
	            	    	/*$(".messageTitle").html("").html(titleAll);
			            	$(".messageWeb").html("").html(web);
			            	$(".messageTime").html("").html(pubTime);
			            	$("#messagePlay").html("").autotype(content);*/
			            	
	            	    	$("#messageBoxContent").html(html);
			            	$(".messageBox").fadeIn(100);  
	            	    }
			        	           
	            	//}
	            	
	            }
	             //经纬度和点消失的时间；
	        })
        }
    }, zbdp.configData.moveVerticalDelay);
}

zbdp.moveHorizental = function(container, selector, label) {
    var wrappers = container.find('.' + selector);
    var wrapperWidth = $(wrappers[0]).width();
    // console.log(wrapperWidth);
    for (var i = 0; i < wrappers.length; i++) {
        var wrapper = $(wrappers[i]);
        var content = wrapper.children();
        var contentWidth = content.width();
        // console.log(contentWidth);
        if (contentWidth > wrapperWidth) {
            doMove(wrapper, content, contentWidth);
        }
    }

    function doMove(wrapper, content, contentWidth) {
        var contentSibling = content.siblings();
        if (contentSibling.length == 0) {
            content.css('padding-right', '80px');
            contentSibling = content.clone();
            //console.log(contentSibling);
            wrapper.append(contentSibling);
        }
        var moveLength = contentWidth + 80;
        var moveDur = parseInt(moveLength / zbdp.configData.moveHorizontalSpeed) * 1000;
        content.animate({
            marginLeft: -moveLength + 'px'
        }, moveDur, function() {
            content.css('margin-left', '0px').appendTo(wrapper);
            setTimeout(function() {
                doMove(wrapper, contentSibling, contentWidth);
            },2000);
        });
    }
}
