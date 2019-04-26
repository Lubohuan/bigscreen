zbdp.initNews = function() {
	//var nationUrl = serverDomain + '/screen/recentpolicy/searchchina?page_no=0&page_size=8';
	//var zjUrl = serverDomain + '/screen/recentpolicy/searchzj?page_no=0&page_size=8';
//	var groupUlr = serverDomain + '/screen/Corp/get/';
	//var zjUrl ='js/news/core/zhejiang.json';
	//var nationUrl = 'js/news/core/zhejiang.json';
	var todayTimeout = zbdp.configData.todayUpdateInterval || 120;
	var groupTimeout = zbdp.configData.groupUpdateInterval || 120;

	// drawNationNews1(null);

	// function drawNationNews1(time) {
	// 	var label = 'nation';
	// 	url = "platform_al/mod11/searchNewsByTime";
	// 	$.get(url,{pubtime:time},function(datastr) {
	// 		var data = datastr;
	// 		var newTime=data[0].pubtime;
	// 		console.log(todayTimeout * 1000)
	// 		drawNews1(data, label);		
	// 		setTimeout(function() {
	// 			drawNew(newTime)		
	// 		}, 110*1000);
	// 	});
	// }
	
	// function drawNew(time) {
	// 	var label = 'nation';
	// 	url = "platform_al/mod11/searchNewsByTime";
	// 	//$.get(url,{language:1,count:20},function(datastr) {
	// 	$.get(url,{pubtime:time},function(datastr) {
	// 		/*var data = datastr.reverse();
	// 		var newTime=data[data.length-1].pubtime;*/
	// 		$('.custom-content-box1').children('.custom-result:gt(8)').remove();
	// 		var data = datastr;
	// 		var newTime=data[0].pubtime;
	// 		console.log(todayTimeout * 1000)
	// 		drawNews1(data, label);		
	// 		setTimeout(function() {
	// 			drawNew(newTime);		
	// 		}, 110*1000);
	// 	});
    // }
    drawNew()
	function drawNew(time) {
		var label = 'Mod9';
		
        $('.custom-content-box1').children('.custom-result:gt(8)').remove();
        var datastr = [{
            "websitename": "乐天infoseek新闻",
            "pubtime": "2019-04-26 15:53:20",
            "title": "美人アナウンサーの借金が発覚　オードリー若林「女子アナで初めてかもしれない」",
            "content": "（画像は日本海テレビ公式ホームページのスクリーンショット）\n16日放送のバラエティー番組『オード",
            "source_url": "https://news.infoseek.co.jp/article/sirabee_20162073193/"
        }, {
            "websitename": "乐天infoseek新闻",
            "pubtime": "2019-04-26 15:52:43",
            "title": "東アジア通貨協力、円・人民元融通を本格議論へ＝関係筋",
            "content": "［東京　２６日　ロイター］ - 日中韓とＡＳＥＡＮ（東アジア諸国連合）諸国は、金融危機の際に米",
            "source_url": "https://news.infoseek.co.jp/article/26reutersJAPAN_KCN1S20N0/"
        }, {
            "websitename": "朝日新闻",
            "pubtime": "2019-04-26 15:51:57",
            "latitude": 35.689506,
            "title": "退位礼正殿の儀に森元首相ら３人参列　首席随員の経験者",
            "content": "　皇位継承式典事務局は２６日、天皇陛下が天皇として最後の「おことば」を述べる３０日の退位の儀",
            "source_url": "https://www.asahi.com/articles/ASM4V4TYRM4VULFA01J.html",
            "longitude": 139.6917
        }, {
            "websitename": "livedoor新闻",
            "pubtime": "2019-04-26 15:51:55",
            "title": "ライブドアニュースを読もう！",
            "content": "妻の不機嫌に怯える夫たちとしては、「何があっても無視しないでほしい」「話し合っている最中に無",
            "source_url": "http://news.livedoor.com/topics/detail/16377703/"
        }, {
            "websitename": "The Siasat Daily",
            "pubtime": "2019-04-26 15:51:52",
            "latitude": 33.44838,
            "title": "Second trailer of 'Men in Black International' out today",
            "content": "New Delhi (India): The second trailer of Chris Hemsworth, Tessa Thompson and Liam Nees",
            "source_url": "https://www.siasat.com/news/second-trailer-men-black-international-out-today-1491247/",
            "longitude": -112.07404
        }, {
            "websitename": "trud-ost.ru",
            "pubtime": "2019-04-26 15:51:51",
            "latitude": 52.37403,
            "title": "На тарелки школьников и дошкольников Владивостока попал фальсификат из Удмуртии | ДВ-РОСС — новости Дальнего Востока",
            "content": "Удмуртский поставщик сыра и масла наживался на детях из Владивостока.\nПо данным Рос",
            "source_url": "http://trud-ost.ru/?p=651209",
            "longitude": 4.88969
        }, {
            "websitename": "和谐四川新闻门户",
            "pubtime": "2019-04-26 15:51:50",
            "title": "母亲癌症晚期求医无果他查资料自己配药救回母亲",
            "content": "不过香。蕉钾元素的含量很客观，每百克香。蕉中含钾。量在270~500毫克之间，健康人钾的适宜摄入，量为",
            "source_url": "http://www.hxsc.org/tiyu/zonghezhibo/155626098518440.html"
        }, {
            "websitename": "乐天infoseek新闻",
            "pubtime": "2019-04-26 15:51:36",
            "title": "米大統領選、バイデン出馬で身構えるトランプ",
            "content": "＜米大統領選に遂に名乗り出たのは民主党の重鎮で最有力候補のバイデン前副大統領。20人の民主党候補の",
            "source_url": "https://news.infoseek.co.jp/article/newsweek_E238877/"
        }, {
            "websitename": "NBC Sports",
            "pubtime": "2019-04-26 15:51:28",
            "latitude": 1.28967,
            "title": "The Playoff Buzzer: Coyle plays OT hero; Tarasenko puts on show",
            "content": "The Boston Bruins have long been considered a “one-line team,” and that’s not s",
            "source_url": "https://nhl.nbcsports.com/2019/04/26/the-playoff-buzzer-coyle-plays-ot-hero-tarasenko-puts-on-show/",
            "longitude": 103.85007
        }, {
            "websitename": "一点资讯",
            "pubtime": "2019-04-26 15:51:26",
            "latitude": 39.91666667,
            "title": "【一点资讯】有趣，更有用 - Yidianzixun.com",
            "content": "",
            "source_url": "http://www.yidianzixun.com/channel/w/澳大利亚垃圾回收系统崩溃?searchword=%E6%BE%B3%E",
            "longitude": 116.383333
        }]
        var data = datastr;
        var newTime=data[0].pubtime;
        console.log(todayTimeout * 1000)
        drawNews1(data, label);		
        setTimeout(function() {
            drawNew(newTime);		
        }, 110*1000);
	
	}
 }

drawNews1 = function(data, label) {
	// function draw(data, label) {
	var dataArr,
		element,
		elementTop,
		elementBottom,
		markEle, //页面显示数据量
		moveThread, //垂直滚动需要有的条目数量
		moveVSelector, //垂直滚动的选择符
		moveHSelector; //水平滚动的选择符

	if (label == 'Mod9') {
		//dataArr = data.data;LBH
		dataArr = data
		if (!dataArr) {
			return;
		}
		element = $('.custom-content-box1');
		markEle = $('.news-today-nation-maker span');
		moveVSelector = 'custom-result';//custom-result
		moveHSelector = 'custom-lrmove';
		moveThread = 6;

		/*element.empty();*/
	}
	
	//显示数量
	if (markEle && markEle.length > 0) {
		markEle.text(data.data.length);
	        
	}
	
	//循环增加信息条目
	for (var i = 0; i < dataArr.length; i++) {
		var item = dataArr[i];
		var longitude="";
		var latitude="";
		if(item.longitude){
			longitude=item.longitude
		}
		if (item.latitude){
			latitude=item.latitude
		}
		var itemWrapper = document.createElement('div');
		itemWrapper.classList.add('custom-result');
		
		var itemDetailWrapper = document.createElement('div');
		itemDetailWrapper.classList.add('custom-title');
		//itemDetailWrapper.innerHTML = '<div class="custom-sub-title clearfix"><b class="pull-left custom-lrmove"><a class="j-text-move" href="/crossMedia_al/mod1/detail?eid='+ item.art_id +'" target="_blank">' + item.title + '</a></b><span class="pull-right">'+ item.count +'次</span></div><p class="custom-font-white no-margins">&emsp;</p></div>';
		itemDetailWrapper.innerHTML = '<li class="media"><div class="media-body"><div class="clearfix"><h4 class="media-heading pull-left">'+item.pubtime+'</h4><h4 class="pull-right media-web">来源：<span class="media-web-title" data-url='+item.source_url+'>'+item.websitename+'</span></h4></div><div class="media-main"><p data-lo='+longitude+' class="custom-lrmove" data-la='+latitude+'>'+item.title+'</p><p class="newsContent">'+item.content+'</p></div></div></li>';
		itemWrapper.appendChild(itemDetailWrapper);
		element.append(itemWrapper);
	}

	zbdp.moveVerticalCancel(label);
	if (dataArr.length >= moveThread) {
		zbdp.moveVertical(element, moveVSelector, label);
	}

	if (element) {
		zbdp.moveHorizental(element, moveHSelector, label);
	}
	if (elementTop) {
		zbdp.moveHorizental(elementTop, moveHSelector, label);
	}
	if (elementBottom) {
		zbdp.moveHorizental(elementBottom, moveHSelector, label);
	}

};
