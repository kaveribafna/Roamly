import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MapPin,
  Calendar,
  Users,
  CloudSun,
  Bookmark,
  Share2,
  Sparkles,
  ChevronLeft,
  Home,
} from 'lucide-react';
import { useTripStore } from '../store/useTripStore';
import { DayTimeline } from '../components/itinerary/DayTimeline';
import { BudgetSummaryCard } from '../components/itinerary/BudgetSummaryCard';
import { MapPanel } from '../components/itinerary/MapPanel';
import { ReplaceActivityModal } from '../components/itinerary/ReplaceActivityModal';
import { AddActivityModal } from '../components/itinerary/AddActivityModal';
import { ShareExportModal } from '../components/itinerary/ShareExportModal';
import { formatDateRange, formatCurrency } from '../utils/formatters';

import type { ItineraryActivity } from '../types';

export const ItineraryPage: React.FC = () => {
  const navigate = useNavigate();
  const itinerary = useTripStore((state) => state.activeItinerary);
  const isBudgetMode = useTripStore((state) => state.isBudgetMode);
  const toggleBudgetMode = useTripStore((state) => state.toggleBudgetMode);
  const saveTrip = useTripStore((state) => state.saveTrip);
  const isTripSaved = useTripStore((state) => state.isTripSaved(itinerary.id));
  const currency = useTripStore((state) => state.currency);

  const replaceActivity = useTripStore((state) => state.replaceActivity);
  const removeActivity = useTripStore((state) => state.removeActivity);
  const addActivity = useTripStore((state) => state.addActivity);
  const toggleFavoriteActivity = useTripStore((state) => state.toggleFavoriteActivity);
  const reorderActivities = useTripStore((state) => state.reorderActivities);
  const regenerateDay = useTripStore((state) => state.regenerateDay);
  const addToast = useTripStore((state) => state.addToast);


  // Active day selection
  const [activeDayIndex, setActiveDayIndex] = useState(0);

  // Modals state
  const [replacingActivity, setReplacingActivity] = useState<{
    dayId: string;
    activity: ItineraryActivity;
  } | null>(null);

  const [isAddingActivity, setIsAddingActivity] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  // Fallback if no days
  if (!itinerary || !itinerary.days || itinerary.days.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <h2 className="font-serif text-2xl font-bold text-[#12372A] mb-2">No active itinerary found</h2>
        <p className="text-sm text-gray-500 mb-6">Create a personalized itinerary using our quick wizard.</p>
        <button
          type="button"
          onClick={() => navigate('/plan')}
          className="px-6 py-3 rounded-full bg-[#12372A] text-white font-bold text-xs uppercase"
        >
          Go to Trip Planner
        </button>
      </div>
    );
  }

  const activeDay = itinerary.days[activeDayIndex] || itinerary.days[0];

  return (
    <div className="min-h-screen bg-[#FAFAF7] pb-24">
      {/* ─── Top Editorial Hero Banner ────────────────────────────────────── */}
      <div className="relative bg-[#12372A] text-white pt-10 pb-16 px-4 sm:px-6 lg:px-8 border-b border-emerald-900/60 overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(242,140,40,0.18),transparent_60%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto space-y-6 relative z-10 text-left">
          {/* Top Breadcrumb & Actions Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-[#F5EBDD]/80">
              <button
                type="button"
                onClick={() => navigate('/plan')}
                className="hover:underline flex items-center gap-1"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Adjust Preferences</span>
              </button>
              <span>/</span>
              <span className="text-[#F28C28] font-bold capitalize">{itinerary.destination}</span>
            </div>

            {/* Actions: Save, Share, Export */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => saveTrip(itinerary)}
                className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs ${
                  isTripSaved
                    ? 'bg-emerald-700 text-white'
                    : 'bg-white/10 hover:bg-white/20 border border-white/20 text-white'
                }`}
              >
                <Bookmark className="w-3.5 h-3.5" />
                <span>{isTripSaved ? 'Trip Saved' : 'Save Trip'}</span>
              </button>

              <button
                type="button"
                onClick={() => setIsShareModalOpen(true)}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share / Export</span>
              </button>
            </div>
          </div>

          {/* Title & Metadata */}
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[11px] font-semibold text-[#F28C28]">
              <Sparkles className="w-3 h-3" />
              <span>Curated Magazine Itinerary</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              {itinerary.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs text-[#F5EBDD]/80 pt-1">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#F28C28]" />
                <span>{itinerary.destination}, {itinerary.country}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#A8C3A0]" />
                <span>{formatDateRange(itinerary.startDate, itinerary.endDate)} ({itinerary.days.length} Days)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-[#2E86AB]" />
                <span className="capitalize">{itinerary.travelers.adults} Adults • {itinerary.travelers.type}</span>
              </div>
            </div>
          </div>

          {/* Weather & Accommodation Summary Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
            <div className="p-3 rounded-2xl bg-black/30 border border-white/10 flex items-center gap-3">
              <CloudSun className="w-6 h-6 text-[#F28C28] shrink-0" />
              <div>
                <span className="text-[10px] uppercase font-bold text-gray-400 block">
                  Forecast Anticipated
                </span>
                <p className="text-xs font-semibold text-white truncate">
                  {itinerary.weatherSummary}
                </p>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-black/30 border border-white/10 flex items-center gap-3">
              <Home className="w-6 h-6 text-[#A8C3A0] shrink-0" />
              <div>
                <span className="text-[10px] uppercase font-bold text-gray-400 block">
                  Lodging Base
                </span>
                <p className="text-xs font-semibold text-white truncate">
                  {itinerary.accommodationSummary}
                </p>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-black/30 border border-white/10 flex items-center justify-between sm:col-span-2 lg:col-span-1">
              <div>
                <span className="text-[10px] uppercase font-bold text-gray-400 block">
                  Budget Mode
                </span>
                <p className="text-xs font-semibold text-[#F28C28]">
                  {isBudgetMode ? 'Low-Cost Swaps Applied' : 'Standard Selected'}
                </p>
              </div>
              <button
                type="button"
                onClick={toggleBudgetMode}
                className="px-3 py-1.5 rounded-xl bg-[#F28C28] hover:bg-[#d47112] text-white text-[11px] font-bold transition-colors"
              >
                {isBudgetMode ? 'Original Plan' : 'Cheaper Options'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Main Content Layout ─────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Day Navigation & Day Timeline (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Day Selector Navigation Pills */}
            <div className="p-3 rounded-2xl bg-white border border-[#F5EBDD] shadow-xs flex items-center gap-2 overflow-x-auto scrollbar-none">
              {itinerary.days.map((d, idx) => {
                const isActive = idx === activeDayIndex;
                return (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => setActiveDayIndex(idx)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
                      isActive
                        ? 'bg-[#12372A] text-white shadow-sm'
                        : 'bg-[#FAFAF7] hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    <span>Day {d.dayNumber}</span>
                    <span className="text-[10px] opacity-75 font-normal">
                      ({formatCurrency(d.estimatedCost, currency)})
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Active Day Timeline Component */}
            <DayTimeline
              day={activeDay}
              currency={currency}
              onReplaceActivity={(act) =>
                setReplacingActivity({ dayId: activeDay.id, activity: act })
              }
              onRemoveActivity={(actId) => removeActivity(activeDay.id, actId)}
              onToggleFavorite={(actId) => toggleFavoriteActivity(activeDay.id, actId)}
              onMoveActivity={(from, to) => reorderActivities(activeDay.id, from, to)}
              onOpenAddActivity={() => setIsAddingActivity(true)}
              onRegenerateDay={() => regenerateDay(activeDay.id)}
            />
          </div>

          {/* Right Column: Budget Breakdown & Map Viewport (5 Cols) */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
            {/* Budget Breakdown Card */}
            <BudgetSummaryCard
              totalEstimatedCost={itinerary.totalEstimatedCost}
              currency={currency}
              budgetStatus={itinerary.budgetStatus}
              budgetCategory={itinerary.budgetCategory}
              budgetBreakdown={itinerary.budgetBreakdown}
              isBudgetMode={isBudgetMode}
              onToggleBudgetMode={toggleBudgetMode}
            />

            {/* Interactive Route Map Panel */}
            <MapPanel
              day={activeDay}
              destination={itinerary.destination}
              onOptimizeRoute={() => {
                addToast('Route re-optimized: transit time reduced by 18 minutes!', 'success');
              }}
            />
          </div>
        </div>
      </div>

      {/* ─── Modals ──────────────────────────────────────────────────────── */}
      {replacingActivity && (
        <ReplaceActivityModal
          currentActivity={replacingActivity.activity}
          currency={currency}
          onClose={() => setReplacingActivity(null)}
          onSelectReplacement={(newAct) => {
            replaceActivity(replacingActivity.dayId, replacingActivity.activity.id, newAct);
            setReplacingActivity(null);
          }}
        />
      )}

      {isAddingActivity && (
        <AddActivityModal
          dayNumber={activeDay.dayNumber}
          currency={currency}
          onClose={() => setIsAddingActivity(false)}
          onAdd={(newAct) => addActivity(activeDay.id, newAct)}
        />
      )}

      {isShareModalOpen && (
        <ShareExportModal
          itinerary={itinerary}
          onClose={() => setIsShareModalOpen(false)}
        />
      )}
    </div>
  );
};
