import React, { useState } from 'react';
import { Plus, Users, DollarSign, Clock, Check } from 'lucide-react';
import { splitBills, users } from '../data/mockData';

const SplitBills: React.FC = () => {
  const [showCreateBill, setShowCreateBill] = useState(false);

  const getUserName = (userId: string) => {
    const user = users.find(u => u.id === userId);
    return user ? user.name : 'Unknown User';
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Split Bills</h1>
          <p className="text-gray-600">Manage shared expenses with friends</p>
        </div>
        <button
          onClick={() => setShowCreateBill(true)}
          className="bg-gradient-to-r from-purple-500 to-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:from-purple-600 hover:to-blue-700 transition-all"
        >
          <Plus className="w-4 h-4 mr-2" />
          Split Bill
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">Total Owed</p>
              <p className="text-2xl font-bold text-red-600">₹267</p>
            </div>
            <div className="bg-red-100 p-3 rounded-full">
              <DollarSign className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">You're Owed</p>
              <p className="text-2xl font-bold text-green-600">₹90</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">Active Bills</p>
              <p className="text-2xl font-bold text-blue-600">{splitBills.filter(bill => !bill.settled).length}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Bills List */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Bills</h3>
        </div>
        <div className="p-6 space-y-4">
          {splitBills.map((bill) => {
            const splitAmount = bill.totalAmount / bill.participants.length;
            const isPaidByCurrentUser = bill.paidBy === '1'; // Assuming current user is ID 1
            
            return (
              <div key={bill.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <div className={`w-4 h-4 rounded-full mr-3 ${bill.settled ? 'bg-green-500' : 'bg-orange-500'}`}></div>
                    <h4 className="font-medium text-gray-900">{bill.title}</h4>
                    {bill.settled ? (
                      <Check className="w-4 h-4 text-green-500 ml-2" />
                    ) : (
                      <Clock className="w-4 h-4 text-orange-500 ml-2" />
                    )}
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    bill.settled 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-orange-100 text-orange-800'
                  }`}>
                    {bill.settled ? 'Settled' : 'Pending'}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                  <div>
                    <p className="text-sm text-gray-600">Total Amount</p>
                    <p className="font-semibold text-gray-900">₹{bill.totalAmount}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Your Share</p>
                    <p className="font-semibold text-gray-900">₹{splitAmount.toFixed(0)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Paid By</p>
                    <p className="font-semibold text-gray-900">{getUserName(bill.paidBy)}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Participants</p>
                    <div className="flex items-center mt-1">
                      {bill.participants.map((participantId, index) => {
                       const participant = users.find(u => u.id === participantId);
if (!participant) return null;

return participant.avatar ? (
  <img
    key={participantId}
    src={participant.avatar}
    alt={participant.name}
    className={`w-8 h-8 rounded-full border-2 border-white object-cover ${
      index > 0 ? '-ml-2' : ''
    }`}
  />
) : (
  <div
    key={participantId}
    className={`w-8 h-8 rounded-full border-2 border-white bg-gradient-to-r from-purple-400 to-blue-500 flex items-center justify-center text-white text-xs font-bold ${
      index > 0 ? '-ml-2' : ''
    }`}
  >
    {participant.name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()}
  </div>
);

                        
                      })}
                      <span className="ml-3 text-sm text-gray-600">
                        {bill.participants.length} people
                      </span>
                    </div>
                  </div>
                  
                  {!bill.settled && (
                    <div className="flex space-x-2">
                      {isPaidByCurrentUser ? (
                        <button className="bg-green-100 text-green-800 px-3 py-1 rounded-lg text-sm font-medium hover:bg-green-200 transition-colors">
                          Send Reminder
                        </button>
                      ) : (
                        <button className="bg-blue-100 text-blue-800 px-3 py-1 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors">
                          Pay Share
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Create Bill Modal */}
      {showCreateBill && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Create Split Bill</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Bill description"
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
              <input
                type="number"
                placeholder="Total amount"
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Select Friends</p>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {users.slice(1).map((user) => (
                    <label key={user.id} className="flex items-center p-2 hover:bg-gray-50 rounded-lg">
                      <input type="checkbox" className="mr-3" />
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-400 to-blue-500 flex items-center justify-center text-white text-xs font-bold mr-3">
                        {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </div>
                      <span className="text-sm">{user.name}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowCreateBill(false)}
                  className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowCreateBill(false)}
                  className="flex-1 bg-gradient-to-r from-purple-500 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-purple-600 hover:to-blue-700 transition-all"
                >
                  Create Bill
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SplitBills;