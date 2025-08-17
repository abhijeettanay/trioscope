import { User, Expense, SplitBill, GroupFund, Gig, Investment, Loan, Offer } from '../types';

export const users: User[] = [
  {
    id: '1',
    name: 'Akanksha ',
    email: 'akanksha@college.edu',
    avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    totalSavings: 15420,
    monthlyBudget: 8000,
    points: 850,
    streaks: { saver: 12, budgeting: 8 }
  },
  {
    id: '2',
    name: 'Abhijeet ',
    email: 'abhijeet@college.edu',
    avatar: 'https://www.pexels.com/photo/grey-decor-tied-with-white-string-1111322/',
    totalSavings: 12300,
    monthlyBudget: 7500,
    points: 720,
    streaks: { saver: 9, budgeting: 15 }
  },
  {
    id: '3',
    name: 'Abinesh ',
    email: 'abinesh@college.edu',
    avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    totalSavings: 9850,
    monthlyBudget: 6500,
    points: 640,
    streaks: { saver: 6, budgeting: 11 }
  },
  {
    id: '4',
    name: 'Anuva Gupta',
    email: 'anuva@college.edu',
    avatar: 'https://images.pexels.com/photos/3814446/pexels-photo-3814446.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    totalSavings: 18200,
    monthlyBudget: 9000,
    points: 920,
    streaks: { saver: 18, budgeting: 13 }
  }
];

export const currentUser = users[0];

export const expenses: Expense[] = [
  { id: '1', title: 'Lunch at campus cafeteria', amount: 120, category: 'food', date: '2025-01-10', userId: '1' },
  { id: '2', title: 'Bus fare to internship', amount: 45, category: 'transport', date: '2025-01-10', userId: '1' },
  { id: '3', title: 'Movie ticket', amount: 250, category: 'entertainment', date: '2025-01-09', userId: '1' },
  { id: '4', title: 'Textbooks', amount: 800, category: 'study', date: '2025-01-08', userId: '1' },
];

export const splitBills: SplitBill[] = [
  { id: '1', title: 'Pizza night', totalAmount: 800, participants: ['1', '2', '3'], paidBy: '2', date: '2025-01-09', settled: false },
  { id: '2', title: 'Uber to mall', totalAmount: 180, participants: ['1', '4'], paidBy: '1', date: '2025-01-08', settled: true },
];

export const groupFunds: GroupFund[] = [
  {
    id: '1',
    title: "Abhijeet's Birthday Party",
    targetAmount: 2000,
    currentAmount: 1200,
    contributors: [
      { userId: '1', amount: 400 },
      { userId: '3', amount: 300 },
      { userId: '4', amount: 500 }
    ],
    deadline: '2025-01-25',
    description: 'Birthday celebration at city mall'
  },
  {
    id: '2',
    title: 'Group Trip to Goa',
    targetAmount: 15000,
    currentAmount: 8500,
    contributors: [
      { userId: '1', amount: 2000 },
      { userId: '2', amount: 2500 },
      { userId: '3', amount: 2000 },
      { userId: '4', amount: 2000 }
    ],
    deadline: '2025-03-15',
    description: 'Spring break trip planning'
  }
];

export const gigs: Gig[] = [
  {
    id: '1',
    title: 'Math Tutor for High School',
    company: 'EduTech Solutions',
    hourlyRate: 300,
    type: 'teaching',
    location: 'Online/Hybrid',
    requirements: ['Strong math background', 'Good communication', 'Flexible schedule']
  },
  {
    id: '2',
    title: 'Frontend Developer Intern',
    company: 'TechStart Inc.',
    hourlyRate: 250,
    type: 'coding',
    location: 'Remote',
    requirements: ['React knowledge', 'HTML/CSS', 'Portfolio required']
  },
  {
    id: '3',
    title: 'Content Writer',
    company: 'Digital Marketing Co.',
    hourlyRate: 200,
    type: 'writing',
    location: 'Remote',
    requirements: ['Good English', 'Creative writing', 'SEO basics']
  }
];

export const investments: Investment[] = [
  { id: '1', type: 'gold', symbol: 'GOLD', amount: 5000, currentValue: 5250, change: 250, changePercent: 5.0 },
  { id: '2', type: 'stocks', symbol: 'TCS', amount: 3000, currentValue: 3180, change: 180, changePercent: 6.0 },
  { id: '3', type: 'mutual_fund', symbol: 'HDFC_EQ', amount: 2000, currentValue: 1950, change: -50, changePercent: -2.5 },
];

export const loans: Loan[] = [
  {
    id: '1',
    amount: 2000,
    borrower: 'Abinesh Raj',
    lender: 'Akanksha Sharma',
    interestRate: 2,
    dueDate: '2025-02-15',
    status: 'active',
    description: 'Emergency medical expense'
  },
  {
    id: '2',
    amount: 1500,
    borrower: 'Akanksha Sharma',
    lender: 'Anuva Gupta',
    interestRate: 1,
    dueDate: '2025-01-30',
    status: 'active',
    description: 'Laptop repair cost'
  }
];

export const offers: Offer[] = [
  { id: '1', brand: 'Zomato', title: '50% off on orders above ₹200', discount: '50% OFF', category: 'food', validUntil: '2025-01-20', code: 'STUDENT50' },
  { id: '2', brand: 'Swiggy', title: 'Free delivery on all orders', discount: 'FREE DELIVERY', category: 'food', validUntil: '2025-01-25' },
  { id: '3', brand: 'Amazon', title: '₹500 off on electronics', discount: '₹500 OFF', category: 'shopping', validUntil: '2025-01-30', code: 'TECH500' },
  { id: '4', brand: 'BookMyShow', title: 'Buy 1 Get 1 Free on movie tickets', discount: 'BOGO', category: 'entertainment', validUntil: '2025-01-22' },
];