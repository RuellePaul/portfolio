export default `precision highp float;

varying vec2 vUv;
varying vec3 v_position;
uniform float isDark;
uniform float lines;

void main() {
    vec3 fdx = vec3(dFdx(v_position.x), dFdx(v_position.y), dFdx(v_position.z));
    vec3 fdy = vec3(dFdy(v_position.x), dFdy(v_position.y), dFdy(v_position.z));
    float xVal = max(0., distance(mod(vUv.x * 80., 1.), 0.5) - 0.48 + (10. * dFdy(v_position.y)));
    float yVal = max(0., distance(mod((1. - vUv.y) * (80. + 80. * lines), 1.), 0.5) - 0.48 + (40. * dFdy(v_position.y)));
    float white = min(1., sign(xVal) + sign(yVal));
    vec3 N = normalize(cross(fdx, fdy));
    gl_FragColor = vec4(vec3(white) * isDark, min(1., 3. - (lines) * 3.)); //mix(vec4( vec3(white), 1. ), vec4(N, 1.0), 0.5);//vec4( vec3(white), 1. );
}
`;
