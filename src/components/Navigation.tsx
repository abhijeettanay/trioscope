import React from 'react';
import { 
  Home, 
  CreditCard, 
  Users, 
  TrendingUp, 
  Briefcase, 
  PiggyBank, 
  HandHeart, 
  Flame, 
  Percent, 
  Brain,
  Smartphone,
  MessageSquare,
  Calendar
} from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'budget', label: 'Budget', icon: CreditCard },
    { id: 'ai', label: 'AI Insights', icon: Brain },
    { id: 'payments', label: 'Payments', icon: Smartphone },
    { id: 'split', label: 'Split Bills', icon: Users },
    { id: 'group', label: 'Group Fund', icon: PiggyBank },
    { id: 'subscriptions', label: 'Subscriptions', icon: Calendar },
    { id: 'gigs', label: 'Gigs', icon: Briefcase },
    { id: 'invest', label: 'Invest', icon: TrendingUp },
    { id: 'loans', label: 'Loans', icon: HandHeart },
    { id: 'streaks', label: 'Streaks', icon: Flame },
    { id: 'offers', label: 'Offers', icon: Percent },
     { id: 'feedback', label: 'Feedback', icon: MessageSquare }, 
    
  ];

  return (
    <nav className="bg-white shadow-lg border-t border-gray-200 fixed bottom-0 left-0 right-0 z-50 md:relative md:border-t-0 md:border-r md:min-h-screen md:w-64">
      <div className="flex md:flex-col md:p-4 overflow-x-auto md:overflow-visible">
        {navItems.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onTabChange(id)}
            className={`flex flex-col md:flex-row items-center justify-center md:justify-start p-3 md:p-3 md:mb-2 rounded-lg transition-all duration-200 min-w-[80px] md:min-w-0 ${
              activeTab === id
                ? 'text-purple-600 bg-purple-50 md:bg-gradient-to-r md:from-purple-500 md:to-blue-600 md:text-white'
                : 'text-gray-600 hover:text-purple-600 hover:bg-gray-50'
            }`}
          >
            <Icon className="w-5 h-5 mb-1 md:mb-0 md:mr-3" />
            <span className="text-xs md:text-sm font-medium">{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;