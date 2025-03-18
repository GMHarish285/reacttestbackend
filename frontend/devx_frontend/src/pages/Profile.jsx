import React, { useState, useEffect } from 'react';
import Sidebar from '../components/SideBar';
import { FiEdit2, FiSave, FiX } from 'react-icons/fi';

const Profile = () => {
  // Mock user data - in a real app, you would fetch this from an API
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    age: 28,
    gender: 'Male',
    height: 175,
    weight: 70,
    activities: ['Running', 'Cycling', 'Swimming'],
    bio: 'Fitness enthusiast focused on maintaining a healthy lifestyle.',
    joinDate: '2023-09-15',
    fitnessGoal: 'Lose weight and build muscle',
    preferredWorkoutTime: 'Morning'
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });

  useEffect(() => {
    // Fetch user data from API
    setLoading(true);
    // Simulating API call
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    setEditedUser({...user});
  }, [user]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedUser({...user});
  };

  const handleSave = () => {
    setLoading(true);
    // Simulating API call to update user data
    setTimeout(() => {
      setUser({...editedUser});
      setIsEditing(false);
      setLoading(false);
      showNotification('Profile updated successfully!', 'success');
    }, 500);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleActivityChange = (activity) => {
    setEditedUser(prev => {
      const updatedActivities = prev.activities.includes(activity)
        ? prev.activities.filter(act => act !== activity)
        : [...prev.activities, activity];
      
      return {
        ...prev,
        activities: updatedActivities
      };
    });
  };

  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: '', type: '' });
    }, 3000);
  };

  const activityOptions = [
    'Running', 'Walking', 'Cycling', 'Swimming', 'Weightlifting', 
    'Yoga', 'Pilates', 'HIIT', 'CrossFit', 'Boxing'
  ];

  if (loading && !user) {
    return (
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center">
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      
      <div className="flex-1 overflow-y-auto p-6">
        {notification.show && (
          <div className={`mb-4 p-4 rounded-lg ${notification.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {notification.message}
          </div>
        )}

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">My Profile</h1>
          
          {isEditing ? (
            <div className="flex space-x-2">
              <button 
                onClick={handleSave}
                className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                disabled={loading}
              >
                <FiSave className="mr-2" />
                Save
              </button>
              <button 
                onClick={handleCancel}
                className="flex items-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
              >
                <FiX className="mr-2" />
                Cancel
              </button>
            </div>
          ) : (
            <button 
              onClick={handleEdit}
              className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              <FiEdit2 className="mr-2" />
              Edit Profile
            </button>
          )}
        </div>
        
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {/* Profile Header */}
          <div className="bg-blue-500 p-6">
            <div className="w-full">
              <h2 className="text-xl font-bold text-white">
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={editedUser.name}
                    onChange={handleChange}
                    className="bg-white bg-opacity-20 text-white rounded px-2 py-1"
                    placeholder="Your name"
                  />
                ) : (
                  user.name
                )}
              </h2>
              <p className="text-blue-100">Member since: {new Date(user.joinDate).toLocaleDateString()}</p>
            </div>
          </div>
          
          {/* Profile Content */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Profile Details */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-700">Personal Information</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
                    {isEditing ? (
                      <input
                        type="email"
                        name="email"
                        value={editedUser.email}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-lg"
                      />
                    ) : (
                      <p>{user.email}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Age</label>
                    {isEditing ? (
                      <input
                        type="number"
                        name="age"
                        value={editedUser.age}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-lg"
                      />
                    ) : (
                      <p>{user.age} years</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Gender</label>
                    {isEditing ? (
                      <select
                        name="gender"
                        value={editedUser.gender}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-lg"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Non-binary">Non-binary</option>
                        <option value="Prefer not to say">Prefer not to say</option>
                      </select>
                    ) : (
                      <p>{user.gender}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Height (cm)</label>
                    {isEditing ? (
                      <input
                        type="number"
                        name="height"
                        value={editedUser.height}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-lg"
                      />
                    ) : (
                      <p>{user.height} cm</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Weight (kg)</label>
                    {isEditing ? (
                      <input
                        type="number"
                        name="weight"
                        value={editedUser.weight}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-lg"
                      />
                    ) : (
                      <p>{user.weight} kg</p>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Fitness Details */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-700">Fitness Information</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Fitness Goal</label>
                    {isEditing ? (
                      <select
                        name="fitnessGoal"
                        value={editedUser.fitnessGoal}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-lg"
                      >
                        <option value="Lose weight">Lose weight</option>
                        <option value="Build muscle">Build muscle</option>
                        <option value="Improve endurance">Improve endurance</option>
                        <option value="Maintain fitness">Maintain fitness</option>
                        <option value="Lose weight and build muscle">Lose weight and build muscle</option>
                      </select>
                    ) : (
                      <p>{user.fitnessGoal}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Preferred Workout Time</label>
                    {isEditing ? (
                      <select
                        name="preferredWorkoutTime"
                        value={editedUser.preferredWorkoutTime}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-lg"
                      >
                        <option value="Morning">Morning</option>
                        <option value="Afternoon">Afternoon</option>
                        <option value="Evening">Evening</option>
                        <option value="Night">Night</option>
                      </select>
                    ) : (
                      <p>{user.preferredWorkoutTime}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">Activities</label>
                    {isEditing ? (
                      <div className="grid grid-cols-2 gap-2">
                        {activityOptions.map((activity) => (
                          <label key={activity} className="flex items-center">
                            <input
                              type="checkbox"
                              checked={editedUser.activities.includes(activity)}
                              onChange={() => handleActivityChange(activity)}
                              className="mr-2"
                            />
                            {activity}
                          </label>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {user.activities.map((activity) => (
                          <span key={activity} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                            {activity}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Bio */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-600 mb-1">Bio</label>
              {isEditing ? (
                <textarea
                  name="bio"
                  value={editedUser.bio}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg"
                  rows="4"
                />
              ) : (
                <p className="text-gray-700">{user.bio}</p>
              )}
            </div>
            
            {/* Health Stats */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-700">Health Stats</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-800">BMI</p>
                  <p className="text-xl font-semibold">
                    {(user.weight / ((user.height / 100) ** 2)).toFixed(1)}
                  </p>
                  <p className="text-xs text-gray-500">
                    {(user.weight / ((user.height / 100) ** 2)) < 18.5 ? 'Underweight' :
                     (user.weight / ((user.height / 100) ** 2)) < 25 ? 'Normal' :
                     (user.weight / ((user.height / 100) ** 2)) < 30 ? 'Overweight' : 'Obese'}
                  </p>
                </div>
                
                <div className="bg-purple-50 p-4 rounded-lg">
                  <p className="text-sm text-purple-800">Ideal Weight</p>
                  <p className="text-xl font-semibold">
                    {user.gender === 'Male' ? 
                      Math.round(50 + 2.3 * ((user.height / 2.54) - 60)) :
                      Math.round(45.5 + 2.3 * ((user.height / 2.54) - 60))}
                    {' kg'}
                  </p>
                  <p className="text-xs text-gray-500">Based on height and gender</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;