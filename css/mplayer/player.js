(function($){
	// Settings
	var isShowNotification = false,
		isInitMarquee = true,
		isRotate = true,//图片是否旋转
		autoplay = true,//是否自动播放
		shuffleArray = [],
		shuffleIndex,
		autoClearTimer,
		autoShowTimer,
		isFirstPlay = localStorage.qplayer == undefined? true: false,
		isShuffle = localStorage.qplayer == undefined? false: localStorage.qplayer === 'true'? true: false;
    
    //playlist
    var	playlist = [
	{title:"安静",artist:"周杰伦",mp3:"http://music.163.com/song/media/outer/url?id=186139.mp3",cover:"/css/mplayer/20180103101720.png",},
        {title:"米兰的小铁匠",artist:"周杰伦",mp3:"http://music.163.com/song/media/outer/url?id=186057.mp3",cover:"/css/mplayer/20180103101720.png",},
        {title:"威廉古堡",artist:"周杰伦",mp3:"http://music.163.com/song/media/outer/url?id=186134.mp3",cover:"/css/mplayer/20180103101720.png",},
        {title:"爱情废柴",artist:"周杰伦",mp3:"http://music.163.com/song/media/outer/url?id=418602087.mp3",cover:"/css/mplayer/20180103101720.png",},
        {title:"对不起",artist:"周杰伦",mp3:"http://music.163.com/song/media/outer/url?id=186131.mp3",cover:"/css/mplayer/20180103101720.png",},
        {title:"床边故事",artist:"周杰伦",mp3:"http://music.163.com/song/media/outer/url?id=415792916.mp3",cover:"/css/mplayer/20180103101720.png",},
        {title:"皮影戏",artist:"周杰伦",mp3:"http://music.163.com/song/media/outer/url?id=185622.mp3",cover:"/css/mplayer/20180103101720.png",},
        {title:"公主病",artist:"周杰伦",mp3:"http://music.163.com/song/media/outer/url?id=185616.mp3",cover:"/css/mplayer/20180103101720.png",},
        {title:"世界未末日",artist:"周杰伦",mp3:"http://music.163.com/song/media/outer/url?id=185621.mp3",cover:"/css/mplayer/20180103101720.png",},
        {title:"土耳其冰淇淋",artist:"周杰伦",mp3:"http://music.163.com/song/media/outer/url?id=418602086.mp3",cover:"/css/mplayer/20180103101720.png",},
        {title:"告白气球",artist:"周杰伦",mp3:"http://music.163.com/song/media/outer/url?id=418603077.mp3",cover:"/css/mplayer/20180103101720.png",},
        {title:"说走就走",artist:"周杰伦",mp3:"http://music.163.com/song/media/outer/url?id=418602084.mp3",cover:"/css/mplayer/20180103101720.png",},
        {title:"一点点",artist:"周杰伦",mp3:"http://music.163.com/song/media/outer/url?id=418603076.mp3",cover:"/css/mplayer/20180103101720.png",},
        {title:"前世情人",artist:"周杰伦",mp3:"http://music.163.com/song/media/outer/url?id=415792918.mp3",cover:"/css/mplayer/20180103101720.png",},
        {title:"英雄-(游戏《英雄联盟》主题曲)",artist:"周杰伦",mp3:"http://music.163.com/song/media/outer/url?id=418602085.mp3",cover:"/css/mplayer/20180103101720.png",},
        {title:"暗号",artist:"周杰伦",mp3:"http://music.163.com/song/media/outer/url?id=186047.mp3",cover:"/css/mplayer/20180103101720.png",},
        {title:"白色风车",artist:"周杰伦",mp3:"http://music.163.com/song/media/outer/url?id=185890.mp3",cover:"/css/mplayer/20180103101720.png",},
        {title:"半岛铁盒",artist:"周杰伦",mp3:"http://music.163.com/song/media/outer/url?id=186046.mp3",cover:"/css/mplayer/20180103101720.png",},
        {title:"本草纲目",artist:"周杰伦",mp3:"http://music.163.com/song/media/outer/url?id=185882.mp3",cover:"/css/mplayer/20180103101720.png",},
        {title:"斗牛",artist:"周杰伦",mp3:"http://music.163.com/song/media/outer/url?id=186152.mp3",cover:"/css/mplayer/20180103101720.png",},
        {title:"分裂",artist:"周杰伦",mp3:"http://music.163.com/song/media/outer/url?id=186051.mp3",cover:"/css/mplayer/20180103101720.png",},
        {title:"黑色幽默",artist:"周杰伦",mp3:"http://music.163.com/song/media/outer/url?id=186154.mp3",cover:"/css/mplayer/20180103101720.png",},
        {title:"红模仿",artist:"周杰伦",mp3:"http://music.163.com/song/media/outer/url?id=185886.mp3",cover:"/css/mplayer/20180103101720.png",},
        {title:"回到过去",artist:"周杰伦",mp3:"http://music.163.com/song/media/outer/url?id=186055.mp3",cover:"/css/mplayer/20180103101720.png",},
        {title:"简单爱",artist:"周杰伦",mp3:"http://music.163.com/song/media/outer/url?id=186119.mp3",cover:"/css/mplayer/20180103101720.png",},
        {title:"菊花台",artist:"周杰伦",mp3:"http://music.163.com/song/media/outer/url?id=185894.mp3",cover:"/css/mplayer/20180103101720.png",},
        {title:"开不了口",artist:"周杰伦",mp3:"http://music.163.com/song/media/outer/url?id=186125.mp3",cover:"/css/mplayer/20180103101720.png",},
        {title:"爱在西元前",artist:"周杰伦",mp3:"http://music.163.com/song/media/outer/url?id=186114.mp3",cover:"/css/mplayer/20180103101720.png",},
        {title:"龙卷风",artist:"周杰伦",mp3:"http://music.163.com/song/media/outer/url?id=186160.mp3",cover:"/css/mplayer/20180103101720.png",},
        {title:"龙拳",artist:"周杰伦",mp3:"http://music.163.com/song/media/outer/url?id=186048.mp3",cover:"/css/mplayer/20180103101720.png",},
        {title:"迷迭香",artist:"周杰伦",mp3:"http://music.163.com/song/media/outer/url?id=185892.mp3",cover:"/css/mplayer/20180103101720.png",},
        {title:"你怎么连话都说不清楚",artist:"周杰伦",mp3:"http://music.163.com/song/media/outer/url?id=186041.mp3",cover:"/css/mplayer/20180103101720.png",},
        {title:"忍者",artist:"周杰伦",mp3:"http://music.163.com/song/media/outer/url?id=186122.mp3",cover:"/css/mplayer/20180103101720.png",},
        {title:"上海一九四三",artist:"周杰伦",mp3:"http://music.163.com/song/media/outer/url?id=186128.mp3",cover:"/css/mplayer/20180103101720.png",},
        {title:"听妈妈的话",artist:"周杰伦",mp3:"http://music.163.com/song/media/outer/url?id=185879.mp3",cover:"/css/mplayer/20180103101720.png",},
        {title:"退后",artist:"周杰伦",mp3:"http://music.163.com/song/media/outer/url?id=185884.mp3",cover:"/css/mplayer/20180103101720.png",},
        {title:"心雨",artist:"周杰伦",mp3:"http://music.163.com/song/media/outer/url?id=185888.mp3",cover:"/css/mplayer/20180103101720.png",},
        {title:"星晴",artist:"周杰伦",mp3:"http://music.163.com/song/media/outer/url?id=186149.mp3",cover:"/css/mplayer/20180103101720.png",},
        {title:"爷爷泡的茶",artist:"周杰伦",mp3:"http://music.163.com/song/media/outer/url?id=186053.mp3",cover:"/css/mplayer/20180103101720.png",},
        {title:"夜的第七章",artist:"周杰伦",mp3:"http://music.163.com/song/media/outer/url?id=185878.mp3",cover:"/css/mplayer/20180103101720.png",},
        {title:"找自己",artist:"周杰伦",mp3:"http://music.163.com/song/media/outer/url?id=150617.mp3",cover:"/css/mplayer/20180103101720.png",},
        {title:"最后的战役",artist:"周杰伦",mp3:"http://music.163.com/song/media/outer/url?id=186059.mp3",cover:"/css/mplayer/20180103101720.png",},
        {title:"千里之外",artist:"周杰伦",mp3:"http://music.163.com/song/media/outer/url?id=185880.mp3",cover:"/css/mplayer/20180103101720.png",},
        {title:"以父之名",artist:"周杰伦",mp3:"http://music.163.com/song/media/outer/url?id=186014.mp3",cover:"/css/mplayer/20180103101720.png",},
        {title:"同一种调调",artist:"周杰伦",mp3:"http://music.163.com/song/media/outer/url?id=186020.mp3",cover:"/css/mplayer/20180103101720.png",},
        {title:"梯田",artist:"周杰伦",mp3:"http://music.163.com/song/media/outer/url?id=186023.mp3",cover:"/css/mplayer/20180103101720.png",},
        {title:"她的睫毛",artist:"周杰伦",mp3:"http://music.163.com/song/media/outer/url?id=186021.mp3",cover:"/css/mplayer/20180103101720.png",},
        {title:"双刀",artist:"周杰伦",mp3:"http://music.163.com/song/media/outer/url?id=186024.mp3",cover:"/css/mplayer/20180103101720.png",},
        {title:"三年二班",artist:"周杰伦",mp3:"http://music.163.com/song/media/outer/url?id=186017.mp3",cover:"/css/mplayer/20180103101720.png",},
        {title:"晴天",artist:"周杰伦",mp3:"http://music.163.com/song/media/outer/url?id=186016.mp3",cover:"/css/mplayer/20180103101720.png",},
        {title:"懦夫",artist:"周杰伦",mp3:"http://music.163.com/song/media/outer/url?id=186015.mp3",cover:"/css/mplayer/20180103101720.png",},
        {title:"你听得到",artist:"周杰伦",mp3:"http://music.163.com/song/media/outer/url?id=186019.mp3",cover:"/css/mplayer/20180103101720.png",},
        {title:"东风破",artist:"周杰伦",mp3:"http://music.163.com/song/media/outer/url?id=186018.mp3",cover:"/css/mplayer/20180103101720.png",},
        {title:"爱情悬崖",artist:"周杰伦",mp3:"http://music.163.com/song/media/outer/url?id=186022.mp3",cover:"/css/mplayer/20180103101720.png",},
        {title:"最长的电影",artist:"周杰伦",mp3:"http://music.163.com/song/media/outer/url?id=185821.mp3",cover:"/css/mplayer/20180103101720.png",},
        {title:"阳光宅男",artist:"周杰伦",mp3:"http://music.163.com/song/media/outer/url?id=185813.mp3",cover:"/css/mplayer/20180103101720.png",},
        {title:"无双",artist:"周杰伦",mp3:"http://music.163.com/song/media/outer/url?id=185817.mp3",cover:"/css/mplayer/20180103101720.png",},
        {title:"我不配",artist:"周杰伦",mp3:"http://music.163.com/song/media/outer/url?id=185818.mp3",cover:"/css/mplayer/20180103101720.png",},
        {title:"甜甜的",artist:"周杰伦",mp3:"http://music.163.com/song/media/outer/url?id=185820.mp3",cover:"/css/mplayer/20180103101720.png",},
        {title:"青花瓷",artist:"周杰伦",mp3:"http://music.163.com/song/media/outer/url?id=185811.mp3",cover:"/css/mplayer/20180103101720.png",},
        {title:"蒲公英的约定",artist:"周杰伦",mp3:"http://music.163.com/song/media/outer/url?id=185815.mp3",cover:"/css/mplayer/20180103101720.png",},
        {title:"牛仔很忙",artist:"周杰伦",mp3:"http://music.163.com/song/media/outer/url?id=185807.mp3",cover:"/css/mplayer/20180103101720.png",},
        {title:"扯",artist:"周杰伦",mp3:"http://music.163.com/song/media/outer/url?id=185819.mp3",cover:"/css/mplayer/20180103101720.png",},
        {title:"彩虹",artist:"周杰伦",mp3:"http://music.163.com/song/media/outer/url?id=185809.mp3",cover:"/css/mplayer/20180103101720.png",},
		];
		
	// Load playlist
	for (var i = 0; i < playlist.length; i++){
		var item = playlist[i];
		$('#playlist').append('<li class="lib" style="overflow:hidden;"><strong style="margin-left: 5px;">'+item.title+'</strong><span style="float: right;" class="artist">'+item.artist+'</span></li>');
		if (item.mp3 == "") {
			$('#playlist li').eq(i).css('color', '#ddd');
		}
	}

	var currentTrack = 0, audio, timeout;
	var shuffle_array = localStorage.qplayer_shuffle_array;

	if (isShuffle && shuffle_array != undefined && playlist.length === (shuffleArray=JSON.parse(shuffle_array)).length) {
		currentTrack = shuffleArray[0];
		shuffleIndex = 0;
	    $('#QPlayer .liebiao').attr('title', '点击关闭随机播放');
	} else {
		isShuffle = false;
	    $('#QPlayer .liebiao').attr('title', '点击开启随机播放');
	}

	//判断是否显示滚动条
	var totalHeight = 0;
	for (var i = 0; i < playlist.length; i++){
		totalHeight += ($('#playlist li').eq(i).height() + 6);
	}
	if (totalHeight > 600) {
		//$('#playlist').css("overflow", "auto");
		if (isShuffle) {
			var temp = 0;
			for (var j = 0; j < currentTrack; j++) {
				temp += ($('#playlist li').eq(j).height() + 6);
			}
			$('#playlist').scrollTop(temp);
		}
	} 

	var play = function(){
		audio.play();
		if (isRotate) {
			$("#player .cover img").css("animation","9.8s linear 0s normal none infinite rotate");
		    $("#player .cover img").css("animation-play-state","running");
	    }
		$('.playback').addClass('playing');
		timeout = setInterval(updateProgress, 500);
		//超过显示栏运行跑马灯
		if(isExceedTag()) {
			if (isInitMarquee) {
				initMarquee();
				isInitMarquee = false;
			} else {
				$('.marquee').marquee('resume');
		    }
	    }
	}

	var pause = function(){
		audio.pause();
		$("#player .cover img").css("animation-play-state","paused");
		$('.playback').removeClass('playing');
		clearInterval(timeout);
		if(isExceedTag()) {
			$('.marquee').marquee('pause');
		}
	}

	// Update progress
	var setProgress = function(value){
		var currentSec = parseInt(value%60) < 10 ? '0' + parseInt(value%60) : parseInt(value%60),
			ratio = value / audio.duration * 100;

		$('.timer').html(parseInt(value/60)+':'+currentSec);
	}

	var updateProgress = function(){
		setProgress(audio.currentTime);
	}

	// Switch track
	var switchTrack = function(i){
		if (i < 0){
			track = currentTrack = playlist.length - 1;
		} else if (i >= playlist.length){
			track = currentTrack = 0;
		} else {
			track = i;
		}

		isInitMarquee = true;
		$('audio').remove();
		loadMusic(track);
		play();
	}

	// Shuffle
	var shufflePlay = function(i){
		if (i === 1) {
		//下一首
		    if (++shuffleIndex === shuffleArray.length) {
		    	shuffleIndex = 0;
		    }
		    currentTrack = shuffleArray[shuffleIndex];

		} else if (i === 0) {
		//上一首
		    if (--shuffleIndex < 0) {
		    	shuffleIndex = shuffleArray.length - 1;
		    }
		    currentTrack = shuffleArray[shuffleIndex];
		}
		switchTrack(currentTrack);
	}

	// Fire when track ended
	var ended = function(){
		pause();
		audio.currentTime = 0;
		if (isShuffle){
			shufflePlay(1);
		} else { 
			if (currentTrack < playlist.length) switchTrack(++currentTrack);
		}
		
	}

	var beforeLoad = function(){
		var endVal = this.seekable && this.seekable.length ? this.seekable.end(0) : 0;
	}

	// Fire when track loaded completely
	var afterLoad = function(){
		if (autoplay == true) play();
	}

	// Load track
	var loadMusic = function(i){
		var item = playlist[i];
		while (item.mp3 == "") {
	        showNotification('歌曲地址为空，已自动跳过');
			if (isShuffle) {
				if (++shuffleIndex === shuffleArray.length) {
			    	shuffleIndex = 0;
			    }
			    i = currentTrack = shuffleArray[shuffleIndex];
			} else {
				currentTrack = ++i;
			}
			item = playlist[i];
		}
		var newaudio = $('<audio>').html('<source src="'+item.mp3+'">').appendTo('#player');
		$('.cover').html('<img src="'+item.cover+'" alt="'+item.album+'">');
		$('.musicTag').html('<strong>'+item.title+'</strong><span> - </span><span class="artist">'+item.artist+'</span>');
		$('#playlist li').removeClass('playing').eq(i).addClass('playing');
		audio = newaudio[0];
		audio.addEventListener('progress', beforeLoad, false);
		audio.addEventListener('durationchange', beforeLoad, false);
		audio.addEventListener('canplay', afterLoad, false);
		audio.addEventListener('ended', ended, false);
	}

	loadMusic(currentTrack);

	$('.playback').on('click', function(){
		if ($(this).hasClass('playing')){
			pause();
		} else {
			play();
		}
	});

	$('.rewind').on('click', function(){
		if (isShuffle){
			shufflePlay(0);
		} else {
			switchTrack(--currentTrack);
		}
	});

	$('.fastforward').on('click', function(){
		if (isShuffle){
			shufflePlay(1);
		} else {
			switchTrack(++currentTrack);
		}
	});	

	$(".liebiao").on('click',function(){
		isShuffle = !isShuffle;
		if (isShuffle) {
	        $("#player .liebiao").attr("title","点击关闭随机播放");
	        showNotification('已开启随机播放');

			var temp = [];
			for (var i = 0; i < playlist.length; i++) {
				temp[i] = i;
			}
			shuffleArray = shuffle(temp);
			for (var j = 0; j < shuffleArray.length; j++) {
				if (shuffleArray[j] === currentTrack) {
					shuffleIndex = j;
					break;
				}
			}
			localStorage.qplayer_shuffle_array = JSON.stringify(shuffleArray);
		} else {
	        $("#player .liebiao").attr("title","点击开启随机播放");
	        showNotification('已关闭随机播放');
	        localStorage.removeItem('qplayer_shuffle_array');
		}
		localStorage.qplayer = isShuffle;
	});
	
	$('#playlist li').each(function(i){
		$(this).on('click', function(){
			if (isShuffle) {
				for (var j = 0; j < shuffleArray.length; j++) {
					if (shuffleArray[j] === i) {
						shuffleIndex = j;
						break;
					}
				}
			} else {
			    currentTrack = i;
			}
			switchTrack(i);
		});
	});

    var startX, endX;
    $('#player .ctrl .musicTag').mousedown(function(event){
    	startX = event.screenX;
    }).mousemove(function(event){
    	//鼠标左键
    	if (event.which === 1) {
	    	endX = event.screenX;
	    	var seekRange = Math.round((endX - startX) / 678 * 100);
	    	audio.currentTime += seekRange;
	    	setProgress(audio.currentTime);
	    }
    });

    $('#player .ctrl .musicTag').bind('touchstart', function(event){
    	startX = event.originalEvent.targetTouches[0].screenX;
    }).bind('touchmove',function(event){
    	endX = event.originalEvent.targetTouches[0].screenX;
    	var seekRange = Math.round((endX - startX) / 678 * 100);
    	audio.currentTime += seekRange;
    	setProgress(audio.currentTime);
    });

})(jQuery);


function initMarquee(){
	$('.marquee').marquee({
	    //speed in milliseconds of the marquee
	    duration: 15000,
	    //gap in pixels between the tickers
	    gap: 50,
	    //time in milliseconds before the marquee will start animating
	    delayBeforeStart: 0,
	    //'left' or 'right'
	    direction: 'left',
	    //true or false - should the marquee be duplicated to show an effect of continues flow
	    duplicated: true
	});
}

//检测标题和作者信息总宽度是否超出播放器，超过则返回true开启跑马灯
function isExceedTag() {
	var isExceedTag = false;
	if ($('.musicTag strong').width() + $('.musicTag span').width() + $('.musicTag .artist').width() > $('.musicTag').width()) {
	    isExceedTag = true;
	}
	return isExceedTag;
}


function shuffle(array) {
    var m = array.length,
        t, i;
    // 如果还剩有元素…
    while (m) {
        // 随机选取一个元素…
        i = Math.floor(Math.random() * m--);
        // 与当前元素进行交换
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }
    return array;
}

function showNotification(info) {
	isShowNotification = true;
	//判断通知是否存在，存在就移除
    if ($('.qplayer-notification').length>0) {
    	$('.qplayer-notification').remove();
    	clearTimeout(autoClearTimer);
    	clearTimeout(autoShowTimer);
    }
	$('body').append('<div class="qplayer-notification animation-target"><span class="qplayer-notification-icon">i</span><span class="body" style="box-shadow: rgba(0, 0, 0, 0.0980392) 0px 0px 5px;"><span class="message"></span></span><a class="close" href="#" onclick="closeNotification();return false;">×</a><div style="clear: both"></div>');
	$('.qplayer-notification .message').text(info);
	//用width:auto来自动获取通知栏宽度
	var width = $('.qplayer-notification').css({"opacity":"0", "width":"auto"}).width() + 20;
	$('.qplayer-notification').css({"width":"50px","opacity":"1"});
	
	autoShowTimer = setTimeout(function(){
		$('.qplayer-notification').css({"width":width,"transition":"all .7s ease"});
		$('.qplayer-notification .close').delay(500).show(0);
	},1500);
	autoClearTimer = setTimeout("if ($('.qplayer-notification').length>0) {closeNotification()}",8000);
}


function closeNotification() {
	isShowNotification = false;
	$('.qplayer-notification').css({"width":"50px","transition":"all .7s ease"});
	$('.qplayer-notification .close').delay(500).hide(0);
	setTimeout(function(){
		if (!isShowNotification) {
			$('.qplayer-notification').css("opacity","0");
			$('.qplayer-notification-icon').css({"transform":"scale(0)","transition":"transform .5s ease"});
	    }
	},1000);
	setTimeout(function(){
		if (!isShowNotification) {
			$('.qplayer-notification').remove();
		}
	},1500);
    clearTimeout(autoClearTimer);
    clearTimeout(autoShowTimer);
}

/*
*div: 要在其上面显示tip的div
*info: tip内容
*func: 不再提示按钮的click绑定函数
*/
function showTips(div, info, func) {
	var box_height = 100;
	$('body').append('<div class="qplayer_tips"><span class="tips_arrow"></span><span class="info" style="display:none">' + info + '</span><button class="tips_button" onclick="removeTips()">不再提示</button></div>');
	$('.qplayer_tips').css({"top":$(div).offset().top-box_height-30-15, "left": $(div).offset().left-28});
	$('.qplayer_tips').css({"height":box_height,"transition":"all .5s ease-in-out"});
	$('.qplayer_tips .info').delay(500).fadeIn();
	$('.tips_arrow').css({"border-width":"15px","transition":"all .5s ease-in-out"});
	$('.tips_button').css({"height":"30px","transition":"all .5s ease-in-out"});
	if (func != undefined) {
		$('.tips_button').click(func);
	}
}

function removeTips() {
	$('.qplayer_tips .info').fadeOut();
	$('.qplayer_tips').css({"height":"0","transition":"all .5s ease-in-out"});
	$('.tips_arrow').css({"border-width":"0","transition":"all .5s ease-in-out"});
	$('.tips_button').css({"opacity":"0","transition":"all .2s ease-in-out"});
	setTimeout(function(){$('.qplayer_tips').remove()}, 500);
}
