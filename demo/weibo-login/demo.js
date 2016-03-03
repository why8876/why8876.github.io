

addEvent(document,'DOMContentLoaded',function(){
	//个人中心
	$().getClass('member').hover(function(){
		$().getTagName('ul').show();

	},function(){
		$().getTagName('ul').hide();
	});



	var login=$().getId('login');             //弹出登录框
	var screen=$().getId('screen');				//锁屏
	login.center(350,250);						//登录框居中显示
	$().resize(function(){						//想让登录框随着窗口变化而居中,用的onresize
		login.center(350,250);
		if(login.css('display')=='block'){       //避免非点击操作带来的锁屏，如双击浏览器等
			screen.lock();
		}
	});
	$().getClass('login').click(function(){
		login.css('display','block');
		screen.lock();
	});
	$().getClass('close').click(function(){
		login.css('display','none');
		screen.unlock();
	});

	$().getId('login').drag();


});
