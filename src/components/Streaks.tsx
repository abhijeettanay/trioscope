import React from 'react';
import { Flame, Target, Award, TrendingUp, Trophy, Medal, Star } from 'lucide-react';
import { users, currentUser } from '../data/mockData';

const Streaks: React.FC = () => {
  const achievements = [
    { id: 1, title: 'First Week Saver', description: 'Saved money for 7 consecutive days', icon: Star, earned: true, points: 50 },
    { id: 2, title: 'Budget Master', description: 'Stayed within budget for 2 weeks', icon: Target, earned: true, points: 100 },
    { id: 3, title: 'Investment Explorer', description: 'Made your first investment', icon: TrendingUp, earned: true, points: 75 },
    { id: 4, title: 'Social Saver', description: 'Created first group fund', icon: Medal, earned: true, points: 60 },
    { id: 5, title: 'Loan Helper', description: 'Helped a friend with a loan', icon: Trophy, earned: false, points: 80 },
    { id: 6, title: 'Monthly Milestone', description: 'Complete 30-day saving streak', icon: Flame, earned: false, points: 200 },
  ];

  const leaderboard = [...users].sort((a, b) => b.points - a.points);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Streaks & Achievements</h1>
        <p className="text-gray-600">Track your financial habits and compete with friends</p>
      </div>

      {/* Current Streaks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-r from-orange-500 to-red-600 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Flame className="w-8 h-8 mr-3" />
              <div>
                <h3 className="text-lg font-semibold">Saver Streak</h3>
                <p className="text-orange-100">Days of saving money</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold">{currentUser.streaks.saver}</p>
              <p className="text-sm text-orange-100">days</p>
            </div>
          </div>
          <div className="bg-orange-400 bg-opacity-50 rounded-lg p-3">
            <p className="text-sm">🔥 You're on fire! Keep saving to maintain your streak.</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-blue-600 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Target className="w-8 h-8 mr-3" />
              <div>
                <h3 className="text-lg font-semibold">Budget Streak</h3>
                <p className="text-purple-100">Days within budget</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold">{currentUser.streaks.budgeting}</p>
              <p className="text-sm text-purple-100">days</p>
            </div>
          </div>
          <div className="bg-purple-400 bg-opacity-50 rounded-lg p-3">
            <p className="text-sm">🎯 Excellent budget control! You're a financial pro.</p>
          </div>
        </div>
      </div>

      {/* Points & Level */}
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Your Progress</h3>
            <p className="text-gray-600">Level up by earning more points</p>
          </div>
          <div className="flex items-center">
            <Award className="w-8 h-8 text-yellow-500 mr-3" />
            <div className="text-right">
              <p className="text-2xl font-bold text-gray-900">{currentUser.points}</p>
              <p className="text-sm text-gray-600">points</p>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Level 5</span>
            <span>Level 6 (1000 pts)</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-yellow-400 to-orange-500 h-3 rounded-full" 
              style={{ width: `${(currentUser.points % 1000) / 10}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 mt-1">
            {1000 - (currentUser.points % 1000)} points to next level
          </p>
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Achievements</h3>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements.map((achievement) => {
            const Icon = achievement.icon;
            return (
              <div 
                key={achievement.id} 
                className={`p-4 rounded-lg border-2 ${
                  achievement.earned 
                    ? 'bg-green-50 border-green-200' 
                    : 'bg-gray-50 border-gray-200 opacity-60'
                }`}
              >
                <div className="flex items-center mb-3">
                  <div className={`p-2 rounded-full mr-3 ${
                    achievement.earned 
                      ? 'bg-green-100 text-green-600' 
                      : 'bg-gray-100 text-gray-400'
                  }`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{achievement.title}</h4>
                    <p className="text-sm text-gray-600">{achievement.description}</p>
                  </div>
                  {achievement.earned && (
                    <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                      +{achievement.points} pts
                    </div>
                  )}
                </div>
                {!achievement.earned && (
                  <div className="text-xs text-gray-500">
                    Earn {achievement.points} points when completed
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Leaderboard */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Friend Leaderboard</h3>
        </div>
        <div className="p-6 space-y-4">
          {leaderboard.map((user, index) => (
            <div 
              key={user.id}
              className={`flex items-center justify-between p-4 rounded-lg ${
                user.id === currentUser.id ? 'bg-purple-50 border-2 border-purple-200' : 'bg-gray-50'
              }`}
            >
              <div className="flex items-center">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full mr-3 font-bold text-sm ${
                  index === 0 ? 'bg-yellow-500 text-white' :
                  index === 1 ? 'bg-gray-400 text-white' :
                  index === 2 ? 'bg-orange-600 text-white' :
                  'bg-gray-200 text-gray-600'
                }`}>
                  {index + 1}
                </div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-400 to-blue-500 flex items-center justify-center text-white font-bold mr-3">
                  {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    {user.name} {user.id === currentUser.id && '(You)'}
                  </p>
                  <div className="flex items-center text-sm text-gray-600">
                    <Flame className="w-4 h-4 text-orange-500 mr-1" />
                    <span className="mr-3">{user.streaks.saver}d</span>
                    <Target className="w-4 h-4 text-purple-500 mr-1" />
                    <span>{user.streaks.budgeting}d</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-900">{user.points}</p>
                <p className="text-sm text-gray-600">points</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Streaks;