import { armData, bodyData, eyesData, headData } from "./indices.js";

const vertexShaderSrc = `#version 300 es
#pragma vscode_glsllint_stage: vert
uniform mat4 uModel;
uniform mat4 uView;
uniform mat4 uProjection;
layout(location=0) in vec4 aPosition;
layout(location=1) in vec4 aColor;
out vec4 vColor;
void main()
{
    vColor = aColor;
    gl_Position = uProjection * uView * uModel * aPosition;
}`;

const fragmentShaderSrc = `#version 300 es
#pragma vscode_glsllint_stage: frag
precision mediump float;
in vec4 vColor;
out vec4 fragColor;
void main()
{
    fragColor = vColor;
}`;

function resizeCanvasToDisplaySize(canvas) {
    // Lookup the size the browser is displaying the canvas in CSS pixels.
    const displayWidth  = canvas.clientWidth;
    const displayHeight = canvas.clientHeight;
   
    // Check if the canvas is not the same size.
    const needResize = canvas.width  !== displayWidth ||
                       canvas.height !== displayHeight;
   
    if (needResize) {
      // Make the canvas the same size
      canvas.width  = displayWidth;
      canvas.height = displayHeight;
    }
   
    return needResize;
  }

const gl = document.querySelector('canvas').getContext('webgl2');


const program = gl.createProgram();

const vertexShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertexShader, vertexShaderSrc);
gl.compileShader(vertexShader);
gl.attachShader(program, vertexShader);

const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragmentShader, fragmentShaderSrc);
gl.compileShader(fragmentShader);
gl.attachShader(program, fragmentShader);

gl.linkProgram(program);

if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.log(gl.getShaderInfoLog(vertexShader));
    console.log(gl.getShaderInfoLog(fragmentShader));
}

gl.useProgram(program);

gl.enable(gl.DEPTH_TEST);

resizeCanvasToDisplaySize(gl.canvas);
const vertexBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
gl.bufferData(gl.ARRAY_BUFFER, bodyData, gl.STATIC_DRAW);
gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 24, 0);
gl.vertexAttribPointer(1, 3, gl.FLOAT, false, 24, 12);
gl.enableVertexAttribArray(0);
gl.enableVertexAttribArray(1);


const modelLoc = gl.getUniformLocation(program, 'uModel');
const viewLoc = gl.getUniformLocation(program, 'uView');
const projectionLoc = gl.getUniformLocation(program, 'uProjection');

const model = mat4.create();
const view = mat4.create();
const projection = mat4.create();

//mat4.rotateZ(model, model, .1);
mat4.scale(model, model, [.6, 1, .6]);

mat4.lookAt(view, [.4,.6,.6], [0,0,0], [0,1,0]);

mat4.perspective(projection, Math.PI / 1.15, gl.canvas.width / gl.canvas.height, .01, 20);


gl.uniformMatrix4fv(viewLoc, false, view);
gl.uniformMatrix4fv(projectionLoc, false, projection);
gl.uniformMatrix4fv(modelLoc, false, model);
gl.drawArrays(gl.TRIANGLES, 0, 36);

//chest
const chestBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, chestBuffer);
//use bodydata and translate
gl.bufferData(gl.ARRAY_BUFFER, bodyData, gl.STATIC_DRAW);
gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 24, 0);
gl.vertexAttribPointer(1, 3, gl.FLOAT, false, 24, 12);
gl.enableVertexAttribArray(0);
gl.enableVertexAttribArray(1);
const chestModel = mat4.create();


//mat4.rotateZ(model, model, .1);
mat4.scale(chestModel, chestModel, [.1, .5, .6]);
mat4.translate(chestModel, chestModel, [.03, 1, 0]);
gl.uniformMatrix4fv(viewLoc, false, view);
gl.uniformMatrix4fv(projectionLoc, false, projection);
gl.uniformMatrix4fv(modelLoc, false, chestModel);
gl.drawArrays(gl.TRIANGLES, 0, 36);

//end chest

//Head
const headBuffer = gl.createBuffer();

gl.bindBuffer(gl.ARRAY_BUFFER, headBuffer);
gl.bufferData(gl.ARRAY_BUFFER, headData, gl.STATIC_DRAW);
gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 24, 0);
gl.vertexAttribPointer(1, 3, gl.FLOAT, false, 24, 12);
gl.enableVertexAttribArray(0);
gl.enableVertexAttribArray(1);

const model3 = mat4.create();
//mat4.rotateZ(model3, model3, .1);
mat4.scale(model3, model3, [.4, .25, .6]);
mat4.translate(model3, model3, [.131, 2.8, .3]);


gl.uniformMatrix4fv(viewLoc, false, view);
gl.uniformMatrix4fv(projectionLoc, false, projection);
gl.uniformMatrix4fv(modelLoc, false, model3);
gl.drawArrays(gl.TRIANGLES, 0, 36);

const eyesBuffer = gl.createBuffer();

gl.bindBuffer(gl.ARRAY_BUFFER, eyesBuffer);
gl.bufferData(gl.ARRAY_BUFFER, eyesData, gl.STATIC_DRAW);
gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 24, 0);
gl.vertexAttribPointer(1, 3, gl.FLOAT, false, 24, 12);
gl.enableVertexAttribArray(0);
gl.enableVertexAttribArray(1);

const model2 = mat4.create();
//mat4.rotateZ(model2, model2, .1);
mat4.scale(model2, model2, [.2/2, .05, .6]);
mat4.translate(model2, model2, [1.2, 14, .31]);


gl.uniformMatrix4fv(viewLoc, false, view);
gl.uniformMatrix4fv(projectionLoc, false, projection);
gl.uniformMatrix4fv(modelLoc, false, model2);
gl.drawArrays(gl.TRIANGLES, 0, 36);

///Eye 2
const eyesBuffer2 = gl.createBuffer();

gl.bindBuffer(gl.ARRAY_BUFFER, eyesBuffer);
gl.bufferData(gl.ARRAY_BUFFER, eyesData, gl.STATIC_DRAW);
gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 24, 0);
gl.vertexAttribPointer(1, 3, gl.FLOAT, false, 24, 12);
gl.enableVertexAttribArray(0);
gl.enableVertexAttribArray(1);

const model4 = mat4.create();

//mat4.rotateZ(model4, model4, .1);
mat4.scale(model4, model4, [.2/2, .05, .6]);
mat4.translate(model4, model4, [.3, 14, .31]);

gl.uniformMatrix4fv(viewLoc, false, view);
gl.uniformMatrix4fv(projectionLoc, false, projection);
gl.uniformMatrix4fv(modelLoc, false, model4);
gl.drawArrays(gl.TRIANGLES, 0, 36);

//Arm

const armBuffer = gl.createBuffer();

gl.bindBuffer(gl.ARRAY_BUFFER, armBuffer);
gl.bufferData(gl.ARRAY_BUFFER, armData, gl.STATIC_DRAW);
gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 24, 0);
gl.vertexAttribPointer(1, 3, gl.FLOAT, false, 24, 12);
gl.enableVertexAttribArray(0);
gl.enableVertexAttribArray(1);

const model5 = mat4.create();

mat4.scale(model5, model5, [.2, .05, .6]);
mat4.rotateY(model5, model5, .7);
mat4.translate(model5, model5, [1.2, 9, 1.3]);

gl.uniformMatrix4fv(viewLoc, false, view);
gl.uniformMatrix4fv(projectionLoc, false, projection);
gl.uniformMatrix4fv(modelLoc, false, model5);
gl.drawArrays(gl.TRIANGLES, 0, 36);


//Arm2

const armBuffer2 = gl.createBuffer();

gl.bindBuffer(gl.ARRAY_BUFFER, armBuffer2);
gl.bufferData(gl.ARRAY_BUFFER, armData, gl.STATIC_DRAW);
gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 24, 0);
gl.vertexAttribPointer(1, 3, gl.FLOAT, false, 24, 12);
gl.enableVertexAttribArray(0);
gl.enableVertexAttribArray(1);

const model6 = mat4.create();

mat4.scale(model6, model6, [.3, .05, .6]);
mat4.rotateY(model6, model6, -.3);
mat4.translate(model6, model6, [-1.3, 9, .5]);

gl.uniformMatrix4fv(viewLoc, false, view);
gl.uniformMatrix4fv(projectionLoc, false, projection);
gl.uniformMatrix4fv(modelLoc, false, model6);
gl.drawArrays(gl.TRIANGLES, 0, 36);
