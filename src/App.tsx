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
      <main className="flex-1 pb-20 md:pb-0">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;