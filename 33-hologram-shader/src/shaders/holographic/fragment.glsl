uniform float uTime;
uniform vec3 uColor;

varying vec3 vPosition;
varying vec3 vNormal;

void main() {

    // Stripes
    float stripes = (mod((vPosition.y - uTime * 0.1) * 20.0, 1.0));
    stripes = pow(stripes, 2.0);
    
    // Normalize normal
    vec3 normal = normalize(vNormal);
    if(!gl_FrontFacing) {
        normal *= -1.0;
    }

    // Fresnel
    vec3 viewDirection = normalize(vPosition - cameraPosition);
    float fresnel = dot(viewDirection, normal);
    fresnel += 1.0; // Shift to positive values (-1 , 0 , 1) to (0, 1, 2), we see 0 and 1 (dont care about 2, its in the back)

    fresnel = pow(fresnel, 2.0); // Square it to make it more visible

    // Falloff
    float falloff = smoothstep(0.8, 0.0, fresnel);

    // Holographic
    float holographic = stripes * fresnel;
    holographic += fresnel * 1.25;
    holographic *= falloff;


    // Final color
    gl_FragColor = vec4(uColor, holographic);
    #include <tonemapping_fragment>
    #include <colorspace_fragment> 
}