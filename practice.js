const vertexShaderSrc = `#version 300 es
#pragma vscode_glsllint_stage: vert
layout(location = 1) in float aPointSize;
layout(location = 0) in vec2 aPosition;
layout(location = 2) in vec3 aColor;
out vec3 vColor;
void main()
{
    vColor = aColor;
    gl_PointSize = aPointSize;
    gl_Position = vec4(aPosition, 0.0, 1.0);
}`;

const fragmentShaderSrc = `#version 300 es
#pragma vscode_glsllint_stage: frag
precision mediump float;
in vec3 vColor;
out vec4 fragColor;
void main()
{
    fragColor = vec4(vColor, 1.0);
}`;


const gl = document.querySelector('canvas').getContext('webgl2');

const program  = gl.createProgram();

const vertextShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertextShader, vertexShaderSrc);
gl.compileShader(vertextShader);
gl.attachShader(program, vertextShader);

const fragShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragShader, fragmentShaderSrc);
gl.compileShader(fragShader);
gl.attachShader(program, fragShader);

gl.linkProgram(program);

if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.log(gl.getShaderInfoLog(vertexShader));
    console.log(gl.getShaderInfoLog(fragmentShader));
}
gl.useProgram(program);

const data = new Float32Array([
    0, 1,          100,        1,0,0,
    -1,-1,           32,        0,1,0,
     1,-1,           50,        0,0,1,  
]);

gl.enableVertexAttribArray(0);
gl.enableVertexAttribArray(1);
gl.enableVertexAttribArray(2);

const vertexBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);

gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 6*4, 0);
gl.vertexAttribPointer(1, 1, gl.FLOAT, false, 6*4, 2*4);
gl.vertexAttribPointer(2, 3, gl.FLOAT, false, 6*4, 3*4);

gl.drawArrays(gl.LINE_LOOP, 0, 3);