import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  MapPin,
  Star,
  Quote,
  CheckCircle2,
  TrendingDown,
  Sliders,
} from 'lucide-react';

import { SceneContainer } from '../components/3d/SceneContainer';
import { POPULAR_DESTINATIONS, TRAVEL_TESTIMONIALS } from '../data/destinations';
import { TRAVEL_STYLES } from '../utils/constants';
import { useTripStore } from '../store/useTripStore';
import { formatCurrency } from '../utils/formatters';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [quickDest, setQuickDest] = useState('');
  const setPreferences = useTripStore((state) => state.setPreferences);
  const currency = useTripStore((state) => state.currency);

  const handleStartPlanning = (destination?: string) => {
    if (destination) {
      setPreferences({ destination });
    }
    navigate('/plan');
  };

  return (
    <div className="min-h-screen bg-[#FAFAF7]">
      {/* ─── Hero Section ─────────────────────────────────────────────────── */}
      <section className="relative pt-6 pb-20 lg:pt-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Headline & Content */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F5EBDD] border border-[#E6D5BE] text-[#12372A] text-xs font-bold tracking-wider uppercase shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#F28C28]" />
               <span>TRIPS TAILORED • MOMENTS TO REMEMBER</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#12372A] leading-[1.12]">
                Your next <span className="italic font-serif text-[#F28C28]">unforgettable</span> journey starts here.
              </h1>

              <p className="text-base sm:text-lg text-[#1D2521]/80 leading-relaxed max-w-xl">
                Create a personalized itinerary around your time, interests, and budget. From secluded jungle staycations to budget-saving street food trails, explore the world on your terms.
              </p>

              {/* Quick Destination Search Box */}
              <div className="p-2.5 sm:p-3 rounded-2xl bg-white/90 border border-[#F5EBDD] shadow-xl backdrop-blur-md max-w-lg">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleStartPlanning(quickDest || 'Bali');
                  }}
                  className="flex flex-col sm:flex-row items-center gap-2"
                >
                  <div className="flex items-center gap-2.5 px-3 py-2 w-full text-sm text-[#1D2521]">
                    <MapPin className="w-5 h-5 text-[#F28C28] shrink-0" />
                    <input
                      type="text"
                      value={quickDest}
                      onChange={(e) => setQuickDest(e.target.value)}
                      placeholder="Where do you want to wander? (e.g. Bali, Kyoto...)"
                      className="w-full bg-transparent focus:outline-none text-sm placeholder:text-gray-400 font-medium"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#12372A] hover:bg-[#1a4d3a] text-[#F5EBDD] text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 shrink-0"
                  >
                    <span>Plan My Trip</span>
                    <ArrowRight className="w-4 h-4 text-[#F28C28]" />
                  </button>
                </form>
              </div>

              {/* Quick Highlights / Proof Points */}
              <div className="pt-2 flex flex-wrap items-center gap-6 text-xs text-[#1D2521]/75">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#12372A]" />
                  <span>Real-time budget breakdown</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <TrendingDown className="w-4 h-4 text-[#F28C28]" />
                  <span>Cheaper alternatives mode</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Sliders className="w-4 h-4 text-[#2E86AB]" />
                  <span>Drag & swap day schedules</span>
                </div>
              </div>
            </div>

            {/* Right 3D Scene */}
            <div className="lg:col-span-6 relative">
              <SceneContainer
                onSelectDestination={(destName) => {
                  setQuickDest(destName);
                  handleStartPlanning(destName);
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── How Roamly Works ──────────────────────────────────────────────── */}
      <section className="py-20 bg-white border-y border-[#F5EBDD]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-2xl mx-auto space-y-3 mb-16">
            <span className="text-xs uppercase tracking-widest font-bold text-[#F28C28]">
              Effortless Intelligence
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#12372A]">
              How Roamly crafts your perfect journey
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              Forget 40 open browser tabs. We synthesize flights, stays, daily routes, and wallet-friendly alternatives into one seamless magazine-style plan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {/* Step 1 */}
            <div className="relative p-8 rounded-3xl bg-[#FAFAF7] border border-[#F5EBDD] shadow-sm hover:shadow-md transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-[#12372A] text-[#F5EBDD] flex items-center justify-center font-serif text-xl font-bold mb-6 group-hover:bg-[#F28C28] group-hover:text-white transition-colors">
                01
              </div>
              <h3 className="font-serif text-xl font-bold text-[#12372A] mb-3">
                Select Vibe & Budget
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Choose your destination, travel pace (slow, balanced, or packed), companion type, and comfort tier. Set your target budget in any currency.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative p-8 rounded-3xl bg-[#FAFAF7] border border-[#F5EBDD] shadow-sm hover:shadow-md transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-[#2E86AB] text-white flex items-center justify-center font-serif text-xl font-bold mb-6 group-hover:bg-[#12372A] transition-colors">
                02
              </div>
              <h3 className="font-serif text-xl font-bold text-[#12372A] mb-3">
                Intelligent Daily Synthesis
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Receive an editorial day-by-day plan with morning, lunch, afternoon, and evening activities optimized by proximity and estimated transit time.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative p-8 rounded-3xl bg-[#FAFAF7] border border-[#F5EBDD] shadow-sm hover:shadow-md transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-[#F28C28] text-white flex items-center justify-center font-serif text-xl font-bold mb-6 group-hover:bg-[#12372A] transition-colors">
                03
              </div>
              <h3 className="font-serif text-xl font-bold text-[#12372A] mb-3">
                Fine-Tune & Save Money
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Toggle "Show cheaper alternatives" to discover hidden warungs and free walking vistas. Drag, customize, export to PDF or share with travel buddies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Featured Destinations ─────────────────────────────────────────── */}
      <section id="destinations" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="text-left space-y-2">
              <span className="text-xs uppercase tracking-widest font-bold text-[#F28C28]">
                Curated Escapes
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#12372A]">
                Featured Global Destinations
              </h2>
              <p className="text-sm text-gray-600 max-w-xl">
                Explore handpicked world spots with estimated daily budgets, optimal travel windows, and signature experiences.
              </p>
            </div>
            <button
              type="button"
              onClick={() => navigate('/destinations')}
              className="inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-[#12372A] hover:text-[#F28C28] transition-colors self-start md:self-end"
            >
              <span>View All 8+ Guides</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {POPULAR_DESTINATIONS.slice(0, 4).map((dest) => (
              <div
                key={dest.id}
                className="group relative rounded-3xl overflow-hidden bg-white border border-[#F5EBDD] shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col"
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  
                  {/* Rating Tag */}
                  <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-bold text-[#F5EBDD]">
                    <Star className="w-3 h-3 text-[#F28C28] fill-current" />
                    <span>{dest.rating}</span>
                  </div>

                  {/* Destination Info on Image */}
                  <div className="absolute bottom-3 left-3 text-white text-left">
                    <h3 className="font-serif text-xl font-bold leading-none">{dest.name}</h3>
                    <p className="text-[11px] text-[#F5EBDD]/80 mt-1">{dest.country}</p>
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4 text-left">
                  <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                    {dest.description}
                  </p>

                  <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-[10px] uppercase text-gray-400 block font-semibold">Avg Daily</span>
                      <span className="font-bold text-[#12372A]">
                        {formatCurrency(dest.averageDailyBudget, currency)}/day
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] uppercase text-gray-400 block font-semibold">Best Season</span>
                      <span className="font-semibold text-gray-700">{dest.bestSeason}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleStartPlanning(dest.name)}
                    className="w-full py-2.5 rounded-xl bg-[#F5EBDD]/70 hover:bg-[#12372A] text-[#12372A] hover:text-[#F5EBDD] font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-1.5"
                  >
                    <span>Plan {dest.name} Trip</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Travel Styles Selector Grid ─────────────────────────────────── */}
      <section className="py-20 bg-[#F5EBDD]/30 border-t border-[#F5EBDD]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-xl mx-auto space-y-2 mb-12">
            <span className="text-xs uppercase tracking-widest font-bold text-[#F28C28]">
              Personalized Vibes
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#12372A]">
              What kind of journey inspires you?
            </h2>
            <p className="text-xs sm:text-sm text-gray-600">
              Filter and design around what sparks your curiosity. Combine multiple styles in our planner.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {TRAVEL_STYLES.map((style) => (
              <button
                key={style.id}
                type="button"
                onClick={() => {
                  setPreferences({ travelStyles: [style.id as any] });
                  navigate('/plan');
                }}
                className="p-5 rounded-2xl bg-white border border-[#F5EBDD] hover:border-[#F28C28] hover:shadow-md transition-all text-center group cursor-pointer"
              >
                <div className="text-3xl mb-2 group-hover:scale-115 transition-transform duration-300">
                  {style.emoji}
                </div>
                <h4 className="text-xs font-bold text-[#12372A] group-hover:text-[#F28C28] transition-colors">
                  {style.label}
                </h4>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Testimonials ─────────────────────────────────────────────────── */}
      <section className="py-24 bg-white border-t border-[#F5EBDD]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto space-y-2 mb-16">
            <span className="text-xs uppercase tracking-widest font-bold text-[#F28C28]">
              Real Traveler Stories
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#12372A]">
              Loved by solo wanderers, couples & families
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {TRAVEL_TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className="p-8 rounded-3xl bg-[#FAFAF7] border border-[#F5EBDD] flex flex-col justify-between space-y-6"
              >
                <Quote className="w-8 h-8 text-[#F28C28]/40" />
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed italic">
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-11 h-11 rounded-full object-cover border-2 border-white shadow-sm"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-[#12372A]">{t.name}</h4>
                    <p className="text-[11px] text-[#F28C28] font-medium">{t.tripType}</p>
                    <p className="text-[10px] text-gray-400">{t.destination}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Bottom CTA Banner ────────────────────────────────────────────── */}
      <section className="py-20 bg-gradient-to-r from-[#12372A] to-[#1a4d3a] text-[#F5EBDD] text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 relative z-10">
          <span className="text-xs uppercase tracking-widest font-bold text-[#F28C28]">
            Your Adventure Awaits
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight">
            Ready to design your personalized itinerary?
          </h2>
          <p className="text-sm sm:text-base text-[#F5EBDD]/80 max-w-xl mx-auto">
            Take our 2-minute trip planner quiz. Get tailored day-by-day schedules, staycation sanctuaries, and realistic budget alternatives.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => handleStartPlanning()}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#F28C28] hover:bg-[#d47112] text-white font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-xl hover:scale-105 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Start Planning Free</span>
            </button>
            <button
              type="button"
              onClick={() => navigate('/staycations')}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs uppercase tracking-wider transition-all"
            >
              <span>Explore Staycations</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
