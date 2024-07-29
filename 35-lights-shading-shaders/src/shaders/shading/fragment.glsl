uniform vec3 uColor;
uniform vec3 uAmbientLightColor;
uniform float uAmbientLightIntensity;
uniform vec3 uDirectionalLightColor;
uniform float uDirectionalLightIntensity;
uniform vec3 uPointLightColor;
uniform float uPointLightIntensity;

varying vec3 vNormal;
varying vec3 vPosition;

#include ../includes/ambientLight.glsl
#include ../includes/directionalLight.glsl
#include ../includes/pointLight.glsl




void main()
{
    vec3 normal = normalize(vNormal);
    vec3 viewDirection = normalize(vPosition - cameraPosition);
    vec3 color = uColor;

    // Light
    vec3 light = vec3(0.0);
    light += ambientLight(uAmbientLightColor, uAmbientLightIntensity);
    light += directionalLight(
        uDirectionalLightColor,       // Light color
        uDirectionalLightIntensity,   // Light intensity
        normal,                       // Normal
       vec3(0.0, 0.0, 3.0),           // Light position
       viewDirection,                 // View direction
       20.0                           // Specular power
    ); 
    light += pointLight(
        uPointLightColor,       // Light color
        uPointLightIntensity,   // Light intensity
        normal,                       // Normal
        vec3(0.0, 2.5, 0.0),           // Light position
        viewDirection,                 // View direction
        20.0,                           // Specular power
        vPosition,                   // Position
        0.25                         // Light decay
    );
    color *= light;

    // Final color
    gl_FragColor = vec4(color, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}