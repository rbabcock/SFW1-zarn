(function(){
	
	/*var formFields = zarn("#myform input");
	
	formFields.each(function(){
		
	});
	
	formFields.css({
		"backgroundColor": "black",
		"color": "white",
		"padding": "20px"
	});
	
	zarn("div").removeClass("Testing");*/
	
	var validationSet = {
		email: {
			test: function(elem){
				var pattern = /pattern/;
				return pattern.test(elem.value);
			},
			message: "Invalid email address."
		},
		phone: {
			test: function(elem){},
			message: "Invalid email address."
		},
		text: {
			test: function(elem){},
			message: "Invalid email address."
		},
		website: {
			test: function(elem){},
			message: "Invalid email address."
		},
	};// end of validation object
	
	var regFields = zarn("#myform input");
	
	regFields.each(function(){
		this.onkeyup = function(){
			for(var key in validationSet){
				if( zarn(this).hasClass(key) ){
					if( validationSet[key].test(this) ){
						console.log("success")
					}else{
						console.log("no match")
						this.style.backgroundColor = "red";
					};
				};
			};
		};
	})
	
	
})();