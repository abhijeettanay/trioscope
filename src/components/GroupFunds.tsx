import React, { useState } from 'react';
import { Plus, Calendar, Users, Target, TrendingUp } from 'lucide-react';
import { groupFunds, users } from '../data/mockData';

const GroupFunds: React.FC = () => {
  const [showCreateFund, setShowCreateFund] = useState(false);

  const getUserName = (userId: string) => {
    const user = users.find(u => u.id === userId);
    return user ? user.name : 'Unknown User';
  };

  const calculateDaysLeft = (deadline: string) => {
    const deadlineDate = new Date(deadline);
    const today = new Date();
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Group Funds</h1>
          <p className="text-gray-600">Save together for special events and goals</p>
        </div>
        <button
          onClick={() => setShowCreateFund(true)}
          className="bg-gradient-to-r from-purple-500 to-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:from-purple-600 hover:to-blue-700 transition-all"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Fund
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">Active Funds</p>
              <p className="text-2xl font-bold text-blue-600">{groupFunds.length}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <Target className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">Total Contributed</p>
              <p className="text-2xl font-bold text-green-600">
                ₹{groupFunds.reduce((sum, fund) => sum + fund.currentAmount, 0).toLocaleString()}
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">Target Amount</p>
              <p className="text-2xl font-bold text-purple-600">
                ₹{groupFunds.reduce((sum, fund) => sum + fund.targetAmount, 0).toLocaleString()}
              </p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <Target className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Group Funds List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {groupFunds.map((fund) => {
          const progress = (fund.currentAmount / fund.targetAmount) * 100;
          const daysLeft = calculateDaysLeft(fund.deadline);
          
          return (
            <div key={fund.id} className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-teal-500 to-blue-600 p-6 text-white">
                <h3 className="text-xl font-bold mb-2">{fund.title}</h3>
                <p className="text-teal-100">{fund.description}</p>
                <div className="flex items-center mt-4">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span className="text-sm">
                    {daysLeft > 0 ? `${daysLeft} days left` : 'Deadline passed'}
                  </span>
                </div>
              </div>

              <div className="p-6">
                {/* Progress */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-2xl font-bold text-gray-900">
                      ₹{fund.currentAmount.toLocaleString()}
                    </span>
                    <span className="text-gray-600">
                      of ₹{fund.targetAmount.toLocaleString()}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-teal-500 to-blue-600 h-3 rounded-full transition-all duration-300" 
                      style={{ width: `${Math.min(progress, 100)}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">{progress.toFixed(1)}% complete</p>
                </div>

                {/* Contributors */}
                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                    <Users className="w-4 h-4 mr-2" />
                    Contributors ({fund.contributors.length})
                  </h4>
                  <div className="space-y-2">
                    {fund.contributors.map((contributor) => {
                      const user = users.find(u => u.id === contributor.userId);
                      return (
                        <div key={contributor.userId} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                          <div className="flex items-center">
                            <img 
                              src={user?.avatar} 
                              alt={user?.name} 
                              className="w-8 h-8 rounded-full object-cover mr-3"
                            />
                            <span className="text-sm font-medium">{user?.name}</span>
                          </div>
                          <span className="text-sm font-semibold text-green-600">
                            ₹{contributor.amount.toLocaleString()}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-3">
                  <button className="flex-1 bg-gradient-to-r from-teal-500 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-teal-600 hover:to-blue-700 transition-all">
                    Contribute
                  </button>
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                    Share
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Create Fund Modal */}
      {showCreateFund && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Create Group Fund</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Fund title (e.g., Birthday Party)"
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
              <textarea
                placeholder="Description"
                rows={3}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              ></textarea>
              <input
                type="number"
                placeholder="Target amount"
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
              <input
                type="date"
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Invite Friends</p>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {users.slice(1).map((user) => (
                    <label key={user.id} className="flex items-center p-2 hover:bg-gray-50 rounded-lg">
                      <input type="checkbox" className="mr-3" />
                      <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full object-cover mr-3" />
                      <span className="text-sm">{user.name}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowCreateFund(false)}
                  className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowCreateFund(false)}
                  className="flex-1 bg-gradient-to-r from-purple-500 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-purple-600 hover:to-blue-700 transition-all"
                >
                  Create Fund
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupFunds;