uniform sampler2D uPerlinTexture;
uniform float uTime;

varying vec2 vUv;


void main() {

    // scale and animate
    vec2 smokeUv = vUv;
    smokeUv.x *= 0.5;
    smokeUv.y *= 0.5;
    smokeUv.y -= uTime * 0.1;

    //Smoke 
    float smoke = texture(uPerlinTexture, smokeUv).r;
    // Remap the value to be in the range [0.4, 1.0] and smooth it
    smoke = smoothstep(0.4, 1.0, smoke);
    // Edges
    // smoke = 1.0;
    smoke *= smoothstep(0.0, 0.2, vUv.x);
    smoke *= smoothstep(1.0, 0.8, vUv.x);

    smoke *= smoothstep(0.0, 0.1, vUv.y);
    smoke *= smoothstep(1.0, 0.4, vUv.y);



    // Final color
    gl_FragColor = vec4(0.9, 0.7, 0.6, smoke);
    // gl_FragColor = vec4(0.9, 0.7, 0.6, 1.0);


    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}