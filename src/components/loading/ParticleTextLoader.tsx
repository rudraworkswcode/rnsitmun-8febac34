import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, extend } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// Extend Three.js with custom materials
extend({ 
  PointsMaterial: THREE.PointsMaterial,
  BufferGeometry: THREE.BufferGeometry,
  Float32BufferAttribute: THREE.Float32BufferAttribute
});

interface ParticleSystemProps {
  onFormationComplete?: () => void;
}

const ParticleSystem: React.FC<ParticleSystemProps> = ({ onFormationComplete }) => {
  const particlesRef = useRef<THREE.Points>(null);
  const textRef = useRef<THREE.Group>(null);
  const [phase, setPhase] = useState(0); // 0: swirling, 1: forming, 2: formed, 3: breathing
  
  const particleCount = 2000;
  
  // Define text formation points manually for "RNSITMUNSoc"
  const textPoints = useMemo(() => [
    // R
    [-3.5, 0.5], [-3.5, 0.2], [-3.5, -0.1], [-3.5, -0.4], [-3.3, 0.5], [-3.1, 0.4], [-3.1, 0.1], [-3.3, 0.0], [-3.1, -0.2], [-2.9, -0.4],
    // N  
    [-2.6, 0.5], [-2.6, 0.2], [-2.6, -0.1], [-2.6, -0.4], [-2.4, 0.3], [-2.2, 0.1], [-2.0, -0.1], [-1.8, 0.5], [-1.8, 0.2], [-1.8, -0.1], [-1.8, -0.4],
    // S
    [-1.5, 0.5], [-1.3, 0.5], [-1.1, 0.4], [-1.5, 0.1], [-1.3, 0.1], [-1.1, 0.0], [-1.1, -0.2], [-1.3, -0.4], [-1.5, -0.4],
    // I
    [-0.8, 0.5], [-0.8, 0.2], [-0.8, -0.1], [-0.8, -0.4],
    // T
    [-0.5, 0.5], [-0.3, 0.5], [-0.1, 0.5], [-0.3, 0.2], [-0.3, -0.1], [-0.3, -0.4],
    // M
    [0.1, 0.5], [0.1, 0.2], [0.1, -0.1], [0.1, -0.4], [0.3, 0.3], [0.5, 0.1], [0.7, 0.3], [0.9, 0.5], [0.9, 0.2], [0.9, -0.1], [0.9, -0.4],
    // U
    [1.2, 0.5], [1.2, 0.2], [1.2, -0.1], [1.4, -0.4], [1.6, -0.4], [1.8, -0.1], [1.8, 0.2], [1.8, 0.5],
    // N
    [2.1, 0.5], [2.1, 0.2], [2.1, -0.1], [2.1, -0.4], [2.3, 0.3], [2.5, 0.1], [2.7, -0.1], [2.9, 0.5], [2.9, 0.2], [2.9, -0.1], [2.9, -0.4],
    // S
    [3.2, 0.5], [3.4, 0.5], [3.6, 0.4], [3.2, 0.1], [3.4, 0.1], [3.6, 0.0], [3.6, -0.2], [3.4, -0.4], [3.2, -0.4],
    // o
    [3.9, 0.2], [4.1, 0.3], [4.3, 0.2], [4.3, 0.0], [4.3, -0.2], [4.1, -0.3], [3.9, -0.2], [3.9, 0.0],
    // c
    [4.6, 0.2], [4.8, 0.3], [5.0, 0.2], [4.6, 0.0], [4.6, -0.2], [4.8, -0.3], [5.0, -0.2],
  ], []);
  
  // Generate particles
  const { positions, colors, velocities, targetPositions } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    const targetPositions = new Float32Array(particleCount * 3);
    
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      // Initial swirling positions
      const theta = (i / particleCount) * Math.PI * 8;
      const radius = 3 + Math.random() * 2;
      const y = (Math.random() - 0.5) * 4;
      
      positions[i3] = Math.cos(theta) * radius + (Math.random() - 0.5) * 2;
      positions[i3 + 1] = y;
      positions[i3 + 2] = Math.sin(theta) * radius + (Math.random() - 0.5) * 2;
      
      // Velocities for organic movement
      velocities[i3] = (Math.random() - 0.5) * 0.02;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.02;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.02;
      
      // Target positions (text formation)
      if (i < textPoints.length * 8) {
        // Text particles - multiple particles per text point
        const pointIndex = Math.floor(i / 8) % textPoints.length;
        const [px, py] = textPoints[pointIndex];
        const offset = (i % 8) / 8;
        targetPositions[i3] = px + (Math.random() - 0.5) * 0.15;
        targetPositions[i3 + 1] = py + (Math.random() - 0.5) * 0.15;
        targetPositions[i3 + 2] = (Math.random() - 0.5) * 0.1;
      } else {
        // Orbiting particles
        const orbitRadius = 6 + Math.random() * 2;
        const orbitAngle = (i / particleCount) * Math.PI * 2;
        targetPositions[i3] = Math.cos(orbitAngle) * orbitRadius;
        targetPositions[i3 + 1] = (Math.random() - 0.5) * 3;
        targetPositions[i3 + 2] = Math.sin(orbitAngle) * orbitRadius;
      }
      
      // Metallic gradient colors (blue, silver, violet)
      const colorChoice = Math.random();
      if (colorChoice < 0.33) {
        // Deep blue
        colors[i3] = 0.2 + Math.random() * 0.3;     // R
        colors[i3 + 1] = 0.4 + Math.random() * 0.4; // G
        colors[i3 + 2] = 0.8 + Math.random() * 0.2; // B
      } else if (colorChoice < 0.66) {
        // Silver
        const brightness = 0.6 + Math.random() * 0.4;
        colors[i3] = brightness;
        colors[i3 + 1] = brightness;
        colors[i3 + 2] = brightness + Math.random() * 0.2;
      } else {
        // Violet
        colors[i3] = 0.6 + Math.random() * 0.4;     // R
        colors[i3 + 1] = 0.3 + Math.random() * 0.3; // G
        colors[i3 + 2] = 0.8 + Math.random() * 0.2; // B
      }
    }
    
    return { positions, colors, velocities, targetPositions };
  }, [textPoints]);
  
  useFrame((state) => {
    if (!particlesRef.current) return;
    
    const time = state.clock.elapsedTime;
    const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
    
    // Phase transitions
    if (time > 3 && phase === 0) {
      setPhase(1); // Start forming
    } else if (time > 6 && phase === 1) {
      setPhase(2); // Formed
      onFormationComplete?.();
    } else if (time > 8 && phase === 2) {
      setPhase(3); // Breathing animation
    }
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      if (phase === 0) {
        // Swirling cloud motion
        const noiseX = Math.sin(time * 0.5 + i * 0.01) * 0.02;
        const noiseY = Math.cos(time * 0.3 + i * 0.015) * 0.02;
        const noiseZ = Math.sin(time * 0.7 + i * 0.008) * 0.02;
        
        positions[i3] += velocities[i3] + noiseX;
        positions[i3 + 1] += velocities[i3 + 1] + noiseY;
        positions[i3 + 2] += velocities[i3 + 2] + noiseZ;
        
        // Add swirling motion
        const centerX = 0;
        const centerZ = 0;
        const dx = positions[i3] - centerX;
        const dz = positions[i3 + 2] - centerZ;
        const distance = Math.sqrt(dx * dx + dz * dz);
        
        if (distance > 0) {
          const swirl = 0.005;
          positions[i3] += -dz * swirl;
          positions[i3 + 2] += dx * swirl;
        }
        
      } else if (phase === 1) {
        // Forming text
        const lerpFactor = Math.min((time - 3) / 3, 1);
        positions[i3] = THREE.MathUtils.lerp(positions[i3], targetPositions[i3], lerpFactor * 0.02);
        positions[i3 + 1] = THREE.MathUtils.lerp(positions[i3 + 1], targetPositions[i3 + 1], lerpFactor * 0.02);
        positions[i3 + 2] = THREE.MathUtils.lerp(positions[i3 + 2], targetPositions[i3 + 2], lerpFactor * 0.02);
        
      } else if (phase >= 2) {
        // Breathing and orbital motion
        const breathe = Math.sin(time * 2) * 0.1;
        const orbit = time * 0.3;
        
        if (i < textPoints.length * 8) {
          // Text particles - breathing
          positions[i3] = targetPositions[i3] + Math.sin(time * 3 + i * 0.1) * 0.05;
          positions[i3 + 1] = targetPositions[i3 + 1] + breathe * 0.5;
          positions[i3 + 2] = targetPositions[i3 + 2] + Math.cos(time * 2 + i * 0.1) * 0.03;
        } else {
          // Orbital particles
          const radius = 6 + Math.sin(time + i * 0.1) * 1;
          const angle = (i / particleCount) * Math.PI * 2 + orbit;
          positions[i3] = Math.cos(angle) * radius;
          positions[i3 + 1] = targetPositions[i3 + 1] + Math.sin(time * 2 + i * 0.1) * 0.5;
          positions[i3 + 2] = Math.sin(angle) * radius;
        }
      }
    }
    
    particlesRef.current.geometry.attributes.position.needsUpdate = true;
    
    // Rotate entire system slightly
    particlesRef.current.rotation.y = time * 0.1;
  });
  
  return (
    <>
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={positions}
            count={particleCount}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            array={colors}
            count={particleCount}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.05}
          vertexColors
          transparent
          opacity={0.8}
          blending={THREE.AdditiveBlending}
        />
      </points>
      
      {/* Subtle glow effect for formed text */}
      {phase >= 2 && (
        <group ref={textRef}>
          <mesh position={[0, 0, -1]}>
            <planeGeometry args={[8, 2]} />
            <meshBasicMaterial 
              color="#ffffff" 
              transparent 
              opacity={0.05}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        </group>
      )}
    </>
  );
};

interface ParticleTextLoaderProps {
  onLoadComplete?: () => void;
}

const ParticleTextLoader: React.FC<ParticleTextLoaderProps> = ({ onLoadComplete }) => {
  const [isComplete, setIsComplete] = useState(false);
  
  useEffect(() => {
    if (isComplete) {
      const timer = setTimeout(() => {
        onLoadComplete?.();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isComplete, onLoadComplete]);
  
  return (
    <div className="fixed inset-0 z-50 bg-black">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 75 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={0.5} color="#4169e1" />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#8b5cf6" />
        
        <ParticleSystem onFormationComplete={() => setIsComplete(true)} />
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          autoRotate 
          autoRotateSpeed={0.5}
        />
      </Canvas>
      
      {/* Loading progress indicator */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-center">
        <div className="text-white/60 font-roboto-mono text-sm">
          Initializing Diplomatic Interface...
        </div>
      </div>
    </div>
  );
};

export default ParticleTextLoader;