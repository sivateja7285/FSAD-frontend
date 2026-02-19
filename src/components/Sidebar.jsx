import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const Sidebar = () => {
  const { userRole, logout } = useAppContext();
  const location = useLocation();
  const navigate = useNavigate();

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

  return (
    <div className="w-64 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white min-h-screen flex flex-col shadow-2xl">
      <div className="p-6 border-b border-slate-700/50">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-xl">
            🎓
          </div>
          <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">Course Hub</h2>
        </div>
        <p className="text-sm text-slate-400 mt-1 capitalize flex items-center gap-2">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
          {userRole}
        </p>
      </div>

      <nav className="flex-1 p-4">
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

      <div className="p-4 border-t border-slate-700/50">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-gradient-to-r hover:from-red-600 hover:to-red-700 hover:text-white transition-all duration-300 hover:shadow-lg hover:shadow-red-500/50 font-medium"
        >
          <span className="text-xl">🚪</span>
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
