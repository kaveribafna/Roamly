import { useNavigate } from 'react-router-dom';
import {
  Bookmark,
  Calendar,
  MapPin,
  Trash2,
  ArrowRight,
  Sparkles,
  Compass,
} from 'lucide-react';


import { useTripStore } from '../store/useTripStore';
import { formatCurrency, formatDateRange } from '../utils/formatters';

export const SavedTripsPage: React.FC = () => {
  const navigate = useNavigate();
  const savedTrips = useTripStore((state) => state.savedTrips);
  const removeSavedTrip = useTripStore((state) => state.removeSavedTrip);
  const setActiveItinerary = useTripStore((state) => state.setActiveItinerary);
  const currency = useTripStore((state) => state.currency);

  const handleOpenTrip = (trip: typeof savedTrips[0]) => {
    setActiveItinerary(trip.itinerary);
    navigate('/itinerary');
  };

  return (
    <div className="min-h-screen bg-[#FAFAF7] py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-left max-w-xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5EBDD] border border-[#E6D5BE] text-xs font-bold uppercase text-[#12372A]">
            <Bookmark className="w-3.5 h-3.5 text-[#F28C28]" />
            <span>Personal Travel Vault</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#12372A]">
            Saved Trips & Itineraries
          </h1>
          <p className="text-xs sm:text-sm text-gray-600">
            Access your custom created itineraries and review day schedules anytime.
          </p>
        </div>

        {/* Empty State */}
        {savedTrips.length === 0 ? (
          <div className="p-12 rounded-3xl bg-white border border-[#F5EBDD] text-center space-y-5 max-w-lg mx-auto shadow-xs">
            <div className="w-16 h-16 rounded-3xl bg-[#F5EBDD] text-[#12372A] flex items-center justify-center mx-auto">
              <Compass className="w-8 h-8 text-[#F28C28]" />
            </div>
            <div className="space-y-2">
              <h3 className="font-serif text-xl font-bold text-[#12372A]">
                Your travel vault is empty
              </h3>
              <p className="text-xs text-gray-500 max-w-sm mx-auto leading-relaxed">
                Save your customized itineraries from the planner or browse our featured destinations to start compiling your journey.
              </p>
            </div>
            <button
              type="button"
              onClick={() => navigate('/plan')}
              className="px-6 py-3 rounded-full bg-[#12372A] hover:bg-[#1a4d3a] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md inline-flex items-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#F28C28]" />
              <span>Plan Your First Trip</span>
            </button>
          </div>
        ) : (
          /* Saved Trips Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedTrips.map((item) => {
              const itin = item.itinerary;
              const firstAct = itin.days[0]?.activities[0];
              const previewImg =
                firstAct?.image ||
                'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80';

              return (
                <div
                  key={item.id}
                  className="group rounded-3xl bg-white border border-[#F5EBDD] overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between text-left"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={previewImg}
                      alt={itin.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    <div className="absolute top-3 right-3">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeSavedTrip(item.id);
                        }}
                        className="p-2 rounded-full bg-black/40 hover:bg-rose-600 text-white backdrop-blur-md transition-colors"
                        title="Delete saved trip"
                        aria-label="Delete trip"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="absolute bottom-3 left-3 text-white">
                      <span className="text-[10px] uppercase font-bold text-[#F28C28] block">
                        {itin.days.length} Days Itinerary
                      </span>
                      <h3 className="font-serif text-lg font-bold leading-snug">{itin.title}</h3>
                    </div>
                  </div>

                  <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-2 text-xs text-gray-600">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-gray-400" />
                        <span>{itin.destination}, {itin.country}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-gray-400" />
                        <span>{formatDateRange(itin.startDate, itin.endDate)}</span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-gray-400 block">
                          Est. Total
                        </span>
                        <span className="font-serif text-lg font-bold text-[#12372A]">
                          {formatCurrency(itin.totalEstimatedCost, currency)}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleOpenTrip(item)}
                        className="px-4 py-2 rounded-xl bg-[#12372A] hover:bg-[#1a4d3a] text-white text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
                      >
                        <span>Open Trip</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#F28C28]" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
