import React, { useState } from 'react';
import { Plus, TrendingDown, Filter, PieChart, Target } from 'lucide-react';
import { useProfile } from '../hooks/useProfile';
import { useExpenses } from '../hooks/useExpenses';
import { useBudgetCategories } from '../hooks/useBudgetCategories';

const Budget: React.FC = () => {
  const { profile } = useProfile();
  const { expenses, addExpense } = useExpenses();
  const { categories } = useBudgetCategories();
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [newExpense, setNewExpense] = useState({
    title: '',
    amount: '',
    category: 'food' as const,
  });
  
  const categoriesFilter = ['all', 'food', 'transport', 'entertainment', 'study', 'other'];
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const totalAllocated = categories.reduce((sum, cat) => sum + cat.allocated, 0);
  const totalSpent = categories.reduce((sum, cat) => sum + cat.spent, 0);
  const budgetRemaining = (profile?.monthly_budget || 0) - totalExpenses;
  const budgetUsed = profile ? (totalExpenses / profile.monthly_budget) * 100 : 0;

  const filteredExpenses = selectedCategory === 'all' 
    ? expenses 
    : expenses.filter(expense => expense.category === selectedCategory);

  const handleAddExpense = async () => {
    if (!newExpense.title || !newExpense.amount) return;

    try {
      await addExpense({
        title: newExpense.title,
        amount: parseFloat(newExpense.amount),
        category: newExpense.category,
        date: new Date().toISOString().split('T')[0],
      });
      
      setNewExpense({ title: '', amount: '', category: 'food' });
      setShowAddExpense(false);
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };

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
            <h3 className="text-lg font-semibold text-gray-900">Total Budget</h3>
            <PieChart className="w-6 h-6 text-purple-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900 mb-2">₹{totalAllocated.toLocaleString()}</p>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-orange-400 to-orange-600 h-3 rounded-full" 
              style={{ width: `${Math.min((totalSpent / totalAllocated) * 100, 100)}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 mt-2">{((totalSpent / totalAllocated) * 100).toFixed(1)}% used</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Total Spent</h3>
            <TrendingDown className="w-6 h-6 text-red-500" />
          </div>
          <p className="text-3xl font-bold text-red-600 mb-2">₹{totalSpent.toLocaleString()}</p>
          <p className="text-sm text-gray-600">This month</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Remaining</h3>
            <div className={`p-2 rounded-full ${(totalAllocated - totalSpent) >= 0 ? 'bg-green-100' : 'bg-red-100'}`}>
              <TrendingDown className={`w-6 h-6 ${(totalAllocated - totalSpent) >= 0 ? 'text-green-500' : 'text-red-500'}`} />
            </div>
          </div>
          <p className={`text-3xl font-bold mb-2 ${(totalAllocated - totalSpent) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            ₹{Math.abs(totalAllocated - totalSpent).toLocaleString()}
          </p>
          <p className="text-sm text-gray-600">{(totalAllocated - totalSpent) >= 0 ? 'Left to spend' : 'Over budget'}</p>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Budget Categories</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const percentage = (category.spent / category.allocated) * 100;
            const isOverBudget = category.spent > category.allocated;
            
            return (
              <div key={category.id} className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">{category.icon}</span>
                    <h4 className="font-semibold text-gray-900">{category.name}</h4>
                  </div>
                  <Target className="w-5 h-5 text-gray-400" />
                </div>
                
                <div className="mb-3">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>₹{category.spent.toLocaleString()}</span>
                    <span>₹{category.allocated.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full transition-all duration-300 ${
                        isOverBudget 
                          ? 'bg-gradient-to-r from-red-500 to-red-600' 
                          : percentage > 80 
                            ? 'bg-gradient-to-r from-orange-400 to-orange-600'
                            : 'bg-gradient-to-r from-green-400 to-green-600'
                      }`}
                      style={{ width: `${Math.min(percentage, 100)}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className={`text-sm font-medium ${
                    isOverBudget ? 'text-red-600' : 
                    percentage > 80 ? 'text-orange-600' : 'text-green-600'
                  }`}>
                    {percentage.toFixed(1)}% used
                  </span>
                  <span className="text-sm text-gray-600">
                    ₹{(category.allocated - category.spent).toLocaleString()} left
                  </span>
                </div>
                
                {isOverBudget && (
                  <div className="mt-2 p-2 bg-red-100 border border-red-200 rounded text-xs text-red-800">
                    ⚠️ Over budget by ₹{(category.spent - category.allocated).toLocaleString()}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        
        <div className="mt-6 flex justify-center">
          <button className="bg-gradient-to-r from-purple-500 to-blue-600 text-white px-6 py-2 rounded-lg hover:from-purple-600 hover:to-blue-700 transition-all">
            Adjust Budgets
          </button>
        </div>
      </div>

      {/* Quick Budget Actions */}
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="p-4 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors">
            <div className="text-center">
              <div className="text-2xl mb-2">🍽️</div>
              <p className="text-sm font-medium text-purple-800">Add to Canteen</p>
            </div>
          </button>
          <button className="p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors">
            <div className="text-center">
              <div className="text-2xl mb-2">🚌</div>
              <p className="text-sm font-medium text-blue-800">Add Transport</p>
            </div>
          </button>
          <button className="p-4 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors">
            <div className="text-center">
              <div className="text-2xl mb-2">📚</div>
              <p className="text-sm font-medium text-green-800">Add Study</p>
            </div>
          </button>
          <button className="p-4 bg-orange-50 border border-orange-200 rounded-lg hover:bg-orange-100 transition-colors">
            <div className="text-center">
              <div className="text-2xl mb-2">🎉</div>
              <p className="text-sm font-medium text-orange-800">Add Outing</p>
            </div>
          </button>
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
              {categoriesFilter.slice(1).map(category => (
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
                value={newExpense.title}
                onChange={(e) => setNewExpense(prev => ({ ...prev, title: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
              <input
                type="number"
                placeholder="Amount"
                value={newExpense.amount}
                onChange={(e) => setNewExpense(prev => ({ ...prev, amount: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
              <select 
                value={newExpense.category}
                onChange={(e) => setNewExpense(prev => ({ ...prev, category: e.target.value as any }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              >
                <option>Select category</option>
                {categoriesFilter.slice(1).map(category => (
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
                  onClick={handleAddExpense}
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