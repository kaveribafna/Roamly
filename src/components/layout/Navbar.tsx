import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Compass,
  Bookmark,
  Sparkles,
  Menu,
  X,
  Eye,
  EyeOff,
  Coins,
} from 'lucide-react';
import { useTripStore } from '../../store/useTripStore';
import { CURRENCIES } from '../../utils/constants';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const savedTrips = useTripStore((state) => state.savedTrips);
  const currency = useTripStore((state) => state.currency);
  const setCurrency = useTripStore((state) => state.setCurrency);
  const reducedMotion = useTripStore((state) => state.reducedMotion);
  const setReducedMotion = useTripStore((state) => state.setReducedMotion);

  const navLinks = [
    { name: 'Discover', path: '/' },
    { name: 'Plan Trip', path: '/plan' },
    { name: 'Staycations', path: '/staycations' },
    { name: 'Destinations', path: '/destinations' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#F5EBDD] bg-[#FAFAF7]/85 backdrop-blur-md transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 group focus:outline-none"
            aria-label="Roamly Home"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#12372A] to-[#1a4d3a] flex items-center justify-center text-[#F5EBDD] shadow-md group-hover:scale-105 transition-transform duration-300">
              <Compass className="w-5 h-5 text-[#F28C28] group-hover:rotate-45 transition-transform duration-500" />
            </div>
            <div>
              <span className="font-serif text-2xl font-bold tracking-tight text-[#12372A] block leading-none">
                Roamly
              </span>
              <span className="text-[10px] tracking-widest uppercase font-semibold text-[#F28C28]">
                Curated Journeys
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 bg-[#F5EBDD]/40 p-1.5 rounded-full border border-[#F5EBDD]">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all ${
                    isActive
                      ? 'bg-[#12372A] text-[#F5EBDD] shadow-sm'
                      : 'text-[#1D2521]/75 hover:text-[#12372A] hover:bg-white/60'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Icons & Controls */}
          <div className="hidden md:flex items-center gap-3">
            {/* Currency Selector */}
            <div className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/70 border border-[#F5EBDD] text-xs font-medium text-[#1D2521]">
              <Coins className="w-3.5 h-3.5 text-[#F28C28]" />
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="bg-transparent text-xs font-semibold focus:outline-none cursor-pointer pr-1"
                aria-label="Select currency"
              >
                {CURRENCIES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.code} ({c.symbol})
                  </option>
                ))}
              </select>
            </div>

            {/* Reduced Motion Toggle */}
            <button
              type="button"
              onClick={() => setReducedMotion(!reducedMotion)}
              className={`p-2 rounded-full border transition-all text-xs flex items-center gap-1.5 ${
                reducedMotion
                  ? 'bg-amber-100 text-amber-900 border-amber-300'
                  : 'bg-white/70 text-gray-600 border-[#F5EBDD] hover:bg-white'
              }`}
              title={reducedMotion ? 'Reduced motion active' : 'Click to reduce motion'}
              aria-label="Toggle motion preference"
            >
              {reducedMotion ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              <span className="hidden lg:inline text-[11px] font-medium">
                {reducedMotion ? 'Motion Off' : '3D Motion'}
              </span>
            </button>

            {/* Saved Trips Bookmark */}
            <Link
              to="/saved"
              className="relative p-2.5 rounded-full bg-white/80 border border-[#F5EBDD] hover:bg-[#F5EBDD]/40 text-[#12372A] transition-all"
              aria-label="View saved trips"
            >
              <Bookmark className="w-4 h-4" />
              {savedTrips.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#F28C28] text-white text-[10px] font-bold flex items-center justify-center shadow-sm">
                  {savedTrips.length}
                </span>
              )}
            </Link>

            {/* Primary Action Button */}
            <Link
              to="/plan"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#12372A] hover:bg-[#1a4d3a] text-[#F5EBDD] text-xs font-bold tracking-wide uppercase transition-all duration-300 shadow-md hover:shadow-lg hover:scale-102"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#F28C28]" />
              <span>Create Plan</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <Link
              to="/saved"
              className="relative p-2 rounded-full bg-white border border-[#F5EBDD] text-[#12372A]"
            >
              <Bookmark className="w-4 h-4" />
              {savedTrips.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#F28C28] text-white text-[9px] font-bold flex items-center justify-center">
                  {savedTrips.length}
                </span>
              )}
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-white border border-[#F5EBDD] text-[#12372A]"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#F5EBDD] bg-[#FAFAF7] px-6 py-6 space-y-4 shadow-xl animate-in slide-in-from-top-3">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-3 rounded-xl text-sm font-semibold ${
                  location.pathname === link.path
                    ? 'bg-[#12372A] text-[#F5EBDD]'
                    : 'text-[#1D2521] hover:bg-[#F5EBDD]/40'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/saved"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-3 rounded-xl text-sm font-semibold text-[#1D2521] hover:bg-[#F5EBDD]/40 flex items-center justify-between"
            >
              <span>Saved Journeys</span>
              <span className="bg-[#F28C28] text-white text-xs px-2 py-0.5 rounded-full font-bold">
                {savedTrips.length}
              </span>
            </Link>
          </nav>

          <div className="pt-4 border-t border-[#F5EBDD] flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs">
              <span className="text-gray-500">Currency:</span>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="bg-white border border-[#F5EBDD] rounded-lg px-2 py-1 text-xs font-semibold"
              >
                {CURRENCIES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.code} ({c.symbol})
                  </option>
                ))}
              </select>
            </div>

            <button
              type="button"
              onClick={() => setReducedMotion(!reducedMotion)}
              className="text-xs px-3 py-1.5 rounded-lg border border-[#F5EBDD] bg-white flex items-center gap-1.5"
            >
              {reducedMotion ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              <span>{reducedMotion ? 'Motion Off' : '3D Motion'}</span>
            </button>
          </div>

          <Link
            to="/plan"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#12372A] text-[#F5EBDD] font-bold text-xs uppercase tracking-wider shadow-md"
          >
            <Sparkles className="w-4 h-4 text-[#F28C28]" />
            <span>Start Planning Trip</span>
          </Link>
        </div>
      )}
    </header>
  );
};
