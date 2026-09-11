import React from 'react';
import { Compass, MapPin, Sparkles } from 'lucide-react';

interface CanvasFallbackProps {
  onSelectDestination?: (name: string) => void;
}

export const CanvasFallback: React.FC<CanvasFallbackProps> = ({ onSelectDestination }) => {
  const pins = [
    { name: 'Bali', country: 'Indonesia', top: '58%', left: '72%', tag: 'Tropical Sanctuary' },
    { name: 'Kyoto', country: 'Japan', top: '35%', left: '78%', tag: 'Zen & Temples' },
    { name: 'Amalfi Coast', country: 'Italy', top: '38%', left: '46%', tag: 'Mediterranean Cliffs' },
    { name: 'Swiss Alps', country: 'Switzerland', top: '32%', left: '43%', tag: 'Alpine Peaks' },
    { name: 'Reykjavik', country: 'Iceland', top: '22%', left: '38%', tag: 'Aurora & Glaciers' },
    { name: 'Oaxaca', country: 'Mexico', top: '48%', left: '22%', tag: 'Artisan Flavors' },
  ];

  return (
    <div className="relative w-full h-[540px] md:h-[620px] rounded-3xl overflow-hidden bg-gradient-to-b from-[#12372A]/90 via-[#1a4d3a] to-[#0d261d] p-6 flex items-center justify-center border border-emerald-800/40 shadow-2xl">
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(46,134,171,0.25),transparent_70%)] pointer-events-none" />
      
      {/* Editorial Grid Map Outline */}
      <div className="relative w-full max-w-2xl h-96 border border-emerald-500/20 rounded-2xl bg-black/20 backdrop-blur-sm p-6 overflow-hidden">
        {/* Subtle latitude lines */}
        <div className="absolute inset-0 grid grid-rows-6 grid-cols-8 border-emerald-500/10 divide-y divide-x divide-emerald-500/10 pointer-events-none" />
        
        {/* Central Brand Compass */}
        <div className="absolute top-4 right-4 flex items-center gap-2 text-xs uppercase tracking-widest text-[#F5EBDD]/60">
          <Compass className="w-4 h-4 text-[#F28C28] animate-spin-slow" />
          <span>Roamly World Navigator</span>
        </div>

        {/* Orbit Rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full border border-emerald-400/20 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] rounded-full border border-dashed border-[#F28C28]/20 pointer-events-none" />

        {/* Destination Pins */}
        {pins.map((pin) => (
          <button
            key={pin.name}
            type="button"
            onClick={() => onSelectDestination?.(pin.name)}
            className="group absolute -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 p-2 rounded-xl bg-[#12372A]/80 hover:bg-[#F28C28] border border-white/20 hover:border-white text-left transition-all duration-300 hover:scale-105 shadow-lg focus:outline-none focus:ring-2 focus:ring-[#F28C28]"
            style={{ top: pin.top, left: pin.left }}
          >
            <div className="w-7 h-7 rounded-full bg-white/10 group-hover:bg-white flex items-center justify-center text-[#F28C28] group-hover:text-[#12372A] transition-colors">
              <MapPin className="w-4 h-4" />
            </div>
            <div className="hidden sm:block pr-1">
              <p className="text-xs font-bold text-white group-hover:text-[#12372A] leading-tight">
                {pin.name}
              </p>
              <p className="text-[10px] text-[#F5EBDD]/70 group-hover:text-[#12372A]/80">
                {pin.tag}
              </p>
            </div>
          </button>
        ))}

        {/* Badge in center */}
        <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-xs text-[#F5EBDD]">
          <Sparkles className="w-3.5 h-3.5 text-[#F28C28]" />
          <span>Interactive Destination Navigator</span>
        </div>
      </div>
    </div>
  );
};
