

//跨浏览器添加事件
function addEvent(obj,type,fn){
	if (typeof obj.addEventListener!='undefined') {
		obj.addEventListener(type,fn,false);
	}else if(typeof obj.attachEvent!='undefined'){
		obj.attachEvent('on'+type, fn);
	}
}

//跨浏览器删除事件
function removeEvent(obj,type,fn){
	if (typeof obj.removeEventListener!='undefined') {
		obj.removeEventListener(type, fn, false);
	}else if (typeof obj.detachEvent!='undefined') {
		obj.detachEvent('on'+type,fn);
	};
}

//跨浏览器获取视口大小
function getInner(){
	if(typeof window.innerWidth!='undefined'){
		return{
			width:window.innerWidth,
			height:window.innerHeight
		}
	}else{
		return{
			width:document.documentElement.clienetWidth,
			height:document.documentElement.clientHeight
		}
	}
}

//跨浏览器获取Style
function getStyle(element,attr){
	var value=null;
	if(typeof window.getComputedStyle!='undefined'){
		value=parseInt(window.getComputedStyle(element,null)[attr]) ;    //第二个参数不是伪类，就设置null
	}else if(typeof element.currentStyle!='undefined'){
		value=parseInt(element.currentStyle[attr]);
	}
	return value;
}
