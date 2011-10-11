(function(){
	
	var header = zarn(".dssheader");
	
	header.css({padding: "20px", border: "2px solid black"});
	
	var color =  header.getStyle("color");

	console.log(color);

	header.hide();
	
	setTimeout(function(){
		header.show();
	}, 3000);
	
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