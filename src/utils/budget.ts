import type { BudgetCategory, BudgetBreakdown, BudgetConfig } from '../types';

/** Budget allocation percentages by category */
const ALLOCATIONS: Record<BudgetCategory, BudgetBreakdown> = {
  budget: {
    accommodation: 0.30,
    food: 0.25,
    activities: 0.15,
    transportation: 0.15,
    shopping: 0.05,
    emergencyBuffer: 0.10,
    total: 1,
  },
  'mid-range': {
    accommodation: 0.35,
    food: 0.20,
    activities: 0.18,
    transportation: 0.12,
    shopping: 0.07,
    emergencyBuffer: 0.08,
    total: 1,
  },
  premium: {
    accommodation: 0.38,
    food: 0.18,
    activities: 0.20,
    transportation: 0.10,
    shopping: 0.08,
    emergencyBuffer: 0.06,
    total: 1,
  },
  luxury: {
    accommodation: 0.40,
    food: 0.15,
    activities: 0.22,
    transportation: 0.08,
    shopping: 0.10,
    emergencyBuffer: 0.05,
    total: 1,
  },
};

export function calculateBudgetBreakdown(
  totalBudget: number,
  category: BudgetCategory
): BudgetBreakdown {
  const alloc = ALLOCATIONS[category];
  return {
    accommodation: Math.round(totalBudget * alloc.accommodation),
    food: Math.round(totalBudget * alloc.food),
    activities: Math.round(totalBudget * alloc.activities),
    transportation: Math.round(totalBudget * alloc.transportation),
    shopping: Math.round(totalBudget * alloc.shopping),
    emergencyBuffer: Math.round(totalBudget * alloc.emergencyBuffer),
    total: totalBudget,
  };
}

export function getBudgetCategory(dailyBudget: number): BudgetCategory {
  if (dailyBudget <= 50) return 'budget';
  if (dailyBudget <= 150) return 'mid-range';
  if (dailyBudget <= 350) return 'premium';
  return 'luxury';
}

export function getBudgetLabel(category: BudgetCategory): string {
  const labels: Record<BudgetCategory, string> = {
    budget: 'Budget Traveler',
    'mid-range': 'Mid-Range Traveler',
    premium: 'Premium Traveler',
    luxury: 'Luxury Traveler',
  };
  return labels[category];
}

export function calculateTotalBudget(config: BudgetConfig, days: number): number {
  return config.dailyBudget * days * (config.perTraveler || 1);
}

export function getBudgetStatus(
  totalCost: number,
  totalBudget: number
): 'under' | 'on-track' | 'over' {
  const ratio = totalCost / totalBudget;
  if (ratio <= 0.9) return 'under';
  if (ratio <= 1.1) return 'on-track';
  return 'over';
}

export function formatBudgetPercentage(amount: number, total: number): string {
  if (total === 0) return '0%';
  return `${Math.round((amount / total) * 100)}%`;
}
