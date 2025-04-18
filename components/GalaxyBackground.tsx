"use client";
import React, { useRef, useEffect, useState, useMemo } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";

interface GalaxyLayerProps {
  scrollY: number;
  mouse: { x: number; y: number };
  layer: number;
  totalLayers: number;
  speed: number;
}

function GalaxyLayer({ scrollY, mouse, layer, totalLayers, speed }: GalaxyLayerProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const groupRef = useRef<THREE.Group>(null);
  
  // Create a circular texture for particles
  const circleTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const context = canvas.getContext('2d');
    if (context) {
      context.beginPath();
      context.arc(32, 32, 30, 0, Math.PI * 2, false);
      context.closePath();
      context.fillStyle = 'white';
      context.fill();
    }
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, []);

  // Animate rotation and position based on scroll and mouse
  useFrame(({ clock }) => {
    if (pointsRef.current && groupRef.current) {
      // Each layer has a different sensitivity
      const layerFactor = 1 + (layer / totalLayers);
      const scrollFactor = 0.0015 * layerFactor * speed;
      const mouseFactor = 0.1 * layerFactor;
      
      // Rotation based on scroll and mouse
      pointsRef.current.rotation.y = scrollY * scrollFactor + mouse.x * mouseFactor;
      pointsRef.current.rotation.x = Math.sin(scrollY * 0.0007) * 0.2 * layerFactor + mouse.y * mouseFactor;
      
      // Subtle pulsing effect
      const pulseFactor = Math.sin(clock.getElapsedTime() * 0.5 + layer) * 0.05 + 1;
      pointsRef.current.scale.set(pulseFactor, pulseFactor, pulseFactor);
      
      // Parallax effect - deeper layers move less
      const parallaxStrength = 1 - (layer / totalLayers) * 0.6;
      groupRef.current.position.x = mouse.x * 10 * parallaxStrength;
      groupRef.current.position.y = mouse.y * 10 * parallaxStrength;
    }
  });

  // Generate galaxy particles for this layer
  const galaxy = React.useMemo(() => {
    const baseStars = 800;
    const numStars = baseStars + layer * 400;
    const geometry = new THREE.BufferGeometry();
    const positions = [];
    const colors = [];
    const sizes = [];
    
    // Different distribution based on layer
    const radiusBase = 70 + layer * 20;
    const radiusSpread = 30 - layer * 5;
    
    for (let i = 0; i < numStars; i++) {
      // Spiral galaxy distribution for deeper layers
      let x, y, z;
      const arm = Math.floor(Math.random() * 3);
      const armAngle = (arm * Math.PI * 2) / 3;
      
      if (layer === totalLayers - 1) {
        // Outermost layer - more uniform distribution
        const r = Math.random() * radiusSpread + radiusBase;
        const theta = Math.random() * 2 * Math.PI;
        const phi = Math.acos(2 * Math.random() - 1);
        x = r * Math.sin(phi) * Math.cos(theta);
        y = r * Math.sin(phi) * Math.sin(theta);
        z = r * Math.cos(phi) * 0.5; // Flatter distribution
      } else {
        // Inner layers - spiral pattern
        const r = Math.pow(Math.random(), 0.5) * radiusSpread + radiusBase * 0.6;
        const theta = Math.random() * Math.PI * 4 + armAngle;
        const spiral = r * 0.02;
        x = r * Math.cos(theta + spiral);
        y = r * Math.sin(theta + spiral);
        z = (Math.random() - 0.5) * radiusSpread * 0.5;
      }
      
      positions.push(x, y, z);
      
      // Color based on layer and position
      let color;
      if (layer === 0) {
        // Inner layer - warmer colors
        color = new THREE.Color().setHSL(
          0.6 + Math.random() * 0.1, // Blue-purple
          0.8,
          0.6 + Math.random() * 0.3
        );
      } else if (layer === totalLayers - 1) {
        // Outer layer - cooler colors
        color = new THREE.Color().setHSL(
          0.55 + Math.random() * 0.1, // Cyan-blue
          0.7,
          0.7 + Math.random() * 0.3
        );
      } else {
        // Middle layers - mix
        color = new THREE.Color().setHSL(
          0.58 + Math.random() * 0.12, // Blue spectrum
          0.7 + Math.random() * 0.3,
          0.65 + Math.random() * 0.3
        );
      }
      
      colors.push(color.r, color.g, color.b);
      
      // Varied star sizes
      const size = Math.random() * 1.5 + 0.5;
      sizes.push(size);
    }
    
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
    geometry.setAttribute("size", new THREE.Float32BufferAttribute(sizes, 1));
    
    return geometry;
  }, [layer, totalLayers]);

  return (
    <group ref={groupRef}>
      <points ref={pointsRef} geometry={galaxy}>
        <pointsMaterial
          size={1.2 + layer * 0.4}
          sizeAttenuation={true}
          vertexColors={true}
          transparent={true}
          opacity={0.2 + layer * 0.1}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          map={circleTexture}
        />
      </points>

      {/* Custom shader approach would require a different implementation using
          raw shader material and proper uniforms setup. The simpler approach
          above should work for most galaxy effects. If you need custom shaders,
          consider using extend from @react-three/fiber to create a custom material. */}
    </group>
  );
}

export default function GalaxyBackground() {
  const [scrollY, setScrollY] = useState(0);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [speed, setSpeed] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<number | null>(null);

  // Track scroll
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track mouse movement (normalized to [-1, 1])
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMouse({ x, y });
    };
    
    // Smooth transition when mouse enters/leaves window
    const handleMouseLeave = () => {
      const interval = setInterval(() => {
        setMouse(prev => ({
          x: prev.x * 0.9,
          y: prev.y * 0.9
        }));
        
        if (Math.abs(mouse.x) < 0.01 && Math.abs(mouse.y) < 0.01) {
          clearInterval(interval);
          setMouse({ x: 0, y: 0 });
        }
      }, 50);
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [mouse]);

  // Adjust speed based on scroll velocity
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let lastScrollTime = Date.now();
    
    const handleScrollVelocity = () => {
      const now = Date.now();
      const delta = now - lastScrollTime;
      if (delta > 0) {
        const scrollDelta = Math.abs(window.scrollY - lastScrollY);
        const velocity = scrollDelta / delta;
        
        // Adjust speed based on scroll velocity
        setSpeed(1 + Math.min(velocity * 10, 2));
        
        // Reset speed after a delay
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }
        scrollTimeoutRef.current = setTimeout(() => setSpeed(1), 200) as unknown as number;
      }
      
      lastScrollY = window.scrollY;
      lastScrollTime = now;
    };
    
    window.addEventListener("scroll", handleScrollVelocity);
    return () => {
      window.removeEventListener("scroll", handleScrollVelocity);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  const layers = 4; // Number of parallax layers

  return (
    <div 
      ref={containerRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        pointerEvents: "none",
        opacity: 0.9,
        mixBlendMode: "screen",
        background: "linear-gradient(to bottom, #0a0a1a 0%, #0f0f2d 100%)",
      }}
    >
      <Canvas 
        camera={{ position: [0, 0, 120], fov: 70 }} 
        style={{ width: "100vw", height: "100vh" }}
        dpr={[1, 2]} // Responsive performance
      >
        <ambientLight intensity={0.1} />
        {[...Array(layers)].map((_, i) => (
          <GalaxyLayer 
            key={i} 
            scrollY={scrollY} 
            mouse={mouse} 
            layer={i} 
            totalLayers={layers} 
            speed={speed}
          />
        ))}
      </Canvas>
    </div>
  );
}
