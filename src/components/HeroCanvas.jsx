import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * HeroCanvas: Subtle, elegant 3D floating glass heart with gentle particle dust.
 * Rendered with Three.js for silky smooth 60fps performance and mouse parallax tilt.
 */
export default function HeroCanvas() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check WebGL availability
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      return; // WebGL not supported, graceful fallback
    }

    const width = container.clientWidth || 380;
    const height = container.clientHeight || 380;

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = false;
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 6;

    // Lighting for glass/crystal look
    const ambientLight = new THREE.AmbientLight(0xfff0f5, 1.4);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 2.0);
    dirLight1.position.set(5, 8, 6);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xf4b8c5, 1.8);
    dirLight2.position.set(-6, -4, 4);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0xffd1dc, 2.5, 15);
    pointLight.position.set(0, 0, 3);
    scene.add(pointLight);

    // Parametric 3D Heart Geometry using ExtrudeGeometry with a smooth bezier heart shape
    const heartShape = new THREE.Shape();
    const x = 0, y = 0;
    heartShape.moveTo(x + 0.25, y + 0.25);
    heartShape.bezierCurveTo(x + 0.25, y + 0.25, x + 0.2, y, x, y);
    heartShape.bezierCurveTo(x - 0.35, y, x - 0.35, y + 0.35, x - 0.35, y + 0.35);
    heartShape.bezierCurveTo(x - 0.35, y + 0.55, x - 0.15, y + 0.77, x + 0.25, y + 1.0);
    heartShape.bezierCurveTo(x + 0.65, y + 0.77, x + 0.85, y + 0.55, x + 0.85, y + 0.35);
    heartShape.bezierCurveTo(x + 0.85, y + 0.35, x + 0.85, y, x + 0.5, y);
    heartShape.bezierCurveTo(x + 0.35, y, x + 0.25, y + 0.25, x + 0.25, y + 0.25);

    const extrudeSettings = {
      depth: 0.3,
      bevelEnabled: true,
      bevelSegments: 16,
      steps: 4,
      bevelSize: 0.14,
      bevelThickness: 0.15,
      curveSegments: 32,
    };

    const geometry = new THREE.ExtrudeGeometry(heartShape, extrudeSettings);
    geometry.center();

    // Soft blush crystal/glass material
    const material = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(0xf6abb6),
      emissive: new THREE.Color(0x3b1c23),
      roughness: 0.12,
      metalness: 0.05,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      transmission: 0.65, // translucent glass
      ior: 1.45,
      opacity: 0.95,
      transparent: true,
    });

    const heartMesh = new THREE.Mesh(geometry, material);
    heartMesh.scale.set(1.9, 1.9, 1.9);
    heartMesh.rotation.z = Math.PI; // flip upright
    scene.add(heartMesh);

    // Floating Stardust Particles
    const particleCount = 65;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const particleScales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 6;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 5;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4;
      particleScales[i] = Math.random() * 0.08 + 0.02;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particleMaterial = new THREE.PointsMaterial({
      color: 0xfbdbe2,
      size: 0.07,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Mouse movement interaction for gentle parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event) => {
      const rect = container.getBoundingClientRect();
      const x = (event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
      const y = (event.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
      targetX = x * 0.45;
      targetY = y * 0.45;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // Animation loop
    let clock = new THREE.Clock();
    let animationFrameId;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth mouse lerp
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      // Floating gentle motion
      heartMesh.position.y = Math.sin(elapsed * 1.5) * 0.14;
      heartMesh.rotation.y = Math.sin(elapsed * 0.8) * 0.35 + mouseX;
      heartMesh.rotation.x = Math.cos(elapsed * 0.7) * 0.12 + -mouseY;

      // Drift particles gently
      particles.rotation.y = elapsed * 0.05;
      particles.rotation.x = elapsed * 0.03;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);

      geometry.dispose();
      material.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      renderer.dispose();

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 mx-auto pointer-events-none flex items-center justify-center"
      aria-hidden="true"
    >
      {/* Soft ambient backlight behind the 3D heart */}
      <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-[#F8D2DB]/60 via-[#F3C2CE]/40 to-[#E8BAC7]/30 blur-2xl -z-10 animate-pulse-subtle" />
    </div>
  );
}
