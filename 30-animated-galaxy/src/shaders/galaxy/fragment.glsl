varying vec3 vColor;

void main() {
    //Disc
    // float strength = 1.0 - step(0.5, distance(gl_PointCoord, vec2(0.5)));

    // Diffuse point 
    // float strength = 1.0 - 2.0 * distance(gl_PointCoord, vec2(0.5));

    // Pattern 31
    // float strength = 0.15 / (distance(vec2(gl_PointCoord.x, (gl_PointCoord.y - 0.5) * 5.0 + 0.5), vec2(0.5)));
    // strength *= 0.15 / (distance(vec2(gl_PointCoord.y, (gl_PointCoord.x - 0.5) * 5.0 + 0.5), vec2(0.5)));

    // gl_FragColor = vec4(vec3(strength), 1.0);

    // Light point
    float strength = distance(gl_PointCoord, vec2(0.5));
    strength = 1.0 - strength;
    strength = pow(strength, 10.0);

    // Final color
    vec3 color = mix(vec3(0.0), vColor, strength);


    gl_FragColor = vec4(color, 1.0);
    #include <colorspace_fragment>
}