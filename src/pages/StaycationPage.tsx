import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Palmtree,
  Star,
  MapPin,
  ArrowRight,
} from 'lucide-react';


import { STAYCATION_RETREATS } from '../data/staycations';
import { formatCurrency } from '../utils/formatters';
import { useTripStore } from '../store/useTripStore';

export const StaycationPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState<string>('all');
  const currency = useTripStore((state) => state.currency);
  const setPreferences = useTripStore((state) => state.setPreferences);

  const filterOptions = [
    { id: 'all', label: 'All Sanctuaries' },
    { id: 'eco-lodge', label: 'Eco-Lodges' },
    { id: 'beach-resort', label: 'Beach Resorts' },
    { id: 'mountain-retreat', label: 'Mountain Retreats' },
    { id: 'workation', label: 'Workation Hubs' },
    { id: 'wellness-resort', label: 'Wellness Spas' },
    { id: 'farm-stay', label: 'Artisan Farms' },
  ];

  const filteredRetreats = STAYCATION_RETREATS.filter((stay) => {
    if (selectedType === 'all') return true;
    return stay.preferenceType === selectedType;
  });

  const handleBookStaycation = (retreat: typeof STAYCATION_RETREATS[0]) => {
    setPreferences({
      destination: 'Bali',
      destinationCountry: 'Indonesia',
      accommodationType: ['staycation', retreat.type],
      staycationPreferences: [retreat.preferenceType],
      staycationDetails: {
        comfortLevel: 'comfortable',
        preferredLocation: retreat.location,
        nights: 3,
        mustHaveFacilities: retreat.amenities,
        breakfastIncluded: true,
        poolOrSpa: true,
        workspaceRequired: retreat.workationScore > 90,
        accessibilityNeeds: [],
      },
    });
    navigate('/plan');
  };

  return (
    <div className="min-h-screen bg-[#FAFAF7] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Editorial Header */}
        <div className="text-left max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5EBDD] border border-[#E6D5BE] text-xs font-bold uppercase text-[#12372A]">
            <Palmtree className="w-3.5 h-3.5 text-[#F28C28]" />
            <span>Near & Remote Escapes</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-[#12372A]">
            Curated Staycations & Wellness Sanctuaries
          </h1>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            Recharge without the stress of cross-continental flights. Discover tranquil bamboo treehouses, high-speed workation villas, and mountain cedar spas.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {filterOptions.map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => setSelectedType(opt.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                selectedType === opt.id
                  ? 'bg-[#12372A] text-[#F5EBDD] shadow-sm'
                  : 'bg-white border border-[#F5EBDD] text-gray-700 hover:bg-gray-50'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Retreats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRetreats.map((stay) => (
            <div
              key={stay.id}
              className="group rounded-3xl bg-white border border-[#F5EBDD] overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between text-left"
            >
              {/* Image & Badges */}
              <div className="relative h-60 overflow-hidden">
                <img
                  src={stay.image}
                  alt={stay.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Rating Badge */}
                <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-bold text-white">
                  <Star className="w-3 h-3 text-[#F28C28] fill-current" />
                  <span>{stay.rating}</span>
                </div>

                {/* Tagline on image */}
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#F28C28] block">
                    {stay.tagline}
                  </span>
                  <h3 className="font-serif text-lg font-bold leading-tight">{stay.name}</h3>
                </div>
              </div>

              {/* Content Info */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                    <span className="truncate">{stay.location}</span>
                  </div>

                  <p className="text-xs text-gray-600 leading-relaxed line-clamp-2">
                    {stay.description}
                  </p>

                  {/* Amenities Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {stay.amenities.slice(0, 3).map((amenity, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-lg bg-[#FAFAF7] border border-[#F5EBDD] text-[10px] font-semibold text-gray-700"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Price & Plan Button */}
                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-gray-400 block">From</span>
                    <span className="font-serif text-xl font-bold text-[#12372A]">
                      {formatCurrency(stay.pricePerNight, currency)}
                    </span>
                    <span className="text-[10px] text-gray-400"> / night</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleBookStaycation(stay)}
                    className="px-4 py-2.5 rounded-xl bg-[#12372A] hover:bg-[#1a4d3a] text-white text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
                  >
                    <span>Plan Stay</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#F28C28]" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
