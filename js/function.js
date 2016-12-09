// alert("引用成功");
//2016.8-29
// 第（1）个解决类名的兼容问题
// 1、判断浏览器
// 2、ff:现有的方法
// 3、IE：
// 	（1）获取所有的标签
// 	（2）遍历，判断
// 		标签.className==className
// 	（3）条件满足，保留标签
// 	（4）返回新数组
function getClass(classname,father){ //寻找类名，或寻找父类下的类名
	father = father||document;
	if(document.getElementsByClassName){
		return father.getElementsByClassName(classname);
	}else{
		var arr=[];
		var all=father.getElementsByTagName("*");
		for(var i=0;i<all.length;i++){
			if(checkRep(all[i].className,classname)){
				arr.push(all[i]);
			}
		}
		return arr;
	}
}
function checkRep(string,val){//解决：IE浏览器中不支持多一个标签多个名字。
	var arr=string.split(" ");
	for(var i in arr){
		if(arr[i]==val){
			return true;
		}
	}
	return false;
 // return string.match(val)!=null ?true:false
}

// ***************************************************************
//2016.8.30
//解决获取样式值的兼容函数
function getStyle(obj,attr){
	if(obj.currentStyle){
		return parseInt(obj.currentStyle[attr]);
	}else{
		return parseInt(getComputedStyle(obj,null)[attr]);
	}
}
// *******************************************************************
//2016.8.31
//获取元素的兼容函数（可以支持标签、id、class）
function $(selector,father){
	father=father||document;
	if(typeof selector=="string"){
		selector=selector.replace(/^\s*|\s*$/g,"");//正则去除字符串前后的空格
		if(selector.charAt(0)=="."){            //类
			return getClass(selector.slice(1),father);
		}
		else if(selector.charAt(0)=="#"){   //id
			return document.getElementById(selector.slice(1));
		}
		else if(/^[a-z][1-6a-z]*/g.test(selector)){   //标签
			return father.getElementsByTagName(selector);	 
		}			
	}else if(typeof selector=="function"){//如果传入函数    省略window.onload=function(){}
		// window.onload=function(){
		// 	selector();
		// }
		addEvent(window,"load",function(){
			selector();
		})
	}
}
// ********************************************************************************
//2016.9.2
//获取所有的子节点的兼容函数
//father 父类     type：不传参数只取元素结点，传入3取元素节点和去空格文字节点
function getChild(father,type){
	type=type||1;
	var all=father.childNodes;
	var newall=[];
	var str;
	for(var i in all){
		if(type==1){
			if(all[i].nodeType==1){
				newall.push(all[i]);
			}
		}else if(type==3){
			if(all[i].nodeType==1){
				newall.push(all[i]);
			}
			if(all[i].nodeType==3){
				str=all[i].nodeValue.replace(/^\s*|\s*$/g,"");
				if(str!==""){
					newall.push(str);
				}
			}
		}	
	}
	return newall;
}
// ***************************************************************************
//2016.9.2
// 获取第一个或最后一个子节点
//father 父类    type
function getOneChild(father,type){
	var childs=getChild(father,1);
	if(typeof type=="string"){
		if(type=='first'){
			return childs[0];
		}else if(type=="last"){
			return childs[childs.length-1];
		}
	}else if(typeof type=="number"){
		return childs[type];
	}
}
//*********************************************************************************
//2016.9.2
//获取上一个或下一个兄弟结点
//borther:以某个元素为几点    num:正数则向下寻找，负数则向上寻找，数值代表位数
function getBrother(brother,num){
	var i=0;
	num=num||1;
	if(!brother){
		return false;
	}
	if(num>0){
		var brother=brother.nextSibling;
		while(brother.nodeType==3||brother.nodeType==8){
			// for(var i=0;i<num;i++){
				brother=brother.nextSibling;
				if(!brother){
					return false;
				}
			// }
		}
	}else if(num<0){
		Math.abs(num);
		var brother=brother.previousSibling;
		while(brother.nodeType==3||brother.nodeType==8){
				brother=brother.previousSibling;
					if(!brother){
					return false;
				}
		}
	}
		return brother;
}
/**************************************************************/
//添加\删除事件浏览器兼容问题
//2016-9-6
//obj ：对象 	event:"click"	fun:函数
function addEvent(obj,event,fun){
	obj[fun]=function(){
		fun.call(obj);
	}
	if(obj.attachEvent){
		obj.attachEvent("on"+event,obj[fun]);
	}else{
		obj.addEventListener(event,obj[fun],false);
	}
}

function removeEvent(obj,event,fun){
	if(obj.detachEvent){
		obj.detachEvent("on"+event,obj[fun]);
	}else{
		obj.removeEventListener(event,obj[fun],false);
	}
}
/**************************************************************************/
//阻止浏览器的默认行为
//2016-9-6
function prevent(e){
	if(e.preventDefault){
		e.preventDefault();     //w3c
	}else{
		e.returnValue=false;    //IE
	}
}

/*******************************************************/
//滚动函数
//2016-9-7
//
function mouseWheel(obj,up,down){
	if(obj.attachEvent){
		obj.attachEvent("onmousewheel",scrollFn);//IE、opera
	}else if(obj.addEventListener){
		obj.addEventListener("mousewheel",scrollFn,false);//chrome,safari  -webkit-
		obj.addEventListener("DOMMouseScroll",scrollFn,false);//firefox  -moz-
	}

	function scrollFn(e){
		e=e||window.event;
		if(e.preventDefault){
			e.preventDefault
		}else{
			returnValue=false;
		}
		var f = e.detail||e.wheelDelta;
		if(f == -3||f == 120){
			if(up){
				up();
			}
		}else if(f == 3 || f== -120){
			if(down){
				down();
			}
		}
	}
}

//************************************************************************************
//2016-9-8
//解决onmouse从父容器移入子容器
//hover
//判断某个元素是否包含有另外一个元素
 function contains (parent,child) {
  if(parent.contains){
     return parent.contains(child) && parent!=child;
  }else{
    return (parent.compareDocumentPosition(child)===20);
  }
 }

//判断鼠标是否真正的从外部移入，或者是真正的移出到外部；
  function checkHover (e,target) {
   if(getEvent(e).type=="mouseover"){
      return !contains(target,getEvent(e).relatedTarget || getEvent(e).fromElement)&&
    !((getEvent(e).relatedTarget || getEvent(e).fromElement)===target)
   }else{
    return !contains(target,getEvent(e).relatedTarget || getEvent(e).toElement)&&
    !((getEvent(e).relatedTarget || getEvent(e).toElement)===target)
    }
  }
//鼠标移入移出事件
/*
  obj   要操作的对象
  overfun   鼠标移入需要处理的函数
  outfun     鼠标移除需要处理的函数
*/
function hover (obj,overfun,outfun) {
    if(overfun){
      obj.onmouseover=function  (e) {
        if(checkHover(e,obj)){
           overfun.call(obj,[e]);
        }
      }
    }
    if(outfun){
      obj.onmouseout=function  (e) {
        if(checkHover(e,obj)){
           outfun.call(obj,[e]);
        }
      }
    }
}
 function getEvent (e) {
      return e||window.event;
 }
/********************************/