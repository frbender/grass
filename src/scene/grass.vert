uniform float time;

varying vec2 vUv;
/*varying vec3 fNormal;*/

#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
    #include <uv_vertex>
    #include <uv2_vertex>
    #include <color_vertex>
    #if defined (USE_ENVMAP) || defined (USE_SKINNING)
    #include <beginnormal_vertex>
    #include <morphnormal_vertex>
    #include <skinbase_vertex>
    #include <skinnormal_vertex>
    #include <defaultnormal_vertex>
    #endif
    #include <begin_vertex>
    #include <morphtarget_vertex>
    #include <skinning_vertex>

    #ifdef USE_INSTANCING
    float windStrength = 0.4f;
    float windDirection = 1.0f;
    float windX = sin(windDirection) * windStrength * 1.f * time;
    float windZ = cos(windDirection) * windStrength * 1.f * time;

    vec3 iPos = vec3(instanceMatrix[3][0], instanceMatrix[3][1], instanceMatrix[3][2]);
    vec3 wPos = vec3(modelMatrix[3][0], modelMatrix[3][1], modelMatrix[3][2]) + iPos;
    float rotation = clamp(0.f, .6f,pow(cnoise(vec3(wPos.x*0.3 + windX, wPos.z*0.3 + windZ, time * 0.2f)), 1.5f));
    float rotationZ = cnoise(vec3(wPos.x, wPos.z, 0.0f)*1000.f)*0.2f;
    float scale = cnoise(vec3(wPos.x, wPos.z, 0.0f)*1.0f) * 0.5 + 0.8;
    float scale_2 = pow(cnoise(vec3(wPos.x, wPos.z, 0.0f)*1000.0f), 2.0f);
    vec4 mvPosition = vec4((scale_2+scale)*transformed, 1.0);
    mat4 rotationMatrix = rotateAroundAxis(vec3(1.f, 0.f, 0.f), rotation) * rotateAroundAxis(vec3(0.f, 0.f, 1.f), rotationZ);
    mvPosition = rotationMatrix * mvPosition;
    mat4 newModelViewMatrix = modelViewMatrix * instanceMatrix;
    #else
    vec4 mvPosition = vec4(transformed, 1.0);
    mat4 newModelViewMatrix = modelViewMatrix;
    #endif
    newModelViewMatrix[0][0] = 1.f;
    newModelViewMatrix[0][1] = 0.f;
    newModelViewMatrix[0][2] = 0.f;
    newModelViewMatrix[1][0] = 0.f;
    newModelViewMatrix[1][1] = 1.f;
    newModelViewMatrix[1][2] = 0.f;
    newModelViewMatrix[2][0] = 0.f;
    newModelViewMatrix[2][1] = 0.f;
    newModelViewMatrix[2][2] = 1.f;
    mvPosition = newModelViewMatrix * mvPosition;
    gl_Position = projectionMatrix * mvPosition;
    vUv = uv;

    #include <logdepthbuf_vertex>
    #include <clipping_planes_vertex>
    #include <worldpos_vertex>
    #include <envmap_vertex>
    #include <fog_vertex>
}

/*
void main()
{
    vec3 iPos = vec3(instanceMatrix[3][0],instanceMatrix[3][1],instanceMatrix[3][2]);
    vec3 wPos = vec3(modelMatrix[3][0],modelMatrix[3][1],modelMatrix[3][2]) + iPos;

    float rotation = cnoise(vec3(iPos.x*10.0f, iPos.z*10.0f, 0.0f));
    rotation = cnoise(vec3(wPos.x, wPos.z + time, 0.0f)) + 1.0;
    mat4 rotationMatrix = rotateAroundAxis(vec3(1.f,0.f,0.f), rotation);
    fUv = uv;
    fNormal = viewMatrix * modelMatrix * vec4(0.f, 0.f, 1.f, 0.f);
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * instanceMatrix * rotationMatrix * vec4(position, 1.0);
}
*/