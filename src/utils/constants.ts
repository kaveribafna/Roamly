// Roamly design tokens & constants

export const COLORS = {
  forest: '#12372A',
  ocean: '#2E86AB',
  sand: '#F5EBDD',
  sunset: '#F28C28',
  cloud: '#FAFAF7',
  charcoal: '#1D2521',
  sage: '#A8C3A0',
  forestLight: '#1a4d3a',
  oceanLight: '#3a9ec4',
  sunsetLight: '#f5a054',
  sandDark: '#e8d9c4',
} as const;

export const BUDGET_RANGES: Record<string, { min: number; max: number; label: string }> = {
  budget: { min: 0, max: 50, label: 'Budget Traveler' },
  'mid-range': { min: 50, max: 150, label: 'Mid-Range Traveler' },
  premium: { min: 150, max: 350, label: 'Premium Traveler' },
  luxury: { min: 350, max: 1000, label: 'Luxury Traveler' },
};

export const CURRENCIES = [
  { code: 'USD', symbol: '$', label: 'US Dollar' },
  { code: 'EUR', symbol: '€', label: 'Euro' },
  { code: 'GBP', symbol: '£', label: 'British Pound' },
  { code: 'INR', symbol: '₹', label: 'Indian Rupee' },
  { code: 'AUD', symbol: 'A$', label: 'Australian Dollar' },
  { code: 'JPY', symbol: '¥', label: 'Japanese Yen' },
  { code: 'SGD', symbol: 'S$', label: 'Singapore Dollar' },
  { code: 'THB', symbol: '฿', label: 'Thai Baht' },
];

export const TRAVEL_STYLES = [
  { id: 'relaxation', label: 'Relaxation', emoji: '🧘' },
  { id: 'adventure', label: 'Adventure', emoji: '🏔️' },
  { id: 'culture', label: 'Culture', emoji: '🏛️' },
  { id: 'food', label: 'Food', emoji: '🍜' },
  { id: 'nightlife', label: 'Nightlife', emoji: '🌃' },
  { id: 'nature', label: 'Nature', emoji: '🌿' },
  { id: 'shopping', label: 'Shopping', emoji: '🛍️' },
  { id: 'wellness', label: 'Wellness', emoji: '💆' },
  { id: 'photography', label: 'Photography', emoji: '📷' },
  { id: 'history', label: 'History', emoji: '📜' },
  { id: 'luxury', label: 'Luxury', emoji: '✨' },
  { id: 'budget', label: 'Budget', emoji: '💰' },
] as const;

export const ACCOMMODATION_TYPES = [
  { id: 'hotel', label: 'Hotel', emoji: '🏨' },
  { id: 'hostel', label: 'Hostel', emoji: '🛏️' },
  { id: 'guesthouse', label: 'Guesthouse', emoji: '🏡' },
  { id: 'resort', label: 'Resort', emoji: '🏖️' },
  { id: 'villa', label: 'Villa', emoji: '🏘️' },
  { id: 'apartment', label: 'Apartment', emoji: '🏢' },
  { id: 'homestay', label: 'Homestay', emoji: '🏠' },
  { id: 'camping', label: 'Camping', emoji: '⛺' },
  { id: 'staycation', label: 'Staycation', emoji: '🌴' },
] as const;

export const STAYCATION_TYPES = [
  { id: 'beach-resort', label: 'Beach Resort', emoji: '🏖️' },
  { id: 'boutique-hotel', label: 'Boutique Hotel', emoji: '🏩' },
  { id: 'mountain-retreat', label: 'Mountain Retreat', emoji: '⛰️' },
  { id: 'wellness-resort', label: 'Wellness Resort', emoji: '🧖' },
  { id: 'private-villa', label: 'Private Villa', emoji: '🏡' },
  { id: 'city-hotel', label: 'City Hotel', emoji: '🌆' },
  { id: 'farm-stay', label: 'Farm Stay', emoji: '🌾' },
  { id: 'eco-lodge', label: 'Eco-Lodge', emoji: '🌱' },
  { id: 'workation', label: 'Workation', emoji: '💻' },
] as const;

export const ACTIVITY_TYPES = [
  { id: 'walking-tours', label: 'Walking Tours', emoji: '🚶' },
  { id: 'museums', label: 'Museums', emoji: '🏛️' },
  { id: 'beaches', label: 'Beaches', emoji: '🏖️' },
  { id: 'hiking', label: 'Hiking', emoji: '🥾' },
  { id: 'water-sports', label: 'Water Sports', emoji: '🏄' },
  { id: 'local-markets', label: 'Local Markets', emoji: '🛒' },
  { id: 'cooking-classes', label: 'Cooking Classes', emoji: '👨‍🍳' },
  { id: 'cafes', label: 'Cafes', emoji: '☕' },
  { id: 'fine-dining', label: 'Fine Dining', emoji: '🍽️' },
  { id: 'street-food', label: 'Street Food', emoji: '🍢' },
  { id: 'nightlife', label: 'Nightlife', emoji: '🎶' },
  { id: 'temples', label: 'Temples', emoji: '⛩️' },
  { id: 'architecture', label: 'Architecture', emoji: '🏗️' },
  { id: 'wildlife', label: 'Wildlife', emoji: '🐒' },
  { id: 'scenic-viewpoints', label: 'Scenic Viewpoints', emoji: '🌄' },
  { id: 'shopping', label: 'Shopping', emoji: '🛍️' },
  { id: 'spa-wellness', label: 'Spa & Wellness', emoji: '💆' },
  { id: 'photography', label: 'Photography', emoji: '📸' },
  { id: 'family-friendly', label: 'Family Friendly', emoji: '👨‍👩‍👧‍👦' },
] as const;

export const PACE_OPTIONS = [
  { id: 'slow', label: 'Slow & Relaxed', description: '2–3 activities per day, plenty of downtime', emoji: '🐢' },
  { id: 'balanced', label: 'Balanced', description: '3–5 activities per day, mix of action and rest', emoji: '⚖️' },
  { id: 'packed', label: 'Packed Itinerary', description: '5+ activities per day, see everything', emoji: '🚀' },
] as const;

export const LOADING_MESSAGES = [
  { text: 'Finding the best places to stay', icon: '🏨' },
  { text: 'Matching activities to your interests', icon: '🎯' },
  { text: 'Balancing your budget', icon: '💰' },
  { text: 'Organizing your daily route', icon: '🗺️' },
  { text: 'Adding local experiences', icon: '🌮' },
  { text: 'Checking the best times to visit', icon: '☀️' },
  { text: 'Finding hidden gems', icon: '💎' },
  { text: 'Optimizing travel times', icon: '⏱️' },
];

export const WIZARD_STEPS = [
  { id: 'destination', label: 'Destination', icon: 'MapPin' },
  { id: 'dates', label: 'Dates', icon: 'Calendar' },
  { id: 'travelers', label: 'Travelers', icon: 'Users' },
  { id: 'style', label: 'Travel Style', icon: 'Compass' },
  { id: 'accommodation', label: 'Stay', icon: 'Home' },
  { id: 'budget', label: 'Budget', icon: 'Wallet' },
  { id: 'activities', label: 'Activities', icon: 'Activity' },
  { id: 'pace', label: 'Pace', icon: 'Gauge' },
  { id: 'requirements', label: 'Extras', icon: 'Settings' },
  { id: 'review', label: 'Review', icon: 'CheckCircle' },
] as const;
