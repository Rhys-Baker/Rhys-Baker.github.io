canvas = document.getElementById("canvas");
ctx = canvas.getContext("2d");


iterations = 10000

scale = 450
renderQuality = 2
res = scale*(2.5*renderQuality)

//draw a small rectangle at the specified point
function drawPoint(a, b){
	ctx.fillRect(
		//cartesian coords
		(((canvas.width/2)+a*scale)-0.5),
		(((canvas.height/2)+((0-b*scale)))-0.5),
		1,
		1
	);
}


function addComplex(a1, b1, a2, b2){
	//(a1+b1*i) + (a2+b2*i) ==
	//(a1+ a2) + (b1+b2)*i
	addOut=[a1+a2, b1+b2];
	return(addOut);
}

function multiplyComplex(a, b, c, d){
	//a*c + a*d + b*c - b*d
	multiplyOut=[(a*c-b*d), (a*d+b*c)];
	return(multiplyOut);
}


function calcMandel(c1, c2){
	z1=0
	z2=0

	i=0
	do{
		multiplyComplex(z1, z2, z1, z2);	
		addComplex(multiplyOut[0], multiplyOut[1], c1, c2)
		i++
		z1=addOut[0];
		z2=addOut[1];
	}
	while(i<iterations && Math.sqrt((addOut[0]*addOut[0]) + (addOut[1]*addOut[1])) != Infinity);

	if(i=iterations && Math.sqrt((addOut[0]*addOut[0]) + (addOut[1]*addOut[1])) != Infinity){
		drawPoint(c1, c2);
	}
}


async function run(){
	console.log("running");
	for(y=res; y>-(res+1); y--){
		for(x=-res; x<(res+1); x++){
			calcMandel(x/(res/10), y/(res/10));
		}
    console.log(y);
	}
	console.log("Done!");
}
