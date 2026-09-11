import React from 'react';
import {
  Calendar,
  Clock,
  Footprints,
  Home,
  PlusCircle,
  Lightbulb,
  RefreshCw,
  Star,
} from 'lucide-react';
import type { ItineraryDay, ItineraryActivity } from '../../types';
import { ActivityCard } from './ActivityCard';
import { formatCurrency, formatDate } from '../../utils/formatters';

interface DayTimelineProps {
  day: ItineraryDay;
  currency: string;
  onReplaceActivity: (activity: ItineraryActivity) => void;
  onRemoveActivity: (activityId: string) => void;
  onToggleFavorite: (activityId: string) => void;
  onMoveActivity: (fromIndex: number, toIndex: number) => void;
  onOpenAddActivity: () => void;
  onRegenerateDay: () => void;
}

export const DayTimeline: React.FC<DayTimelineProps> = ({
  day,
  currency,
  onReplaceActivity,
  onRemoveActivity,
  onToggleFavorite,
  onMoveActivity,
  onOpenAddActivity,
  onRegenerateDay,
}) => {
  return (
    <div className="space-y-6 text-left">
      {/* ─── Day Header Banner ────────────────────────────────────────────── */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-[#12372A] to-[#1A4D3A] text-white shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center justify-between sm:justify-start gap-3 text-xs font-bold text-[#F28C28] uppercase tracking-wider mb-1">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              <span>Day {day.dayNumber} • {formatDate(day.date)}</span>
            </span>
            <button
              type="button"
              onClick={onRegenerateDay}
              className="text-[10px] lowercase text-[#A8C3A0] hover:text-white flex items-center gap-1 transition-colors px-2 py-0.5 rounded-md bg-white/10"
              title="Refresh day suggestions"
            >
              <RefreshCw className="w-3 h-3" />
              <span>refresh day</span>
            </button>
          </div>
          <h3 className="font-serif text-2xl font-bold text-white">{day.title}</h3>
          <p className="text-xs text-[#F5EBDD]/80 mt-1 max-w-xl">{day.theme}</p>
        </div>


        {/* Day Metrics Quick Bar */}
        <div className="flex items-center gap-4 bg-black/20 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/10 shrink-0">
          <div>
            <span className="text-[10px] uppercase text-gray-300 block">Est. Cost</span>
            <span className="text-sm font-extrabold text-[#F5EBDD]">
              {formatCurrency(day.estimatedCost, currency)}
            </span>
          </div>
          <div className="h-6 w-px bg-white/20" />
          <div>
            <span className="text-[10px] uppercase text-gray-300 block">Walking</span>
            <span className="text-sm font-semibold text-white flex items-center gap-1">
              <Footprints className="w-3.5 h-3.5 text-[#F28C28]" />
              <span>{day.walkingDistance} km</span>
            </span>
          </div>
          <div className="h-6 w-px bg-white/20" />
          <div>
            <span className="text-[10px] uppercase text-gray-300 block">Transit</span>
            <span className="text-sm font-semibold text-white flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#A8C3A0]" />
              <span>{day.travelTime}m</span>
            </span>
          </div>
        </div>
      </div>

      {/* ─── Practical Tips Banner ────────────────────────────────────────── */}
      {day.tips && day.tips.length > 0 && (
        <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/80 flex items-start gap-3">
          <Lightbulb className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider">
              Local Insider Tips for Day {day.dayNumber}
            </h4>
            <ul className="text-xs text-amber-800 space-y-0.5 list-disc list-inside">
              {day.tips.map((tip, idx) => (
                <li key={idx}>{tip}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* ─── Activities Timeline List ─────────────────────────────────────── */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-serif text-lg font-bold text-[#12372A]">
            Scheduled Experiences ({day.activities.length})
          </h4>
          <button
            type="button"
            onClick={onOpenAddActivity}
            className="px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-[#12372A] text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            <PlusCircle className="w-3.5 h-3.5 text-[#12372A]" />
            <span>Add Custom Activity</span>
          </button>
        </div>

        {day.activities.map((act, index) => (
          <ActivityCard
            key={act.id}
            activity={act}
            index={index}
            totalInDay={day.activities.length}
            currency={currency}
            onReplace={() => onReplaceActivity(act)}
            onRemove={() => onRemoveActivity(act.id)}
            onToggleFavorite={() => onToggleFavorite(act.id)}
            onMoveUp={() => onMoveActivity(index, index - 1)}
            onMoveDown={() => onMoveActivity(index, index + 1)}
          />
        ))}
      </div>

      {/* ─── Night Accommodation Card ─────────────────────────────────────── */}
      {day.accommodation && (
        <div className="p-5 rounded-2xl bg-white border border-[#F5EBDD] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <img
              src={day.accommodation.image}
              alt={day.accommodation.name}
              className="w-16 h-16 rounded-xl object-cover shrink-0"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold text-[#F28C28] flex items-center gap-1">
                  <Home className="w-3 h-3" />
                  <span>Night Stay</span>
                </span>
                {day.accommodation.isBudgetFriendly && (
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[9px] font-extrabold uppercase">
                    Budget Value
                  </span>
                )}
              </div>
              <h4 className="font-serif text-base font-bold text-[#12372A]">
                {day.accommodation.name}
              </h4>
              <p className="text-xs text-gray-500">{day.accommodation.location}</p>
            </div>
          </div>

          <div className="text-right w-full sm:w-auto flex sm:flex-col items-center sm:items-end justify-between border-t sm:border-0 pt-2 sm:pt-0">
            <div>
              <span className="font-bold text-sm text-[#12372A]">
                {formatCurrency(day.accommodation.pricePerNight, currency)}
              </span>
              <span className="text-[10px] text-gray-400"> / night</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-amber-500 font-bold">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span>{day.accommodation.rating}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
