import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Html } from '@react-three/drei';
import * as THREE from 'three';
import { MapPin, Sparkles } from 'lucide-react';

interface DestinationPin {
  id: string;
  name: string;
  country: string;
  lat: number;
  lng: number;
  tag: string;
  color: string;
}

const GLOBE_PINS: DestinationPin[] = [
  { id: 'bali', name: 'Bali', country: 'Indonesia', lat: -8.4095, lng: 115.1889, tag: 'Soulful Temples', color: '#F28C28' },
  { id: 'kyoto', name: 'Kyoto', country: 'Japan', lat: 35.0116, lng: 135.7681, tag: 'Zen & Traditions', color: '#2E86AB' },
  { id: 'amalfi', name: 'Amalfi', country: 'Italy', lat: 40.6340, lng: 14.6027, tag: 'Coastal Cliffside', color: '#F28C28' },
  { id: 'zermatt', name: 'Swiss Alps', country: 'Switzerland', lat: 45.9765, lng: 7.7491, tag: 'Alpine Glaciers', color: '#A8C3A0' },
  { id: 'reykjavik', name: 'Reykjavik', country: 'Iceland', lat: 64.1466, lng: -21.9426, tag: 'Northern Lights', color: '#2E86AB' },
  { id: 'oaxaca', name: 'Oaxaca', country: 'Mexico', lat: 17.0732, lng: -96.7266, tag: 'Artisan Heritage', color: '#F28C28' },
  { id: 'capetown', name: 'Cape Town', country: 'South Africa', lat: -33.9249, lng: 18.4241, tag: 'Ocean & Peaks', color: '#A8C3A0' },
  { id: 'queenstown', name: 'Queenstown', country: 'New Zealand', lat: -45.0312, lng: 168.6626, tag: 'Adrenaline Fjord', color: '#2E86AB' },
];

function latLngToVector3(lat: number, lng: number, radius: number): [number, number, number] {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return [x, y, z];
}

interface TravelGlobeProps {
  onSelectDestination?: (name: string) => void;
}

export const TravelGlobe: React.FC<TravelGlobeProps> = ({ onSelectDestination }) => {
  const globeGroupRef = useRef<THREE.Group>(null);
  const planeRef = useRef<THREE.Group>(null);
  const [activePin, setActivePin] = useState<string | null>(null);

  // Auto rotation
  useFrame((_, delta) => {
    if (globeGroupRef.current) {
      globeGroupRef.current.rotation.y += delta * 0.12;
    }
    if (planeRef.current) {
      planeRef.current.rotation.y += delta * 0.35;
      planeRef.current.rotation.z = Math.sin(Date.now() * 0.002) * 0.1;
    }
  });

  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight position={[10, 15, 10]} intensity={1.8} color="#FFF7ED" />
      <directionalLight position={[-10, -5, -10]} intensity={0.5} color="#2E86AB" />

      {/* Camera Controls */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={false}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={(Math.PI * 3) / 4}
      />

      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
        <group ref={globeGroupRef} scale={[1.8, 1.8, 1.8]}>
          {/* Main Earth Base Sphere */}
          <mesh>
            <sphereGeometry args={[2, 64, 64]} />
            <meshStandardMaterial
              color="#12372A"
              roughness={0.7}
              metalness={0.1}
              emissive="#0B241B"
              emissiveIntensity={0.2}
            />
          </mesh>

          {/* Glowing Atmosphere Shell */}
          <mesh scale={[1.03, 1.03, 1.03]}>
            <sphereGeometry args={[2, 48, 48]} />
            <meshStandardMaterial
              color="#48A3C9"
              transparent
              opacity={0.18}
              side={THREE.BackSide}
              blending={THREE.AdditiveBlending}
            />
          </mesh>

          {/* Latitude & Longitude Wireframe Grid */}
          <mesh scale={[1.005, 1.005, 1.005]}>
            <sphereGeometry args={[2, 24, 18]} />
            <meshBasicMaterial
              color="#A8C3A0"
              wireframe
              transparent
              opacity={0.15}
            />
          </mesh>

          {/* Destination Markers */}
          {GLOBE_PINS.map((pin) => {
            const pos = latLngToVector3(pin.lat, pin.lng, 2.05);
            const isHovered = activePin === pin.id;

            return (
              <group key={pin.id} position={pos}>
                {/* Visual Pin Base */}
                <mesh
                  onPointerOver={(e) => {
                    e.stopPropagation();
                    setActivePin(pin.id);
                  }}
                  onPointerOut={() => setActivePin(null)}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectDestination?.(pin.name);
                  }}
                >
                  <sphereGeometry args={[0.06, 16, 16]} />
                  <meshBasicMaterial color={isHovered ? '#FFFFFF' : pin.color} />
                </mesh>

                {/* Pulsing ring */}
                <mesh rotation={[Math.PI / 2, 0, 0]}>
                  <ringGeometry args={[0.08, 0.11, 24]} />
                  <meshBasicMaterial
                    color={pin.color}
                    transparent
                    opacity={isHovered ? 0.9 : 0.4}
                    side={THREE.DoubleSide}
                  />
                </mesh>

                {/* HTML Tooltip on hover/touch */}
                {isHovered && (
                  <Html distanceFactor={8} position={[0, 0.25, 0]} center>
                    <div
                      onClick={() => onSelectDestination?.(pin.name)}
                      className="cursor-pointer bg-[#12372A]/95 text-white px-3 py-2 rounded-xl shadow-2xl border border-white/20 backdrop-blur-md whitespace-nowrap transform -translate-y-2 pointer-events-auto transition-transform hover:scale-105"
                    >
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-[#F28C28]">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{pin.name}, {pin.country}</span>
                      </div>
                      <p className="text-[10px] text-[#F5EBDD]/80 mt-0.5">{pin.tag}</p>
                      <div className="mt-1 flex items-center gap-1 text-[9px] text-[#A8C3A0] underline">
                        <Sparkles className="w-2.5 h-2.5" />
                        <span>Plan itinerary →</span>
                      </div>
                    </div>
                  </Html>
                )}
              </group>
            );
          })}
        </group>

        {/* Orbiting Plane / Compass Element */}
        <group ref={planeRef}>
          <group position={[3.6, 0.4, 0]} rotation={[0, 0, -Math.PI / 8]}>
            <mesh>
              <coneGeometry args={[0.12, 0.35, 4]} />
              <meshStandardMaterial color="#F28C28" emissive="#F28C28" emissiveIntensity={0.6} />
            </mesh>
            {/* Trail */}
            <mesh position={[0, -0.25, 0]}>
              <cylinderGeometry args={[0.02, 0.05, 0.3, 8]} />
              <meshBasicMaterial color="#FFFFFF" transparent opacity={0.5} />
            </mesh>
          </group>
        </group>
      </Float>
    </>
  );
};
