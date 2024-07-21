let drawing = document.getElementById("drawing");
let draw = document.querySelector("#draw");

draw.addEventListener("click", () => {
    if (drawing.getContext) {
        let gl;
        try {
            gl = drawing.getContext("webgl");
        } catch (e) {
            // no op
        }

        if (gl) {
            gl.clearColor(0, 0, 0, 1);
            gl.clear(gl.COLOR_BUFFER_BIT);
            gl.viewport(0, 0, drawing.width, drawing.height);

            let buffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([0, 0.5, 1]), gl.STATIC_DRAW);

            let vertexGlsl = `
            attribute vec2 aVertexPosition;

            void main() {
                gl_Position = vec4(aVertexPosition, 0.0, 1.0);
            }`;
            let fragmentGlsl = `
            uniform vec4 uColor;

            void main() {
                gl_FragColor = uColor;
            }
            `;

            let vertexShader = gl.createShader(gl.VERTEX_SHADER);
            gl.shaderSource(vertexShader, vertexGlsl);
            gl.compileShader(vertexShader);

            let fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
            gl.shaderSource(fragmentShader, fragmentGlsl);
            gl.compileShader(fragmentShader);

            let program = gl.createProgram();
            gl.attachShader(program, vertexShader);
            gl.attachShader(program, fragmentShader);
            gl.linkProgram(program);
            gl.useProgram(program);

            let errorCode = gl.getError();
            while (errorCode) {
                console.log(errorCode);
                errorCode = gl.getError();
            }

            // gl.deleteBuffer(buffer)
        } else {
            console.log("WebGL not supported");
        }
    }
});
