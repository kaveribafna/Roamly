import React from 'react';
import { TrendingDown } from 'lucide-react';
import type { BudgetBreakdown, BudgetCategory } from '../../types';
import { formatCurrency } from '../../utils/formatters';
import { formatBudgetPercentage } from '../../utils/budget';


interface BudgetSummaryCardProps {
  totalEstimatedCost: number;
  currency: string;
  budgetStatus: 'under' | 'on-track' | 'over';
  budgetCategory: BudgetCategory;
  budgetBreakdown: BudgetBreakdown;
  isBudgetMode: boolean;
  onToggleBudgetMode: () => void;
}

export const BudgetSummaryCard: React.FC<BudgetSummaryCardProps> = ({
  totalEstimatedCost,
  currency,
  budgetStatus,
  budgetCategory,
  budgetBreakdown,
  isBudgetMode,
  onToggleBudgetMode,
}) => {
  const categories = [
    { key: 'accommodation', label: 'Accommodation', color: 'bg-emerald-700', amount: budgetBreakdown.accommodation },
    { key: 'food', label: 'Dining & Cafes', color: 'bg-amber-600', amount: budgetBreakdown.food },
    { key: 'activities', label: 'Activities & Tours', color: 'bg-sky-600', amount: budgetBreakdown.activities },
    { key: 'transportation', label: 'Transportation', color: 'bg-indigo-600', amount: budgetBreakdown.transportation },
    { key: 'shopping', label: 'Markets & Crafts', color: 'bg-rose-500', amount: budgetBreakdown.shopping },
    { key: 'emergencyBuffer', label: 'Buffer Reserve', color: 'bg-gray-400', amount: budgetBreakdown.emergencyBuffer },
  ];

  return (
    <div className="p-6 rounded-3xl bg-white border border-[#F5EBDD] shadow-sm space-y-6 text-left">
      {/* ─── Header: Total & Status ───────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-gray-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-bold text-gray-400 tracking-wider">
              Total Estimated Cost
            </span>
            <span
              className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                budgetStatus === 'under'
                  ? 'bg-emerald-100 text-emerald-800'
                  : budgetStatus === 'over'
                  ? 'bg-rose-100 text-rose-800'
                  : 'bg-amber-100 text-amber-900'
              }`}
            >
              {budgetStatus === 'under' ? 'Under Budget' : budgetStatus === 'over' ? 'Over Target' : 'On Track'}
            </span>
          </div>
          <p className="font-serif text-3xl sm:text-4xl font-extrabold text-[#12372A] mt-1">
            {formatCurrency(totalEstimatedCost, currency)}
          </p>
        </div>

        {/* ─── Cheaper Alternatives Toggle (Budget Traveler Mode) ─────────── */}
        <div className="p-3 rounded-2xl bg-[#FAFAF7] border border-[#F5EBDD] flex items-center justify-between sm:justify-start gap-4">
          <div>
            <span className="text-xs font-bold text-[#12372A] block leading-tight">
              Cheaper Alternatives
            </span>
            <span className="text-[10px] text-gray-500 block">
              {isBudgetMode ? 'Budget mode active' : 'Swap expensive items'}
            </span>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={isBudgetMode}
            onClick={onToggleBudgetMode}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
              isBudgetMode ? 'bg-[#F28C28]' : 'bg-gray-300'
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                isBudgetMode ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>

      {/* ─── Visual Segmented Progress Bar ────────────────────────────────── */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-bold text-gray-600">
          <span>Allocation Breakdown</span>
          <span className="text-[#F28C28] capitalize">{budgetCategory} Profile</span>
        </div>

        <div className="w-full h-3 rounded-full bg-gray-100 overflow-hidden flex">
          {categories.map((cat) => {
            const pct = (cat.amount / budgetBreakdown.total) * 100;
            return (
              <div
                key={cat.key}
                style={{ width: `${pct}%` }}
                className={`${cat.color} h-full transition-all duration-500`}
                title={`${cat.label}: ${formatCurrency(cat.amount, currency)} (${Math.round(pct)}%)`}
              />
            );
          })}
        </div>
      </div>

      {/* ─── Detailed Category Grid ───────────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
        {categories.map((cat) => {
          return (
            <div key={cat.key} className="p-3 rounded-xl bg-[#FAFAF7] border border-[#F5EBDD]/70 space-y-1">
              <div className="flex items-center gap-1.5 text-gray-500">
                <span className={`w-2.5 h-2.5 rounded-full ${cat.color} shrink-0`} />
                <span className="text-[11px] font-medium truncate">{cat.label}</span>
              </div>
              <p className="font-bold text-[#12372A] text-sm">
                {formatCurrency(cat.amount, currency)}
              </p>
              <p className="text-[10px] text-gray-400">
                {formatBudgetPercentage(cat.amount, budgetBreakdown.total)} of total
              </p>
            </div>
          );
        })}
      </div>

      {/* Money-Saving Insight Note */}
      {isBudgetMode && (
        <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center gap-2">
          <TrendingDown className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>
            <strong>Budget Mode Active:</strong> Swapped to family homestay, free ridge walks, and authentic warung dining. Saved ~40% overall!
          </span>
        </div>
      )}
    </div>
  );
};
