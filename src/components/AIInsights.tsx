import React, { useState } from 'react';
import { Brain, TrendingUp, TrendingDown, AlertTriangle, Target, Lightbulb, PieChart, BarChart3 } from 'lucide-react';
import { currentUser, expenses, investments } from '../data/mockData';

const AIInsights: React.FC = () => {
  const [selectedInsight, setSelectedInsight] = useState('spending');

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const budgetUsed = (totalExpenses / currentUser.monthlyBudget) * 100;

  // Calculate spending by category
  const categorySpending = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {} as Record<string, number>);

  const insights = {
    spending: [
      {
        type: 'warning',
        icon: AlertTriangle,
        title: 'High Food Spending',
        message: 'You\'ve spent 45% of your budget on food this month. Consider meal planning to reduce costs.',
        suggestion: 'Try cooking at home 3 more days per week to save ₹500-800 monthly.',
        impact: '₹600 potential savings'
      },
      {
        type: 'positive',
        icon: TrendingUp,
        title: 'Great Transport Management',
        message: 'Your transport costs are 20% below average for your area.',
        suggestion: 'Keep using public transport and carpooling with friends.',
        impact: 'Saving ₹300 monthly'
      },
      {
        type: 'neutral',
        icon: Target,
        title: 'Budget Progress',
        message: `You've used ${budgetUsed.toFixed(1)}% of your monthly budget.`,
        suggestion: 'You\'re on track! Maintain current spending to finish within budget.',
        impact: `₹${(currentUser.monthlyBudget - totalExpenses).toLocaleString()} remaining`
      }
    ],
    savings: [
      {
        type: 'positive',
        icon: TrendingUp,
        title: 'Consistent Saver',
        message: `Your ${currentUser.streaks.saver}-day saving streak is impressive!`,
        suggestion: 'Consider increasing your monthly savings target by ₹500.',
        impact: '₹6,000 extra annually'
      },
      {
        type: 'suggestion',
        icon: Lightbulb,
        title: 'Automation Opportunity',
        message: 'Set up automatic transfers to maximize your savings potential.',
        suggestion: 'Auto-save ₹1,000 on every salary/allowance day.',
        impact: '₹12,000 annual savings'
      }
    ],
    investments: [
      {
        type: 'positive',
        icon: TrendingUp,
        title: 'Portfolio Performance',
        message: 'Your investments are up 6.2% this month, beating student average of 3.1%.',
        suggestion: 'Consider increasing your monthly SIP by ₹500.',
        impact: 'Potential ₹15,000 extra in 2 years'
      },
      {
        type: 'suggestion',
        icon: Lightbulb,
        title: 'Diversification Tip',
        message: 'Your portfolio is heavily weighted in stocks. Consider adding more gold ETFs.',
        suggestion: 'Allocate 20% to gold for better risk management.',
        impact: 'Reduced portfolio volatility'
      }
    ]
  };

  const getInsightColor = (type: string) => {
    const colors = {
      positive: 'text-green-600 bg-green-50 border-green-200',
      warning: 'text-orange-600 bg-orange-50 border-orange-200',
      neutral: 'text-blue-600 bg-blue-50 border-blue-200',
      suggestion: 'text-purple-600 bg-purple-50 border-purple-200'
    };
    return colors[type as keyof typeof colors] || 'text-gray-600 bg-gray-50 border-gray-200';
  };

  const getIconColor = (type: string) => {
    const colors = {
      positive: 'text-green-600',
      warning: 'text-orange-600',
      neutral: 'text-blue-600',
      suggestion: 'text-purple-600'
    };
    return colors[type as keyof typeof colors] || 'text-gray-600';
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 flex items-center">
          <Brain className="w-8 h-8 text-purple-600 mr-3" />
          AI Financial Insights
        </h1>
        <p className="text-gray-600">Personalized recommendations based on your spending habits</p>
      </div>

      {/* Insight Categories */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        <button
          onClick={() => setSelectedInsight('spending')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            selectedInsight === 'spending'
              ? 'bg-white text-purple-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Spending Analysis
        </button>
        <button
          onClick={() => setSelectedInsight('savings')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            selectedInsight === 'savings'
              ? 'bg-white text-purple-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Savings Tips
        </button>
        <button
          onClick={() => setSelectedInsight('investments')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            selectedInsight === 'investments'
              ? 'bg-white text-purple-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Investment Advice
        </button>
      </div>

      {/* AI Insights */}
      <div className="space-y-4">
        {insights[selectedInsight as keyof typeof insights].map((insight, index) => {
          const Icon = insight.icon;
          
          return (
            <div
              key={index}
              className={`border rounded-xl p-6 ${getInsightColor(insight.type)}`}
            >
              <div className="flex items-start">
                <div className={`p-3 rounded-full mr-4 ${getInsightColor(insight.type)}`}>
                  <Icon className={`w-6 h-6 ${getIconColor(insight.type)}`} />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{insight.title}</h3>
                  <p className="text-gray-700 mb-3">{insight.message}</p>
                  <p className="text-gray-700 mb-3 font-medium">{insight.suggestion}</p>
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getInsightColor(insight.type)}`}>
                    <span>{insight.impact}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Spending Breakdown Chart */}
      {selectedInsight === 'spending' && (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <PieChart className="w-5 h-5 mr-2" />
            Spending Breakdown
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Object.entries(categorySpending).map(([category, amount]) => {
              const percentage = (amount / totalExpenses) * 100;
              return (
                <div key={category} className="text-center">
                  <div className="mb-2">
                    <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-r from-purple-400 to-blue-500 flex items-center justify-center text-white font-bold">
                      {percentage.toFixed(0)}%
                    </div>
                  </div>
                  <p className="font-medium text-gray-900 capitalize">{category}</p>
                  <p className="text-sm text-gray-600">₹{amount.toLocaleString()}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Monthly Trends */}
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <BarChart3 className="w-5 h-5 mr-2" />
          Financial Health Score
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-3 rounded-full bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-center">
              <span className="text-2xl font-bold text-white">85</span>
            </div>
            <h4 className="font-medium text-gray-900">Budgeting</h4>
            <p className="text-sm text-gray-600">Excellent control</p>
          </div>
          
          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-3 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center">
              <span className="text-2xl font-bold text-white">92</span>
            </div>
            <h4 className="font-medium text-gray-900">Saving</h4>
            <p className="text-sm text-gray-600">Outstanding habit</p>
          </div>
          
          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-3 rounded-full bg-gradient-to-r from-purple-400 to-purple-600 flex items-center justify-center">
              <span className="text-2xl font-bold text-white">78</span>
            </div>
            <h4 className="font-medium text-gray-900">Investing</h4>
            <p className="text-sm text-gray-600">Good progress</p>
          </div>
        </div>
      </div>

      {/* Personalized Goals */}
      <div className="bg-gradient-to-r from-purple-500 to-blue-600 p-6 rounded-xl text-white">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Target className="w-5 h-5 mr-2" />
          AI-Recommended Goals
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between bg-white bg-opacity-20 p-3 rounded-lg">
            <span>Save ₹15,000 by March 2025</span>
            <span className="text-sm">83% likely to achieve</span>
          </div>
          <div className="flex items-center justify-between bg-white bg-opacity-20 p-3 rounded-lg">
            <span>Reduce food spending by 15%</span>
            <span className="text-sm">92% likely to achieve</span>
          </div>
          <div className="flex items-center justify-between bg-white bg-opacity-20 p-3 rounded-lg">
            <span>Start ₹2,000 monthly SIP</span>
            <span className="text-sm">76% likely to achieve</span>
          </div>
        </div>
        <button className="mt-4 bg-white text-purple-600 px-4 py-2 rounded-lg font-medium hover:bg-purple-50 transition-colors">
          Set These Goals
        </button>
      </div>
    </div>
  );
};

export default AIInsights;