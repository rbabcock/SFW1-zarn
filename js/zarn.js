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
	},
	
	removeClass: function(name){
		this.each(function(){
			var pattern = new RegExp("(^| )" + name + "( |$)");
			this.className = this.className.replace(pattern, "$1").replace(/ $/, "");
		});
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