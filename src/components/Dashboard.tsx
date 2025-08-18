import React from 'react';
import { TrendingUp, TrendingDown, Users, Target, Flame, Award } from 'lucide-react';
import { currentUser, expenses, investments, groupFunds } from '../data/mockData';

const Dashboard: React.FC = () => {
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const totalInvestments = investments.reduce((sum, inv) => sum + inv.currentValue, 0);
  const budgetUsed = (totalExpenses / currentUser.monthlyBudget) * 100;

  const recentExpenses = expenses.slice(0, 3);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, {currentUser.name.split(' ')[0]}!</h1>
          <p className="text-gray-600">Here's your financial overview</p>
        </div>
        <img 
          src={currentUser.avatar} 
          alt="Profile" 
          className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-400 to-blue-500 flex items-center justify-center text-white font-bold border-2 border-purple-200"
        />
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-400 to-blue-500 flex items-center justify-center text-white font-bold border-2 border-purple-200">
          {currentUser.name.split(' ').map(n => n[0]).join('').toUpperCase()}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-purple-500 to-blue-600 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100">Total Savings</p>
              <p className="text-2xl font-bold">₹{currentUser.totalSavings.toLocaleString()}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-purple-200" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">Monthly Budget</p>
              <p className="text-2xl font-bold text-gray-900">₹{currentUser.monthlyBudget.toLocaleString()}</p>
              <div className="mt-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-orange-400 to-orange-600 h-2 rounded-full" 
                    style={{ width: `${Math.min(budgetUsed, 100)}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-500 mt-1">{budgetUsed.toFixed(1)}% used</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">Investments</p>
              <p className="text-2xl font-bold text-gray-900">₹{totalInvestments.toLocaleString()}</p>
              <div className="flex items-center mt-1">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <p className="text-sm text-green-600">+8.2% this month</p>
              </div>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">Points</p>
              <p className="text-2xl font-bold text-gray-900">{currentUser.points}</p>
              <div className="flex items-center mt-1">
                <Award className="w-4 h-4 text-yellow-500 mr-1" />
                <p className="text-sm text-yellow-600">Level 5</p>
              </div>
            </div>
            <div className="bg-yellow-100 p-3 rounded-full">
              <Award className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Expenses */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Expenses</h3>
          <div className="space-y-3">
            {recentExpenses.map((expense) => (
              <div key={expense.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{expense.title}</p>
                  <p className="text-sm text-gray-600">{expense.category} • {expense.date}</p>
                </div>
                <p className="font-semibold text-red-600">-₹{expense.amount}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Streaks */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Streaks</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
              <div className="flex items-center">
                <Flame className="w-6 h-6 text-orange-500 mr-3" />
                <div>
                  <p className="font-medium text-gray-900">Saver Streak</p>
                  <p className="text-sm text-gray-600">Days saving money</p>
                </div>
              </div>
              <p className="text-2xl font-bold text-orange-600">{currentUser.streaks.saver}</p>
            </div>

            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
              <div className="flex items-center">
                <Target className="w-6 h-6 text-purple-500 mr-3" />
                <div>
                  <p className="font-medium text-gray-900">Budget Streak</p>
                  <p className="text-sm text-gray-600">Days within budget</p>
                </div>
              </div>
              <p className="text-2xl font-bold text-purple-600">{currentUser.streaks.budgeting}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Active Group Funds */}
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Active Group Funds</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {groupFunds.slice(0, 2).map((fund) => {
            const progress = (fund.currentAmount / fund.targetAmount) * 100;
            return (
              <div key={fund.id} className="p-4 bg-gradient-to-r from-teal-50 to-blue-50 rounded-lg border border-teal-100">
                <h4 className="font-medium text-gray-900 mb-2">{fund.title}</h4>
                <div className="mb-2">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>₹{fund.currentAmount.toLocaleString()}</span>
                    <span>₹{fund.targetAmount.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-teal-500 to-blue-600 h-2 rounded-full" 
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>
                <p className="text-sm text-gray-600">{progress.toFixed(1)}% complete</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;