
addEvent(document,'DOMContentLoaded',function(){


	//轮播器初始化
	$().getTagName('img').css('display','none');
	$().getTagName('img').eq(0).css('display','block');
	$().getTagName('li').eq(0).css('color','#333');
	$().getTagName('strong').html($().getTagName('img').eq(0).attr('alt'));

	//手动轮播器
	$().getTagName('li').hover(function(){
		$().getTagName('img').css('display','none');
		$().getTagName('img').eq($(this).index()).css('display','block');
		$().getTagName('strong').html($().getTagName('img').eq($(this).index()).attr('alt'));
		$().getTagName('li').css('color','#999');
		$().getTagName('li').eq($(this).index()).css('color','#333');
	},function(){
		clearInterval(banner_timer);
		banner_index=$(this).index()+1;
		banner_timer=setInterval(banner_fn,1000);
			
	});

	//轮播器计数器
	var banner_index=1;

	//自动轮播器
	var banner_timer=setInterval(banner_fn,1000);

	function banner(){
		$().getTagName('img').css('display','none');
		$().getTagName('img').eq(banner_index).css('display','block');
		$().getTagName('strong').html($().getTagName('img').eq(banner_index).attr('alt'));
		$().getTagName('li').css('color','#999');
		$().getTagName('li').eq(banner_index).css('color','#333');
		// $().getTagName('img').eq(banner_index).animate('left',0,50,380,100);
	};

	function banner_fn(){
		if(banner_index>=$().getTagName('img').length()){
			banner_index=0;
		}
		banner();
		banner_index++;		
	}
	




});
	
	
