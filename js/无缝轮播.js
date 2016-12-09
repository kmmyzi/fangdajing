$(function(){
var img=$("a",$(".banner")[0]);
var lis=$("li",$(".btn")[0]);
var lefts=$(".left")[0];
var rights=$(".right")[0];
var banner=$(".banner")[0];
	for(var i=1;i<img.length;i++){
		img[i].style.left="1190px";
	}
	var now=0;
	var next=0;
	var t=setInterval(move,2000);
	function move(){
		next++;
		if(next>=img.length){
			next=0;
		}
		img[next].style.left="1190px";
		animate(img[now],{left:-1190});
		animate(img[next],{left:0});
		lis[next].className="active";
		lis[now].className="";
		now=next;
	}
	banner.onmouseover=function(){
		rights.style.display="block";
		lefts.style.display="block";
		clearInterval(t);
	}
	banner.onmouseout=function(){
		rights.style.display="none";
		lefts.style.display="none";
		t=setInterval(move,2000);
	}
	rights.onclick=function(){
		next++;
		if(next>=img.length){
			next=0;
		}
		img[next].style.left="1190px";
		animate(img[now],{left:-1190});
		animate(img[next],{left:0});
		lis[next].className="active";
		lis[now].className="";
		now=next;
	}
	lefts.onclick=function(){
		next--;
		if(next<=-1){
			next=3;
		}
		img[next].style.left="-1190px";
		animate(img[now],{left:1190});
		animate(img[next],{left:0});
		lis[next].className="active";
		lis[now].className="";
		now=next;
	}
	for(var x in lis){
		lis[x].index=x;
		lis[x].onclick=function(){
		if(this.index>next){
			next=this.index;
			if(next>=img.length){
				next=0;
			}
			img[next].style.left="1190px";
			animate(img[now],{left:-1190});
			animate(img[next],{left:0});
			lis[next].className="active";
			lis[now].className="";
			now=next;
		}else{
			next--;
			next=this.index;

			if(next<=-1){
				next=3;
			}
			img[next].style.left="-1190px";
			animate(img[now],{left:1190});
			animate(img[next],{left:0});
			lis[next].className="active";
			lis[now].className="";
			now=next;
		}


		}
	}



})


