import React from 'react';
import { X, Check, Clock } from 'lucide-react';
import type { ItineraryActivity } from '../../types';
import { formatCurrency, formatDuration } from '../../utils/formatters';

interface ReplaceActivityModalProps {
  currentActivity: ItineraryActivity | null;
  currency: string;
  onClose: () => void;
  onSelectReplacement: (newActivity: ItineraryActivity) => void;
}

export const ReplaceActivityModal: React.FC<ReplaceActivityModalProps> = ({
  currentActivity,
  currency,
  onClose,
  onSelectReplacement,
}) => {
  if (!currentActivity) return null;

  // Curated alternatives
  const alternatives: ItineraryActivity[] = [
    ...(currentActivity.budgetAlternative ? [currentActivity.budgetAlternative] : []),
    {
      id: 'alt-market-option',
      title: 'Local Artisan Market Crawl & Street Food Stalls',
      category: 'local-markets',
      description: 'Stroll through vibrant open-air stalls filled with tropical fruit, handwoven textiles, and fresh sizzling bites.',
      duration: 75,
      estimatedCost: 6,
      location: 'Ubud Market District',
      recommendedTime: currentActivity.recommendedTime,
      difficultyLevel: 'easy',
      image: 'https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=600&q=80',
      tags: ['Local Culture', 'Budget Friendly'],
      isFavorite: false,
    },
    {
      id: 'alt-wellness-option',
      title: 'Sound Healing & Tibetan Bowl Therapy',
      category: 'spa-wellness',
      description: 'Restorative vibrational frequency sound meditation inside a pyramid acoustic chamber.',
      duration: 60,
      estimatedCost: 25,
      location: 'Pyramids of Chi Sanctuary',
      recommendedTime: currentActivity.recommendedTime,
      difficultyLevel: 'easy',
      image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80',
      tags: ['Wellness', 'Relaxation', 'Meditation'],
      isFavorite: false,
    },
    {
      id: 'alt-cafe-option',
      title: 'Jungle Canopy Organic Coffee Tasting',
      category: 'cafes',
      description: 'Sample wild volcanic bean roasts with single-origin coconut cream while overlooking river valleys.',
      duration: 50,
      estimatedCost: 8,
      location: 'Sayan Valley Lookout',
      recommendedTime: currentActivity.recommendedTime,
      difficultyLevel: 'easy',
      image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=600&q=80',
      tags: ['Coffee', 'Scenic', 'Relaxed'],
      isFavorite: false,
    },

  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-3xl border border-[#F5EBDD] max-w-lg w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
        {/* Header */}
        <div className="p-5 border-b border-gray-100 flex items-center justify-between text-left">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#F28C28]">
              Swap Experience
            </span>
            <h3 className="font-serif text-lg font-bold text-[#12372A]">
              Choose an Alternative Activity
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Activity Reference Banner */}
        <div className="px-5 py-3 bg-[#FAFAF7] border-b border-gray-100 flex items-center gap-3 text-xs text-left">
          <span className="text-gray-400">Current:</span>
          <span className="font-bold text-[#12372A] truncate">{currentActivity.title}</span>
          <span className="text-gray-500 shrink-0">
            ({formatCurrency(currentActivity.estimatedCost, currency)})
          </span>
        </div>

        {/* Alternatives List */}
        <div className="p-5 space-y-3 overflow-y-auto max-h-[60vh] text-left">
          {alternatives.map((alt) => (
            <div
              key={alt.id}
              className="p-4 rounded-2xl border border-[#F5EBDD] hover:border-[#12372A] bg-white transition-all hover:shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 group"
            >
              <div className="flex items-start gap-3 flex-1">
                <img
                  src={alt.image}
                  alt={alt.title}
                  className="w-16 h-16 rounded-xl object-cover shrink-0"
                />
                <div className="space-y-1">
                  <span className="text-[9px] uppercase font-bold text-[#F28C28]">
                    {alt.category}
                  </span>
                  <h4 className="font-serif text-sm font-bold text-[#12372A] leading-snug">
                    {alt.title}
                  </h4>
                  <p className="text-xs text-gray-500 line-clamp-1">{alt.description}</p>
                  <div className="flex items-center gap-2 text-[10px] text-gray-400">
                    <Clock className="w-3 h-3" />
                    <span>{formatDuration(alt.duration)}</span>
                    <span>•</span>
                    <span className="font-bold text-[#12372A]">
                      {alt.estimatedCost === 0 ? 'FREE' : formatCurrency(alt.estimatedCost, currency)}
                    </span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onSelectReplacement(alt)}
                className="w-full sm:w-auto px-4 py-2 rounded-xl bg-[#12372A] hover:bg-[#1a4d3a] text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1 shrink-0"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Select</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
