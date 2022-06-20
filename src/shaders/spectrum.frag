varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vMatCapUV;

uniform sampler2D uMatCap;
uniform float uSpecterSize;
uniform float uTime;

void main() {

    float w = sin(vPosition.y*5. - uTime*0.1);

    float mcMask = step(w, uSpecterSize);
    
    vec4 matCap = texture2D(uMatCap, vMatCapUV);
    vec4 matCapOut = vec4(matCap.rgb, mcMask);

    float opMask = 1.-vPosition.y;
    opMask*=.15;
    opMask+=.5;
    vec4 opMaskOut = vec4(1., 1., 1., opMask);

    vec4 col = matCapOut;
    col*=opMaskOut;

    gl_FragColor = vec4(col);
}