function drag(box){
	this.box=box;
	this.cw=document.documentElement.clientWidth;
	this.ch=document.documentElement.clientHeight;
	this.ow=this.box.offsetWidth;
	this.oh=this.box.offsetHeight;
	var ox = 0;
	var oy = 0;
}
drag.prototype={

	drags:function(){
		this.down();
	},

	down:function(){
		var that = this;
		
		that.box.onmousedown = function(e){
			e = e || window.event;
			that.ox = e.offsetX;
			that.oy = e.offsetY;
			that.move();
		}	
	},

	move:function(e){
		var that=this;

		document.onmousemove = function(e){
			e = e || window.event;
			var x = e.clientX - that.ox;
			var y = e.clientY - that.oy;
			that.box.style.left = x+"px";
			that.box.style.top = y+"px";
			that.up();
		}
	},

	up:function(){
		var that=this;

		document.onmouseup = function(){
			this.onmousemove = null;
			this.onmouseup = null;
		}
	}

}