import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MapPin,
  Calendar,
  Users,
  Compass,
  Home,
  Wallet,
  Activity,
  Gauge,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Info,
  Check,
  Palmtree,
  Coffee,
  Waves,
  Briefcase,
} from 'lucide-react';

import { useTripStore } from '../store/useTripStore';
import {
  TRAVEL_STYLES,
  ACCOMMODATION_TYPES,
  STAYCATION_TYPES,
  ACTIVITY_TYPES,
  PACE_OPTIONS,
  CURRENCIES,
} from '../utils/constants';

import { POPULAR_DESTINATIONS } from '../data/destinations';
import { getBudgetCategory, getBudgetLabel } from '../utils/budget';
import { formatCurrency, getDaysBetween } from '../utils/formatters';
import type { TravelStyle, AccommodationType, StaycationPreference, ActivityType, TravelPace } from '../types';

const STEPS = [
  { id: 'destination', label: 'Destination', icon: MapPin },
  { id: 'dates', label: 'Dates', icon: Calendar },
  { id: 'travelers', label: 'Travelers', icon: Users },
  { id: 'styles', label: 'Style', icon: Compass },
  { id: 'stay', label: 'Stay', icon: Home },
  { id: 'staycation', label: 'Staycation', icon: Palmtree },
  { id: 'budget', label: 'Budget', icon: Wallet },
  { id: 'activities', label: 'Activities', icon: Activity },
  { id: 'pace', label: 'Pace & Extras', icon: Gauge },
  { id: 'review', label: 'Review', icon: CheckCircle },
];

export const PlannerPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const preferences = useTripStore((state) => state.preferences);
  const setPreferences = useTripStore((state) => state.setPreferences);
  const addToast = useTripStore((state) => state.addToast);

  const [destQuery, setDestQuery] = useState(preferences.destination || '');
  const [validationError, setValidationError] = useState<string | null>(null);

  // Auto duration calculation
  const tripDays = getDaysBetween(preferences.startDate, preferences.endDate) || 5;

  // Step Navigation
  const goToNextStep = () => {
    // Validate current step
    if (currentStepIndex === 0 && !preferences.destination && !destQuery) {
      setValidationError('Please select or enter a destination, or pick "I\'m flexible"');
      return;
    }
    if (currentStepIndex === 1 && (!preferences.startDate || !preferences.endDate)) {
      setValidationError('Please select both start and end dates');
      return;
    }

    setValidationError(null);
    if (currentStepIndex < STEPS.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Submit and route to generation screen
      navigate('/generating');
    }
  };

  const goToPrevStep = () => {
    setValidationError(null);
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Helper toggle functions
  const toggleTravelStyle = (id: TravelStyle) => {
    const current = preferences.travelStyles || [];
    if (current.includes(id)) {
      setPreferences({ travelStyles: current.filter((s) => s !== id) });
    } else {
      setPreferences({ travelStyles: [...current, id] });
    }
  };

  const toggleAccommodationType = (id: AccommodationType) => {
    const current = preferences.accommodationType || [];
    if (current.includes(id)) {
      setPreferences({ accommodationType: current.filter((s) => s !== id) });
    } else {
      setPreferences({ accommodationType: [...current, id] });
    }
  };

  const toggleStaycationPref = (id: StaycationPreference) => {
    const current = preferences.staycationPreferences || [];
    if (current.includes(id)) {
      setPreferences({ staycationPreferences: current.filter((s) => s !== id) });
    } else {
      setPreferences({ staycationPreferences: [...current, id] });
    }
  };

  const toggleActivity = (id: ActivityType) => {
    const current = preferences.activities || [];
    if (current.includes(id)) {
      setPreferences({ activities: current.filter((s) => s !== id) });
    } else {
      setPreferences({ activities: [...current, id] });
    }
  };

  // Inspire Me randomizer
  const handleInspireMe = () => {
    const randomDest = POPULAR_DESTINATIONS[Math.floor(Math.random() * POPULAR_DESTINATIONS.length)];
    setDestQuery(randomDest.name);
    setPreferences({
      destination: randomDest.name,
      destinationCountry: randomDest.country,
    });
    addToast(`Selected inspiring destination: ${randomDest.name}, ${randomDest.country}`, 'success');
  };

  // Dynamic budget computation
  const dailyBudget = preferences.budget.dailyBudget;
  const computedCategory = getBudgetCategory(dailyBudget);
  const totalCalc = dailyBudget * tripDays * (preferences.travelers?.adults || 1);


  return (
    <div className="min-h-screen bg-[#FAFAF7] py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header */}
        <div className="text-center space-y-2 mb-8">
          <span className="text-xs uppercase tracking-widest font-bold text-[#F28C28]">
            Trip Preference Wizard
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#12372A]">
            Design Your Personalized Journey
          </h1>
          <p className="text-xs sm:text-sm text-gray-600">
            Step {currentStepIndex + 1} of {STEPS.length}: {STEPS[currentStepIndex].label}
          </p>
        </div>

        {/* Wizard Progress Bar */}
        <div className="mb-10 bg-white p-3 rounded-2xl border border-[#F5EBDD] shadow-xs">
          <div className="flex items-center justify-between gap-1 overflow-x-auto pb-1 scrollbar-none">
            {STEPS.map((step, idx) => {
              const isDone = idx < currentStepIndex;
              const isCurrent = idx === currentStepIndex;
              const Icon = step.icon;

              return (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => {
                    if (idx < currentStepIndex) setCurrentStepIndex(idx);
                  }}
                  disabled={idx > currentStepIndex}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold whitespace-nowrap transition-all ${
                    isCurrent
                      ? 'bg-[#12372A] text-[#F5EBDD] shadow-sm'
                      : isDone
                      ? 'bg-emerald-50 text-[#12372A] hover:bg-emerald-100 cursor-pointer'
                      : 'text-gray-400 cursor-not-allowed opacity-60'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{step.label}</span>
                  {isDone && <Check className="w-3 h-3 text-emerald-600 ml-0.5" />}
                </button>
              );
            })}
          </div>
          {/* Visual Percentage Line */}
          <div className="w-full bg-gray-100 h-1.5 rounded-full mt-3 overflow-hidden">
            <div
              className="bg-[#F28C28] h-full transition-all duration-300 rounded-full"
              style={{ width: `${((currentStepIndex + 1) / STEPS.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Validation Error Banner */}
        {validationError && (
          <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center gap-2">
            <Info className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{validationError}</span>
          </div>
        )}

        {/* ─── Wizard Steps Content Box ────────────────────────────────────── */}
        <div className="bg-white rounded-3xl border border-[#F5EBDD] p-6 sm:p-10 shadow-sm min-h-[440px] flex flex-col justify-between">
          <div>
            {/* ─── STEP 1: DESTINATION ────────────────────────────────────────── */}
            {currentStepIndex === 0 && (
              <div className="space-y-6 text-left">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#12372A]">
                    Where would you like to wander?
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">
                    Enter a specific city, island, or region, or let Roamly inspire you.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#F28C28]" />
                    <input
                      type="text"
                      value={destQuery}
                      onChange={(e) => {
                        setDestQuery(e.target.value);
                        setPreferences({ destination: e.target.value });
                      }}
                      placeholder="e.g. Bali, Kyoto, Amalfi Coast, Swiss Alps..."
                      className="w-full pl-12 pr-4 py-4 rounded-2xl bg-[#FAFAF7] border border-[#F5EBDD] text-sm text-[#12372A] font-medium focus:outline-none focus:ring-2 focus:ring-[#F28C28] transition-all"
                    />
                  </div>

                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <button
                      type="button"
                      onClick={handleInspireMe}
                      className="px-4 py-2 rounded-xl bg-[#F5EBDD] hover:bg-[#E6D5BE] text-[#12372A] text-xs font-bold flex items-center gap-1.5 transition-colors"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#F28C28]" />
                      <span>Inspire Me (Random Destination)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setDestQuery('Flexible / Surprise Me');
                        setPreferences({ destination: 'Flexible / Surprise Me' });
                      }}
                      className="px-4 py-2 rounded-xl border border-gray-200 hover:border-gray-300 text-gray-700 text-xs font-semibold transition-colors"
                    >
                      I'm Flexible
                    </button>
                  </div>
                </div>

                {/* Popular Destinations Autocomplete Grid */}
                <div className="pt-4 border-t border-gray-100">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-3">
                    Popular Destinations to Pick
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {POPULAR_DESTINATIONS.map((dest) => (
                      <button
                        key={dest.id}
                        type="button"
                        onClick={() => {
                          setDestQuery(dest.name);
                          setPreferences({
                            destination: dest.name,
                            destinationCountry: dest.country,
                          });
                        }}
                        className={`p-3 rounded-xl text-left border transition-all ${
                          preferences.destination === dest.name
                            ? 'border-[#12372A] bg-emerald-50/50 shadow-xs'
                            : 'border-[#F5EBDD] bg-[#FAFAF7] hover:border-gray-300'
                        }`}
                      >
                        <p className="text-xs font-bold text-[#12372A]">{dest.name}</p>
                        <p className="text-[10px] text-gray-500">{dest.country}</p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ─── STEP 2: DATES ─────────────────────────────────────────────── */}
            {currentStepIndex === 1 && (
              <div className="space-y-6 text-left">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#12372A]">
                    When are you planning to travel?
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">
                    Select your travel window. We will optimize your day-by-day plan accordingly.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-gray-600 block">
                      Departure / Start Date
                    </label>
                    <input
                      type="date"
                      value={preferences.startDate}
                      onChange={(e) => setPreferences({ startDate: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl bg-[#FAFAF7] border border-[#F5EBDD] text-sm text-[#12372A] font-semibold focus:outline-none focus:ring-2 focus:ring-[#F28C28]"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-gray-600 block">
                      Return / End Date
                    </label>
                    <input
                      type="date"
                      value={preferences.endDate}
                      onChange={(e) => setPreferences({ endDate: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl bg-[#FAFAF7] border border-[#F5EBDD] text-sm text-[#12372A] font-semibold focus:outline-none focus:ring-2 focus:ring-[#F28C28]"
                    />
                  </div>
                </div>

                {/* Duration indicator badge */}
                <div className="p-4 rounded-2xl bg-[#F5EBDD]/40 border border-[#F5EBDD] flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-[#12372A]">Estimated Duration:</span>
                    <p className="text-sm font-extrabold text-[#F28C28]">{tripDays} Days Journey</p>
                  </div>

                  <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-gray-700">
                    <input
                      type="checkbox"
                      checked={preferences.flexibleDates}
                      onChange={(e) => setPreferences({ flexibleDates: e.target.checked })}
                      className="w-4 h-4 text-[#F28C28] rounded focus:ring-0 cursor-pointer"
                    />
                    <span>My dates are flexible (+/- 3 days)</span>
                  </label>
                </div>
              </div>
            )}

            {/* ─── STEP 3: TRAVELERS ─────────────────────────────────────────── */}
            {currentStepIndex === 2 && (
              <div className="space-y-6 text-left">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#12372A]">
                    Who is traveling with you?
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">
                    Select your companion style so we can suggest suitable accommodations and activities.
                  </p>
                </div>

                {/* Companion Presets */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { type: 'solo', label: 'Solo Wanderer', emoji: '🎒', adults: 1, children: 0 },
                    { type: 'couple', label: 'Couple / Duo', emoji: '🥂', adults: 2, children: 0 },
                    { type: 'family', label: 'Family Trip', emoji: '👨‍👩‍👧‍👦', adults: 2, children: 2 },
                    { type: 'group', label: 'Friends Group', emoji: '🎉', adults: 4, children: 0 },
                  ].map((preset) => {
                    const isSelected = preferences.travelers.type === preset.type;
                    return (
                      <button
                        key={preset.type}
                        type="button"
                        onClick={() =>
                          setPreferences({
                            travelers: {
                              type: preset.type as any,
                              adults: preset.adults,
                              children: preset.children,
                            },
                          })
                        }
                        className={`p-4 rounded-2xl border text-center transition-all ${
                          isSelected
                            ? 'bg-[#12372A] text-white border-[#12372A] shadow-sm'
                            : 'bg-[#FAFAF7] text-[#12372A] border-[#F5EBDD] hover:border-gray-300'
                        }`}
                      >
                        <div className="text-2xl mb-1.5">{preset.emoji}</div>
                        <p className="text-xs font-bold">{preset.label}</p>
                      </button>
                    );
                  })}
                </div>

                {/* Adults and Children Counter */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                  <div className="p-4 rounded-2xl bg-[#FAFAF7] border border-[#F5EBDD] flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-[#12372A]">Adults</p>
                      <p className="text-[11px] text-gray-500">Age 13+</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() =>
                          setPreferences({
                            travelers: {
                              ...preferences.travelers,
                              adults: Math.max(1, preferences.travelers.adults - 1),
                            },
                          })
                        }
                        className="w-8 h-8 rounded-full border border-gray-300 bg-white flex items-center justify-center font-bold text-gray-700 hover:bg-gray-100"
                      >
                        -
                      </button>
                      <span className="font-bold text-sm w-4 text-center">
                        {preferences.travelers.adults}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          setPreferences({
                            travelers: {
                              ...preferences.travelers,
                              adults: preferences.travelers.adults + 1,
                            },
                          })
                        }
                        className="w-8 h-8 rounded-full border border-gray-300 bg-white flex items-center justify-center font-bold text-gray-700 hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#FAFAF7] border border-[#F5EBDD] flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-[#12372A]">Children</p>
                      <p className="text-[11px] text-gray-500">Age 0–12</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() =>
                          setPreferences({
                            travelers: {
                              ...preferences.travelers,
                              children: Math.max(0, preferences.travelers.children - 1),
                            },
                          })
                        }
                        className="w-8 h-8 rounded-full border border-gray-300 bg-white flex items-center justify-center font-bold text-gray-700 hover:bg-gray-100"
                      >
                        -
                      </button>
                      <span className="font-bold text-sm w-4 text-center">
                        {preferences.travelers.children}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          setPreferences({
                            travelers: {
                              ...preferences.travelers,
                              children: preferences.travelers.children + 1,
                            },
                          })
                        }
                        className="w-8 h-8 rounded-full border border-gray-300 bg-white flex items-center justify-center font-bold text-gray-700 hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ─── STEP 4: TRAVEL STYLE ──────────────────────────────────────── */}
            {currentStepIndex === 3 && (
              <div className="space-y-6 text-left">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#12372A]">
                    Select your travel styles
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">
                    Choose one or more vibes that reflect what you want most from this trip.
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {TRAVEL_STYLES.map((style) => {
                    const isSelected = preferences.travelStyles?.includes(style.id as TravelStyle);
                    return (
                      <button
                        key={style.id}
                        type="button"
                        onClick={() => toggleTravelStyle(style.id as TravelStyle)}
                        className={`p-4 rounded-2xl border text-left transition-all flex items-center justify-between ${
                          isSelected
                            ? 'bg-emerald-50 border-[#12372A] text-[#12372A] shadow-xs'
                            : 'bg-[#FAFAF7] border-[#F5EBDD] text-gray-700 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="text-xl">{style.emoji}</span>
                          <span className="text-xs font-bold">{style.label}</span>
                        </div>
                        {isSelected && (
                          <div className="w-5 h-5 rounded-full bg-[#12372A] text-white flex items-center justify-center shrink-0">
                            <Check className="w-3 h-3" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ─── STEP 5: ACCOMMODATION TYPE ─────────────────────────────────── */}
            {currentStepIndex === 4 && (
              <div className="space-y-6 text-left">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#12372A]">
                    Where do you prefer to stay?
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">
                    Select the types of accommodation you feel most comfortable with.
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {ACCOMMODATION_TYPES.map((acc) => {
                    const isSelected = preferences.accommodationType?.includes(acc.id as AccommodationType);
                    return (
                      <button
                        key={acc.id}
                        type="button"
                        onClick={() => toggleAccommodationType(acc.id as AccommodationType)}
                        className={`p-4 rounded-2xl border text-left transition-all flex items-center justify-between ${
                          isSelected
                            ? 'bg-emerald-50 border-[#12372A] text-[#12372A] shadow-xs'
                            : 'bg-[#FAFAF7] border-[#F5EBDD] text-gray-700 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="text-xl">{acc.emoji}</span>
                          <span className="text-xs font-bold">{acc.label}</span>
                        </div>
                        {isSelected && (
                          <div className="w-5 h-5 rounded-full bg-[#12372A] text-white flex items-center justify-center shrink-0">
                            <Check className="w-3 h-3" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ─── STEP 6: STAYCATION PREFERENCES ────────────────────────────── */}
            {currentStepIndex === 5 && (
              <div className="space-y-6 text-left">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#12372A]">
                    Staycation & Sanctuary Preferences
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">
                    Interested in dedicated retreat experiences or workations? Fine-tune your stay amenities.
                  </p>
                </div>

                {/* Staycation Vibe Tiles */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {STAYCATION_TYPES.map((stay) => {
                    const isSelected = preferences.staycationPreferences?.includes(stay.id as StaycationPreference);
                    return (
                      <button
                        key={stay.id}
                        type="button"
                        onClick={() => toggleStaycationPref(stay.id as StaycationPreference)}
                        className={`p-3.5 rounded-xl border text-left transition-all flex items-center justify-between ${
                          isSelected
                            ? 'bg-[#12372A] text-white border-[#12372A]'
                            : 'bg-[#FAFAF7] text-gray-700 border-[#F5EBDD] hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span>{stay.emoji}</span>
                          <span className="text-xs font-bold">{stay.label}</span>
                        </div>
                        {isSelected && <Check className="w-3.5 h-3.5 text-[#F28C28]" />}
                      </button>
                    );
                  })}
                </div>

                {/* Staycation Detail Toggles */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-gray-100">
                  <label className="p-3.5 rounded-xl bg-[#FAFAF7] border border-[#F5EBDD] flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.staycationDetails?.breakfastIncluded}
                      onChange={(e) =>
                        setPreferences({
                          staycationDetails: {
                            ...preferences.staycationDetails,
                            breakfastIncluded: e.target.checked,
                          },
                        })
                      }
                      className="w-4 h-4 text-[#F28C28] rounded focus:ring-0"
                    />
                    <div className="flex items-center gap-2 text-xs font-bold text-gray-800">
                      <Coffee className="w-4 h-4 text-[#F28C28]" />
                      <span>Breakfast Included</span>
                    </div>
                  </label>

                  <label className="p-3.5 rounded-xl bg-[#FAFAF7] border border-[#F5EBDD] flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.staycationDetails?.poolOrSpa}
                      onChange={(e) =>
                        setPreferences({
                          staycationDetails: {
                            ...preferences.staycationDetails,
                            poolOrSpa: e.target.checked,
                          },
                        })
                      }
                      className="w-4 h-4 text-[#F28C28] rounded focus:ring-0"
                    />
                    <div className="flex items-center gap-2 text-xs font-bold text-gray-800">
                      <Waves className="w-4 h-4 text-[#2E86AB]" />
                      <span>Pool / Thermal Spa</span>
                    </div>
                  </label>

                  <label className="p-3.5 rounded-xl bg-[#FAFAF7] border border-[#F5EBDD] flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.staycationDetails?.workspaceRequired}
                      onChange={(e) =>
                        setPreferences({
                          staycationDetails: {
                            ...preferences.staycationDetails,
                            workspaceRequired: e.target.checked,
                          },
                        })
                      }
                      className="w-4 h-4 text-[#F28C28] rounded focus:ring-0"
                    />
                    <div className="flex items-center gap-2 text-xs font-bold text-gray-800">
                      <Briefcase className="w-4 h-4 text-[#12372A]" />
                      <span>Ergonomic Workspace</span>
                    </div>
                  </label>
                </div>
              </div>
            )}

            {/* ─── STEP 7: BUDGET ────────────────────────────────────────────── */}
            {currentStepIndex === 6 && (
              <div className="space-y-6 text-left">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#12372A]">
                    Set your target budget
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">
                    Slide to indicate your estimated daily spending per traveler.
                  </p>
                </div>

                {/* Currency and Category Header */}
                <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-900 to-[#12372A] text-white space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-widest text-[#F28C28]">
                        Current Tier
                      </span>
                      <h3 className="font-serif text-2xl font-bold capitalize">
                        {getBudgetLabel(computedCategory)}
                      </h3>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-300">
                        Approx. Total Trip
                      </span>
                      <p className="text-2xl font-extrabold text-[#F5EBDD]">
                        {formatCurrency(totalCalc, preferences.budget.currency)}
                      </p>
                    </div>
                  </div>

                  {/* Daily Budget Slider */}
                  <div className="space-y-2 pt-2">
                    <div className="flex justify-between text-xs font-semibold">
                      <span>Daily Budget / Person:</span>
                      <span className="text-base text-[#F28C28]">
                        {formatCurrency(dailyBudget, preferences.budget.currency)} / day
                      </span>
                    </div>
                    <input
                      type="range"
                      min={20}
                      max={600}
                      step={10}
                      value={dailyBudget}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setPreferences({
                          budget: {
                            ...preferences.budget,
                            dailyBudget: val,
                            amount: val * tripDays * (preferences.travelers?.adults || 1),
                            category: getBudgetCategory(val),
                          },
                        });
                      }}
                      className="w-full accent-[#F28C28] h-2 bg-emerald-800 rounded-lg cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-emerald-300/80 pt-1">
                      <span>$20 (Budget / Backpacker)</span>
                      <span>$150 (Mid-Range)</span>
                      <span>$350 (Premium)</span>
                      <span>$600+ (Luxury)</span>
                    </div>
                  </div>
                </div>

                {/* Currency selector and budget flexibility */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-[#FAFAF7] border border-[#F5EBDD]">
                    <label className="text-xs font-bold text-gray-700 block mb-1.5">
                      Base Currency
                    </label>
                    <select
                      value={preferences.budget.currency}
                      onChange={(e) =>
                        setPreferences({
                          budget: { ...preferences.budget, currency: e.target.value },
                        })
                      }
                      className="w-full p-2.5 rounded-lg bg-white border border-gray-200 text-xs font-bold"
                    >
                      {CURRENCIES.map((c) => (
                        <option key={c.code} value={c.code}>
                          {c.code} — {c.label} ({c.symbol})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="p-4 rounded-xl bg-[#FAFAF7] border border-[#F5EBDD]">
                    <label className="text-xs font-bold text-gray-700 block mb-1.5">
                      Budget Flexibility (+/- {preferences.budget.flexibility}%)
                    </label>
                    <input
                      type="range"
                      min={5}
                      max={30}
                      step={5}
                      value={preferences.budget.flexibility}
                      onChange={(e) =>
                        setPreferences({
                          budget: { ...preferences.budget, flexibility: Number(e.target.value) },
                        })
                      }
                      className="w-full accent-[#12372A] cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* ─── STEP 8: ACTIVITIES ────────────────────────────────────────── */}
            {currentStepIndex === 7 && (
              <div className="space-y-6 text-left">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#12372A]">
                    What activities excite you most?
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">
                    Pick as many experiences as you like; we will weave them into your route.
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-80 overflow-y-auto pr-1">
                  {ACTIVITY_TYPES.map((act) => {
                    const isSelected = preferences.activities?.includes(act.id as ActivityType);
                    return (
                      <button
                        key={act.id}
                        type="button"
                        onClick={() => toggleActivity(act.id as ActivityType)}
                        className={`p-3 rounded-xl border text-left transition-all flex items-center justify-between ${
                          isSelected
                            ? 'bg-emerald-50 border-[#12372A] text-[#12372A] shadow-xs'
                            : 'bg-[#FAFAF7] border-[#F5EBDD] text-gray-700 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{act.emoji}</span>
                          <span className="text-xs font-bold">{act.label}</span>
                        </div>
                        {isSelected && <Check className="w-3.5 h-3.5 text-[#12372A]" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ─── STEP 9: PACE & EXTRAS ─────────────────────────────────────── */}
            {currentStepIndex === 8 && (
              <div className="space-y-6 text-left">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#12372A]">
                    Travel Pace & Special Requirements
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">
                    Balance your itinerary between leisure downtime and high-energy sightseeing.
                  </p>
                </div>

                {/* Pace Selection */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {PACE_OPTIONS.map((p) => {
                    const isSelected = preferences.pace === p.id;
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setPreferences({ pace: p.id as TravelPace })}
                        className={`p-4 rounded-2xl border text-left transition-all ${
                          isSelected
                            ? 'bg-[#12372A] text-white border-[#12372A] shadow-sm'
                            : 'bg-[#FAFAF7] text-gray-700 border-[#F5EBDD] hover:border-gray-300'
                        }`}
                      >
                        <div className="text-2xl mb-1">{p.emoji}</div>
                        <p className="text-xs font-bold">{p.label}</p>
                        <p className={`text-[10px] mt-1 ${isSelected ? 'text-[#F5EBDD]/80' : 'text-gray-500'}`}>
                          {p.description}
                        </p>
                      </button>
                    );
                  })}
                </div>

                {/* Special Preferences */}
                <div className="pt-4 border-t border-gray-100 space-y-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-500 block">
                    Special Inclusions & Needs
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {[
                      'Vegetarian / Plant-Based Dining',
                      'Avoid Crowded Spots',
                      'Avoid Early Mornings (Start after 10 AM)',
                      'Short Travel Distances Only',
                      'Kid-Friendly Rest Stops',
                      'Wheelchair / Stroller Accessible',
                    ].map((req) => {
                      const isChecked = preferences.specialRequirements?.includes(req);
                      return (
                        <label
                          key={req}
                          className="p-3 rounded-xl bg-[#FAFAF7] border border-[#F5EBDD] flex items-center gap-2.5 cursor-pointer text-xs font-medium text-gray-700 hover:bg-gray-50"
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={(e) => {
                              const current = preferences.specialRequirements || [];
                              if (e.target.checked) {
                                setPreferences({ specialRequirements: [...current, req] });
                              } else {
                                setPreferences({ specialRequirements: current.filter((r) => r !== req) });
                              }
                            }}
                            className="w-4 h-4 text-[#F28C28] rounded focus:ring-0"
                          />
                          <span>{req}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* ─── STEP 10: REVIEW & SUMMARY ─────────────────────────────────── */}
            {currentStepIndex === 9 && (
              <div className="space-y-6 text-left">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#12372A]">
                    Review Your Travel Blueprint
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">
                    Everything look good? Click "Generate Itinerary" to synthesize your day-by-day plan.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-[#FAFAF7] border border-[#F5EBDD] space-y-1">
                    <span className="text-[10px] uppercase font-bold text-gray-400">Destination</span>
                    <p className="text-base font-bold text-[#12372A]">
                      {preferences.destination || 'Bali'}, {preferences.destinationCountry || 'Indonesia'}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#FAFAF7] border border-[#F5EBDD] space-y-1">
                    <span className="text-[10px] uppercase font-bold text-gray-400">Dates & Duration</span>
                    <p className="text-base font-bold text-[#12372A]">
                      {tripDays} Days ({preferences.startDate} to {preferences.endDate})
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#FAFAF7] border border-[#F5EBDD] space-y-1">
                    <span className="text-[10px] uppercase font-bold text-gray-400">Travelers & Pace</span>
                    <p className="text-sm font-bold text-[#12372A] capitalize">
                      {preferences.travelers.adults} Adults, {preferences.travelers.children} Children • {preferences.pace} Pace
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#FAFAF7] border border-[#F5EBDD] space-y-1">
                    <span className="text-[10px] uppercase font-bold text-gray-400">Daily Target Budget</span>
                    <p className="text-sm font-bold text-[#F28C28]">
                      {formatCurrency(dailyBudget, preferences.budget.currency)}/day ({getBudgetLabel(computedCategory)})
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-xs text-emerald-900 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold">
                    <Sparkles className="w-4 h-4 text-[#F28C28]" />
                    <span>Selected Styles & Activities</span>
                  </div>
                  <p className="capitalize text-emerald-800">
                    Styles: {preferences.travelStyles?.join(', ') || 'Culture, Food, Relaxation'}
                  </p>
                  <p className="capitalize text-emerald-800">
                    Activities: {preferences.activities?.slice(0, 5).join(', ') || 'Temples, Walking tours'}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* ─── Bottom Step Navigation Buttons ────────────────────────────── */}
          <div className="pt-8 mt-8 border-t border-gray-100 flex items-center justify-between">
            <button
              type="button"
              onClick={goToPrevStep}
              disabled={currentStepIndex === 0}
              className={`px-5 py-2.5 rounded-xl border border-gray-200 text-xs font-bold flex items-center gap-2 transition-all ${
                currentStepIndex === 0
                  ? 'opacity-40 cursor-not-allowed text-gray-400'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <button
              type="button"
              onClick={goToNextStep}
              className="px-7 py-3 rounded-xl bg-[#12372A] hover:bg-[#1a4d3a] text-[#F5EBDD] text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-2"
            >
              <span>{currentStepIndex === STEPS.length - 1 ? 'Synthesize Itinerary' : 'Continue'}</span>
              <ArrowRight className="w-4 h-4 text-[#F28C28]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
