// zarn JavaScript Library
// Author: Robert Babcock
// Version 1.0 alpha

var zarn = function(selector){
	return new zarn.prototype.init(selector);
};

zarn.prototype = {
	
	init: function(selector){
		// init the library
		if(typeof selector === "string"){	
			this.elements = document.querySelectorAll(selector);
		}else if(selector.nodeType){
			this.elements = [selector];
		}
	},
	
	elements: [],
	
	each: function(fn){
		for(var i=0, j=this.elements.length; i<j; i++){
			fn.call(this.elements[i]);
		};
		return this;
	},
	
	css: function(props){
		for(var prop in props){
			this.each(function(){
				this.style[prop] = props[prop];
			});
		};
		return this
	},
	
	hasClass: function(name){
		var hasit = false;
		this.each(function(){
			var pattern = new RegExp("(^| )" + name + "( |$)");
			if( pattern.test(this.className) ){
				hasit = true;
			};
		});
		return hasit;
	},
	
	addClass: function(name){
		this.each(function(){
			if( !zarn(this).hasClass(name) ){
				this.className += " " + name;
			};
		});
		return this
	},
	
	removeClass: function(name){
		this.each(function(){
			var pattern = new RegExp("(^| )" + name + "( |$)");
			this.className = this.className.replace(pattern, "$1").replace(/ $/, "");
		});
		return this
	},
	
	getStyle: function(prop){
		var elem = this.elements[0];
		
		if( elem.style[prop] ){
				
			return elem.style[prop];
		
		}else if( elem.currentStyle ){
			return elem.currentStyle[prop];
		
		}else{
			prop = prop.replace(/{[A-Z]}/g, "-$1").toLowerCase();
			// backgroundColor = background-Color = background-color
			return document.defaultView.getComputedStyle(elem, "").getPropertyValue(prop);
		
		};
	},
	
	hide: function(){
		this.each(function(){
			
			this.style.display = "none";
		});
		return this
	},
	
	show: function(){
		this.each(function(){

		this.style.display = "";
		});
		return this
	},
	
	on: function(evt, handler){
		this.each(function(){
			this["on" + evt] = handler;
		});
		return this
	},
	
	animate: function(options){
		options = {
			duration: options.duration || 500,
			props: options.props || {},
			easing: options.easing || "easeOutCirc",
			done: options.done || function(){}
		};
		
		this.each(function(){
			
			var that = this;
			
			var startVals = {};
			for(var prop in options.props){
				startVals[prop] = parseFloat(zarn(this).getStyle(prop) || 0);
				
			}
			
			var time = 0;
			var anim = setInterval(function(){
				time += 30;
				for(var prop in options.props){	
					var newval = Math[options.easing](time, startVals[prop], options.props[prop] - startVals[prop], options.duration, 2);
					that.style[prop] = newval + "px";
				};
				
				if(time >= options.duration){
					clearInterval(anim);
					for(var prop in options.props){	
						that.style[prop] = options.props[prop] + "px";
					};
					options.done();
				};
			}, 30);
		});
		
		return this
	}
	
};

// Library utility functions
/*
	zarn.ajax({
		url: "xhr/file.php",
		type: "GET",
		success: function(response){},
		error: function(){},
		timeout: 8000
		
	zarn.ajax({
	url: "xhr/file.php"
	success: function(response){}
	});	
			
	});
*/
zarn.ajax = function(options){
	
	options = {
		url: options.url || "",
		type: options.type || "GET",
		timeout: options.timeout || 8000,
		success: options.success || function(){},
		error: options.error || function(){},
		data: options.data || {}
	};
	
	setTimeout(function(){
		if(xhr){
			xhr.abort();
		}
	}, options.timeout);
	
	
	var checkHttp = function(){
		try{
			return !xhr.status && location.protocol === "file:" || 
				(xhr.status >= 200 && xhr.status < 300) ||
				xhr.status === 304 ||
				navigator.userAgent.indexOf("Safari") >= 0 && xhr.status === "undefined"
			;
		}catch(err){};
		
		return false;
	};
	
	var parseData = function(){
		
		var ct = xhr.getResponseHeader("content-type");
		var isxml = ct && ct.indexOf("xml") >= 0;
		return isxml ? xhr.responseXML : xhr.responseText;
		
	};
	
	var serialize = function(){
		var ser = [];
		for(var key in options.data){
			ser.push( key + "=" + encodeURIComponent(options.data[key]) );
			// variable = content
		};
		return "?" + ser.join("&");
		
	};
	
	var xhr = new XMLHttpRequest();
	
	xhr.open(options.type, options.url + serialize(), true);
	
	xhr.onreadystatechange = function(){
		if( xhr.readyState === 4 ){
				
				var valid = checkHttp();
				if(valid){
					//success
					var response = parseData();
					options.success( response );
				}else{
				// fail
				options.error(xhr);
			};
			
			xhr = undefined
		};
	};
	
	xhr.send(null);
};

zarn.prototype.init.prototype = zarn.prototype;

//end of library

/*
	Ryu Easing
	----------
	Example: easing(currentTime, startValue, changeToValue, duration)
	----------
	Methods:
		linearTween
		easeInQuad
		easeOutQuad
		easeInOutQuad
		easeInCubic
		easeOutCubic
		easeInOutCubic
		easeInQuart
		easeOutQuart
		easeInOutQuart
		easeInQuint
		easeOutQuint
		easeInOutQuint
		easeInSine
		easeOutSine
		easeInOutSine
		easeInExpo
		easeOutExpo
		easeInOutExpo
		easeInCirc
		easeOutCirc
		easeInOutCirc
		easeInElastic
		easeOutElastic
		easeInOutElastic
		easeInBack
		easeOutBack
		easeInOutBack
		easeInBounce
		easeOutBounce
		easeInOutBounce	
*/
Math.linearTween=function(a,c,b,d){return b*a/d+c};Math.easeInQuad=function(a,c,b,d){return b*(a/=d)*a+c};Math.easeOutQuad=function(a,c,b,d){return-b*(a/=d)*(a-2)+c};Math.easeInOutQuad=function(a,c,b,d){return(a/=d/2)<1?b/2*a*a+c:-b/2*(--a*(a-2)-1)+c};Math.easeInCubic=function(a,c,b,d){return b*(a/=d)*a*a+c};Math.easeOutCubic=function(a,c,b,d){return b*((a=a/d-1)*a*a+1)+c};Math.easeInOutCubic=function(a,c,b,d){return(a/=d/2)<1?b/2*a*a*a+c:b/2*((a-=2)*a*a+2)+c};
Math.easeInQuart=function(a,c,b,d){return b*(a/=d)*a*a*a+c};Math.easeOutQuart=function(a,c,b,d){return-b*((a=a/d-1)*a*a*a-1)+c};Math.easeInOutQuart=function(a,c,b,d){return(a/=d/2)<1?b/2*a*a*a*a+c:-b/2*((a-=2)*a*a*a-2)+c};Math.easeInQuint=function(a,c,b,d){return b*(a/=d)*a*a*a*a+c};Math.easeOutQuint=function(a,c,b,d){return b*((a=a/d-1)*a*a*a*a+1)+c};Math.easeInOutQuint=function(a,c,b,d){return(a/=d/2)<1?b/2*a*a*a*a*a+c:b/2*((a-=2)*a*a*a*a+2)+c};
Math.easeInSine=function(a,c,b,d){return-b*Math.cos(a/d*(Math.PI/2))+b+c};Math.easeOutSine=function(a,c,b,d){return b*Math.sin(a/d*(Math.PI/2))+c};Math.easeInOutSine=function(a,c,b,d){return-b/2*(Math.cos(Math.PI*a/d)-1)+c};Math.easeInExpo=function(a,c,b,d){return a==0?c:b*Math.pow(2,10*(a/d-1))+c};Math.easeOutExpo=function(a,c,b,d){return a==d?c+b:b*(-Math.pow(2,-10*a/d)+1)+c};
Math.easeInOutExpo=function(a,c,b,d){return a==0?c:a==d?c+b:(a/=d/2)<1?b/2*Math.pow(2,10*(a-1))+c:b/2*(-Math.pow(2,-10*--a)+2)+c};Math.easeInCirc=function(a,c,b,d){return-b*(Math.sqrt(1-(a/=d)*a)-1)+c};Math.easeOutCirc=function(a,c,b,d){return b*Math.sqrt(1-(a=a/d-1)*a)+c};Math.easeInOutCirc=function(a,c,b,d){return(a/=d/2)<1?-b/2*(Math.sqrt(1-a*a)-1)+c:b/2*(Math.sqrt(1-(a-=2)*a)+1)+c};
Math.easeInElastic=function(a,c,b,d,e,f){if(a==0)return c;if((a/=d)==1)return c+b;f||(f=d*0.3);e<Math.abs(b)?(e=b,b=f/4):b=f/(2*Math.PI)*Math.asin(b/e);return-(e*Math.pow(2,10*(a-=1))*Math.sin((a*d-b)*2*Math.PI/f))+c};Math.easeOutElastic=function(a,c,b,d,e,f){if(a==0)return c;if((a/=d)==1)return c+b;f||(f=d*0.3);if(e<Math.abs(b))var e=b,g=f/4;else g=f/(2*Math.PI)*Math.asin(b/e);return e*Math.pow(2,-10*a)*Math.sin((a*d-g)*2*Math.PI/f)+b+c};
Math.easeInOutElastic=function(a,c,b,d,e,f){if(a==0)return c;if((a/=d/2)==2)return c+b;f||(f=d*0.3*1.5);if(e<Math.abs(b))var e=b,g=f/4;else g=f/(2*Math.PI)*Math.asin(b/e);return a<1?-0.5*e*Math.pow(2,10*(a-=1))*Math.sin((a*d-g)*2*Math.PI/f)+c:e*Math.pow(2,-10*(a-=1))*Math.sin((a*d-g)*2*Math.PI/f)*0.5+b+c};Math.easeInBack=function(a,c,b,d,e){e==void 0&&(e=1.70158);return b*(a/=d)*a*((e+1)*a-e)+c};Math.easeOutBack=function(a,c,b,d,e){e==void 0&&(e=1.70158);return b*((a=a/d-1)*a*((e+1)*a+e)+1)+c};
Math.easeInOutBack=function(a,c,b,d,e){e==void 0&&(e=1.70158);return(a/=d/2)<1?b/2*a*a*(((e*=1.525)+1)*a-e)+c:b/2*((a-=2)*a*(((e*=1.525)+1)*a+e)+2)+c};Math.easeInBounce=function(a,c,b,d){return b-Math.easeOutBounce(d-a,0,b,d)+c};Math.easeOutBounce=function(a,c,b,d){return(a/=d)<1/2.75?b*7.5625*a*a+c:a<2/2.75?b*(7.5625*(a-=1.5/2.75)*a+0.75)+c:a<2.5/2.75?b*(7.5625*(a-=2.25/2.75)*a+0.9375)+c:b*(7.5625*(a-=2.625/2.75)*a+0.984375)+c};
Math.easeInOutBounce=function(a,c,b,d){return a<d/2?Math.easeInBounce(a*2,0,b,d)*0.5+c:Math.easeOutBounce(a*2-d,0,b,d)*0.5+b*0.5+c};