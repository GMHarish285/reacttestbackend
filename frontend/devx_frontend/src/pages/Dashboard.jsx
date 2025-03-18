import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Trophy, Flame, Star, Award, Calendar, Plus, Check, X } from "lucide-react";
import Sidebar from "../components/SideBar";

const Dashboard = () => {
  const [habits, setHabits] = useState([
    { 
      id: 1, 
      name: "Morning Exercise", 
      streak: 5, 
      points: 120, 
      completed: false,
      type: "daily",
      icon: "fitness" 
    },
    { 
      id: 2, 
      name: "Read 30 minutes", 
      streak: 12, 
      points: 240, 
      completed: false,
      type: "daily",
      icon: "education" 
    },
    { 
      id: 3, 
      name: "Drink Water", 
      streak: 8, 
      points: 160, 
      completed: false,
      type: "daily",
      icon: "health" 
    },
    { 
      id: 4, 
      name: "Meditate", 
      streak: 3, 
      points: 60, 
      completed: false,
      type: "daily",
      icon: "wellness" 
    }
  ]);

  const [showAddHabit, setShowAddHabit] = useState(false);
  const [newHabit, setNewHabit] = useState({ name: "", type: "daily", icon: "health" });
  const [userLevel, setUserLevel] = useState(3);
  const [userPoints, setUserPoints] = useState(560);
  const [nextLevelPoints, setNextLevelPoints] = useState(750);

  const completeHabit = (id) => {
    setHabits(habits.map(habit => {
      if (habit.id === id && !habit.completed) {
        // Add points and increase streak
        setUserPoints(userPoints + 20);
        if (userPoints + 20 >= nextLevelPoints) {
          setUserLevel(userLevel + 1);
          setNextLevelPoints(nextLevelPoints + 300);
        }
        return { ...habit, streak: habit.streak + 1, points: habit.points + 20, completed: true };
      }
      return habit;
    }));
  };

  const addHabit = () => {
    if (newHabit.name.trim() === "") return;
    
    const habit = {
      id: Date.now(),
      name: newHabit.name,
      streak: 0,
      points: 0,
      completed: false,
      type: newHabit.type,
      icon: newHabit.icon
    };
    
    setHabits([...habits, habit]);
    setNewHabit({ name: "", type: "daily", icon: "health" });
    setShowAddHabit(false);
  };

  const getIconComponent = (iconName) => {
    switch(iconName) {
      case "fitness": return <Flame className="w-5 h-5 text-orange-400" />;
      case "education": return <Star className="w-5 h-5 text-purple-400" />;
      case "health": return <Award className="w-5 h-5 text-blue-400" />;
      case "wellness": return <Calendar className="w-5 h-5 text-green-400" />;
      default: return <Star className="w-5 h-5 text-purple-400" />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      
      <div className="flex-1">
        {/* Header with level progress */}
        <header className="bg-indigo-600 text-white p-4 shadow-md">
          <div className="container mx-auto">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">Dashboard</h1>
              <div className="flex items-center space-x-4">
                <div className="bg-white text-indigo-600 rounded-full h-10 w-10 flex items-center justify-center font-bold">
                  {userLevel}
                </div>
                <span className="font-medium">{userPoints} XP</span>
              </div>
            </div>
            
            {/* Progress bar */}
            <div className="mt-4">
              <div className="flex justify-between text-sm mb-1">
                <span>Level {userLevel}</span>
                <span>{userPoints}/{nextLevelPoints} XP</span>
              </div>
              <div className="w-full bg-indigo-800 rounded-full h-2.5">
                <div 
                  className="bg-green-400 h-2.5 rounded-full transition-all duration-500"
                  style={{ width: `${(userPoints / nextLevelPoints) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Daily Habits</h2>
            <button 
              onClick={() => setShowAddHabit(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center"
            >
              <Plus className="w-5 h-5 mr-2" /> Add Habit
            </button>
          </div>

          {/* Stats overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white p-4 rounded-lg shadow-md flex items-center">
              <div className="bg-red-100 p-3 rounded-full mr-4">
                <Flame className="w-6 h-6 text-red-500" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Current Streak</p>
                <p className="font-bold text-xl">{Math.max(...habits.map(h => h.streak))} days</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md flex items-center">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <Trophy className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Points</p>
                <p className="font-bold text-xl">{habits.reduce((sum, h) => sum + h.points, 0)}</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md flex items-center">
              <div className="bg-green-100 p-3 rounded-full mr-4">
                <Check className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Completed Today</p>
                <p className="font-bold text-xl">{habits.filter(h => h.completed).length}/{habits.length}</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md flex items-center">
              <div className="bg-purple-100 p-3 rounded-full mr-4">
                <Star className="w-6 h-6 text-purple-500" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Level</p>
                <p className="font-bold text-xl">{userLevel}</p>
              </div>
            </div>
          </div>

          {/* Habits list */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-4">Today's Habits</h3>
              <div className="space-y-3">
                {habits.map(habit => (
                  <div key={habit.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-center">
                      <div className="p-2 rounded-full bg-indigo-100 mr-4">
                        {getIconComponent(habit.icon)}
                      </div>
                      <div>
                        <h4 className="font-medium">{habit.name}</h4>
                        <p className="text-sm text-gray-500">
                          <span className="flex items-center">
                            <Flame className="w-4 h-4 mr-1 text-orange-500" />
                            {habit.streak} day streak
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-500 mr-4">
                        +20 XP
                      </span>
                      {habit.completed ? (
                        <div className="bg-green-500 text-white p-2 rounded-full">
                          <Check className="w-5 h-5" />
                        </div>
                      ) : (
                        <button
                          onClick={() => completeHabit(habit.id)}
                          className="bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-full"
                        >
                          <Check className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Add habit modal */}
      {showAddHabit && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Add New Habit</h3>
              <button 
                onClick={() => setShowAddHabit(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Habit Name
                </label>
                <input
                  type="text"
                  value={newHabit.name}
                  onChange={(e) => setNewHabit({...newHabit, name: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="e.g., Morning Exercise"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type
                </label>
                <select
                  value={newHabit.type}
                  onChange={(e) => setNewHabit({...newHabit, type: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Icon
                </label>
                <select
                  value={newHabit.icon}
                  onChange={(e) => setNewHabit({...newHabit, icon: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="fitness">Fitness</option>
                  <option value="education">Education</option>
                  <option value="health">Health</option>
                  <option value="wellness">Wellness</option>
                </select>
              </div>
              
              <div className="flex justify-end pt-4">
                <button
                  onClick={addHabit}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg"
                >
                  Add Habit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;