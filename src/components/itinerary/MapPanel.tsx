import React, { useState } from 'react';
import {
  Navigation,
  Sparkles,
  ZoomIn,
  ZoomOut,
  Footprints,
} from 'lucide-react';
import type { ItineraryDay } from '../../types';

interface MapPanelProps {
  day: ItineraryDay;
  destination: string;
  onOptimizeRoute?: () => void;
}

export const MapPanel: React.FC<MapPanelProps> = ({
  day,
  destination,
  onOptimizeRoute,
}) => {
  const [selectedPin, setSelectedPin] = useState<string | null>(null);

  // Position calculations inside canvas
  const pins = day.activities.map((act, index) => {
    // Distribute pins pleasantly on the stylized map grid
    const top = 25 + ((index * 22) % 65);
    const left = 20 + ((index * 24 + (index % 2) * 15) % 60);

    return {
      ...act,
      order: index + 1,
      top: `${top}%`,
      left: `${left}%`,
    };
  });

  return (
    <div className="relative rounded-3xl overflow-hidden bg-[#12372A] border border-emerald-900/50 shadow-md text-white flex flex-col h-[420px] sm:h-[480px]">
      {/* ─── Map Header Bar ──────────────────────────────────────────────── */}
      <div className="p-4 bg-black/40 backdrop-blur-md border-b border-white/10 flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          <Navigation className="w-4 h-4 text-[#F28C28]" />
          <div>
            <h4 className="text-xs font-bold text-white leading-none">
              Route Simulation: Day {day.dayNumber}
            </h4>
            <p className="text-[10px] text-[#A8C3A0] mt-0.5">
              {destination} • {day.activities.length} Waypoints • {day.walkingDistance} km
            </p>
          </div>
        </div>

        {onOptimizeRoute && (
          <button
            type="button"
            onClick={onOptimizeRoute}
            className="px-3 py-1.5 rounded-xl bg-[#F28C28] hover:bg-[#d47112] text-white text-[11px] font-bold flex items-center gap-1.5 transition-colors shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Optimize Route</span>
          </button>
        )}
      </div>

      {/* ─── Stylized Map Canvas Viewport ─────────────────────────────────── */}
      <div className="relative flex-1 bg-gradient-to-br from-[#12372A] via-[#1a4d3a] to-[#0f2c22] overflow-hidden p-6 select-none">
        {/* Topographic Contour lines simulation */}
        <div className="absolute inset-0 bg-[radial-gradient(#2E86AB_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />

        {/* Decorative Compass Rose */}
        <div className="absolute top-4 right-4 pointer-events-none opacity-40 text-[#F5EBDD]">
          <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-[9px] font-bold font-mono">
            N
          </div>
        </div>

        {/* Route Connecting Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-[#F28C28]/60 stroke-2 stroke-dasharray-4">
          <polyline
            fill="none"
            strokeDasharray="6 4"
            points={pins
              .map((p) => {
                // Convert percentage string to approx pixel coordinate
                return `${parseInt(p.left, 10) * 4.5},${parseInt(p.top, 10) * 3.8}`;
              })
              .join(' ')}
          />
        </svg>

        {/* Interactive Waypoint Pins */}
        {pins.map((p) => {
          const isSelected = selectedPin === p.id;
          return (
            <div
              key={p.id}
              className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-transform duration-200 hover:scale-110 z-20"
              style={{ top: p.top, left: p.left }}
              onClick={() => setSelectedPin(isSelected ? null : p.id)}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shadow-xl border-2 transition-all ${
                  isSelected
                    ? 'bg-white text-[#12372A] border-[#F28C28] scale-110 ring-4 ring-[#F28C28]/40'
                    : 'bg-[#F28C28] text-white border-white'
                }`}
              >
                {p.order}
              </div>

              {/* Pin Tooltip */}
              {isSelected && (
                <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-48 p-2.5 rounded-xl bg-black/90 text-white text-left shadow-2xl backdrop-blur-md border border-white/20 z-30 pointer-events-auto">
                  <span className="text-[9px] uppercase font-bold text-[#F28C28] block">
                    Stop {p.order} • {p.recommendedTime}
                  </span>
                  <p className="text-xs font-bold leading-tight mt-0.5">{p.title}</p>
                  <p className="text-[10px] text-gray-300 mt-1 line-clamp-1">{p.location}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ─── Map Controls Toolbar ────────────────────────────────────────── */}
      <div className="p-3 bg-black/40 backdrop-blur-md border-t border-white/10 flex items-center justify-between text-[11px] text-[#F5EBDD]/75">
        <div className="flex items-center gap-1.5">
          <Footprints className="w-3.5 h-3.5 text-[#F28C28]" />
          <span>Click any pin to inspect destination stop details</span>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            className="p-1 rounded bg-white/10 hover:bg-white/20 text-white transition-colors"
            title="Zoom in"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            className="p-1 rounded bg-white/10 hover:bg-white/20 text-white transition-colors"
            title="Zoom out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
