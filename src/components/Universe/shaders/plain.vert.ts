export default 'precision highp float;\nvarying vec2 vUv;\nvoid main() {\n    vUv = uv;\n    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}';
