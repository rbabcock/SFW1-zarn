

/*var firstDiv = zarn("#accordion .content").elements[0];

var accHeight = zarn(firstDiv).getStyle("height");

var newval;

var change = 200;

var duration = 30000;
var time = 0;

console.log(accHeight);

firstDiv.style.height = (parseFloat(accHeight) + 50) + "px";

var anim = setInterval(function(){
	time += 30;
	
	if(time > duration){
		clearInterval(anim) //clears Intervals
		return false					
	}
	
	newval = Math.easeInBounce(time, parseFloat(accHeight), change, duration, 2);
	
	firstDiv.style.height = newval + "px";
	
}, 30)*/

//var a = "101.1";

//parseInt(a)  turns a string into a number

//parseFloat(a) turns a string into a number and keeps the decimal





(function(){
	
	var overlay = document.getElementById("overlay")
	
	overlay.style.display = "block";
	
	var h = parseFloat(zarn(overlay).getStyle("height"));
	
	overlay.style.top = -h + "px";
	
	zarn(overlay).animate({
		props: {top: 0}
	});
	
	overlay.onclick = function(){
		zarn(this).animate({
			props: {top: -h}
		});
		return false
	};
	
	/*var firstDiv = document.querySelectorAll(".content")[0];
	
	firstDiv.style.position = "relative";
	
	var h = parseFloat(zarn(firstDiv).getStyle("height"));
	
	zarn(firstDiv).animate({
		duration: 5000,
		props: {
			top: -h	
		}
	});*/
	
	/*zarn("#accordion .content").animate({
		duration: 2000,
		easing: "easeOutBounce",
		props: {
			height: 200,
			margin: 20,
			padding: 30
		}
	});*/
})();
