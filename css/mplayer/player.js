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
	{title:"安静",artist:"周杰伦",mp3:"/css/mplayer/anjing.mp3",cover:"/css/mplayer/20180103101720.png",},
        {title:"暗号",artist:"周杰伦",mp3:"/css/mplayer/anhao.mp3",cover:"/css/mplayer/20180103101720.png",},
        {title:"白色风车",artist:"周杰伦",mp3:"http://m10.music.126.net/20180103150353/1ce314595c0d05db94c0b3fc74388bd7/ymusic/e2e8/06f7/7d61/e2a43c5a74908be157bb8fa21422b32f.mp3",cover:"/css/mplayer/20180103101720.png",},
        {title:"半岛铁盒",artist:"周杰伦",mp3:"http://m10.music.126.net/20180103151232/29601f5a887f21281b55aee358f69562/ymusic/8528/22df/fe9d/88b2e1bfd01175b48e2b88f07798e3d4.mp3",cover:"/css/mplayer/20180103101720.png",},
        {title:"本草纲目",artist:"周杰伦",mp3:"http://m10.music.126.net/20180103130714/9b8d6918301260163fb057fb144b171c/ymusic/f5d2/134f/c6b6/34127cb621e9791179ff8c1c0f0a6618.mp3",cover:"/css/mplayer/20180103101720.png",},
        {title:"斗牛",artist:"周杰伦",mp3:"http://m10.music.126.net/20180103130737/aa2aa2985b6bad4046586f00c9ecc3bf/ymusic/6a42/26c6/5ce1/ffe3fafdb90fdd8ef985518e2cbcd24d.mp3",cover:"/css/mplayer/20180103101720.png",},
        {title:"分裂",artist:"周杰伦",mp3:"http://m10.music.126.net/20180103130801/c1f5c5a4995445bb0ca7b231e8a955cd/ymusic/9a4c/d71d/9833/115617e24f5abfc9b59fd9fa133cf0c0.mp3",cover:"/css/mplayer/20180103101720.png",},
        {title:"黑色幽默",artist:"周杰伦",mp3:"http://m10.music.126.net/20180103130823/2dffcf781d53d392c90cd91712f387a0/ymusic/95ca/cab6/a3d2/0fca9e29d0a2a08dba69e9fa1a33f6f9.mp3",cover:"/css/mplayer/20180103101720.png",},
        {title:"红模仿",artist:"周杰伦",mp3:"http://m10.music.126.net/20180103130843/5baceaae0ce66b85c1ca12f56b29ccf6/ymusic/91b7/f6f4/021a/74605a788e05462948cfefb6b775d3d5.mp3",cover:"/css/mplayer/20180103101720.png",},
        {title:"回到过去",artist:"周杰伦",mp3:"http://m10.music.126.net/20180103130900/9c0eb2be00e72173d72c7c00eccd9687/ymusic/89a7/479d/d9e0/a16d21f07ea94ecef384579be1f40d4a.mp3",cover:"/css/mplayer/20180103101720.png",},
        {title:"简单爱",artist:"周杰伦",mp3:"http://m10.music.126.net/20180103130917/3d3b876aee0ef04e5a7ec1fd6aa78de6/ymusic/8718/ca02/b443/fa866a2a86292037ef028e7a5a752984.mp3",cover:"/css/mplayer/20180103101720.png",},
        {title:"菊花台",artist:"周杰伦",mp3:"http://m10.music.126.net/20180103130938/2d2a384ab0d4bcdffd0e1bb8fbb0e105/ymusic/dfa0/b6f5/5e3b/1b7ae27599b91c5a42306d5ee7ea569d.mp3",cover:"/css/mplayer/20180103101720.png",},
        {title:"开不了口",artist:"周杰伦",mp3:"http://m10.music.126.net/20180103130956/7cfe87f9e1181d215abf23dbf21228ae/ymusic/be22/8722/f439/6609bbb9caa2ff0f873235d8ec57e1be.mp3",cover:"/css/mplayer/20180103101720.png",},
        {title:"爱在西元前",artist:"周杰伦",mp3:"http://m10.music.126.net/20180103131013/f4f4ed932f6f6efeb8f5fc69773aca0a/ymusic/91e3/876a/2fe4/d2becd582ead07365fefb5442cbb077e.mp3",cover:"/css/mplayer/20180103101720.png",},
        {title:"龙卷风",artist:"周杰伦",mp3:"http://m10.music.126.net/20180103132329/2402cb206d2faba9b9e98e575c82bddb/ymusic/913b/a797/44f9/7946d7ff555364272fcd7fe8bd24ef9d.mp3",cover:"/css/mplayer/20180103101720.png",},
        {title:"龙拳",artist:"周杰伦",mp3:"http://m10.music.126.net/20180103132411/1f62e26f46f3d8495800df38cd6e2cad/ymusic/3cf7/0305/fe5c/556bd1f8e2947692c1328c2a8a19f382.mp3",cover:"/css/mplayer/20180103101720.png",},
        {title:"迷迭香",artist:"周杰伦",mp3:"http://m10.music.126.net/20180103132429/81f930125f61ba06044dc211df6ae79f/ymusic/161b/4ab2/8a4e/6c2fcd357e9ad23bbe70d9243c2aec4f.mp3",cover:"/css/mplayer/20180103101720.png",},
        {title:"你怎么连话都说不清楚",artist:"周杰伦",mp3:"http://m10.music.126.net/20180103132444/e79bdd63310280cd2785df6ccfe16efd/ymusic/9cdd/8629/10fb/e0d6cb201b142737cc85e42c559e3f63.mp3",cover:"/css/mplayer/20180103101720.png",},
        {title:"忍者",artist:"周杰伦",mp3:"http://m10.music.126.net/20180103132502/8c44457e78305639f2884e630e81412b/ymusic/256b/fc50/ba1d/69c9615f1bedad0743d1fb17d284e0ce.mp3",cover:"/css/mplayer/20180103101720.png",},
        {title:"上海一九四三",artist:"周杰伦",mp3:"http://m10.music.126.net/20180103132518/5e91b25000e072eaee571d4c0fdf0f12/ymusic/c569/4bf9/edc8/d76d8bda05465b214ba56b430056783c.mp3",cover:"/css/mplayer/20180103101720.png",},
        {title:"听妈妈的话",artist:"周杰伦",mp3:"http://m10.music.126.net/20180103132532/edfa96c3d8d990bc2934380951edd784/ymusic/f7dc/4b33/1dd9/3f37232270e4a05934179e6913efa47f.mp3",cover:"/css/mplayer/20180103101720.png",},
        {title:"退后",artist:"周杰伦",mp3:"http://m10.music.126.net/20180103132545/9df9e9a1d9cf43c2ebff114cffa70017/ymusic/c94a/6b9a/c4b4/e765c6c7672b7f7cbc9ffbbd2d885ae5.mp3",cover:"/css/mplayer/20180103101720.png",},
        {title:"心雨",artist:"周杰伦",mp3:"http://m10.music.126.net/20180103132559/38f1c33ca7799e4cb6980225258ce897/ymusic/cf5b/c2e9/f358/ba50ad6af55854ff546eac3f88e0d470.mp3",cover:"/css/mplayer/20180103101720.png",},
        {title:"星晴",artist:"周杰伦",mp3:"http://m10.music.126.net/20180103132611/ae8ad53a27250e27991ddddf42e5ffea/ymusic/022c/e97d/5db9/4ae2c5a3df96a2c18bdc36854fd19a15.mp3",cover:"/css/mplayer/20180103101720.png",},
        {title:"爷爷泡的茶",artist:"周杰伦",mp3:"http://m10.music.126.net/20180103132626/8afae500464aece3f345d96ca186c0d1/ymusic/097c/7188/4029/ed7ed829bdb36130fcfd07fb785ba335.mp3",cover:"/css/mplayer/20180103101720.png",},
        {title:"夜的第七章",artist:"周杰伦",mp3:"http://m10.music.126.net/20180103132647/8c4324e8e06d4aa319bce60ccb6c531b/ymusic/5c6c/7385/b04f/d7c66793ca80aec02d4d8657bfe6ed6c.mp3",cover:"/css/mplayer/20180103101720.png",},
        {title:"找自己",artist:"周杰伦",mp3:"http://m10.music.126.net/20180103132700/3bbe1aa76ca275b5a5c22937e2f1a951/ymusic/dddd/dda9/b63d/a653179ffc6b0820ce55818c2551d4fa.mp3",cover:"/css/mplayer/20180103101720.png",},
        {title:"最后的战役",artist:"周杰伦",mp3:"http://m10.music.126.net/20180103132712/0fa5247aaf30e282779a8c20681bf609/ymusic/58bd/66a0/a2f5/80b47890ff3d525ef169c7913332d738.mp3",cover:"/css/mplayer/20180103101720.png",},
        {title:"千里之外",artist:"周杰伦",mp3:"http://m10.music.126.net/20180103132725/995278c7e42adafa3ef2f5add734b0d7/ymusic/4a0d/9d91/7017/77120bb62b64ce109215b7005b15033d.mp3",cover:"/css/mplayer/20180103101720.png",},
        {title:"以父之名",artist:"周杰伦",mp3:"http://m10.music.126.net/20180103132741/7be693d7d6000b0ff19f6c8b1b3da1b3/ymusic/463f/6e76/a97e/00ce805b7c70f12e689184c213030b62.mp3",cover:"/css/mplayer/20180103101720.png",},
        {title:"同一种调调",artist:"周杰伦",mp3:"http://m10.music.126.net/20180103132753/933f56fc84ad1ff8e92a7295204d6f02/ymusic/f0fa/743d/82ef/8e829a96a7856207272e1d21d027d089.mp3",cover:"/css/mplayer/20180103101720.png",},
        {title:"梯田",artist:"周杰伦",mp3:"http://m10.music.126.net/20180103132806/7b373026703338e59bc9486d5a50af6a/ymusic/f7a9/281a/edca/9842de8bad669b02896f3904cd8f7759.mp3",cover:"/css/mplayer/20180103101720.png",},
        {title:"她的睫毛",artist:"周杰伦",mp3:"http://m10.music.126.net/20180103132819/2838cea4f543826e22605fb562561723/ymusic/737a/4a4e/8437/2742edee41781871aa6c9943d12df8fb.mp3",cover:"/css/mplayer/20180103101720.png",},
        {title:"双刀",artist:"周杰伦",mp3:"http://m10.music.126.net/20180103132831/65bfc5076bfe6d71bc0da1a1d4f91087/ymusic/ebc4/5096/3642/8013cae13d53bbb6aa8d644c6e7bc4f8.mp3",cover:"/css/mplayer/20180103101720.png",},
        {title:"三年二班",artist:"周杰伦",mp3:"http://m10.music.126.net/20180103132843/4f0dc479502c40a2de4883c1d3e9edac/ymusic/39bf/7396/8331/ee81049345e13a18e044059d6551640a.mp3",cover:"/css/mplayer/20180103101720.png",},
        {title:"晴天",artist:"周杰伦",mp3:"http://m10.music.126.net/20180103132855/b6b5a66213a0b095e21b72a181ef195c/ymusic/5e8c/9fbd/460a/63af292aec1f060e9a1c23a8c1bbff95.mp3",cover:"/css/mplayer/20180103101720.png",},
        {title:"懦夫",artist:"周杰伦",mp3:"http://m10.music.126.net/20180103132910/3f1f6f035cb2576cab8b731bf64befeb/ymusic/ee14/7265/3528/043177d0f7117fd841237e6e5737e55f.mp3",cover:"/css/mplayer/20180103101720.png",},
        {title:"你听得到",artist:"周杰伦",mp3:"http://m10.music.126.net/20180103132924/55bbefec3f40a37a00ba0cfa8c182efe/ymusic/91f5/b208/f946/33a2a1e740443d7c267b18b2248a8ae5.mp3",cover:"/css/mplayer/20180103101720.png",},
        {title:"东风破",artist:"周杰伦",mp3:"http://m10.music.126.net/20180103132940/161ea7ac0a8e7d29594458bed61a5be3/ymusic/7901/aeb4/3579/cbc81389678f82af528f51a81103369a.mp3",cover:"/css/mplayer/20180103101720.png",},
        {title:"爱情悬崖",artist:"周杰伦",mp3:"http://m10.music.126.net/20180103132952/f397dc22e58166b672ba59c946b32dc4/ymusic/9d2f/f9af/49c4/fe53b41292ebc910503aa64cee8fd1dc.mp3",cover:"/css/mplayer/20180103101720.png",},
        {title:"最长的电影",artist:"周杰伦",mp3:"http://m10.music.126.net/20180103133006/9d5d7e2babd0443f7b4e3ffb8759553c/ymusic/22bb/1ed1/dfad/78789bf31f445b494a21a60d03862b6f.mp3",cover:"/css/mplayer/20180103101720.png",},
        {title:"阳光宅男",artist:"周杰伦",mp3:"http://m10.music.126.net/20180103133019/347b0d1c4f2628a4e5233cb792f93f95/ymusic/f05e/a9c6/268b/034bb19dbc01d5d664769a08d528f8ec.mp3",cover:"/css/mplayer/20180103101720.png",},
        {title:"无双",artist:"周杰伦",mp3:"http://m10.music.126.net/20180103133035/20decc2aa9eeba05fbcfdaee92b8d411/ymusic/1178/ea39/d026/373eeb2c1819bc87c9783c97f609527b.mp3",cover:"/css/mplayer/20180103101720.png",},
        {title:"我不配",artist:"周杰伦",mp3:"http://m10.music.126.net/20180103133059/7d38ce790bf4b1fd38da4ed3df21d695/ymusic/887d/754f/ca1c/0c59946ed66d116d7f17fcfd7ed4020f.mp3",cover:"/css/mplayer/20180103101720.png",},
        {title:"甜甜的",artist:"周杰伦",mp3:"http://m10.music.126.net/20180103133121/37aa5833807b75541cb692c3ab3e6988/ymusic/a120/66a6/09c4/4a0124f064ff25f06e5b4b3ea465295e.mp3",cover:"/css/mplayer/20180103101720.png",},
        {title:"青花瓷",artist:"周杰伦",mp3:"http://m10.music.126.net/20180103133134/253affc281cf89cae101ee44b5a205cc/ymusic/92bb/abd4/4f12/f952c3deabd02e179766e092a9f3927b.mp3",cover:"/css/mplayer/20180103101720.png",},
        {title:"蒲公英的约定",artist:"周杰伦",mp3:"http://m10.music.126.net/20180103133148/cd3191496d5178d593b06295c7b5bffa/ymusic/cb30/34ab/0145/ddd1aaf0e498764ccbee3dcbd46b5a49.mp3",cover:"/css/mplayer/20180103101720.png",},
        {title:"牛仔很忙",artist:"周杰伦",mp3:"http://m10.music.126.net/20180103133211/d3fbe88ebf08d189eae6b4722bb7c870/ymusic/f25b/6072/d238/cc1d8d60ab7e3b6a682a5db65ef66a42.mp3",cover:"/css/mplayer/20180103101720.png",},
        {title:"扯",artist:"周杰伦",mp3:"http://m10.music.126.net/20180103133225/c4ab2da815dd6d34bb3cdf255670c1e1/ymusic/9bd4/d427/8cd9/e4279669bb722a08754c9c15025f1967.mp3",cover:"/css/mplayer/20180103101720.png",},
        {title:"彩虹",artist:"周杰伦",mp3:"http://m10.music.126.net/20180103133239/be53803db02578796c70d3a7484fa652/ymusic/28cd/b6da/1ec6/3a930720bd022f96c43a9bb92968dbb5.mp3",cover:"/css/mplayer/20180103101720.png",},
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
