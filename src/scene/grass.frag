#ifndef FLAT_SHADED
varying vec3 vNormal;
#endif

#define USE_UV

#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

uniform vec3 colorTop;
uniform vec3 colorBottom;

void main()
{
    vec3 color = mix(colorTop, colorBottom, 1.0f-vUv.y);
    gl_FragColor = vec4(color, 1.0);
}
