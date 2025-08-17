export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  totalSavings: number;
  monthlyBudget: number;
  points: number;
  streaks: {
    saver: number;
    budgeting: number;
  };
}

export interface Expense {
  id: string;
  title: string;
  amount: number;
  category: 'food' | 'transport' | 'entertainment' | 'study' | 'other';
  date: string;
  userId: string;
}

export interface SplitBill {
  id: string;
  title: string;
  totalAmount: number;
  participants: string[];
  paidBy: string;
  date: string;
  settled: boolean;
}

export interface GroupFund {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  contributors: { userId: string; amount: number }[];
  deadline: string;
  description: string;
}

export interface Gig {
  id: string;
  title: string;
  company: string;
  hourlyRate: number;
  type: 'teaching' | 'coding' | 'design' | 'writing' | 'other';
  location: string;
  requirements: string[];
}

export interface Investment {
  id: string;
  type: 'gold' | 'stocks' | 'mutual_fund' | 'crypto';
  symbol: string;
  amount: number;
  currentValue: number;
  change: number;
  changePercent: number;
}

export interface Loan {
  id: string;
  amount: number;
  borrower: string;
  lender: string;
  interestRate: number;
  dueDate: string;
  status: 'active' | 'paid' | 'overdue';
  description: string;
}

export interface Offer {
  id: string;
  brand: string;
  title: string;
  discount: string;
  category: 'food' | 'shopping' | 'entertainment' | 'travel';
  validUntil: string;
  code?: string;
}