import React from 'react';
import { TrendingUp, TrendingDown, Plus, PieChart, BarChart3, DollarSign } from 'lucide-react';
import { investments } from '../data/mockData';

const Investments: React.FC = () => {
  const totalInvestment = investments.reduce((sum, inv) => sum + inv.amount, 0);
  const totalCurrentValue = investments.reduce((sum, inv) => sum + inv.currentValue, 0);
  const totalGainLoss = totalCurrentValue - totalInvestment;
  const totalGainLossPercent = (totalGainLoss / totalInvestment) * 100;

  const getInvestmentIcon = (type: string) => {
    const icons = {
      gold: '🥇',
      stocks: '📈',
      mutual_fund: '📊',
      crypto: '₿'
    };
    return icons[type as keyof typeof icons] || '💰';
  };

  const getTypeColor = (type: string) => {
    const colors = {
      gold: 'text-yellow-600 bg-yellow-50 border-yellow-200',
      stocks: 'text-green-600 bg-green-50 border-green-200',
      mutual_fund: 'text-blue-600 bg-blue-50 border-blue-200',
      crypto: 'text-purple-600 bg-purple-50 border-purple-200'
    };
    return colors[type as keyof typeof colors] || 'text-gray-600 bg-gray-50 border-gray-200';
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Investments</h1>
          <p className="text-gray-600">Track your portfolio performance</p>
        </div>
        <button className="bg-gradient-to-r from-purple-500 to-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:from-purple-600 hover:to-blue-700 transition-all">
          <Plus className="w-4 h-4 mr-2" />
          Add Investment
        </button>
      </div>

      {/* Portfolio Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">Total Invested</p>
              <p className="text-2xl font-bold text-gray-900">₹{totalInvestment.toLocaleString()}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <DollarSign className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">Current Value</p>
              <p className="text-2xl font-bold text-gray-900">₹{totalCurrentValue.toLocaleString()}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <PieChart className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">Total Gain/Loss</p>
              <p className={`text-2xl font-bold ${totalGainLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {totalGainLoss >= 0 ? '+' : ''}₹{totalGainLoss.toLocaleString()}
              </p>
            </div>
            <div className={`p-3 rounded-full ${totalGainLoss >= 0 ? 'bg-green-100' : 'bg-red-100'}`}>
              {totalGainLoss >= 0 ? (
                <TrendingUp className="w-6 h-6 text-green-600" />
              ) : (
                <TrendingDown className="w-6 h-6 text-red-600" />
              )}
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">Return %</p>
              <p className={`text-2xl font-bold ${totalGainLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {totalGainLoss >= 0 ? '+' : ''}{totalGainLossPercent.toFixed(2)}%
              </p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <BarChart3 className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Investment Portfolio */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Your Portfolio</h3>
        </div>
        <div className="p-6 space-y-4">
          {investments.map((investment) => {
            const gainLossPercent = investment.changePercent;
            
            return (
              <div key={investment.id} className={`border rounded-lg p-4 hover:bg-gray-50 transition-colors ${getTypeColor(investment.type)}`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">{getInvestmentIcon(investment.type)}</span>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {investment.symbol} 
                        <span className="text-sm font-normal text-gray-600 ml-2 capitalize">
                          ({investment.type.replace('_', ' ')})
                        </span>
                      </h4>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">₹{investment.currentValue.toLocaleString()}</p>
                    <div className={`flex items-center text-sm ${
                      gainLossPercent >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {gainLossPercent >= 0 ? (
                        <TrendingUp className="w-4 h-4 mr-1" />
                      ) : (
                        <TrendingDown className="w-4 h-4 mr-1" />
                      )}
                      {gainLossPercent >= 0 ? '+' : ''}{gainLossPercent.toFixed(2)}%
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Invested</p>
                    <p className="font-medium">₹{investment.amount.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Current Value</p>
                    <p className="font-medium">₹{investment.currentValue.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Gain/Loss</p>
                    <p className={`font-medium ${investment.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {investment.change >= 0 ? '+' : ''}₹{investment.change.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="mt-3 flex space-x-2">
                  <button className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-lg hover:bg-blue-200 transition-colors">
                    Buy More
                  </button>
                  <button className="px-3 py-1 bg-red-100 text-red-800 text-sm rounded-lg hover:bg-red-200 transition-colors">
                    Sell
                  </button>
                  <button className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-lg hover:bg-gray-200 transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Investment Ideas */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Investment Ideas for Students</h3>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center mb-2">
              <span className="text-2xl mr-2">🥇</span>
              <h4 className="font-medium text-yellow-800">Gold ETFs</h4>
            </div>
            <p className="text-sm text-yellow-700">Safe haven asset, good for long-term wealth preservation</p>
            <button className="mt-2 text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Learn More</button>
          </div>

          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center mb-2">
              <span className="text-2xl mr-2">📊</span>
              <h4 className="font-medium text-blue-800">Index Funds</h4>
            </div>
            <p className="text-sm text-blue-700">Low-cost diversified investment for beginners</p>
            <button className="mt-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Learn More</button>
          </div>

          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center mb-2">
              <span className="text-2xl mr-2">🏦</span>
              <h4 className="font-medium text-green-800">SIPs</h4>
            </div>
            <p className="text-sm text-green-700">Systematic Investment Plans for disciplined investing</p>
            <button className="mt-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Learn More</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Investments;