// Tooltip Logic Demo
// SFW1

/*
	Logic Workflow
	1) Describe end result
	2) Identify needed html targets
	3) Identify events per targets
	4) Accomplish result
*/

(function(){
	
	var tooltips = zarn(".tooltip")
	
	tooltips.on("mouseover", function(e){
		var tip = this.nextSibling;
		zarn(tip).css({
			display: "block",
			top: (e.pageY + 2) + "px",
			left: (e.pageX + 2) + "px"
			
		});
	});
	
	tooltips.on("mouseout", function(e){
			var tip = this.nextSibling;
			zarn(tip).hide();
		
	});
	
	tooltips.on("mousemove", function(e){
			var tip = this.nextSibling;
			zarn(tip).css({
				top: (e.pageY + 2) + "px",
				left: (e.pageX + 2) + "px"
			});
		
	});
	
})();