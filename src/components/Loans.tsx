import React, { useState } from 'react';
import { Plus, Calendar, AlertCircle, CheckCircle, Clock, DollarSign } from 'lucide-react';
import { loans, users } from '../data/mockData';

const Loans: React.FC = () => {
  const [showCreateLoan, setShowCreateLoan] = useState(false);
  const [loanType, setLoanType] = useState<'borrow' | 'lend'>('borrow');

  const getUserName = (userId: string) => {
    const user = users.find(u => u.id === userId);
    return user ? user.name : 'Unknown User';
  };

  const getUserAvatar = (userId: string) => {
    const user = users.find(u => u.id === userId);
    return user ? user.avatar : '';
  };

  const calculateDaysToDeadline = (dueDate: string) => {
    const deadline = new Date(dueDate);
    const today = new Date();
    const diffTime = deadline.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getStatusColor = (status: string) => {
    const colors = {
      active: 'text-blue-600 bg-blue-50 border-blue-200',
      paid: 'text-green-600 bg-green-50 border-green-200',
      overdue: 'text-red-600 bg-red-50 border-red-200'
    };
    return colors[status as keyof typeof colors] || 'text-gray-600 bg-gray-50 border-gray-200';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return Clock;
      case 'paid':
        return CheckCircle;
      case 'overdue':
        return AlertCircle;
      default:
        return Clock;
    }
  };

  // Separate loans by type
  const borrowedLoans = loans.filter(loan => loan.borrower === 'Akanksha Sharma');
  const lentLoans = loans.filter(loan => loan.lender === 'Akanksha Sharma');

  const totalBorrowed = borrowedLoans.reduce((sum, loan) => sum + loan.amount, 0);
  const totalLent = lentLoans.reduce((sum, loan) => sum + loan.amount, 0);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Peer Loans</h1>
          <p className="text-gray-600">Manage loans with friends</p>
        </div>
        <button
          onClick={() => setShowCreateLoan(true)}
          className="bg-gradient-to-r from-purple-500 to-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:from-purple-600 hover:to-blue-700 transition-all"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Loan
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">Total Borrowed</p>
              <p className="text-2xl font-bold text-red-600">₹{totalBorrowed.toLocaleString()}</p>
            </div>
            <div className="bg-red-100 p-3 rounded-full">
              <DollarSign className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">Total Lent</p>
              <p className="text-2xl font-bold text-green-600">₹{totalLent.toLocaleString()}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">Active Loans</p>
              <p className="text-2xl font-bold text-blue-600">{loans.filter(l => l.status === 'active').length}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">Overdue</p>
              <p className="text-2xl font-bold text-orange-600">{loans.filter(l => l.status === 'overdue').length}</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-full">
              <AlertCircle className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Loans Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Borrowed Loans */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <div className="w-4 h-4 bg-red-500 rounded-full mr-3"></div>
              Money You Owe
            </h3>
          </div>
          <div className="p-6 space-y-4">
            {borrowedLoans.length > 0 ? (
              borrowedLoans.map((loan) => {
                const daysToDeadline = calculateDaysToDeadline(loan.dueDate);
                const StatusIcon = getStatusIcon(loan.status);
                
                return (
                  <div key={loan.id} className={`border rounded-lg p-4 ${getStatusColor(loan.status)}`}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-400 to-blue-500 flex items-center justify-center text-white font-bold mr-3">
                          {loan.lender.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">₹{loan.amount.toLocaleString()}</p>
                          <p className="text-sm text-gray-600">to {loan.lender}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <StatusIcon className="w-5 h-5 mr-1" />
                        <span className="text-sm font-medium capitalize">{loan.status}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
                      <div>
                        <p className="text-gray-600">Interest Rate</p>
                        <p className="font-medium">{loan.interestRate}% per month</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Due Date</p>
                        <p className="font-medium">{loan.dueDate}</p>
                      </div>
                    </div>

                    <p className="text-sm text-gray-700 mb-3">{loan.description}</p>

                    {loan.status === 'active' && (
                      <div className="flex space-x-2">
                        <button className="flex-1 bg-green-100 text-green-800 px-3 py-2 rounded-lg text-sm font-medium hover:bg-green-200 transition-colors">
                          Pay Back
                        </button>
                        <button className="px-3 py-2 bg-gray-100 text-gray-800 text-sm rounded-lg hover:bg-gray-200 transition-colors">
                          Message
                        </button>
                      </div>
                    )}

                    {daysToDeadline <= 5 && loan.status === 'active' && (
                      <div className="mt-2 p-2 bg-orange-100 border border-orange-200 rounded text-sm text-orange-800">
                        ⚠️ Due in {daysToDeadline} days
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="text-center py-8 text-gray-500">
                <DollarSign className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No borrowed loans</p>
              </div>
            )}
          </div>
        </div>

        {/* Lent Loans */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <div className="w-4 h-4 bg-green-500 rounded-full mr-3"></div>
              Money Others Owe You
            </h3>
          </div>
          <div className="p-6 space-y-4">
            {lentLoans.length > 0 ? (
              lentLoans.map((loan) => {
                const daysToDeadline = calculateDaysToDeadline(loan.dueDate);
                const StatusIcon = getStatusIcon(loan.status);
                
                return (
                  <div key={loan.id} className={`border rounded-lg p-4 ${getStatusColor(loan.status)}`}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-400 to-blue-500 flex items-center justify-center text-white font-bold mr-3">
                          {loan.borrower.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">₹{loan.amount.toLocaleString()}</p>
                          <p className="text-sm text-gray-600">from {loan.borrower}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <StatusIcon className="w-5 h-5 mr-1" />
                        <span className="text-sm font-medium capitalize">{loan.status}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
                      <div>
                        <p className="text-gray-600">Interest Rate</p>
                        <p className="font-medium">{loan.interestRate}% per month</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Due Date</p>
                        <p className="font-medium">{loan.dueDate}</p>
                      </div>
                    </div>

                    <p className="text-sm text-gray-700 mb-3">{loan.description}</p>

                    {loan.status === 'active' && (
                      <div className="flex space-x-2">
                        <button className="flex-1 bg-blue-100 text-blue-800 px-3 py-2 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors">
                          Send Reminder
                        </button>
                        <button className="px-3 py-2 bg-gray-100 text-gray-800 text-sm rounded-lg hover:bg-gray-200 transition-colors">
                          Message
                        </button>
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="text-center py-8 text-gray-500">
                <DollarSign className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No lent loans</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Create Loan Modal */}
      {showCreateLoan && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Create Loan</h3>
            
            {/* Loan Type Selection */}
            <div className="mb-4">
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setLoanType('borrow')}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                    loanType === 'borrow' 
                      ? 'bg-white text-purple-600 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Borrow Money
                </button>
                <button
                  onClick={() => setLoanType('lend')}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                    loanType === 'lend' 
                      ? 'bg-white text-purple-600 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Lend Money
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
                <option>Select friend</option>
                {users.slice(1).map((user) => (
                  <option key={user.id} value={user.id}>{user.name}</option>
                ))}
              </select>
              
              <input
                type="number"
                placeholder="Amount"
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
              
              <input
                type="number"
                placeholder="Interest rate (% per month)"
                step="0.1"
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
              
              <input
                type="date"
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
              
              <textarea
                placeholder="Purpose/Description"
                rows={3}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              ></textarea>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowCreateLoan(false)}
                  className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowCreateLoan(false)}
                  className="flex-1 bg-gradient-to-r from-purple-500 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-purple-600 hover:to-blue-700 transition-all"
                >
                  Create Loan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Loans;