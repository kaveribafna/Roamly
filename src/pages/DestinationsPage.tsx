import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Compass,
  Search,
  Star,
  ArrowRight,
} from 'lucide-react';

import { POPULAR_DESTINATIONS } from '../data/destinations';
import { formatCurrency } from '../utils/formatters';
import { useTripStore } from '../store/useTripStore';

export const DestinationsPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContinent, setSelectedContinent] = useState('All');
  const currency = useTripStore((state) => state.currency);
  const setPreferences = useTripStore((state) => state.setPreferences);

  const continents = ['All', 'Asia', 'Europe', 'Americas', 'Africa', 'Oceania'];

  const filteredDestinations = POPULAR_DESTINATIONS.filter((d) => {
    const matchesSearch =
      d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesContinent =
      selectedContinent === 'All' || d.continent === selectedContinent;
    return matchesSearch && matchesContinent;
  });

  const handlePlanDestination = (name: string, country: string) => {
    setPreferences({ destination: name, destinationCountry: country });
    navigate('/plan');
  };

  return (
    <div className="min-h-screen bg-[#FAFAF7] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-left max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5EBDD] border border-[#E6D5BE] text-xs font-bold uppercase text-[#12372A]">
            <Compass className="w-3.5 h-3.5 text-[#F28C28]" />
            <span>World Catalog</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-[#12372A]">
            Explore Handpicked World Destinations
          </h1>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            From the serene cedar mist of Kyoto to alpine glacier peaks in Zermatt, explore comprehensive destination profiles with average daily spending metrics and optimal seasons.
          </p>
        </div>

        {/* Search & Continent Filters */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search city, country, vibe..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-[#F5EBDD] text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#F28C28]"
            />
          </div>

          {/* Continent Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 scrollbar-none">
            {continents.map((continent) => (
              <button
                key={continent}
                type="button"
                onClick={() => setSelectedContinent(continent)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                  selectedContinent === continent
                    ? 'bg-[#12372A] text-white shadow-xs'
                    : 'bg-white border border-[#F5EBDD] text-gray-700 hover:bg-gray-50'
                }`}
              >
                {continent}
              </button>
            ))}
          </div>
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredDestinations.map((dest) => (
            <div
              key={dest.id}
              className="group rounded-3xl bg-white border border-[#F5EBDD] overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between text-left"
            >
              {/* Image & Overlay */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-bold text-white">
                  <Star className="w-3 h-3 text-[#F28C28] fill-current" />
                  <span>{dest.rating}</span>
                </div>

                <div className="absolute bottom-3 left-3 text-white">
                  <h3 className="font-serif text-xl font-bold">{dest.name}</h3>
                  <p className="text-[11px] text-[#F5EBDD]/80">{dest.country}</p>
                </div>
              </div>

              {/* Card Details */}
              <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                    {dest.description}
                  </p>

                  <div className="space-y-1 pt-1">
                    <span className="text-[10px] uppercase font-bold text-gray-400 block">
                      Signature Highlights
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {dest.highlights.slice(0, 2).map((h, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] bg-[#FAFAF7] border border-[#F5EBDD] px-2 py-0.5 rounded-md text-gray-700 font-medium"
                        >
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-3 pt-3 border-t border-gray-100">
                  <div className="flex items-center justify-between text-xs">
                    <div>
                      <span className="text-[10px] text-gray-400 block font-semibold">Avg Daily</span>
                      <span className="font-bold text-[#12372A]">
                        {formatCurrency(dest.averageDailyBudget, currency)}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-gray-400 block font-semibold">Season</span>
                      <span className="font-semibold text-gray-700">{dest.bestSeason}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handlePlanDestination(dest.name, dest.country)}
                    className="w-full py-2.5 rounded-xl bg-[#F5EBDD]/80 hover:bg-[#12372A] text-[#12372A] hover:text-[#F5EBDD] font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-1.5"
                  >
                    <span>Plan {dest.name}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
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
