import type {
  Itinerary,
  ItineraryDay,
  TripPreferences,
  Accommodation,
} from '../types';

import { calculateBudgetBreakdown, getBudgetCategory } from '../utils/budget';

export const SAMPLE_ACCOMMODATION: Accommodation = {
  id: 'acc-bali-1',
  name: 'Komaneka at Monkey Forest Villa',
  type: 'resort',
  description: 'Serene luxury villas tucked into private tropical gardens along Ubud sacred sanctuary path.',
  pricePerNight: 120,
  currency: 'USD',
  rating: 4.9,
  location: 'Jl. Monkey Forest, Ubud, Bali',
  image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80',
  amenities: ['Infinity Pool', 'Balinese Spa', 'Gourmet Breakfast', 'Free Shuttle', 'Yoga Pavilion'],
  isBestValue: false,
  isBudgetFriendly: false,
};

export const BUDGET_ACCOMMODATION: Accommodation = {
  id: 'acc-bali-budget',
  name: 'Pondok Bamboo Homestay & Gardens',
  type: 'homestay',
  description: 'Charming family-run Balinese compound with lush courtyards, traditional carved doorways, and free tropical fruit breakfast.',
  pricePerNight: 28,
  currency: 'USD',
  rating: 4.85,
  location: 'Hanoman St, Ubud, Bali',
  image: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=800&q=80',
  amenities: ['Free Tropical Breakfast', 'High-Speed WiFi', 'Bike Rental', 'Courtyard Garden', 'Fan & AC'],
  isBestValue: true,
  isBudgetFriendly: true,
};

export const SAMPLE_BALI_DAYS: ItineraryDay[] = [
  {
    id: 'day-1',
    dayNumber: 1,
    date: '2026-05-10',
    title: 'Arrival & Ubud Cultural Welcome',
    theme: 'Arrival, Sacred Forest Walk & Herbal Elixirs',
    estimatedCost: 65,
    travelTime: 75,
    walkingDistance: 4.2,
    tips: [
      'Download offline Google Maps for Ubud alleyways.',
      'Exchange currency at BMC authorized booths at the airport or Ubud center.',
      'Remember to secure loose items before entering the Monkey Forest!'
    ],
    accommodation: SAMPLE_ACCOMMODATION,
    activities: [
      {
        id: 'act-1-1',
        title: 'Morning Arrival & Organic Jamu Welcome',
        category: 'food',
        recommendedTime: '10:00 AM',
        duration: 90,
        estimatedCost: 15,
        location: 'Jl. Raya Ubud, Gianyar',
        coordinates: { lat: -8.5069, lng: 115.2625 },
        distanceFromPrevious: 0,
        travelTimeFromPrevious: 0,
        difficultyLevel: 'easy',
        image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=600&q=80',
        tags: ['Drinks', 'Traditional', 'Relaxation'],
        isFavorite: false,
        description: 'Sip fresh cold-pressed turmeric ginger Jamu and lemongrass herbal infusions in a bamboo garden sanctuary.',
        budgetAlternative: {
          id: 'act-1-1-alt',
          title: 'Warung Jamu & Fresh Coconut by the Roadside',
          category: 'food',
          recommendedTime: '10:00 AM',
          duration: 45,
          estimatedCost: 2,
          location: 'Jl. Hanoman corner',
          distanceFromPrevious: 0,
          travelTimeFromPrevious: 0,
          difficultyLevel: 'easy',
          image: 'https://images.unsplash.com/photo-1525385133512-2f3bdd039054?auto=format&fit=crop&w=600&q=80',
          tags: ['Street Food', 'Budget Friendly'],
          isFavorite: false,
          description: 'Crack open a freshly harvested chilled young coconut and local turmeric tonic for less than $2.',
        }
      },
      {
        id: 'act-1-2',
        title: 'Sacred Monkey Forest Sanctuary Stroll',
        category: 'walking-tours',
        recommendedTime: '01:30 PM',
        duration: 120,
        estimatedCost: 20,
        location: 'Padangtegal, Ubud',
        coordinates: { lat: -8.5190, lng: 115.2584 },
        distanceFromPrevious: 1.8,
        travelTimeFromPrevious: 15,
        difficultyLevel: 'easy',
        image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80',
        tags: ['Wildlife', 'Nature', 'Culture'],
        isFavorite: true,
        description: 'Walk ancient moss-covered stone bridges beneath dense canopy trees populated by over 1,000 long-tailed macaques.',
        budgetAlternative: {
          id: 'act-1-2-alt',
          title: 'Campuhan Ridge Walk & Valley Vistas',
          category: 'walking-tours',
          recommendedTime: '02:00 PM',
          duration: 90,
          estimatedCost: 0,
          location: 'Keliki, Ubud',
          coordinates: { lat: -8.5034, lng: 115.2546 },
          distanceFromPrevious: 2.1,
          travelTimeFromPrevious: 15,
          difficultyLevel: 'easy',
          image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80',
          tags: ['Free Activity', 'Scenic', 'Walking'],
          isFavorite: true,
          description: 'A breathtaking free ridge walk offering sweeping views of emerald river gorges and waving elephant grass.',
        }
      },
      {
        id: 'act-1-3',
        title: 'Lotus Garden Dinner at Cafe Lotus',
        category: 'fine-dining',
        recommendedTime: '07:00 PM',
        duration: 90,
        estimatedCost: 30,
        location: 'Jl. Raya Ubud, opposite Palace',
        coordinates: { lat: -8.5056, lng: 115.2608 },
        distanceFromPrevious: 1.5,
        travelTimeFromPrevious: 10,
        difficultyLevel: 'easy',
        image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80',
        tags: ['Dinner', 'Fine Dining', 'Atmospheric'],
        isFavorite: false,
        description: 'Dine beside illuminated lotus ponds overlooking the carved stone entrance of Pura Taman Saraswati temple.',
        budgetAlternative: {
          id: 'act-1-3-alt',
          title: 'Authentic Balinese Nasi Campur at Warung Biah Biah',
          category: 'street-food',
          recommendedTime: '07:00 PM',
          duration: 60,
          estimatedCost: 5,
          location: 'Jl. Goutama No. 13, Ubud',
          coordinates: { lat: -8.5080, lng: 115.2635 },
          distanceFromPrevious: 1.2,
          travelTimeFromPrevious: 10,
          difficultyLevel: 'easy',
          image: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=600&q=80',
          tags: ['Street Food', 'Authentic', 'Super Budget'],
          isFavorite: false,
          description: 'Sample 6 different Balinese traditional dishes served on banana leaves with homemade sambal matah.',
        }
      }
    ]
  },
  {
    id: 'day-2',
    dayNumber: 2,
    date: '2026-05-11',
    title: 'Rice Terraces, Sacred Springs & Cooking Class',
    theme: 'Agricultural Heritage & Culinary Mastery',
    estimatedCost: 80,
    travelTime: 90,
    walkingDistance: 5.5,
    tips: [
      'Wear slip-on shoes suitable for temple sarongs.',
      'Bring extra clothes if participating in the Melukat holy water cleansing.',
      'Morning light at Tegallalang (7:30-9:00 AM) is best for photos without crowds.'
    ],
    accommodation: SAMPLE_ACCOMMODATION,
    activities: [
      {
        id: 'act-2-1',
        title: 'Tegallalang Sunrise Rice Terrace Exploration',
        category: 'scenic-viewpoints',
        recommendedTime: '07:30 AM',
        duration: 120,
        estimatedCost: 10,
        location: 'Tegallalang, Gianyar',
        coordinates: { lat: -8.4344, lng: 115.2785 },
        distanceFromPrevious: 9.5,
        travelTimeFromPrevious: 25,
        difficultyLevel: 'moderate',
        image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=600&q=80',
        tags: ['Photography', 'Nature', 'Iconic'],
        isFavorite: true,
        description: 'Wander deep into emerald stepped hills sculpted by UNESCO-recognized subak irrigation systems.',
      },
      {
        id: 'act-2-2',
        title: 'Tirta Empul Holy Water Cleansing Ritual',
        category: 'temples',
        recommendedTime: '11:00 AM',
        duration: 90,
        estimatedCost: 15,
        location: 'Manukaya, Tampaksiring',
        coordinates: { lat: -8.4150, lng: 115.3150 },
        distanceFromPrevious: 7.2,
        travelTimeFromPrevious: 20,
        difficultyLevel: 'easy',
        image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=600&q=80',
        tags: ['Culture', 'Spiritual', 'History'],
        isFavorite: false,
        description: 'Participate respectfully in traditional holy spring purification rituals alongside locals in temple sarongs.',
      },
      {
        id: 'act-2-3',
        title: 'Farm-to-Table Balinese Spice Cooking Class',
        category: 'cooking-classes',
        recommendedTime: '02:00 PM',
        duration: 180,
        estimatedCost: 45,
        location: 'Laplapan Village, Ubud',
        coordinates: { lat: -8.5011, lng: 115.2811 },
        distanceFromPrevious: 6.8,
        travelTimeFromPrevious: 20,
        difficultyLevel: 'easy',
        image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=600&q=80',
        tags: ['Food', 'Hands-on', 'Culture'],
        isFavorite: true,
        description: 'Pick fresh galangal, lemongrass, and torch ginger flowers before cooking authentic sate lilit and lawar.',
        budgetAlternative: {
          id: 'act-2-3-alt',
          title: 'DIY Market Snack Crawl & Herb Garden Walk',
          category: 'local-markets',
          recommendedTime: '02:30 PM',
          duration: 90,
          estimatedCost: 6,
          location: 'Pasar Seni Sukawati',
          distanceFromPrevious: 5.0,
          travelTimeFromPrevious: 15,
          difficultyLevel: 'easy',
          image: 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=600&q=80',
          tags: ['Budget Food', 'Local Market'],
          isFavorite: false,
          description: 'Taste sweet klepon rice balls bursting with palm sugar and savory pisang goreng directly from village stalls.',
        }
      },
      {
        id: 'act-2-4',
        title: 'Sunset Acoustic Lounge at Clear Cafe',
        category: 'cafes',
        recommendedTime: '07:30 PM',
        duration: 75,
        estimatedCost: 10,
        location: 'Jl. Hanoman No.8, Ubud',
        coordinates: { lat: -8.5132, lng: 115.2632 },
        distanceFromPrevious: 3.4,
        travelTimeFromPrevious: 12,
        difficultyLevel: 'easy',
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80',
        tags: ['Nightlife', 'Relaxation', 'Music'],
        isFavorite: false,
        description: 'Unwind on circular hand-carved daybeds with dragonfruit smoothies and live fingerstyle acoustic guitar.',
      }
    ]
  },
  {
    id: 'day-3',
    dayNumber: 3,
    date: '2026-05-12',
    title: 'Misty Waterfalls & Rejuvenating Spa Sanctuary',
    theme: 'Wild Waters, Hydrotherapy & Deep Relaxation',
    estimatedCost: 75,
    travelTime: 80,
    walkingDistance: 6.0,
    tips: [
      'Pack a dry bag and waterproof phone case for waterfall sprays.',
      'Rocks around Tibumana and Tukad Cepung can be slick — wear strap sandals.'
    ],
    accommodation: SAMPLE_ACCOMMODATION,
    activities: [
      {
        id: 'act-3-1',
        title: 'Tibumana Canyon Waterfall & Swimming Pool',
        category: 'hiking',
        recommendedTime: '08:30 AM',
        duration: 120,
        estimatedCost: 10,
        location: 'Apuan, Bangli',
        coordinates: { lat: -8.5039, lng: 115.3339 },
        distanceFromPrevious: 12.0,
        travelTimeFromPrevious: 30,
        difficultyLevel: 'moderate',
        image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=600&q=80',
        tags: ['Waterfalls', 'Swimming', 'Nature'],
        isFavorite: true,
        description: 'A serene curtain waterfall cascading into a deep, swimmable lagoon framed by wild ferns and hanging vines.',
      },
      {
        id: 'act-3-2',
        title: 'Organic Smoothie Bowl Lunch at Alchemy Bali',
        category: 'cafes',
        recommendedTime: '01:00 PM',
        duration: 60,
        estimatedCost: 18,
        location: 'Penestanan Klod, Ubud',
        coordinates: { lat: -8.5065, lng: 115.2471 },
        distanceFromPrevious: 11.2,
        travelTimeFromPrevious: 28,
        difficultyLevel: 'easy',
        image: 'https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?auto=format&fit=crop&w=600&q=80',
        tags: ['Healthy', 'Vegan Friendly', 'Aesthetic'],
        isFavorite: false,
        description: 'Build-your-own raw vitality bowl topped with cacao nibs, wild honey, and freshly grated coconut.',
        budgetAlternative: {
          id: 'act-3-2-alt',
          title: 'Warung Makan Bu Rus Garden Lunch',
          category: 'street-food',
          recommendedTime: '01:00 PM',
          duration: 50,
          estimatedCost: 4,
          location: 'Jl. Suweta, Ubud',
          coordinates: { lat: -8.5042, lng: 115.2612 },
          distanceFromPrevious: 10.0,
          travelTimeFromPrevious: 25,
          difficultyLevel: 'easy',
          image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80',
          tags: ['Budget Friendly', 'Home Cooking'],
          isFavorite: false,
          description: 'Hearty fried tempeh, steamed long beans with peanut dressing, and fresh iced lime tea in a tranquil backyard.',
        }
      },
      {
        id: 'act-3-3',
        title: 'Balinese Herbal Boreh Body Scrub & Massage',
        category: 'spa-wellness',
        recommendedTime: '03:30 PM',
        duration: 120,
        estimatedCost: 40,
        location: 'Karsa Spa, Bangkiang Sidem',
        coordinates: { lat: -8.4890, lng: 115.2530 },
        distanceFromPrevious: 3.5,
        travelTimeFromPrevious: 12,
        difficultyLevel: 'easy',
        image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=600&q=80',
        tags: ['Spa', 'Wellness', 'Holistic'],
        isFavorite: true,
        description: 'Traditional clove, nutmeg, and ginger paste body mask followed by warm frangipani flower bath overlooking rice paddies.',
        budgetAlternative: {
          id: 'act-3-3-alt',
          title: 'Traditional Reflexology at Ubud Village Spa',
          category: 'spa-wellness',
          recommendedTime: '03:30 PM',
          duration: 60,
          estimatedCost: 12,
          location: 'Jl. Hanoman No. 22',
          distanceFromPrevious: 3.0,
          travelTimeFromPrevious: 10,
          difficultyLevel: 'easy',
          image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=600&q=80',
          tags: ['Foot Massage', 'Value Spa'],
          isFavorite: false,
          description: 'Thorough, invigorating 60-minute foot and shoulder reflexology session with natural coconut oil.',
        }
      }
    ]
  },
  {
    id: 'day-4',
    dayNumber: 4,
    date: '2026-05-13',
    title: 'Southern Cliffs, Coastal Breakers & Sunset Temple',
    theme: 'Ocean Breezes, Golden Hour & Cliffside Fire Dance',
    estimatedCost: 70,
    travelTime: 95,
    walkingDistance: 4.8,
    tips: [
      'Book Uluwatu Kecak tickets in advance or arrive by 4:45 PM for good amphitheater seats.',
      'Keep sunglasses and hats tucked away near the Uluwatu cliff monkeys.'
    ],
    accommodation: SAMPLE_ACCOMMODATION,
    activities: [
      {
        id: 'act-4-1',
        title: 'Padang Padang Beach Hidden Cove Swim',
        category: 'beaches',
        recommendedTime: '10:00 AM',
        duration: 150,
        estimatedCost: 10,
        location: 'Pecatu, South Kuta',
        coordinates: { lat: -8.8111, lng: 115.1039 },
        distanceFromPrevious: 35.0,
        travelTimeFromPrevious: 60,
        difficultyLevel: 'easy',
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
        tags: ['Beach', 'Swimming', 'Sunbathing'],
        isFavorite: true,
        description: 'Descend through a natural limestone hollow to reach golden sands, gentle surfing waves, and coconut stands.',
      },
      {
        id: 'act-4-2',
        title: 'Grilled Seafood Lunch on Jimbaran Beach',
        category: 'fine-dining',
        recommendedTime: '01:30 PM',
        duration: 90,
        estimatedCost: 28,
        location: 'Jimbaran Bay, Badung',
        coordinates: { lat: -8.7750, lng: 115.1630 },
        distanceFromPrevious: 8.5,
        travelTimeFromPrevious: 20,
        difficultyLevel: 'easy',
        image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80',
        tags: ['Seafood', 'Beachfront', 'Lunch'],
        isFavorite: false,
        description: 'Fresh grilled snapper seasoned with Balinese sea salt and coconut husk smoke, served feet in the sand.',
        budgetAlternative: {
          id: 'act-4-2-alt',
          title: 'Jimbaran Traditional Fish Market Grill Stalls',
          category: 'street-food',
          recommendedTime: '01:30 PM',
          duration: 60,
          estimatedCost: 8,
          location: 'Kedonganan Fish Market',
          distanceFromPrevious: 7.5,
          travelTimeFromPrevious: 18,
          difficultyLevel: 'easy',
          image: 'https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=600&q=80',
          tags: ['Market Food', 'Fresh Seafood', 'Budget Friendly'],
          isFavorite: false,
          description: 'Buy fish straight from fishermen and pay 20k IDR ($1.30) to have it grilled on coconut husks beside the docks.',
        }
      },
      {
        id: 'act-4-3',
        title: 'Uluwatu Cliffside Temple & Kecak Fire Dance',
        category: 'temples',
        recommendedTime: '05:30 PM',
        duration: 120,
        estimatedCost: 25,
        location: 'Uluwatu, Pecatu',
        coordinates: { lat: -8.8290, lng: 115.0849 },
        distanceFromPrevious: 12.0,
        travelTimeFromPrevious: 25,
        difficultyLevel: 'easy',
        image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80',
        tags: ['Sunset', 'Culture', 'Performance'],
        isFavorite: true,
        description: 'Fifty chanting vocalists perform the Ramayana epic on an open-air stage 70 meters above crashing waves at sunset.',
      }
    ]
  },
  {
    id: 'day-5',
    dayNumber: 5,
    date: '2026-05-14',
    title: 'Artisan Markets & Farewell Sunset',
    theme: 'Local Crafts, Coffee Tasting & Departure Memories',
    estimatedCost: 50,
    travelTime: 60,
    walkingDistance: 3.5,
    tips: [
      'Bargaining at Ubud Art Market is customary — negotiate with a friendly smile!',
      'Allow at least 2.5 hours before international flight departures from Ngurah Rai.'
    ],
    accommodation: SAMPLE_ACCOMMODATION,
    activities: [
      {
        id: 'act-5-1',
        title: 'Ubud Traditional Art Market Handicraft Walk',
        category: 'shopping',
        recommendedTime: '09:00 AM',
        duration: 120,
        estimatedCost: 25,
        location: 'Jl. Raya Ubud No.35',
        coordinates: { lat: -8.5068, lng: 115.2627 },
        distanceFromPrevious: 0,
        travelTimeFromPrevious: 0,
        difficultyLevel: 'easy',
        image: 'https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=600&q=80',
        tags: ['Souvenirs', 'Handmade', 'Art'],
        isFavorite: false,
        description: 'Browse handwoven rattan bags, linen dresses, brass jewelry, and carved wooden bowls made by local craftspeople.',
      },
      {
        id: 'act-5-2',
        title: 'Specialty Luwak & Single Origin Coffee Tasting',
        category: 'cafes',
        recommendedTime: '12:00 PM',
        duration: 60,
        estimatedCost: 15,
        location: 'Seniman Coffee Studio, Ubud',
        coordinates: { lat: -8.5048, lng: 115.2638 },
        distanceFromPrevious: 0.8,
        travelTimeFromPrevious: 5,
        difficultyLevel: 'easy',
        image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=600&q=80',
        tags: ['Coffee', 'Tasting', 'Relaxation'],
        isFavorite: false,
        description: 'Experience siphon, aeropress, and cold brew flights highlighting beans grown on volcanic slopes of Mount Batur.',
      },
      {
        id: 'act-5-3',
        title: 'Farewell Sunset Drinks & Departure Transfer',
        category: 'scenic-viewpoints',
        recommendedTime: '04:00 PM',
        duration: 90,
        estimatedCost: 10,
        location: 'La Brisa Beach Club or Direct Airport Shuttle',
        coordinates: { lat: -8.7467, lng: 115.1668 },
        distanceFromPrevious: 25.0,
        travelTimeFromPrevious: 50,
        difficultyLevel: 'easy',
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
        tags: ['Departure', 'Sunset', 'Farewell'],
        isFavorite: false,
        description: 'Raise a final toast to the Island of the Gods as you head to the departure terminal with unforgettable memories.',
      }
    ]
  }
];

export function createSampleItinerary(): Itinerary {
  const totalCost = 340; // activities cost
  const hotelCost = 120 * 4; // 4 nights = 480
  const total = totalCost + hotelCost;
  const budgetCat = getBudgetCategory(total / 5);

  return {
    id: 'itinerary-bali-5d',
    title: 'Soulful Bali: Temples, Waterfalls & Coastal Sunsets',
    destination: 'Bali',
    country: 'Indonesia',
    startDate: '2026-05-10',
    endDate: '2026-05-14',
    travelers: {
      adults: 2,
      children: 0,
      type: 'couple',
    },
    totalEstimatedCost: total,
    currency: 'USD',
    budgetStatus: 'on-track',
    budgetCategory: budgetCat,
    travelStyles: ['nature', 'food', 'culture', 'wellness', 'relaxation'],
    accommodationSummary: 'Komaneka at Monkey Forest (4 nights)',
    weatherSummary: 'Sunny & Warm, 28°C / 82°F with pleasant ocean breezes',
    days: SAMPLE_BALI_DAYS,
    budgetBreakdown: calculateBudgetBreakdown(total, budgetCat),
  };
}

export function generateItineraryFromPreferences(prefs: TripPreferences): Itinerary {
  // Calculate day count
  const start = new Date(prefs.startDate || '2026-06-01');
  const end = new Date(prefs.endDate || '2026-06-05');
  const dayCount = Math.max(1, Math.min(7, Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1));
  
  const destName = prefs.destination || 'Bali';
  const destCountry = prefs.destinationCountry || 'Indonesia';
  
  const days: ItineraryDay[] = [];
  const baseDailyCost = prefs.budget?.dailyBudget || 80;

  for (let i = 0; i < dayCount; i++) {
    const dayDate = new Date(start);
    dayDate.setDate(dayDate.getDate() + i);
    const dateStr = dayDate.toISOString().split('T')[0];

    // Pick activities from sample days with wrap-around
    const templateDay = SAMPLE_BALI_DAYS[i % SAMPLE_BALI_DAYS.length];
    
    // Filter activities count based on pace:
    let acts = [...templateDay.activities];
    if (prefs.pace === 'slow') {
      acts = acts.slice(0, 2);
    } else if (prefs.pace === 'packed') {
      acts = [...acts, {
        id: `extra-act-${i}`,
        title: `Night Exploration & Stargazing at ${destName}`,
        category: 'nightlife',
        recommendedTime: '09:00 PM',
        duration: 90,
        estimatedCost: 15,
        location: `${destName} Center`,
        difficultyLevel: 'easy',
        image: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=600&q=80',
        tags: ['Night', 'Social', 'Drinks'],
        isFavorite: false,
        description: 'Immerse in the evening vibe with live music and local signature beverages.',
      }];
    }

    days.push({
      id: `day-${i + 1}`,
      dayNumber: i + 1,
      date: dateStr,
      title: i === 0 ? `Arrival & ${destName} Welcome` : (i === dayCount - 1 ? `Artisan Highlights & Farewell ${destName}` : templateDay.title),
      theme: templateDay.theme,
      estimatedCost: Math.round(baseDailyCost * 0.7),
      travelTime: templateDay.travelTime,
      walkingDistance: templateDay.walkingDistance,
      tips: templateDay.tips,
      accommodation: prefs.budget?.category === 'budget' ? BUDGET_ACCOMMODATION : SAMPLE_ACCOMMODATION,
      activities: acts.map(a => ({ ...a, id: `${a.id}-d${i}` })),
    });
  }

  const estActivityTotal = days.reduce((sum, d) => sum + d.estimatedCost, 0);
  const accomDaily = (prefs.budget?.category === 'budget' ? 28 : 110);
  const estTotal = (estActivityTotal + (accomDaily * (dayCount - 1 || 1))) * (prefs.travelers?.adults || 1);
  const totalBudget = prefs.budget?.amount || (baseDailyCost * dayCount * (prefs.travelers?.adults || 1));
  
  let budgetStatus: 'under' | 'on-track' | 'over' = 'on-track';
  if (estTotal < totalBudget * 0.9) budgetStatus = 'under';
  else if (estTotal > totalBudget * 1.1) budgetStatus = 'over';

  const category = prefs.budget?.category || getBudgetCategory(estTotal / dayCount);

  return {
    id: `itinerary-${Date.now()}`,
    title: `${destName} Tailored Journey: ${prefs.travelStyles?.slice(0, 2).map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' & ') || 'Culture & Relaxation'}`,
    destination: destName,
    country: destCountry,
    startDate: prefs.startDate || '2026-06-01',
    endDate: prefs.endDate || '2026-06-05',
    travelers: prefs.travelers || { adults: 2, children: 0, type: 'couple' },
    totalEstimatedCost: estTotal,
    currency: prefs.budget?.currency || 'USD',
    budgetStatus,
    budgetCategory: category,
    travelStyles: prefs.travelStyles || ['nature', 'culture', 'food'],
    accommodationSummary: `${prefs.budget?.category === 'budget' ? BUDGET_ACCOMMODATION.name : SAMPLE_ACCOMMODATION.name} (${dayCount - 1 || 1} nights)`,
    weatherSummary: 'Sunny & Pleasant, 27°C / 81°F with clear skies',
    days,
    budgetBreakdown: calculateBudgetBreakdown(estTotal, category),
  };
}
