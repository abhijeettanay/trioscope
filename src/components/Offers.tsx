import React, { useState } from 'react';
import { Percent, Clock, Copy, Filter, ShoppingBag, Utensils, Clapperboard, Plane } from 'lucide-react';
import { offers } from '../data/mockData';

const Offers: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const categories = ['all', 'food', 'shopping', 'entertainment', 'travel'];

  const filteredOffers = selectedCategory === 'all' 
    ? offers 
    : offers.filter(offer => offer.category === selectedCategory);

  const getCategoryIcon = (category: string) => {
    const icons = {
      food: Utensils,
      shopping: ShoppingBag,
      entertainment: Clapperboard,
      travel: Plane
    };
    return icons[category as keyof typeof icons] || ShoppingBag;
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      food: 'text-red-600 bg-red-50 border-red-200',
      shopping: 'text-blue-600 bg-blue-50 border-blue-200',
      entertainment: 'text-purple-600 bg-purple-50 border-purple-200',
      travel: 'text-green-600 bg-green-50 border-green-200'
    };
    return colors[category as keyof typeof colors] || 'text-gray-600 bg-gray-50 border-gray-200';
  };

  const getBrandLogo = (brand: string) => {
    const logos = {
      'Zomato': '🍽️',
      'Swiggy': '🛵',
      'Amazon': '📦',
      'BookMyShow': '🎬',
      'Uber': '🚗',
      'Flipkart': '🛒',
      'Netflix': '📺',
      'Spotify': '🎵'
    };
    return logos[brand as keyof typeof logos] || '🏷️';
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const calculateDaysLeft = (validUntil: string) => {
    const deadline = new Date(validUntil);
    const today = new Date();
    const diffTime = deadline.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Student Offers</h1>
          <p className="text-gray-600">Exclusive deals and discounts for students</p>
        </div>
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-gray-500" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="all">All Categories</option>
            {categories.slice(1).map(category => (
              <option key={category} value={category} className="capitalize">{category}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Category Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.slice(1).map((category) => {
          const categoryOffers = offers.filter(offer => offer.category === category);
          const Icon = getCategoryIcon(category);
          
          return (
            <div key={category} className="bg-white p-4 rounded-xl shadow-lg border border-gray-100">
              <div className="flex items-center">
                <Icon className={`w-8 h-8 mr-3 ${getCategoryColor(category).split(' ')[0]}`} />
                <div>
                  <p className="text-2xl font-bold text-gray-900">{categoryOffers.length}</p>
                  <p className="text-sm text-gray-600 capitalize">{category}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Offers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredOffers.map((offer) => {
          const daysLeft = calculateDaysLeft(offer.validUntil);
          const Icon = getCategoryIcon(offer.category);
          
          return (
            <div key={offer.id} className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-200">
              <div className={`p-4 ${getCategoryColor(offer.category)}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">{getBrandLogo(offer.brand)}</span>
                    <div>
                      <h3 className="font-bold text-gray-900">{offer.brand}</h3>
                      <div className="flex items-center">
                        <Icon className="w-4 h-4 mr-1" />
                        <span className="text-sm capitalize">{offer.category}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="bg-white bg-opacity-90 px-3 py-1 rounded-full text-sm font-bold">
                      {offer.discount}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-4">
                <h4 className="font-medium text-gray-900 mb-3">{offer.title}</h4>
                
                <div className="flex items-center mb-3">
                  <Clock className="w-4 h-4 text-gray-500 mr-2" />
                  <span className="text-sm text-gray-600">
                    {daysLeft > 0 ? `${daysLeft} days left` : 'Expired'}
                  </span>
                </div>

                {offer.code && (
                  <div className="bg-gray-50 p-3 rounded-lg mb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Promo Code</p>
                        <p className="font-mono font-bold text-gray-900">{offer.code}</p>
                      </div>
                      <button
                        onClick={() => copyCode(offer.code!)}
                        className="bg-purple-100 text-purple-600 p-2 rounded-lg hover:bg-purple-200 transition-colors"
                      >
                        {copiedCode === offer.code ? (
                          <span className="text-xs font-medium">Copied!</span>
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                )}

                <div className="flex space-x-2">
                  <button className="flex-1 bg-gradient-to-r from-purple-500 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-purple-600 hover:to-blue-700 transition-all text-sm font-medium">
                    Use Offer
                  </button>
                  <button className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                    Save
                  </button>
                </div>

                {daysLeft <= 3 && daysLeft > 0 && (
                  <div className="mt-3 p-2 bg-orange-100 border border-orange-200 rounded text-xs text-orange-800">
                    ⏰ Expires soon! Use before {offer.validUntil}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Featured Brands */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Popular Student Brands</h3>
        </div>
        <div className="p-6 grid grid-cols-4 md:grid-cols-8 gap-4">
          {['Zomato', 'Swiggy', 'Amazon', 'BookMyShow', 'Uber', 'Flipkart', 'Netflix', 'Spotify'].map((brand) => (
            <div key={brand} className="flex flex-col items-center p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
              <span className="text-3xl mb-2">{getBrandLogo(brand)}</span>
              <span className="text-xs text-gray-600 text-center">{brand}</span>
            </div>
          ))}
        </div>
      </div>

      {filteredOffers.length === 0 && (
        <div className="text-center py-12">
          <Percent className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No offers found</h3>
          <p className="text-gray-600">Try selecting a different category</p>
        </div>
      )}
    </div>
  );
};

export default Offers;