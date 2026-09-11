import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Compass, Sparkles, MapPin, CheckCircle2 } from 'lucide-react';
import { useTripStore } from '../store/useTripStore';
import { generateItineraryFromPreferences } from '../data/mockItineraries';
import { LOADING_MESSAGES } from '../utils/constants';

export const GeneratingScreen: React.FC = () => {
  const navigate = useNavigate();
  const preferences = useTripStore((state) => state.preferences);
  const setActiveItinerary = useTripStore((state) => state.setActiveItinerary);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    // Step advancement interval
    const stepInterval = setInterval(() => {
      setCurrentMessageIndex((prev) => {
        if (prev < LOADING_MESSAGES.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 850);


    // Final generation and navigate after ~4.5 seconds
    const finishTimeout = setTimeout(() => {
      const generated = generateItineraryFromPreferences(preferences);
      setActiveItinerary(generated);
      navigate('/itinerary');
    }, 4600);

    return () => {
      clearInterval(stepInterval);
      clearTimeout(finishTimeout);
    };
  }, [preferences, setActiveItinerary, navigate]);

  const progressPercent = Math.min(
    100,
    Math.round(((currentMessageIndex + 1) / LOADING_MESSAGES.length) * 100)
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#12372A] via-[#1a4d3a] to-[#0B241B] text-[#F5EBDD] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background ambient radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(242,140,40,0.15),transparent_60%)] pointer-events-none" />

      {/* Floating Travel Elements */}
      <div className="absolute top-1/4 left-1/5 w-64 h-64 rounded-full border border-white/5 pointer-events-none animate-pulse-subtle" />
      <div className="absolute bottom-1/4 right-1/5 w-96 h-96 rounded-full border border-dashed border-[#F28C28]/10 pointer-events-none" />

      <div className="max-w-md w-full text-center space-y-8 relative z-10">
        {/* Animated Compass Core */}
        <div className="relative mx-auto w-24 h-24 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center shadow-2xl">
          <Compass className="w-12 h-12 text-[#F28C28] animate-spin" style={{ animationDuration: '6s' }} />
          <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#A8C3A0] flex items-center justify-center">
            <Sparkles className="w-3 h-3 text-[#12372A]" />
          </div>
        </div>

        {/* Destination Target */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/30 border border-white/10 text-xs text-[#F28C28]">
            <MapPin className="w-3.5 h-3.5" />
            <span>Target: {preferences.destination || 'Bali'}, {preferences.destinationCountry || 'Indonesia'}</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Synthesizing Your Custom Plan
          </h2>
          <p className="text-xs text-[#F5EBDD]/70 max-w-sm mx-auto leading-relaxed">
            Balancing your {preferences.budget.category} budget, transit distances, and local hidden gems...
          </p>
        </div>

        {/* Active Stage Animated Message */}
        <div className="p-5 rounded-2xl bg-black/30 backdrop-blur-md border border-white/10 space-y-4 shadow-xl">
          <div className="flex items-center justify-center gap-3">
            <span className="text-2xl animate-bounce">
              {LOADING_MESSAGES[currentMessageIndex].icon}
            </span>
            <span className="text-sm font-bold text-white transition-all duration-300">
              {LOADING_MESSAGES[currentMessageIndex].text}...
            </span>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-[#F28C28] to-[#f5a054] h-full transition-all duration-500 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[11px] text-[#F5EBDD]/60 font-mono">
            <span>Stage {currentMessageIndex + 1} of {LOADING_MESSAGES.length}</span>
            <span>{progressPercent}% Complete</span>
          </div>
        </div>

        {/* Completed steps checklist */}
        <div className="space-y-1.5 text-left max-w-xs mx-auto">
          {LOADING_MESSAGES.slice(0, currentMessageIndex).map((msg, i) => (
            <div key={i} className="flex items-center gap-2 text-xs text-[#A8C3A0] animate-in fade-in">
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-emerald-400" />
              <span className="truncate">{msg.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
