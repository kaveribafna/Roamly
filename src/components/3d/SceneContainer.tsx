import React, { Component, Suspense, type ErrorInfo, type ReactNode } from 'react';
import { Canvas } from '@react-three/fiber';
import { useTripStore } from '../../store/useTripStore';
import { TravelGlobe } from './TravelGlobe';
import { CanvasFallback } from './CanvasFallback';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class WebGLErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn('WebGL / 3D Canvas error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

interface SceneContainerProps {
  onSelectDestination?: (name: string) => void;
}

export const SceneContainer: React.FC<SceneContainerProps> = ({ onSelectDestination }) => {
  const reducedMotion = useTripStore((state) => state.reducedMotion);

  if (reducedMotion) {
    return <CanvasFallback onSelectDestination={onSelectDestination} />;
  }

  return (
    <div className="relative w-full h-[520px] md:h-[620px] rounded-3xl overflow-hidden bg-gradient-to-b from-[#12372A] via-[#1a4d3a] to-[#0d261d] shadow-2xl border border-emerald-900/30">
      <WebGLErrorBoundary fallback={<CanvasFallback onSelectDestination={onSelectDestination} />}>
        <Suspense fallback={<CanvasFallback onSelectDestination={onSelectDestination} />}>
          <Canvas
            camera={{ position: [0, 0, 7.5], fov: 45 }}
            gl={{ antialias: true, alpha: true }}
            dpr={[1, 2]}
            className="w-full h-full cursor-grab active:cursor-grabbing"
          >
            <TravelGlobe onSelectDestination={onSelectDestination} />
          </Canvas>
        </Suspense>
      </WebGLErrorBoundary>

      {/* Subtle overlay hint */}
      <div className="absolute bottom-4 right-4 pointer-events-none text-[11px] uppercase tracking-widest text-[#F5EBDD]/60 bg-black/30 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 hidden sm:block">
        Drag to rotate • Click pin to explore
      </div>
    </div>
  );
};
