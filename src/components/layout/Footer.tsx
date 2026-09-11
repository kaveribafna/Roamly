import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Heart, ArrowUpRight, ShieldCheck } from 'lucide-react';


export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#12372A] text-[#F5EBDD] border-t border-emerald-900/60 pt-16 pb-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-emerald-800/40">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#F28C28] flex items-center justify-center text-[#12372A] shadow-md">
                <Compass className="w-5 h-5" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-white">
                Roamly
              </span>
            </div>
            <p className="text-sm text-[#F5EBDD]/75 leading-relaxed max-w-sm">
              An immersive travel itinerary and budget-planning platform designed like a fine digital magazine. Personalized day-by-day journeys crafted around your time, passions, and wallet.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#A8C3A0]">
              <ShieldCheck className="w-4 h-4 text-[#F28C28]" />
              <span>Independent travel curation • Zero sponsored bias</span>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h4 className="font-serif text-sm font-semibold tracking-wider uppercase text-white mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs text-[#F5EBDD]/80">
              <li>
                <Link to="/" className="hover:text-[#F28C28] transition-colors">
                  World Destinations
                </Link>
              </li>
              <li>
                <Link to="/plan" className="hover:text-[#F28C28] transition-colors">
                  Itinerary Wizard
                </Link>
              </li>
              <li>
                <Link to="/staycations" className="hover:text-[#F28C28] transition-colors">
                  Boutique Staycations
                </Link>
              </li>
              <li>
                <Link to="/destinations" className="hover:text-[#F28C28] transition-colors">
                  Seasonal Guides
                </Link>
              </li>
              <li>
                <Link to="/saved" className="hover:text-[#F28C28] transition-colors">
                  Saved Trips & Bucket List
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Travel Styles */}
          <div>
            <h4 className="font-serif text-sm font-semibold tracking-wider uppercase text-white mb-4">
              Travel Moods
            </h4>
            <ul className="space-y-2.5 text-xs text-[#F5EBDD]/80">
              <li className="flex items-center gap-1.5">
                <span>🧘</span>
                <span>Wellness & Spa Retreats</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span>🍜</span>
                <span>Culinary & Night Markets</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span>🏔️</span>
                <span>High Alpine & Glaciers</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span>💰</span>
                <span>Backpacker & Budget Hacks</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span>🌴</span>
                <span>Eco-Lodges & Slow Living</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h4 className="font-serif text-sm font-semibold tracking-wider uppercase text-white mb-3">
              The Dispatch
            </h4>
            <p className="text-xs text-[#F5EBDD]/70 leading-relaxed mb-3">
              Weekly handpicked hidden gems, secret flight bargains, and slow travel essays.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-3 py-2 text-xs bg-emerald-900/40 border border-emerald-700/50 rounded-xl text-white placeholder-emerald-400/50 focus:outline-none focus:ring-1 focus:ring-[#F28C28]"
              />
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-1.5 px-3 py-2 bg-[#F28C28] hover:bg-[#d47112] text-white text-xs font-bold rounded-xl transition-all shadow-sm"
              >
                <span>Subscribe Free</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom copyright & disclaimer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#F5EBDD]/60">
          <p>© {new Date().getFullYear()} Roamly Journeys Ltd. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Crafted for mindful travelers worldwide with</span>
            <Heart className="w-3.5 h-3.5 text-[#F28C28] fill-current" />
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:underline cursor-pointer">Privacy Notice</span>
            <span className="hover:underline cursor-pointer">Terms of Service</span>
            <span className="hover:underline cursor-pointer">API</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
