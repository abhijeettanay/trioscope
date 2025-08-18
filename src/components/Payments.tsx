import React, { useState } from 'react';
import { QrCode, Users, Send, ArrowUpRight, ArrowDownLeft, Wallet, CreditCard, Search, Plus } from 'lucide-react';
import { contacts, transactions, currentUser } from '../data/mockData';

const Payments: React.FC = () => {
  const [activeTab, setActiveTab] = useState('pay');
  const [showScanner, setShowScanner] = useState(false);
  const [selectedContact, setSelectedContact] = useState<string | null>(null);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const walletBalance = 15420; // Mock wallet balance

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.phone.includes(searchTerm)
  );

  const frequentContacts = contacts.filter(contact => contact.isFrequent);

  const getContactInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getTransactionIcon = (type: string) => {
    return type === 'sent' ? ArrowUpRight : ArrowDownLeft;
  };

  const getTransactionColor = (type: string) => {
    return type === 'sent' ? 'text-red-600' : 'text-green-600';
  };

  const getContactName = (contactId: string) => {
    const contact = contacts.find(c => c.id === contactId);
    return contact ? contact.name : 'Unknown';
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Payments</h1>
        <p className="text-gray-600">Send and receive money instantly</p>
      </div>

      {/* Wallet Balance */}
      <div className="bg-gradient-to-r from-purple-500 to-blue-600 p-6 rounded-xl text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-purple-100">Wallet Balance</p>
            <p className="text-3xl font-bold">₹{walletBalance.toLocaleString()}</p>
          </div>
          <div className="bg-white bg-opacity-20 p-3 rounded-full">
            <Wallet className="w-8 h-8" />
          </div>
        </div>
        <div className="flex space-x-3">
          <button className="flex-1 bg-white bg-opacity-20 py-2 px-4 rounded-lg hover:bg-opacity-30 transition-all">
            Add Money
          </button>
          <button className="flex-1 bg-white bg-opacity-20 py-2 px-4 rounded-lg hover:bg-opacity-30 transition-all">
            Bank Transfer
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button
          onClick={() => setShowScanner(true)}
          className="bg-white p-4 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all"
        >
          <div className="flex flex-col items-center">
            <div className="bg-purple-100 p-3 rounded-full mb-3">
              <QrCode className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-sm font-medium text-gray-900">Scan QR</span>
          </div>
        </button>

        <button className="bg-white p-4 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all">
          <div className="flex flex-col items-center">
            <div className="bg-blue-100 p-3 rounded-full mb-3">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-sm font-medium text-gray-900">Contacts</span>
          </div>
        </button>

        <button className="bg-white p-4 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all">
          <div className="flex flex-col items-center">
            <div className="bg-green-100 p-3 rounded-full mb-3">
              <Send className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-sm font-medium text-gray-900">Send Money</span>
          </div>
        </button>

        <button className="bg-white p-4 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all">
          <div className="flex flex-col items-center">
            <div className="bg-orange-100 p-3 rounded-full mb-3">
              <CreditCard className="w-6 h-6 text-orange-600" />
            </div>
            <span className="text-sm font-medium text-gray-900">Pay Bills</span>
          </div>
        </button>
      </div>

      {/* Tab Navigation */}
      <div className="flex bg-gray-100 p-1 rounded-lg">
        <button
          onClick={() => setActiveTab('pay')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'pay'
              ? 'bg-white text-purple-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Pay Someone
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'history'
              ? 'bg-white text-purple-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Transaction History
        </button>
      </div>

      {activeTab === 'pay' && (
        <div className="space-y-6">
          {/* Frequent Contacts */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Frequent Contacts</h3>
            <div className="flex space-x-4 overflow-x-auto pb-2">
              {frequentContacts.map((contact) => (
                <button
                  key={contact.id}
                  onClick={() => setSelectedContact(contact.id)}
                  className={`flex flex-col items-center min-w-[80px] p-3 rounded-lg transition-all ${
                    selectedContact === contact.id
                      ? 'bg-purple-50 border-2 border-purple-200'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold mb-2">
                    {getContactInitials(contact.name)}
                  </div>
                  <span className="text-xs font-medium text-gray-900 text-center">{contact.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Search Contacts */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search contacts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div className="space-y-2 max-h-60 overflow-y-auto">
              {filteredContacts.map((contact) => (
                <button
                  key={contact.id}
                  onClick={() => setSelectedContact(contact.id)}
                  className={`w-full flex items-center p-3 rounded-lg transition-all ${
                    selectedContact === contact.id
                      ? 'bg-purple-50 border-2 border-purple-200'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
                    {getContactInitials(contact.name)}
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-medium text-gray-900">{contact.name}</p>
                    <p className="text-sm text-gray-600">{contact.upiId}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Payment Form */}
          {selectedContact && (
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Pay {contacts.find(c => c.id === selectedContact)?.name}
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                  <input
                    type="number"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description (Optional)</label>
                  <input
                    type="text"
                    placeholder="What's this for?"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <button className="w-full bg-gradient-to-r from-purple-500 to-blue-600 text-white py-3 rounded-lg font-medium hover:from-purple-600 hover:to-blue-700 transition-all">
                  Pay ₹{amount || '0'}
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'history' && (
        <div className="bg-white rounded-xl shadow-lg border border-gray-100">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
          </div>
          <div className="p-6 space-y-4">
            {transactions.map((transaction) => {
              const Icon = getTransactionIcon(transaction.type);
              return (
                <div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className={`p-2 rounded-full mr-3 ${
                      transaction.type === 'sent' ? 'bg-red-100' : 'bg-green-100'
                    }`}>
                      <Icon className={`w-5 h-5 ${getTransactionColor(transaction.type)}`} />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {transaction.type === 'sent' ? 'Paid to' : 'Received from'} {getContactName(transaction.contactId)}
                      </p>
                      <p className="text-sm text-gray-600">{transaction.description} • {transaction.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold ${getTransactionColor(transaction.type)}`}>
                      {transaction.type === 'sent' ? '-' : '+'}₹{transaction.amount}
                    </p>
                    <p className={`text-xs ${
                      transaction.status === 'completed' ? 'text-green-600' :
                      transaction.status === 'pending' ? 'text-orange-600' : 'text-red-600'
                    }`}>
                      {transaction.status}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* QR Scanner Modal */}
      {showScanner && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl max-w-sm w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">Scan QR Code</h3>
            <div className="bg-gray-100 aspect-square rounded-lg flex items-center justify-center mb-4">
              <div className="text-center">
                <QrCode className="w-16 h-16 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600">Camera view would appear here</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowScanner(false)}
                className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button className="flex-1 bg-gradient-to-r from-purple-500 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-purple-600 hover:to-blue-700 transition-all">
                Scan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payments;