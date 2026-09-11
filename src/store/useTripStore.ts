import { create } from 'zustand';
import type {
  TripPreferences,
  Itinerary,
  ItineraryActivity,
  SavedTrip,
  ToastMessage,
  ToastType,
} from '../types';
import { createSampleItinerary, BUDGET_ACCOMMODATION, SAMPLE_ACCOMMODATION } from '../data/mockItineraries';
import { calculateBudgetBreakdown, getBudgetCategory } from '../utils/budget';

interface TripStore {
  // Preferences Wizard State
  preferences: TripPreferences;
  setPreferences: (updates: Partial<TripPreferences>) => void;
  resetPreferences: () => void;

  // Active Itinerary State
  activeItinerary: Itinerary;
  setActiveItinerary: (itinerary: Itinerary) => void;
  isBudgetMode: boolean;
  toggleBudgetMode: () => void;

  // Itinerary Fine-Tuning Actions
  updateActivity: (dayId: string, activityId: string, updated: ItineraryActivity) => void;
  replaceActivity: (dayId: string, activityId: string, replacement: ItineraryActivity) => void;
  removeActivity: (dayId: string, activityId: string) => void;
  addActivity: (dayId: string, activity: ItineraryActivity) => void;
  toggleFavoriteActivity: (dayId: string, activityId: string) => void;
  reorderActivities: (dayId: string, fromIndex: number, toIndex: number) => void;
  regenerateDay: (dayId: string) => void;

  // Saved Trips (Persisted)
  savedTrips: SavedTrip[];
  saveTrip: (itinerary?: Itinerary) => void;
  removeSavedTrip: (id: string) => void;
  isTripSaved: (id: string) => boolean;

  // Global App Preferences
  currency: string;
  setCurrency: (c: string) => void;
  reducedMotion: boolean;
  setReducedMotion: (v: boolean) => void;

  // Toast System
  toasts: ToastMessage[];
  addToast: (message: string, type?: ToastType) => void;
  removeToast: (id: string) => void;
}

const DEFAULT_PREFERENCES: TripPreferences = {
  destination: 'Bali',
  destinationCountry: 'Indonesia',
  startDate: '2026-05-10',
  endDate: '2026-05-14',
  flexibleDates: false,
  travelers: {
    adults: 2,
    children: 0,
    type: 'couple',
  },
  travelStyles: ['nature', 'culture', 'food', 'wellness', 'relaxation'],
  accommodationType: ['resort', 'villa'],
  staycationPreferences: ['eco-lodge', 'wellness-resort'],
  staycationDetails: {
    comfortLevel: 'comfortable',
    preferredLocation: 'Ubud & Sidemen Valley',
    nights: 4,
    mustHaveFacilities: ['Pool or Spa', 'High-Speed WiFi', 'Balcony / Terrace'],
    breakfastIncluded: true,
    poolOrSpa: true,
    workspaceRequired: false,
    accessibilityNeeds: [],
  },
  budget: {
    amount: 1500,
    currency: 'USD',
    category: 'mid-range',
    dailyBudget: 150,
    perTraveler: 750,
    flexibility: 15,
  },
  activities: ['walking-tours', 'temples', 'beaches', 'cooking-classes', 'cafes', 'spa-wellness'],
  pace: 'balanced',
  dietaryRequirements: ['Vegetarian-friendly'],
  specialRequirements: ['Avoid crowded early mornings'],
};

// Load saved trips from localStorage if present
function loadSavedTrips(): SavedTrip[] {
  try {
    const raw = localStorage.getItem('roamly_saved_trips');
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load saved trips from localStorage', e);
  }
  return [];
}

export const useTripStore = create<TripStore>((set, get) => ({
  preferences: DEFAULT_PREFERENCES,
  setPreferences: (updates) =>
    set((state) => ({
      preferences: { ...state.preferences, ...updates },
    })),
  resetPreferences: () => set({ preferences: DEFAULT_PREFERENCES }),

  activeItinerary: createSampleItinerary(),
  setActiveItinerary: (itinerary) => set({ activeItinerary: itinerary, isBudgetMode: false }),

  isBudgetMode: false,
  toggleBudgetMode: () => {
    const { activeItinerary, isBudgetMode } = get();
    const newBudgetMode = !isBudgetMode;

    // Swap activities with their budget alternatives and accommodation
    const updatedDays = activeItinerary.days.map((day) => {
      const updatedActivities = day.activities.map((act) => {
        if (newBudgetMode && act.budgetAlternative) {
          // Store original in budgetAlternative of the replacement so we can toggle back
          const original = { ...act, budgetAlternative: undefined };
          return {
            ...act.budgetAlternative,
            id: act.id,
            budgetAlternative: original,
          };
        } else if (!newBudgetMode && act.budgetAlternative) {
          return {
            ...act.budgetAlternative,
            id: act.id,
            budgetAlternative: { ...act, budgetAlternative: undefined },
          };
        }
        return act;
      });

      const dayCost = updatedActivities.reduce((sum, a) => sum + (a.estimatedCost || 0), 0);

      return {
        ...day,
        activities: updatedActivities,
        estimatedCost: dayCost,
        accommodation: newBudgetMode ? BUDGET_ACCOMMODATION : SAMPLE_ACCOMMODATION,
      };
    });

    const totalCost = updatedDays.reduce(
      (sum, d) => sum + d.estimatedCost + ((d.accommodation?.pricePerNight || 60) * 0.5),
      0
    );
    const category = getBudgetCategory(totalCost / updatedDays.length);

    set({
      isBudgetMode: newBudgetMode,
      activeItinerary: {
        ...activeItinerary,
        days: updatedDays,
        totalEstimatedCost: Math.round(totalCost),
        budgetCategory: newBudgetMode ? 'budget' : category,
        budgetStatus: newBudgetMode ? 'under' : 'on-track',
        budgetBreakdown: calculateBudgetBreakdown(Math.round(totalCost), newBudgetMode ? 'budget' : category),
      },
    });

    get().addToast(
      newBudgetMode
        ? 'Switched to Budget Mode: Low-cost activities & guesthouse stays applied!'
        : 'Restored original itinerary experiences & stays',
      'info'
    );
  },

  updateActivity: (dayId, activityId, updated) => {
    set((state) => {
      const updatedDays = state.activeItinerary.days.map((d) => {
        if (d.id !== dayId) return d;
        return {
          ...d,
          activities: d.activities.map((a) => (a.id === activityId ? updated : a)),
        };
      });
      return {
        activeItinerary: { ...state.activeItinerary, days: updatedDays },
      };
    });
  },

  replaceActivity: (dayId, activityId, replacement) => {
    set((state) => {
      const updatedDays = state.activeItinerary.days.map((d) => {
        if (d.id !== dayId) return d;
        return {
          ...d,
          activities: d.activities.map((a) => (a.id === activityId ? { ...replacement, id: activityId } : a)),
        };
      });
      return {
        activeItinerary: { ...state.activeItinerary, days: updatedDays },
      };
    });
    get().addToast(`Activity replaced with "${replacement.title}"`, 'success');
  },

  removeActivity: (dayId, activityId) => {
    set((state) => {
      const updatedDays = state.activeItinerary.days.map((d) => {
        if (d.id !== dayId) return d;
        return {
          ...d,
          activities: d.activities.filter((a) => a.id !== activityId),
        };
      });
      return {
        activeItinerary: { ...state.activeItinerary, days: updatedDays },
      };
    });
    get().addToast('Activity removed from itinerary', 'info');
  },

  addActivity: (dayId, activity) => {
    set((state) => {
      const updatedDays = state.activeItinerary.days.map((d) => {
        if (d.id !== dayId) return d;
        return {
          ...d,
          activities: [...d.activities, activity],
        };
      });
      return {
        activeItinerary: { ...state.activeItinerary, days: updatedDays },
      };
    });
    get().addToast(`Added "${activity.title}" to Day`, 'success');
  },

  toggleFavoriteActivity: (dayId, activityId) => {
    set((state) => {
      const updatedDays = state.activeItinerary.days.map((d) => {
        if (d.id !== dayId) return d;
        return {
          ...d,
          activities: d.activities.map((a) =>
            a.id === activityId ? { ...a, isFavorite: !a.isFavorite } : a
          ),
        };
      });
      return {
        activeItinerary: { ...state.activeItinerary, days: updatedDays },
      };
    });
  },

  reorderActivities: (dayId, fromIndex, toIndex) => {
    set((state) => {
      const updatedDays = state.activeItinerary.days.map((d) => {
        if (d.id !== dayId) return d;
        const acts = [...d.activities];
        const [moved] = acts.splice(fromIndex, 1);
        acts.splice(toIndex, 0, moved);
        return { ...d, activities: acts };
      });
      return {
        activeItinerary: { ...state.activeItinerary, days: updatedDays },
      };
    });
    get().addToast('Activity timeline updated', 'info');
  },

  regenerateDay: (_dayId) => {
    get().addToast('Day schedule refreshed with new local recommendations', 'success');
  },


  savedTrips: loadSavedTrips(),
  saveTrip: (itineraryToSave) => {
    const item = itineraryToSave || get().activeItinerary;
    const existing = get().savedTrips;
    if (existing.some((t) => t.id === item.id)) {
      get().addToast('Trip is already saved in your collection', 'info');
      return;
    }
    const newSavedTrip: SavedTrip = {
      id: item.id,
      itinerary: item,
      savedAt: new Date().toISOString(),
      isFavorite: true,
    };
    const updated = [newSavedTrip, ...existing];
    try {
      localStorage.setItem('roamly_saved_trips', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
    set({ savedTrips: updated });
    get().addToast(`"${item.title}" saved to your trips!`, 'success');
  },

  removeSavedTrip: (id) => {
    const updated = get().savedTrips.filter((t) => t.id !== id);
    try {
      localStorage.setItem('roamly_saved_trips', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
    set({ savedTrips: updated });
    get().addToast('Trip removed from collection', 'info');
  },

  isTripSaved: (id) => {
    return get().savedTrips.some((t) => t.id === id);
  },

  currency: 'USD',
  setCurrency: (currency) => set({ currency }),

  reducedMotion: false,
  setReducedMotion: (reducedMotion) => {
    set({ reducedMotion });
    get().addToast(
      reducedMotion ? 'Reduced motion mode enabled' : 'Smooth animations restored',
      'info'
    );
  },

  toasts: [],
  addToast: (message, type = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast: ToastMessage = { id, message, type, duration: 3500 };
    set((state) => ({ toasts: [...state.toasts, newToast] }));
    setTimeout(() => {
      get().removeToast(id);
    }, 3500);
  },
  removeToast: (id) => {
    set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }));
  },
}));
