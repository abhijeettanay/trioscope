import React, { useState, useEffect } from 'react';
import React, { useState } from 'react';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import Budget from './components/Budget';
import Payments from './components/Payments';
import SplitBills from './components/SplitBills';
import GroupFunds from './components/GroupFunds';
import Subscriptions from './components/Subscriptions';
import Gigs from './components/Gigs';
import Investments from './components/Investments';
import Loans from './components/Loans';
import Streaks from './components/Streaks';
import Offers from './components/Offers';
import AIInsights from './components/AIInsights';
const APP_NAME = 'tripy'; // ← change this text


function App() {
  const [activeTab, setActiveTab] = useState('dashboard');


  const pretty = {
      dashboard: 'Dashboard',
      budget: 'Budget',
      payments: 'Payments',
      split: 'Split Bills',
      group: 'Group Funds',
      subscriptions: 'Subscriptions',
      gigs: 'Gigs',
      invest: 'Investments',
      loans: 'Loans',
      streaks: 'Streaks',
      offers: 'Offers',
      ai: 'AI Insights',
    };
    document.title = `${APP_NAME} — ${pretty[activeTab] || ''}`;
  }, [activeTab]);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'budget':
        return <Budget />;
      case 'payments':
        return <Payments />;
      case 'split':
        return <SplitBills />;
      case 'group':
        return <GroupFunds />;
      case 'subscriptions':
        return <Subscriptions />;
      case 'gigs':
        return <Gigs />;
      case 'invest':
        return <Investments />;
      case 'loans':
        return <Loans />;
      case 'streaks':
        return <Streaks />;
      case 'offers':
        return <Offers />;
      case 'ai':
        return <AIInsights />;
      default:
        return <Dashboard />;
    }
  };

 return (
  <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
    <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
    
    <div className="flex-1 flex flex-col">
      {/* App Title/Header */}
      <header className="bg-white border-b shadow-sm p-4">
        <h1 className="text-2xl font-bold text-gray-800">{APP_NAME}</h1>
      </header>

      {/* Main Content */}
      <main className="flex-1 pb-20 md:pb-0">
        {renderContent()}
      </main>
    </div>
  </div>
);
}

export default App;
