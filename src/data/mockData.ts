import { User, Expense, SplitBill, GroupFund, Gig, Investment, Loan, Offer, Contact, Transaction, BudgetCategory, Subscription } from '../types';

export const users: User[] = [
  {
    id: '1',
    name: 'Akanksha ',
    email: 'akanksha@college.edu',
    avatar: '',
    totalSavings: 15420,
    monthlyBudget: 8000,
    points: 850,
    streaks: { saver: 12, budgeting: 8 }
  },
  {
    id: '2',
    name: 'Abhijeet ',
    email: 'abhijeet@college.edu',
    avatar: '',
    totalSavings: 12300,
    monthlyBudget: 7500,
    points: 720,
    streaks: { saver: 9, budgeting: 15 }
  },
  {
    id: '3',
    name: 'Abinesh ',
    email: 'abinesh@college.edu',
    avatar: '',
    totalSavings: 9850,
    monthlyBudget: 6500,
    points: 640,
    streaks: { saver: 6, budgeting: 11 }
  },
  {
    id: '4',
    name: 'Anuva Gupta',
    email: 'anuva@college.edu',
    avatar: '',
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

export const contacts: Contact[] = [
  { id: '1', name: 'Abhijeet', phone: '+91 98765 43210', upiId: 'abhijeet@paytm', isFrequent: true },
  { id: '2', name: 'Abinesh', phone: '+91 87654 32109', upiId: 'abinesh@gpay', isFrequent: true },
  { id: '3', name: 'Anuva Gupta', phone: '+91 76543 21098', upiId: 'anuva@phonepe', isFrequent: true },
  { id: '4', name: 'Rohit Kumar', phone: '+91 65432 10987', upiId: 'rohit@paytm', isFrequent: false },
  { id: '5', name: 'Priya Singh', phone: '+91 54321 09876', upiId: 'priya@gpay', isFrequent: false },
];

export const transactions: Transaction[] = [
  { id: '1', type: 'sent', amount: 500, contactId: '1', description: 'Lunch split', date: '2025-01-10', status: 'completed' },
  { id: '2', type: 'received', amount: 200, contactId: '2', description: 'Movie tickets', date: '2025-01-09', status: 'completed' },
  { id: '3', type: 'sent', amount: 150, contactId: '3', description: 'Coffee', date: '2025-01-08', status: 'pending' },
];

export const budgetCategories: BudgetCategory[] = [
  { id: '1', name: 'Canteen', allocated: 2000, spent: 1500, icon: '🍽️', color: 'bg-red-500' },
  { id: '2', name: 'Outings', allocated: 1500, spent: 800, icon: '🎉', color: 'bg-purple-500' },
  { id: '3', name: 'Transport', allocated: 800, spent: 450, icon: '🚌', color: 'bg-blue-500' },
  { id: '4', name: 'Study Materials', allocated: 1000, spent: 600, icon: '📚', color: 'bg-green-500' },
  { id: '5', name: 'Shopping', allocated: 1200, spent: 300, icon: '🛍️', color: 'bg-yellow-500' },
  { id: '6', name: 'Entertainment', allocated: 800, spent: 250, icon: '🎬', color: 'bg-pink-500' },
];

export const subscriptions: Subscription[] = [
  { id: '1', name: 'Netflix', amount: 199, billingCycle: 'monthly', nextBilling: '2025-01-25', status: 'active', autopay: true, category: 'entertainment', icon: '🎬' },
  { id: '2', name: 'Spotify', amount: 119, billingCycle: 'monthly', nextBilling: '2025-01-20', status: 'active', autopay: true, category: 'entertainment', icon: '🎵' },
  { id: '3', name: 'Adobe Creative', amount: 1675, billingCycle: 'monthly', nextBilling: '2025-02-01', status: 'active', autopay: false, category: 'productivity', icon: '🎨' },
  { id: '4', name: 'Coursera Plus', amount: 399, billingCycle: 'monthly', nextBilling: '2025-01-30', status: 'paused', autopay: false, category: 'education', icon: '🎓' },
];