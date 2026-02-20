import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const Sidebar = () => {
  const { userRole, logout } = useAppContext();
  const location = useLocation();
  const navigate = useNavigate();
  const [confirmLogout, setConfirmLogout] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const studentLinks = [
    { path: '/student/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/student/courses', label: 'Browse Courses', icon: '📚' },
    { path: '/student/schedule', label: 'My Schedule', icon: '📅' },
    { path: '/student/profile', label: 'My Profile', icon: '👤' }
  ];

  const adminLinks = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/admin/manage-courses', label: 'Manage Courses', icon: '⚙️' }
  ];

  const links = userRole === 'student' ? studentLinks : adminLinks;

  const avatarLetter = userRole === 'admin' ? 'A' : 'S';
  const avatarGradient = userRole === 'admin'
    ? 'from-purple-500 to-pink-600'
    : 'from-blue-500 to-cyan-600';

  return (
    <div className="w-64 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white min-h-screen flex flex-col shadow-2xl">
      {/* App Logo */}
      <div className="px-6 pt-6 pb-4 border-b border-slate-700/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-xl flex-shrink-0">
            🎓
          </div>
          <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
            Course Hub
          </h2>
        </div>
      </div>

      {/* User Profile Card */}
      <div className="mx-4 mt-4 mb-2 p-4 bg-slate-700/40 rounded-2xl border border-slate-600/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 bg-gradient-to-br ${avatarGradient} rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0 shadow-lg`}>
              {avatarLetter}
            </div>
            <div>
              <p className="font-semibold text-white capitalize text-sm leading-tight">
                {userRole === 'admin' ? 'Administrator' : 'Student'}
              </p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                <span className="text-xs text-slate-400">Online</span>
              </div>
            </div>
          </div>
          {/* Quick logout icon button */}
          <button
            onClick={() => setConfirmLogout(true)}
            title="Logout"
            className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 p-4">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3 px-2">
          Navigation
        </p>
        <ul className="space-y-2">
          {links.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                  location.pathname === link.path
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/50 scale-105'
                    : 'text-slate-300 hover:bg-slate-700/50 hover:text-white hover:translate-x-1'
                }`}
              >
                <span className="text-xl">{link.icon}</span>
                <span className="font-medium">{link.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout Section */}
      <div className="p-4 border-t border-slate-700/50">
        {confirmLogout ? (
          /* Inline confirmation — no annoying browser dialog */
          <div className="bg-red-950/60 border border-red-800/50 rounded-xl p-4 space-y-3">
            <p className="text-sm text-red-200 font-medium text-center">
              Sign out of Course Hub?
            </p>
            <div className="flex gap-2">
              <button
                onClick={handleLogout}
                className="flex-1 bg-red-600 hover:bg-red-500 text-white py-2 rounded-lg text-sm font-semibold transition-colors"
              >
                Yes, Logout
              </button>
              <button
                onClick={() => setConfirmLogout(false)}
                className="flex-1 bg-slate-700 hover:bg-slate-600 text-slate-200 py-2 rounded-lg text-sm font-semibold transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setConfirmLogout(true)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-red-600/20 hover:text-red-400 hover:border-red-500/30 border border-transparent transition-all duration-300 font-medium group"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            <span>Logout</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
