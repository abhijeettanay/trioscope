import React, { useState } from 'react';
import { Plus, Calendar, CreditCard, ToggleLeft, ToggleRight, AlertCircle, CheckCircle, Pause } from 'lucide-react';
import { subscriptions } from '../data/mockData';

const Subscriptions: React.FC = () => {
  const [showAddSubscription, setShowAddSubscription] = useState(false);

  const totalMonthlySpend = subscriptions
    .filter(sub => sub.status === 'active')
    .reduce((sum, sub) => sum + (sub.billingCycle === 'monthly' ? sub.amount : sub.amount / 12), 0);

  const upcomingBills = subscriptions
    .filter(sub => sub.status === 'active')
    .sort((a, b) => new Date(a.nextBilling).getTime() - new Date(b.nextBilling).getTime())
    .slice(0, 3);

  const getStatusColor = (status: string) => {
    const colors = {
      active: 'text-green-600 bg-green-50 border-green-200',
      paused: 'text-orange-600 bg-orange-50 border-orange-200',
      cancelled: 'text-red-600 bg-red-50 border-red-200'
    };
    return colors[status as keyof typeof colors] || 'text-gray-600 bg-gray-50 border-gray-200';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return CheckCircle;
      case 'paused':
        return Pause;
      case 'cancelled':
        return AlertCircle;
      default:
        return CheckCircle;
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      entertainment: 'bg-purple-500',
      productivity: 'bg-blue-500',
      education: 'bg-green-500',
      other: 'bg-gray-500'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-500';
  };

  const calculateDaysUntilBilling = (nextBilling: string) => {
    const billing = new Date(nextBilling);
    const today = new Date();
    const diffTime = billing.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Subscriptions</h1>
          <p className="text-gray-600">Manage your recurring payments</p>
        </div>
        <button
          onClick={() => setShowAddSubscription(true)}
          className="bg-gradient-to-r from-purple-500 to-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:from-purple-600 hover:to-blue-700 transition-all"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Subscription
        </button>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">Monthly Spend</p>
              <p className="text-2xl font-bold text-purple-600">₹{Math.round(totalMonthlySpend).toLocaleString()}</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <CreditCard className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">Active Subs</p>
              <p className="text-2xl font-bold text-green-600">{subscriptions.filter(s => s.status === 'active').length}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">Autopay On</p>
              <p className="text-2xl font-bold text-blue-600">{subscriptions.filter(s => s.autopay).length}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <ToggleRight className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">Next Bill</p>
              <p className="text-2xl font-bold text-orange-600">{calculateDaysUntilBilling(upcomingBills[0]?.nextBilling || '')}d</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-full">
              <Calendar className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Bills */}
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Bills</h3>
        <div className="space-y-3">
          {upcomingBills.map((subscription) => {
            const daysUntil = calculateDaysUntilBilling(subscription.nextBilling);
            return (
              <div key={subscription.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className="text-2xl mr-3">{subscription.icon}</div>
                  <div>
                    <p className="font-medium text-gray-900">{subscription.name}</p>
                    <p className="text-sm text-gray-600">
                      {daysUntil === 0 ? 'Due today' : daysUntil === 1 ? 'Due tomorrow' : `Due in ${daysUntil} days`}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">₹{subscription.amount}</p>
                  <p className="text-sm text-gray-600">{subscription.billingCycle}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* All Subscriptions */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">All Subscriptions</h3>
        </div>
        <div className="p-6 space-y-4">
          {subscriptions.map((subscription) => {
            const StatusIcon = getStatusIcon(subscription.status);
            const daysUntil = calculateDaysUntilBilling(subscription.nextBilling);
            
            return (
              <div key={subscription.id} className={`border rounded-lg p-4 ${getStatusColor(subscription.status)}`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <div className="text-2xl mr-3">{subscription.icon}</div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{subscription.name}</h4>
                      <div className="flex items-center mt-1">
                        <div className={`w-3 h-3 rounded-full mr-2 ${getCategoryColor(subscription.category)}`}></div>
                        <span className="text-sm text-gray-600 capitalize">{subscription.category}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <StatusIcon className="w-5 h-5 mr-1" />
                    <span className="text-sm font-medium capitalize">{subscription.status}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                  <div>
                    <p className="text-gray-600">Amount</p>
                    <p className="font-medium">₹{subscription.amount}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Billing</p>
                    <p className="font-medium capitalize">{subscription.billingCycle}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Next Bill</p>
                    <p className="font-medium">{subscription.nextBilling}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Autopay</p>
                    <div className="flex items-center">
                      {subscription.autopay ? (
                        <ToggleRight className="w-5 h-5 text-green-600" />
                      ) : (
                        <ToggleLeft className="w-5 h-5 text-gray-400" />
                      )}
                      <span className="ml-1 font-medium">{subscription.autopay ? 'On' : 'Off'}</span>
                    </div>
                  </div>
                </div>

                {subscription.status === 'active' && daysUntil <= 3 && (
                  <div className="mb-3 p-2 bg-orange-100 border border-orange-200 rounded text-sm text-orange-800">
                    ⏰ {daysUntil === 0 ? 'Due today!' : `Due in ${daysUntil} day${daysUntil > 1 ? 's' : ''}`}
                  </div>
                )}

                <div className="flex space-x-2">
                  {subscription.status === 'active' ? (
                    <>
                      <button className="px-3 py-1 bg-orange-100 text-orange-800 text-sm rounded-lg hover:bg-orange-200 transition-colors">
                        Pause
                      </button>
                      <button className="px-3 py-1 bg-red-100 text-red-800 text-sm rounded-lg hover:bg-red-200 transition-colors">
                        Cancel
                      </button>
                    </>
                  ) : subscription.status === 'paused' ? (
                    <button className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-lg hover:bg-green-200 transition-colors">
                      Resume
                    </button>
                  ) : null}
                  
                  <button className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-lg hover:bg-blue-200 transition-colors">
                    {subscription.autopay ? 'Disable' : 'Enable'} Autopay
                  </button>
                  <button className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-lg hover:bg-gray-200 transition-colors">
                    Edit
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add Subscription Modal */}
      {showAddSubscription && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Subscription</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Service name (e.g., Netflix)"
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
              <input
                type="number"
                placeholder="Amount"
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
                <option>Select billing cycle</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
                <option>Select category</option>
                <option value="entertainment">Entertainment</option>
                <option value="productivity">Productivity</option>
                <option value="education">Education</option>
                <option value="other">Other</option>
              </select>
              <input
                type="date"
                placeholder="Next billing date"
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span className="text-sm text-gray-700">Enable autopay</span>
              </label>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowAddSubscription(false)}
                  className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowAddSubscription(false)}
                  className="flex-1 bg-gradient-to-r from-purple-500 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-purple-600 hover:to-blue-700 transition-all"
                >
                  Add Subscription
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Subscriptions;