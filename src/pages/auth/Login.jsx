import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';

const Login = () => {
  const [selectedRole, setSelectedRole] = useState('student');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAppContext();
  const navigate = useNavigate();

  // Demo credentials
  const validCredentials = {
    student: { username: 'student', password: 'student123' },
    admin: { username: 'admin', password: 'admin123' }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    // Validate credentials
    const credentials = validCredentials[selectedRole];
    if (username !== credentials.username || password !== credentials.password) {
      setError('Invalid username or password');
      return;
    }

    login(selectedRole);
    
    // Navigate based on role
    if (selectedRole === 'student') {
      navigate('/student/dashboard');
    } else {
      navigate('/admin/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>
      
      <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 w-full max-w-md relative z-10 animate-fade-in border border-white/20">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4 shadow-lg">
            🎓
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent mb-2">
            Course Selection System
          </h1>
          <p className="text-slate-600">Sign in to continue your journey</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter username"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter password"
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-3">
              Select Your Role
            </label>
            <div className="space-y-3">
              <label
                className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  selectedRole === 'student'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <input
                  type="radio"
                  name="role"
                  value="student"
                  checked={selectedRole === 'student'}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="w-5 h-5 text-blue-600"
                />
                <div>
                  <div className="font-semibold text-slate-800">Student</div>
                  <div className="text-sm text-slate-600">
                    Browse and register for courses
                  </div>
                </div>
              </label>

              <label
                className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  selectedRole === 'admin'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <input
                  type="radio"
                  name="role"
                  value="admin"
                  checked={selectedRole === 'admin'}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="w-5 h-5 text-blue-600"
                />
                <div>
                  <div className="font-semibold text-slate-800">Admin</div>
                  <div className="text-sm text-slate-600">
                    Manage courses and schedules
                  </div>
                </div>
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-semibold py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] btn-shine"
          >
            Login
          </button>
        </form>

        <div className="mt-6 p-4 bg-slate-100 rounded-lg">
          <p className="text-sm font-semibold text-slate-700 mb-2">Demo Credentials:</p>
          <div className="text-xs text-slate-600 space-y-1">
            <div><strong>Student:</strong> username: <code className="bg-white px-2 py-1 rounded">student</code> password: <code className="bg-white px-2 py-1 rounded">student123</code></div>
            <div><strong>Admin:</strong> username: <code className="bg-white px-2 py-1 rounded">admin</code> password: <code className="bg-white px-2 py-1 rounded">admin123</code></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
