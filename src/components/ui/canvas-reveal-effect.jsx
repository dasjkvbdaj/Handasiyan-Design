// src/components/ui/canvas-reveal-effect.jsx
import React, { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

export const CanvasRevealEffect = ({
  animationSpeed = 3,
  opacities = [0.05, 0.05, 0.05, 0.1, 0.1, 0.1, 0.15, 0.15, 0.15, 0.2],
  colors = [[255, 255, 255]],
  dotSize = 4,
  reverse = false,
}) => {
  return (
    <div className="absolute inset-0 w-full h-full bg-transparent pointer-events-none z-0">
      <Canvas
        camera={{ position: [0, 0, 1] }}
        gl={{ antialias: false, alpha: true }}
      >
        <DotMatrix
          colors={colors}
          dotSize={dotSize}
          opacities={opacities}
          animationSpeed={animationSpeed}
          reverse={reverse}
        />
      </Canvas>
    </div>
  );
};

const DotMatrix = ({ colors, opacities, animationSpeed, dotSize, reverse }) => {
  const uniforms = useMemo(() => {
    let colorsArray = [colors[0], colors[0], colors[0], colors[0], colors[0], colors[0]];
    if (colors.length === 2) {
      colorsArray = [colors[0], colors[0], colors[0], colors[1], colors[1], colors[1]];
    } else if (colors.length === 3) {
      colorsArray = [colors[0], colors[0], colors[1], colors[1], colors[2], colors[2]];
    }
    return {
      u_colors: {
        value: colorsArray.map((color) => [color[0] / 255, color[1] / 255, color[2] / 255]),
      },
      u_opacities: {
        value: opacities,
      },
      u_total_size: {
        value: window.innerWidth < 768 ? 6.0 : 8.0,
      },
      u_dot_size: {
        value: dotSize,
      },
      u_time: {
        value: 0,
      },
      u_resolution: {
        value: [window.innerWidth, window.innerHeight],
      },
    };
  }, [colors, opacities, dotSize]);

  const materialRef = useRef();

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.u_time.value = clock.getElapsedTime() * animationSpeed;
      materialRef.current.uniforms.u_resolution.value = [window.innerWidth, window.innerHeight];
    }
  });

  const shader = reverse
    ? `
      float animation_speed_factor = 1.0;
      float intro_offset = distance(u_resolution / 2.0 / u_total_size, st2) * 0.01 + (random(st2) * 0.15);
      // reversed: fade out
      opacity *= 1.0 - step(u_time * animation_speed_factor, intro_offset + 0.1);
    `
    : `
      float animation_speed_factor = 1.0;
      float intro_offset = distance(u_resolution / 2.0 / u_total_size, st2) * 0.01 + (random(st2) * 0.15);
      opacity *= step(intro_offset, u_time * animation_speed_factor);
      opacity *= clamp((1.0 - step(intro_offset + 0.1, u_time * animation_speed_factor)) * 1.25, 1.0, 1.25);
    `;

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        transparent
        uniforms={uniforms}
        vertexShader={`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          varying vec2 vUv;
          uniform vec2 u_resolution;
          uniform float u_time;
          uniform vec3 u_colors[6];
          uniform float u_opacities[10];
          uniform float u_total_size;
          uniform float u_dot_size;
          
          float random(vec2 st) {
              return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
          }

          void main() {
            vec2 st = gl_FragCoord.xy;
            vec2 st2 = vec2(int(st.x / u_total_size), int(st.y / u_total_size));
            
            vec2 p = fract(st / u_total_size) * u_total_size;
            float r = u_dot_size / 2.0;

            if (distance(p, vec2(r)) > r) {
              discard;
            }

            float color_index = floor(random(st2) * 6.0);
            vec3 color = u_colors[int(color_index)];

            float opacity_index = floor(random(st2) * 10.0);
            float opacity = u_opacities[int(opacity_index)];

            ${shader}

            gl_FragColor = vec4(color, opacity);
          }
        `}
      />
    </mesh>
  );
};
