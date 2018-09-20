window.onload = function() {
	createCacheCanvas();
	createCanvas();

	console.log(window.innerWidth);

	window.requestAnimationFrame(draw);
};

const gradientWidth = window.innerWidth * 6;
const gradientHeight = window.innerHeight;

var cachedGradient;
function createCacheCanvas() {
	cachedGradient = document.createElement('canvas');
	cachedGradient.width = gradientWidth;
	cachedGradient.height = gradientHeight;

	var cCtx = cachedGradient.getContext('2d');
	var grd = cCtx.createLinearGradient(0, 0, gradientWidth, 0);
	grd.addColorStop(0, "#0084ff");
	grd.addColorStop(0.5, "#733cc8");
	grd.addColorStop(1, "#3ea5c8");

	cCtx.fillStyle=grd;
	cCtx.fillRect(0 ,0 ,gradientWidth, gradientHeight);
}

function createCanvas() {
	var backgroundCanvas = document.createElement('canvas');
	backgroundCanvas.id = 'backgroundCanvas';
	backgroundCanvas.height = window.innerHeight;
	backgroundCanvas.width = window.innerWidth;

	backgroundCanvas.style.position = 'fixed';
	backgroundCanvas.style.zIndex = '-1';
	backgroundCanvas.style.top = '0px';
	backgroundCanvas.style.left = '0px';

	document.body.appendChild(backgroundCanvas);
}

var goRight = true;
var x = 0;

function draw() {
	var ctx = document.getElementById('backgroundCanvas').getContext('2d');

	ctx.drawImage(
		cachedGradient, // Image
		x,             // The x coordinate where to start clipping
		0,             // The y coordinate where to start clipping
		window.innerWidth,         // Width of clipped image
		gradientHeight,        // Height of clipped image
		0,              // x coord to place image
		0,              // y coord to place image
		window.innerWidth,          // width of image to use
		window.innerHeight          // height of image to use
	);

	x += goRight ? 10 : -10;
	if (x > gradientWidth || x < 0) {
		goRight = !goRight
	}

	window.requestAnimationFrame(draw);
}