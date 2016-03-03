 


// 仿做的一个小库，比较简陋，但是能用！


 //调用
var $=function(_this){
	return new Base(_this);
};

function Base(_this){
	//创建一个数组，保存获取的节点
	//防止实例化的this.element变成公有化，所以放在内部
	this.elements=[];
	if (_this!=undefined) {
		this.elements[0]=_this;
	};
}; 



//获取ID节点
Base.prototype.getId=function(id){
	this.elements.push(document.getElementById(id));
	return this;
}
//获取序列的节点
Base.prototype.eq=function (i){
	return $(this.elements[i]);
}
//获取元素节点
Base.prototype.getTagName=function(tag){
	var tags=document.getElementsByTagName(tag);
	for(var i=0;i<tags.length;i++){
		this.elements.push(tags[i]);
	}
	return this;
};
//获取某组节点的数量
Base.prototype.length=function(){
	return this.elements.length;
}
//获取CLASS节点
Base.prototype.getClass=function(className,idName){
	var node=null;
	if(arguments.length==2){
		node=document.getElementById(idName);
	}else{
		node=document;
	}
	var all=document.getElementsByTagName('*');
	for(var i=0;i<all.length;i++){
		if(all[i].className==className){
			this.elements.push(all[i]);
		}
	}
	return this; 
};
//获取某一个节点  ！！！这里有个小问题并不能选取单一一个？？？
Base.prototype.getElement=function(num){
	var element=this.elements[num];
	this.elements=[];
	this.elements[0]=element;
	return this;
};

//获取某一个节点的属性
Base.prototype.attr=function(attr,value){
	for(var i=0;i<this.elements.length;i++){
		if(arguments.length==1){				//arguments.length 可以检测参数的个数
			return this.elements[0].getAttribute(attr);
		}else if (arguments.length==2){
			this.elements[i].setAttribute(attr, value);
		}
	}
	return this;
}
	

//获取某一个节点在整个节点组中是第几个索引
Base.prototype.index=function(){
	var children_=this.elements[0].parentNode.children;
	for(var i=0;i<children_.length;i++){
		if(this.elements[0]==children_[i]){
			return i;
		}
	}
}
//设置某一个节点的透明度
Base.prototype.opacity=function(num){
	for(var i=0;i<this.elements.length;i++){
		this.elements[i].style.opacity=num/100;
		this.elements[i].style.filter='alpha(opacity=' + num + ')';
	}
	return this;
}

//设置css
Base.prototype.css=function(attr,value){
	for(var i=0;i<this.elements.length;i++){
		if (arguments.length==1) {
			if (typeof window.getComputedStyle !='undefined') {    //这里是为了支持外联css的W3C
				return window.getComputedStyle(this.elements[i],null)[attr]+'px';
			}else if (typeof this.elements[i].currentStyle !='undefined') { 	//这里是为了支持外联css的IE
				return this.elements[i].currentStyle[attr]+'px';
			}
		};
		this.elements[i].style[attr]=value;
	};
	return this;
};

//添加Class
Base.prototype.addClass=function(className){
	for(var i=0;i<this.elements.length;i++){
		if(!this.elements[i].className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))){ 
			this.elements[i].className+= ' '+className;   //为了避免className叠加在一起，加' '空格
		};
		
	}
	return this;
}
//移除class        //正则表达式有点迷糊
Base.prototype.removeClass=function(className){
	for(var i=0;i<this.elements.length;i++){
		if(this.elements[i].className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))){
			this.elements[i].className= this.elements[i].className.replace(new RegExp('(\\s|^)' + className + '(\\s|$)'),''); 
		}
	}
	return this;
}
//设置innerHTML内容
Base.prototype.html=function(str){
	for(var i=0;i<this.elements.length;i++){
		if (arguments.length==0) {
			return this.elements[i].innerHTML;
		};
		this.elements[i].innerHTML=str;
	};
	return this;
};
//设置鼠标移入移出方法
Base.prototype.hover=function(over,out){
	for(var i=0;i<this.elements.length;i++){
		this.elements[i].onmouseover=over;
		this.elements[i].onmouseout=out;
	};
	return this;	
};
//设置显示
Base.prototype.show=function(){
	for(var i=0;i<this.elements.length;i++){
		this.elements[i].style.display='block';
	};	
}
//设置隐藏
Base.prototype.hide=function(){
	for(var i=0;i<this.elements.length;i++){
		this.elements[i].style.display='none';
	};	
}
//设置物体居中
Base.prototype.center=function(width,height){
	var top=(document.documentElement.clientHeight-250)/2;     //250，350是目标窗口大小还没有做成参数式
	var left=(document.documentElement.clientWidth-350)/2;
	for(var i=0;i<this.elements.length;i++){
		this.elements[i].style.top=top+'px';
		this.elements[i].style.left=left+'px';
	};
	return this;
}
//锁屏功能，要注意设置锁屏时候的z-index值低于弹出窗口的
Base.prototype.lock=function(){
	for(var i=0;i<this.elements.length;i++){
		this.elements[i].style.width=document.documentElement.clientWidth+'px';
		this.elements[i].style.height=document.documentElement.clientHeight+'px';
		this.elements[i].style.display='block';
		document.documentElement.style.overflow='hidden';
	}
}

Base.prototype.unlock=function(){
	for(var i=0;i<this.elements.length;i++){
		this.elements[i].style.display='none';
		document.documentElement.style.overflow='auto';
	}
}
//触发浏览器窗口事件
Base.prototype.resize=function(fn){
	window.onresize=fn;
	return this;
}
//设置点击事件
Base.prototype.click=function(fn){
	for(var i=0;i<this.elements.length;i++){
		this.elements[i].onclick=fn;
	};
	return this;
};
//拖拽功能
//拖拽的想法：1点下去，2在点下的物体被选中进行move移动，3抬起鼠标，停止移动
Base.prototype.drag=function(){
	for(var i=0;i<this.elements.length;i++){
		this.elements[i].onmousedown=function(e){
			var e=e||window.event;
			var _this=this;					//这里this是全局，所以要把它赋值给_this
		 	var diffX=e.clientX-_this.offsetLeft;
			var diffY=e.clientY-_this.offsetTop;
			if(typeof _this.setCapture!='undefined'){
				_this.setCapture();
			}

			document.onmousemove=function(e){
				var e=e||window.event;
				_this.style.left=e.clientX-diffX+'px';
				_this.style.top=e.clientY-diffY+'px';
		
			}
			document.onmouseup=function(e){
				this.onmousemove=null;
				this.onmouseup=null;
			}
			if(typeof _this.releaseCapture!='undefined'){
				_this.releaseCapture();
			}
		};
	};
	return this;
}

//插件入口
Base.prototype.extend=function(name,fn){
	Base.prototype[name]=fn;
}

//设置动画
var timer=null;
Base.prototype.animate=function(attr,start,step,end,time){   //如果是向左或者向上，step为负值，target小于本身的left、top
	for(var i=0;i<this.elements.length;i++){
		var element=this.elements[i];         //如果封装到函数里面会不认识，得放到外面
		if(start>end){
			step=-step;
		}
		element.style[attr]=start+'px';    //初始化起始点，每次从起始开始运动
		clearInterval(timer);            //清空一下避免重复动画加速 把变量null一下
		timer=setInterval(function(){
			element.style[attr]=getStyle(element,attr)+step+'px';
			if(getStyle(element,attr)>=end){
				element.style[attr]=end+'px';
				clearInterval(timer);          //当到达目标点的时候会停止动画
			}
		},time);
	}
	return this;
}