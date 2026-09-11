// ─── Trip Preferences ────────────────────────────────────────────────

export interface TripPreferences {
  destination: string;
  destinationCountry: string;
  startDate: string;
  endDate: string;
  flexibleDates: boolean;
  travelers: {
    adults: number;
    children: number;
    type: 'solo' | 'couple' | 'family' | 'group';
  };
  travelStyles: TravelStyle[];
  accommodationType: AccommodationType[];
  staycationPreferences: StaycationPreference[];
  staycationDetails: StaycationDetails;
  budget: BudgetConfig;
  activities: ActivityType[];
  pace: TravelPace;
  dietaryRequirements: string[];
  specialRequirements: string[];
}

export type TravelStyle =
  | 'relaxation' | 'adventure' | 'culture' | 'food'
  | 'nightlife' | 'nature' | 'shopping' | 'wellness'
  | 'photography' | 'history' | 'luxury' | 'budget';

export type AccommodationType =
  | 'hotel' | 'hostel' | 'guesthouse' | 'resort'
  | 'villa' | 'apartment' | 'homestay' | 'camping' | 'staycation';

export type StaycationPreference =
  | 'beach-resort' | 'boutique-hotel' | 'mountain-retreat'
  | 'wellness-resort' | 'private-villa' | 'city-hotel'
  | 'farm-stay' | 'eco-lodge' | 'workation';

export interface StaycationDetails {
  comfortLevel: 'basic' | 'comfortable' | 'premium' | 'luxury';
  preferredLocation: string;
  nights: number;
  mustHaveFacilities: string[];
  breakfastIncluded: boolean;
  poolOrSpa: boolean;
  workspaceRequired: boolean;
  accessibilityNeeds: string[];
}

export type BudgetCategory = 'budget' | 'mid-range' | 'premium' | 'luxury';

export interface BudgetConfig {
  amount: number;
  currency: string;
  category: BudgetCategory;
  dailyBudget: number;
  perTraveler: number;
  flexibility: number;
}

export type ActivityType =
  | 'walking-tours' | 'museums' | 'beaches' | 'hiking'
  | 'water-sports' | 'local-markets' | 'cooking-classes'
  | 'cafes' | 'fine-dining' | 'street-food' | 'nightlife'
  | 'temples' | 'architecture' | 'wildlife' | 'scenic-viewpoints'
  | 'shopping' | 'spa-wellness' | 'photography' | 'family-friendly';

export type TravelPace = 'slow' | 'balanced' | 'packed';

// ─── Itinerary ───────────────────────────────────────────────────────

export interface Itinerary {
  id: string;
  title: string;
  destination: string;
  country: string;
  startDate: string;
  endDate: string;
  travelers: TripPreferences['travelers'];
  totalEstimatedCost: number;
  currency: string;
  budgetStatus: 'under' | 'on-track' | 'over';
  budgetCategory: BudgetCategory;
  travelStyles: TravelStyle[];
  accommodationSummary: string;
  weatherSummary: string;
  days: ItineraryDay[];
  budgetBreakdown: BudgetBreakdown;
}

export interface ItineraryDay {
  id: string;
  dayNumber: number;
  date: string;
  title: string;
  theme: string;
  activities: ItineraryActivity[];
  accommodation: Accommodation | null;
  estimatedCost: number;
  travelTime: number;
  walkingDistance: number;
  tips: string[];
}

export interface ItineraryActivity {
  id: string;
  title: string;
  category: string;
  description: string;
  duration: number;
  estimatedCost: number;
  location: string;
  coordinates?: { lat: number; lng: number };
  distanceFromPrevious?: number;
  travelTimeFromPrevious?: number;
  recommendedTime: string;
  difficultyLevel: 'easy' | 'moderate' | 'challenging';
  image: string;
  tags: string[];
  isFavorite: boolean;
  budgetAlternative?: ItineraryActivity;
}

// ─── Accommodation ───────────────────────────────────────────────────

export interface Accommodation {
  id: string;
  name: string;
  type: AccommodationType;
  description: string;
  pricePerNight: number;
  currency: string;
  rating: number;
  location: string;
  image: string;
  amenities: string[];
  isBestValue: boolean;
  isBudgetFriendly: boolean;
}

// ─── Budget ──────────────────────────────────────────────────────────

export interface BudgetBreakdown {
  accommodation: number;
  food: number;
  activities: number;
  transportation: number;
  shopping: number;
  emergencyBuffer: number;
  total: number;
}

// ─── Destination ─────────────────────────────────────────────────────

export interface Destination {
  id: string;
  name: string;
  country: string;
  continent: string;
  description: string;
  tagline: string;
  image: string;
  averageDailyBudget: number;
  currency: string;
  bestSeason: string;
  travelStyles: TravelStyle[];
  highlights: string[];
  rating: number;
  tripDuration: string;
}

// ─── Testimonial ─────────────────────────────────────────────────────

export interface Testimonial {
  id: string;
  name: string;
  avatar: string;
  destination: string;
  quote: string;
  rating: number;
  tripType: string;
}

// ─── Saved Trips ─────────────────────────────────────────────────────

export interface SavedTrip {
  id: string;
  itinerary: Itinerary;
  savedAt: string;
  isFavorite: boolean;
}

// ─── UI State ────────────────────────────────────────────────────────

export interface WizardStep {
  id: string;
  label: string;
  icon: string;
  isComplete: boolean;
}

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastMessage {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
}
