

var firstDiv = zarn("#accordion .content").elements[0];

var accHeight = zarn(firstDiv).getStyle("height");

var counter = 1;

var duration = 1500;
var time = 0;

console.log(accHeight);

firstDiv.style.height = (parseFloat(accHeight) + 50) + "px";

var anim = setInterval(function(){
	time += 30;
	
	if(time > duration){
		clearInterval(anim) //clears Intervals
		return false					
	}
	
	counter *= 1.1;
	firstDiv.style.height = (parseFloat(accHeight) + counter) + "px";
	
}, 30)

//var a = "101.1";

//parseInt(a)  turns a string into a number

//parseFloat(a) turns a string into a number and keeps the decimal