import React, { useState, useEffect } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { Calendar } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Sidebar from '../components/SideBar';

const TrackProgress = () => {
  const [selectedMetric, setSelectedMetric] = useState('weight');
  const [timeRange, setTimeRange] = useState('week');
  const [goalValue, setGoalValue] = useState('');
  const [currentValue, setCurrentValue] = useState('');
  const [date, setDate] = useState(new Date());
  const [progressData, setProgressData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Mock data - in a real app, this would come from an API or database
  useEffect(() => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      // Generate mock data based on selected metric and time range
      const mockData = generateMockData(selectedMetric, timeRange);
      setProgressData(mockData);
      setLoading(false);
    }, 500);
  }, [selectedMetric, timeRange]);

  const generateMockData = (metric, range) => {
    const data = [];
    const today = new Date();
    let days = 7;
    
    if (range === 'month') days = 30;
    if (range === 'year') days = 365;
    
    for (let i = days; i >= 0; i--) {
      const date = new Date();
      date.setDate(today.getDate() - i);
      
      let value;
      switch(metric) {
        case 'weight':
          // Start at 75kg with slight variations
          value = 75 - (i * 0.1) + (Math.random() * 1 - 0.5);
          break;
        case 'steps':
          // Random steps between 5000-10000
          value = 5000 + Math.floor(Math.random() * 5000);
          break;
        case 'calories':
          // Random calories burned 1800-2500
          value = 1800 + Math.floor(Math.random() * 700);
          break;
        case 'workout':
          // Random workout time 20-60 minutes
          value = 20 + Math.floor(Math.random() * 40);
          break;
        default:
          value = 0;
      }
      
      data.push({
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        [metric]: Number(value.toFixed(1)),
      });
    }
    
    return data;
  };

  const handleAddProgress = () => {
    if (!currentValue) return;
    
    const newEntry = {
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      [selectedMetric]: Number(currentValue)
    };
    
    // Check if an entry for this date already exists and update instead
    const updatedData = [...progressData];
    const existingEntryIndex = updatedData.findIndex(
      entry => entry.date === newEntry.date
    );
    
    if (existingEntryIndex >= 0) {
      updatedData[existingEntryIndex] = newEntry;
    } else {
      updatedData.push(newEntry);
      // Sort by date
      updatedData.sort((a, b) => new Date(a.date) - new Date(b.date));
    }
    
    setProgressData(updatedData);
    setCurrentValue('');
  };

  const renderMetricUnit = () => {
    switch(selectedMetric) {
      case 'weight': return 'kg';
      case 'steps': return 'steps';
      case 'calories': return 'kcal';
      case 'workout': return 'minutes';
      default: return '';
    }
  };

  const getChartColor = () => {
    switch(selectedMetric) {
      case 'weight': return '#FF6384';
      case 'steps': return '#36A2EB';
      case 'calories': return '#FFCE56';
      case 'workout': return '#4BC0C0';
      default: return '#FF6384';
    }
  };

  const calculateProgress = () => {
    if (!progressData.length || !goalValue) return { percentage: 0, difference: 0 };
    
    const latest = progressData[progressData.length - 1][selectedMetric];
    const earliest = progressData[0][selectedMetric];
    
    let percentage, difference;
    
    // For weight, lower is better. For other metrics, higher is better
    if (selectedMetric === 'weight') {
      difference = earliest - latest;
      const totalNeeded = earliest - Number(goalValue);
      percentage = totalNeeded > 0 ? (difference / totalNeeded) * 100 : 0;
    } else {
      difference = latest - earliest;
      percentage = goalValue > 0 ? (latest / Number(goalValue)) * 100 : 0;
    }
    
    return {
      percentage: Math.min(Math.max(percentage, 0), 100).toFixed(1),
      difference: difference.toFixed(1)
    };
  };

  const progress = calculateProgress();

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      
      <div className="flex-1 overflow-y-auto p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Track Progress</h1>
        
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Select Metric to Track</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <button
              className={`p-4 rounded-lg ${selectedMetric === 'weight' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              onClick={() => setSelectedMetric('weight')}
            >
              Weight
            </button>
            <button
              className={`p-4 rounded-lg ${selectedMetric === 'steps' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              onClick={() => setSelectedMetric('steps')}
            >
              Steps
            </button>
            <button
              className={`p-4 rounded-lg ${selectedMetric === 'calories' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              onClick={() => setSelectedMetric('calories')}
            >
              Calories
            </button>
            <button
              className={`p-4 rounded-lg ${selectedMetric === 'workout' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              onClick={() => setSelectedMetric('workout')}
            >
              Workout Time
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <button
              className={`p-2 rounded-lg ${timeRange === 'week' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              onClick={() => setTimeRange('week')}
            >
              Week
            </button>
            <button
              className={`p-2 rounded-lg ${timeRange === 'month' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              onClick={() => setTimeRange('month')}
            >
              Month
            </button>
            <button
              className={`p-2 rounded-lg ${timeRange === 'year' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              onClick={() => setTimeRange('year')}
            >
              Year
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow p-6 col-span-2">
            <h2 className="text-xl font-semibold mb-4">Progress Chart</h2>
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <p>Loading chart data...</p>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={progressData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey={selectedMetric} 
                    stroke={getChartColor()} 
                    activeDot={{ r: 8 }} 
                  />
                  {goalValue && (
                    <Line 
                      type="monotone" 
                      dataKey={() => Number(goalValue)} 
                      stroke="#82ca9d" 
                      strokeDasharray="5 5" 
                      name="Goal" 
                    />
                  )}
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Add Progress</h2>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Date</label>
              <div className="border rounded-lg">
                <Calendar onChange={setDate} value={date} className="w-full" />
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                Current {selectedMetric.charAt(0).toUpperCase() + selectedMetric.slice(1)} ({renderMetricUnit()})
              </label>
              <input
                type="number"
                className="w-full p-2 border rounded-lg"
                value={currentValue}
                onChange={(e) => setCurrentValue(e.target.value)}
                placeholder={`Enter your ${selectedMetric}`}
              />
            </div>
            
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded-lg w-full"
              onClick={handleAddProgress}
            >
              Add Entry
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Set Goal</h2>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                Goal {selectedMetric.charAt(0).toUpperCase() + selectedMetric.slice(1)} ({renderMetricUnit()})
              </label>
              <input
                type="number"
                className="w-full p-2 border rounded-lg"
                value={goalValue}
                onChange={(e) => setGoalValue(e.target.value)}
                placeholder={`Enter your goal ${selectedMetric}`}
              />
            </div>
            <div className="mt-4">
              <h3 className="font-semibold">Progress Towards Goal</h3>
              {goalValue ? (
                <div>
                  <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
                    <div 
                      className="bg-blue-500 h-4 rounded-full" 
                      style={{ width: `${progress.percentage}%` }}
                    ></div>
                  </div>
                  <p className="mt-2 text-gray-600">
                    {progress.percentage}% complete 
                    ({selectedMetric === 'weight' ? 'Lost' : 'Gained'} {progress.difference} {renderMetricUnit()})
                  </p>
                </div>
              ) : (
                <p className="text-gray-500">Set a goal to track your progress</p>
              )}
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Progress History</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b border-gray-200 text-left">Date</th>
                    <th className="py-2 px-4 border-b border-gray-200 text-left">
                      {selectedMetric.charAt(0).toUpperCase() + selectedMetric.slice(1)}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {progressData.slice(-5).reverse().map((entry, index) => (
                    <tr key={index}>
                      <td className="py-2 px-4 border-b border-gray-200">{entry.date}</td>
                      <td className="py-2 px-4 border-b border-gray-200">
                        {entry[selectedMetric]} {renderMetricUnit()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackProgress;