import React, { useState } from 'react';
import { Plus, TrendingDown, Filter, PieChart } from 'lucide-react';
import { currentUser, expenses } from '../data/mockData';

const Budget: React.FC = () => {
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const categories = ['all', 'food', 'transport', 'entertainment', 'study', 'other'];
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const budgetRemaining = currentUser.monthlyBudget - totalExpenses;
  const budgetUsed = (totalExpenses / currentUser.monthlyBudget) * 100;

  const filteredExpenses = selectedCategory === 'all' 
    ? expenses 
    : expenses.filter(expense => expense.category === selectedCategory);

  const categoryTotals = categories.slice(1).map(category => ({
    name: category,
    amount: expenses.filter(e => e.category === category).reduce((sum, e) => sum + e.amount, 0)
  }));

  const getCategoryColor = (category: string) => {
    const colors = {
      food: 'text-red-600 bg-red-50',
      transport: 'text-blue-600 bg-blue-50',
      entertainment: 'text-purple-600 bg-purple-50',
      study: 'text-green-600 bg-green-50',
      other: 'text-gray-600 bg-gray-50'
    };
    return colors[category as keyof typeof colors] || 'text-gray-600 bg-gray-50';
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Budget Tracker</h1>
          <p className="text-gray-600">Manage your monthly expenses</p>
        </div>
        <button
          onClick={() => setShowAddExpense(true)}
          className="bg-gradient-to-r from-purple-500 to-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:from-purple-600 hover:to-blue-700 transition-all"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Expense
        </button>
      </div>

      {/* Budget Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Monthly Budget</h3>
            <PieChart className="w-6 h-6 text-purple-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900 mb-2">₹{currentUser.monthlyBudget.toLocaleString()}</p>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-orange-400 to-orange-600 h-3 rounded-full" 
              style={{ width: `${Math.min(budgetUsed, 100)}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 mt-2">{budgetUsed.toFixed(1)}% used</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Total Spent</h3>
            <TrendingDown className="w-6 h-6 text-red-500" />
          </div>
          <p className="text-3xl font-bold text-red-600 mb-2">₹{totalExpenses.toLocaleString()}</p>
          <p className="text-sm text-gray-600">This month</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Remaining</h3>
            <div className={`p-2 rounded-full ${budgetRemaining >= 0 ? 'bg-green-100' : 'bg-red-100'}`}>
              <TrendingDown className={`w-6 h-6 ${budgetRemaining >= 0 ? 'text-green-500' : 'text-red-500'}`} />
            </div>
          </div>
          <p className={`text-3xl font-bold mb-2 ${budgetRemaining >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            ₹{Math.abs(budgetRemaining).toLocaleString()}
          </p>
          <p className="text-sm text-gray-600">{budgetRemaining >= 0 ? 'Left to spend' : 'Over budget'}</p>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Spending by Category</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {categoryTotals.map((category) => (
            <div key={category.name} className={`p-4 rounded-lg ${getCategoryColor(category.name)}`}>
              <p className="font-medium capitalize">{category.name}</p>
              <p className="text-2xl font-bold">₹{category.amount}</p>
              <p className="text-sm opacity-75">
                {totalExpenses > 0 ? ((category.amount / totalExpenses) * 100).toFixed(1) : 0}%
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Filter and Expenses List */}
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Recent Expenses</h3>
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-1 text-sm"
            >
              <option value="all">All Categories</option>
              {categories.slice(1).map(category => (
                <option key={category} value={category} className="capitalize">{category}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-3">
          {filteredExpenses.map((expense) => (
            <div key={expense.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center">
                <div className={`w-3 h-3 rounded-full mr-4 ${getCategoryColor(expense.category).split(' ')[1]}`}></div>
                <div>
                  <p className="font-medium text-gray-900">{expense.title}</p>
                  <p className="text-sm text-gray-600 capitalize">{expense.category} • {expense.date}</p>
                </div>
              </div>
              <p className="font-semibold text-red-600">₹{expense.amount}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Add Expense Modal */}
      {showAddExpense && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Expense</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Expense title"
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
              <input
                type="number"
                placeholder="Amount"
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
                <option>Select category</option>
                {categories.slice(1).map(category => (
                  <option key={category} value={category} className="capitalize">{category}</option>
                ))}
              </select>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowAddExpense(false)}
                  className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowAddExpense(false)}
                  className="flex-1 bg-gradient-to-r from-purple-500 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-purple-600 hover:to-blue-700 transition-all"
                >
                  Add Expense
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Budget;