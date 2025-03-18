import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Trophy, 
  User, 
  LineChart,
  LogOut,
  Menu,
  X
} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Navigation items
  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { name: 'Leaderboard', path: '/leaderboard', icon: <Trophy className="w-5 h-5" /> },
    { name: 'Progress', path: '/progress', icon: <LineChart className="w-5 h-5" /> },
    { name: 'Profile', path: '/profile', icon: <User className="w-5 h-5" /> },
  ];

  return (
    <>
      {/* Mobile toggle button */}
      <button 
        className="md:hidden fixed top-4 left-4 z-40 bg-indigo-600 text-white p-2 rounded-md"
        onClick={toggleSidebar}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar overlay for mobile */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <div 
        className={`fixed md:static h-screen bg-white shadow-lg z-30 transition-all duration-300 
                  ${isOpen ? 'w-64 left-0' : 'w-64 -left-64'} md:w-64 md:left-0`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-5 border-b">
            <Link to="/" className="flex items-center justify-center">
              <span className="text-2xl font-bold text-indigo-600">HabitQuest</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-grow p-4">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link 
                    to={item.path} 
                    className={`flex items-center p-3 rounded-lg transition-colors
                              ${location.pathname === item.path 
                                ? 'bg-indigo-100 text-indigo-700' 
                                : 'text-gray-700 hover:bg-gray-100'}`}
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="mr-3">{item.icon}</span>
                    <span className="font-medium">{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t mt-auto">
            <Link 
              to="/"
              className="flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5 mr-3" />
              <span className="font-medium">Logout</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;