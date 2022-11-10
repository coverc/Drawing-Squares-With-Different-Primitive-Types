
// some globals
var gl;

var theta = 0.0;
var thetaLoc, colorLoc;
var numSquare = 0;
var delay = 100;
var direction = true;
var vBuffer, cBuffer;
var program;
var vertices = [];
var vcolors = [];
var color_vals = [Math.random(), Math.random(), Math.random(), 1.];
var color_vals2 = [Math.random(), Math.random(), Math.random(), 1.];
var theta2=0.0;
var counter = 0;
var max_prims = 200, num_triangles = 0;
var offsetJump=0;
var offsetColor=0;
var col = [];
var verticesStrip = [];
var vcolorsstrip = [];
var colstrip = [];
var verticesFan = [];
var vcolorsfan = [];
var colfan = [];
var offsetJumpStrip;
var offsetJumpFan;
var buttonStrip;
var buttonFan;
var buttonTri;
var TriOnOff = false;
var StripOnOff = false;
var FanOnOff = false;
var numTriangleStrip = 0;
var numTriangleFan = 0;


function keydownEvent(event) {
switch (event.key) {
case '1':
TriOnOff = !TriOnOff;
console.log("Yes1");
break;
case '2':
StripOnOff = !StripOnOff;
console.log("Yes2");
break;
case '3':
FanOnOff = !FanOnOff;
console.log("Yes3");
break;
}
}

window.onload = function init() {

    buttonStrip = document.getElementById("trianglestrip");
    buttonFan = document.getElementById("trianglefan");
    buttonTri = document.getElementById("triangles");
    /*window.addEventListener("keydown", function() {
    switch (event.keydown) {
    case 1:
    TriOnOff = !TriOnOff;
    break;
    case 2:
    StripOnOff = !StripOnOff;
    break;
    case 3:
    FanOnOff = !FanOnOff;
    break;
    }
    });
*/
 document.addEventListener("keydown", keydownEvent);

/*window.onkeydown = function(event) {
var key = String.fromCharCode(event.keyCode);
switch(key) {
case '1':
TriOnOff = !TriOnOff;
console.log("Yes");
break;
case '2':
StripOnOff = !StripOnOff;
break;
case '3':
FanOnOff = !FanOnOff;
break;
}
}*/
	// get the canvas handle from the document's DOM
    var canvas = document.getElementById( "gl-canvas" );
    
	// initialize webgl
    gl = WebGLUtils.setupWebGL( canvas );

	// check for errors
    if ( !gl ) { 
		alert( "WebGL isn't available" ); 
	}

    // set up a viewing surface to display your image
    gl.viewport( 0, 0, canvas.width, canvas.height );

    gl.clearColor( 0.5, 0.5, 0.5, 1.0 );

    //  Load shaders -- all work done in init_shaders.js
    program = initShaders( gl, "vertex-shader", "fragment-shader" );

	// make this the current shader program
    gl.useProgram( program );

    thetaLoc = gl.getUniformLocation( program, "theta" );

	// we are also going manipulate the vertex color, so get its location
	colorLoc = gl.getUniformLocation(program, "vertColor");

	// set an initial color for all vertices
	gl.uniform4fv (colorLoc, [1., 0., 0., 1.])

	// create a vertex buffer - this will hold all vertices
    vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, 300 * 6 * 2 * 4, gl.STATIC_DRAW);
	// create a vertex buffer
    cBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, 300 * 6 * 4 * 4, gl.STATIC_DRAW);

    vBufferStrip = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBufferStrip);
    gl.bufferData(gl.ARRAY_BUFFER, 300 * 2 * 4 * 4, gl.STATIC_DRAW);

    cBufferStrip = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBufferStrip);
    gl.bufferData(gl.ARRAY_BUFFER, 300 * 4 * 4 * 4, gl.STATIC_DRAW);

    vBufferFan = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBufferFan);
    gl.bufferData(gl.ARRAY_BUFFER, 300 * 2 * 4 * 4, gl.STATIC_DRAW);

    cBufferFan = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBufferFan);
    gl.bufferData(gl.ARRAY_BUFFER, 300 * 4 * 4 * 4, gl.STATIC_DRAW);

    render();

};



function updateVertices() {

    var x = 0;
    var y = 0;
	vertices=[];
	vcolors = [];
	col = [];

	var z = Math.random();
	var y = Math.random() * (1-(-1)) + (-1);
	var x = Math.random() * (1-(-1)) + (-1);


	if (z<=0.33) {
    vertices.push([ x - 0.03 , y + 0.03]);
	vertices.push([ x - 0.03 , y - 0.03]);
	vertices.push([ x + 0.03 , y - 0.03]);

	// triangle 2
	vertices.push([ x - 0.03 , y + 0.03]);
	vertices.push([ x + 0.03 , y - 0.03]);
	vertices.push([ x + 0.03 , y + 0.03]);
}
else if (z>=0.34 && z <=0.67) {
	vertices.push([ x - 0.05 , y + 0.05]);
    vertices.push([ x - 0.05 , y - 0.05]);
    vertices.push([ x + 0.05 , y - 0.05]);

    	// triangle 2
    vertices.push([ x - 0.05 , y + 0.05]);
    vertices.push([ x + 0.05 , y - 0.05]);
    vertices.push([ x + 0.05 , y + 0.05 ]);
}
else if (z>=0.68) {
    vertices.push([ x - 0.02 , y + 0.02]);
    vertices.push([ x - 0.02 , y - 0.02]);
    vertices.push([ x + 0.02 , y - 0.02]);

        	// triangle 2
    vertices.push([ x - 0.02 , y + 0.02]);
    vertices.push([ x + 0.02 , y - 0.02]);
    vertices.push([ x + 0.02 , y + 0.02]);
}

	col = [255, 0, 0, 1.];

    vcolors.push(col);
    vcolors.push(col);
    vcolors.push(col);
    vcolors.push(col);
    vcolors.push(col);
    vcolors.push(col);

	gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);

	gl.bufferSubData(gl.ARRAY_BUFFER, 3 * 2 * offsetJump * 4, flatten(vertices));

	var vPosition = gl.getAttribLocation( program, "vPosition");

	gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);

	gl.enableVertexAttribArray(vPosition);


        gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
        gl.bufferSubData(gl.ARRAY_BUFFER, offsetJump * 3 * 4 * 4 , flatten(vcolors) );
        var vColor = gl.getAttribLocation( program, "vColor");

        gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);

        	// enable the vertex attribute array
        gl.enableVertexAttribArray(vColor);

	offsetJump+=2;
	numSquare++;
}

function updateVerticesStrip() {

    var xstrip = 0;
    var ystrip = 0;

    verticesStrip = [];
    vcolorsstrip = [];
    colstrip = [];

    var ystrip = Math.random() * (1-(-1)) + (-1);
    var xstrip = Math.random() * (1-(-1)) + (-1);

    verticesStrip.push([ xstrip - 0.03 , ystrip - 0.03]);
	verticesStrip.push([ xstrip - 0.03 , ystrip + 0.03]);
	verticesStrip.push([ xstrip + 0.03 , ystrip - 0.03]);
	verticesStrip.push([ xstrip + 0.03 , ystrip + 0.03]);

    colstrip = [0, 255, 0, 1.];

    vcolorsstrip.push(colstrip);
    vcolorsstrip.push(colstrip);
    vcolorsstrip.push(colstrip);
    vcolorsstrip.push(colstrip);

    gl.bindBuffer(gl.ARRAY_BUFFER, vBufferStrip);

    gl.bufferSubData(gl.ARRAY_BUFFER, 4 * 4 * numTriangleStrip * 2, flatten(verticesStrip));

    var vPosition = gl.getAttribLocation( program, "vPosition");

  	gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);

    gl.enableVertexAttribArray(vPosition);

    gl.bindBuffer(gl.ARRAY_BUFFER, cBufferStrip);

    gl.bufferSubData(gl.ARRAY_BUFFER, numTriangleStrip * 4 * 4 * 4 , flatten(vcolorsstrip) );

    var vColor = gl.getAttribLocation( program, "vColor");

    gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);

    gl.enableVertexAttribArray(vColor);
//console.log("Works");
    offsetJumpStrip += 2;
//console.log("Reach");
    numTriangleStrip++;


}

function updateVerticesFan() {

    var xfan = 0;
    var yfan = 0;

    verticesFan = [];
    vcolorsfan = [];
    colfan = [];

    var yfan = Math.random() * (1-(-1)) + (-1);
    var xfan = Math.random() * (1-(-1)) + (-1);

    verticesFan.push([ xfan - 0.03 , yfan - 0.03]);
	verticesFan.push([ xfan - 0.03 , yfan + 0.03]);
	verticesFan.push([ xfan + 0.03 , yfan + 0.03]);
	verticesFan.push([ xfan + 0.03 , yfan - 0.03]);

    colfan = [0, 0, 255, 1.];

    vcolorsfan.push(colfan);
    vcolorsfan.push(colfan);
    vcolorsfan.push(colfan);
    vcolorsfan.push(colfan);

    gl.bindBuffer(gl.ARRAY_BUFFER, vBufferFan);

    gl.bufferSubData(gl.ARRAY_BUFFER, 4 * 4 * numTriangleFan * 2, flatten(verticesFan));

    var vPosition = gl.getAttribLocation( program, "vPosition");

  	gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);

    gl.enableVertexAttribArray(vPosition);

    gl.bindBuffer(gl.ARRAY_BUFFER, cBufferFan);

    gl.bufferSubData(gl.ARRAY_BUFFER, numTriangleFan * 4 * 4 * 4 , flatten(vcolorsfan) );

    var vColor = gl.getAttribLocation( program, "vColor");

    gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);

    gl.enableVertexAttribArray(vColor);

    offsetJumpFan += 2;
    numTriangleFan++
   // numSquare++;
}


function render() {

    gl.clear( gl.COLOR_BUFFER_BIT );

	//if (numSquare<300){

    theta += Math.random();

    buttonTri.addEventListener("click", function() {
    TriOnOff = !TriOnOff });

    if (TriOnOff == true) {
	updateVertices();
	console.log("Tri");
gl.uniform1f(thetaLoc, theta);

num_triangles = 2;
//recent changes
	gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);

    var vPosition = gl.getAttribLocation( program, "vPosition");

  	gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);

    gl.enableVertexAttribArray(vPosition);

    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
    var vColor = gl.getAttribLocation( program, "vColor");

    gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);

    gl.enableVertexAttribArray(vColor);

    gl.drawArrays(gl.TRIANGLES, 0, offsetJump*3);
}

    buttonStrip.addEventListener("click", function() {
    StripOnOff = !StripOnOff });

    if (StripOnOff == true) {
    updateVerticesStrip();
    console.log("Strip");

gl.uniform1f(thetaLoc, theta);

//num_triangles = 2;

//recent changes
    gl.bindBuffer(gl.ARRAY_BUFFER, vBufferStrip);
    var vPosition = gl.getAttribLocation( program, "vPosition");

  	gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);

    gl.enableVertexAttribArray(vPosition);

    gl.bindBuffer(gl.ARRAY_BUFFER, cBufferStrip);
    var vColor = gl.getAttribLocation( program, "vColor");

    gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);

    gl.enableVertexAttribArray(vColor);
for (i = 0; i < numTriangleStrip; i++){
gl.drawArrays(gl.TRIANGLE_STRIP, i*4 , 4);
}
    }

    buttonFan.addEventListener("click", function() {
    FanOnOff = !FanOnOff });

    if (FanOnOff == true) {
    updateVerticesFan();
    console.log("Fan");



gl.uniform1f(thetaLoc, theta);

//num_triangles = 2;

    gl.bindBuffer(gl.ARRAY_BUFFER, vBufferFan);
    var vPosition = gl.getAttribLocation( program, "vPosition");

  	gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);

    gl.enableVertexAttribArray(vPosition);

    gl.bindBuffer(gl.ARRAY_BUFFER, cBufferFan);
    var vColor = gl.getAttribLocation( program, "vColor");

    gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);

    gl.enableVertexAttribArray(vColor);
for (i = 0; i < numTriangleFan; i++){

gl.drawArrays(gl.TRIANGLE_FAN, i*4, 4);
}
    }
/*
	gl.uniform1f(thetaLoc, theta);

	num_triangles = 2;

    gl.drawArrays(gl.TRIANGLES, 0, offsetJump*3);

    gl.drawArrays(gl.TRIANGLES_STRIP, 0, offsetJump*4);

    gl.drawArrays(gl.TRIANGLES_FAN, 0, 4);
*/

//}

    setTimeout(
        function (){requestAnimFrame(render);}, delay
    );
}