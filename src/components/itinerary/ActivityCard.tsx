import React from 'react';
import {
  Clock,
  MapPin,
  Heart,
  RefreshCw,
  Trash2,
  ArrowUp,
  ArrowDown,
} from 'lucide-react';
import type { ItineraryActivity } from '../../types';
import { formatCurrency, formatDuration, formatDistance } from '../../utils/formatters';

interface ActivityCardProps {
  activity: ItineraryActivity;
  index: number;
  totalInDay: number;
  currency: string;
  onReplace: () => void;
  onRemove: () => void;
  onToggleFavorite: () => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
}

export const ActivityCard: React.FC<ActivityCardProps> = ({
  activity,
  index,
  totalInDay,
  currency,
  onReplace,
  onRemove,
  onToggleFavorite,
  onMoveUp,
  onMoveDown,
}) => {


  return (
    <div className="relative group rounded-2xl bg-white border border-[#F5EBDD] hover:border-[#12372A]/40 shadow-xs hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col sm:flex-row">
      {/* Activity Image & Recommended Time badge */}
      <div className="relative sm:w-48 h-40 sm:h-auto shrink-0 overflow-hidden">
        <img
          src={activity.image}
          alt={activity.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-2.5 left-2.5 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold text-white flex items-center gap-1">
          <Clock className="w-3 h-3 text-[#F28C28]" />
          <span>{activity.recommendedTime}</span>
        </div>

        {/* Favorite Heart Button */}
        <button
          type="button"
          onClick={onToggleFavorite}
          className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md transition-all"
          aria-label="Save activity as favorite"
        >
          <Heart
            className={`w-3.5 h-3.5 ${
              activity.isFavorite ? 'fill-[#F28C28] text-[#F28C28]' : 'text-white'
            }`}
          />
        </button>

        {activity.difficultyLevel && (
          <div className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded-md bg-white/90 text-[10px] font-bold text-gray-700 uppercase tracking-wider backdrop-blur-xs">
            {activity.difficultyLevel}
          </div>
        )}
      </div>

      {/* Main Content Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3 text-left">
        <div>
          <div className="flex items-start justify-between gap-2">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#F28C28] block">
                {activity.category.replace('-', ' ')}
              </span>
              <h4 className="font-serif text-base sm:text-lg font-bold text-[#12372A] leading-snug">
                {activity.title}
              </h4>
            </div>

            {/* Price Badge */}
            <div className="text-right shrink-0">
              <span className="font-bold text-sm sm:text-base text-[#12372A] block">
                {activity.estimatedCost === 0 ? 'FREE' : formatCurrency(activity.estimatedCost, currency)}
              </span>
              <span className="text-[10px] text-gray-400">per person</span>
            </div>
          </div>

          <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed mt-1.5">
            {activity.description}
          </p>
        </div>

        {/* Location & Proximity Indicators */}
        <div className="flex flex-wrap items-center gap-3 text-[11px] text-gray-500 pt-2 border-t border-gray-100">
          <div className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-gray-400" />
            <span className="truncate max-w-[140px] sm:max-w-none">{activity.location}</span>
          </div>

          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-gray-400" />
            <span>{formatDuration(activity.duration)}</span>
          </div>

          {activity.distanceFromPrevious !== undefined && activity.distanceFromPrevious > 0 && (
            <div className="text-gray-400 text-[10px]">
              • {formatDistance(activity.distanceFromPrevious)} from previous ({activity.travelTimeFromPrevious}m)
            </div>
          )}
        </div>

        {/* Action Toolbar */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-xs">
          {/* Reordering arrows */}
          <div className="flex items-center gap-1">
            {onMoveUp && index > 0 && (
              <button
                type="button"
                onClick={onMoveUp}
                className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-100 text-gray-600 transition-colors"
                title="Move earlier"
                aria-label="Move earlier"
              >
                <ArrowUp className="w-3 h-3" />
              </button>
            )}
            {onMoveDown && index < totalInDay - 1 && (
              <button
                type="button"
                onClick={onMoveDown}
                className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-100 text-gray-600 transition-colors"
                title="Move later"
                aria-label="Move later"
              >
                <ArrowDown className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Replace & Remove buttons */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onReplace}
              className="px-2.5 py-1.5 rounded-lg border border-gray-200 hover:border-[#F28C28] hover:text-[#F28C28] text-gray-700 font-semibold flex items-center gap-1 transition-colors text-[11px]"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Replace</span>
            </button>

            <button
              type="button"
              onClick={onRemove}
              className="p-1.5 rounded-lg text-gray-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
              title="Remove activity"
              aria-label="Remove activity"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
