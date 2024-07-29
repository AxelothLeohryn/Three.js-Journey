uniform float uTime;
uniform sampler2D uPerlinTexture;

varying vec2 vUv;


#include ../includes/rotate2D.glsl

void main() {
    vec3 newPosition = position;

    // Twist
    float twistPerlin = texture(
        uPerlinTexture, 
        vec2(0.5, uv.y * 0.2 - uTime * 0.01)
    ).r;
    float angle = twistPerlin * 15.0;
    newPosition.xz = rotate2D(newPosition.xz, angle);

    // Wind
    vec2 windOffset = vec2(
        texture(uPerlinTexture, vec2(0.25, uTime * 0.01)).r - 0.2,
        // texture(uPerlinTexture, vec2(0.1, uTime * 0.01)).r - 1.0
        0.0
    );
    windOffset *= pow(uv.y, 2.0) * 10.0;
    newPosition.xz += windOffset;

    // Final position
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);

    // Pass the UV coordinates to the fragment shader
    vUv = uv;
}