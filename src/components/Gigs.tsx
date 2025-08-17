import React, { useState } from 'react';
import { Search, MapPin, Clock, DollarSign, BookOpen, Code, Palette, PenTool, Briefcase } from 'lucide-react';
import { gigs } from '../data/mockData';

const Gigs: React.FC = () => {
  const [selectedType, setSelectedType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const gigTypes = ['all', 'teaching', 'coding', 'design', 'writing', 'other'];

  const getTypeIcon = (type: string) => {
    const icons = {
      teaching: BookOpen,
      coding: Code,
      design: Palette,
      writing: PenTool,
      other: Briefcase
    };
    return icons[type as keyof typeof icons] || Briefcase;
  };

  const getTypeColor = (type: string) => {
    const colors = {
      teaching: 'text-blue-600 bg-blue-50',
      coding: 'text-green-600 bg-green-50',
      design: 'text-purple-600 bg-purple-50',
      writing: 'text-orange-600 bg-orange-50',
      other: 'text-gray-600 bg-gray-50'
    };
    return colors[type as keyof typeof colors] || 'text-gray-600 bg-gray-50';
  };

  const filteredGigs = gigs.filter(gig => {
    const matchesType = selectedType === 'all' || gig.type === selectedType;
    const matchesSearch = gig.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         gig.company.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Part-time Gigs</h1>
          <p className="text-gray-600">Find flexible work opportunities</p>
        </div>
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search gigs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="all">All Types</option>
            {gigTypes.slice(1).map(type => (
              <option key={type} value={type} className="capitalize">{type}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-100">
          <div className="flex items-center">
            <BookOpen className="w-8 h-8 text-blue-500 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-900">{gigs.filter(g => g.type === 'teaching').length}</p>
              <p className="text-sm text-gray-600">Teaching</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-100">
          <div className="flex items-center">
            <Code className="w-8 h-8 text-green-500 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-900">{gigs.filter(g => g.type === 'coding').length}</p>
              <p className="text-sm text-gray-600">Coding</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-100">
          <div className="flex items-center">
            <PenTool className="w-8 h-8 text-orange-500 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-900">{gigs.filter(g => g.type === 'writing').length}</p>
              <p className="text-sm text-gray-600">Writing</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-100">
          <div className="flex items-center">
            <DollarSign className="w-8 h-8 text-purple-500 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-900">₹{Math.round(gigs.reduce((sum, g) => sum + g.hourlyRate, 0) / gigs.length)}</p>
              <p className="text-sm text-gray-600">Avg/Hour</p>
            </div>
          </div>
        </div>
      </div>

      {/* Gigs List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredGigs.map((gig) => {
          const Icon = getTypeIcon(gig.type);
          
          return (
            <div key={gig.id} className="bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-200">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className={`p-3 rounded-lg ${getTypeColor(gig.type)}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-900">{gig.title}</h3>
                      <p className="text-gray-600">{gig.company}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getTypeColor(gig.type)}`}>
                    {gig.type}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center">
                    <DollarSign className="w-4 h-4 text-green-500 mr-2" />
                    <span className="text-sm text-gray-600">₹{gig.hourlyRate}/hour</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 text-blue-500 mr-2" />
                    <span className="text-sm text-gray-600">{gig.location}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Requirements:</h4>
                  <div className="flex flex-wrap gap-2">
                    {gig.requirements.map((req, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                      >
                        {req}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button className="flex-1 bg-gradient-to-r from-purple-500 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-purple-600 hover:to-blue-700 transition-all">
                    Apply Now
                  </button>
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                    Save
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredGigs.length === 0 && (
        <div className="text-center py-12">
          <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No gigs found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default Gigs;