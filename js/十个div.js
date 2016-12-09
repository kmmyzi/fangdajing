// 创建十个div
window.onload=function(){
	var colors=["red","blue","pink","black","green","yellow","plum"];
	var nums=["width:50px;height:50px;background:red","width:100px;height:150px;background:green","width:100px;height:300px;background:pink","width:150px;height:350px;background:black","width:200px;height:100px;background:yellow","width:250px;height:200px;background:#ccc","width:300px;height:200px;background:#458","width:350px;height:250px;background:#485"];
	var className=["one","two","three","four","five","six","seven","eight","nine","ten"];

	for(var i=0; i<=9;i++){
		var div=document.createElement("div");
		document.body.appendChild(div);
		var style=document.createAttribute("style");
		style.nodeValue=nums[parseInt(Math.random()*className.length)];;
		div.setAttributeNode(style);
		// var height=document.createAttribute("height");   
		// height.nodeValue=nums[parseInt(Math.random()*className.length)];
		// div.setAttribute(height);
	}





}
