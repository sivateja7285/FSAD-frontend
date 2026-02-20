import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';

const Login = () => {
  const [selectedRole, setSelectedRole] = useState('student');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAppContext();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    login(selectedRole);
    if (selectedRole === 'student') {
      navigate('/student/dashboard');
    } else {
      navigate('/admin/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex">

      {/* ── Left Panel ── */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-900 p-12 text-white">
        {/* Decorative blobs */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-[-80px] right-[-80px] w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-[-60px] left-[-60px] w-80 h-80 bg-blue-500/20 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-cyan-400/10 rounded-full blur-2xl" />
        </div>

        {/* Logo */}
        <div className="relative z-10 self-start inline-flex items-center gap-2.5 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-md border border-white/20 rounded-2xl px-4 py-2.5 shadow-xl shadow-cyan-500/20">
          <div className="w-10 h-10 bg-white/10 backdrop-blur border border-white/20 rounded-xl flex items-center justify-center text-2xl shadow-lg">
            🎓
          </div>
          <span className="text-xl font-bold tracking-tight">CourseCrafter</span>
        </div>

        {/* Center content */}
        <div className="relative z-10 space-y-8">
          <div>
            <h1 className="text-5xl font-extrabold leading-tight mb-4">
              Your Academic<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400">
                Journey Starts
              </span> Here.
            </h1>
            <p className="text-slate-300 text-base leading-relaxed max-w-sm">
              Plan smarter, register faster, and stay on top of your B.Tech semester — all in one place.
            </p>
          </div>

          {/* Feature chips */}
          <div className="space-y-3">
            {[
              { icon: '📚', text: 'Browse 50+ courses across all branches' },
              { icon: '📅', text: 'Conflict-free smart schedule builder' },
              { icon: '⚡', text: 'Real-time drop request approvals' },
            ].map(({ icon, text }) => (
              <div key={text} className="flex items-center gap-3 bg-white/8 border border-white/10 rounded-xl px-4 py-3 backdrop-blur-sm">
                <span className="text-xl shrink-0">{icon}</span>
                <span className="text-sm text-slate-200 font-medium">{text}</span>
              </div>
            ))}
          </div>

        </div>

        {/* Bottom quote */}
        <div className="relative z-10">
          <p className="text-xs text-slate-500 italic">"Education is the passport to the future."</p>
        </div>
      </div>

      {/* ── Right Panel ── */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50/30 p-6">
        <div className="w-full max-w-md">

          {/* Mobile logo */}
          <div className="flex justify-center mb-8 lg:hidden">
            <div className="flex items-center gap-2">
              <span className="text-3xl">🎓</span>
              <span className="text-2xl font-extrabold text-indigo-700">CourseCrafter</span>
            </div>
          </div>

          {/* Card */}
          <div className="bg-white rounded-3xl shadow-2xl shadow-indigo-100 border border-slate-100 p-8">
            <div className="mb-8">
              <h2 className="text-3xl font-extrabold text-slate-900">Welcome back 👋</h2>
              <p className="text-slate-500 text-sm mt-1.5">
                New here?{' '}
                <Link to="/signup" className="text-indigo-600 hover:text-indigo-700 font-bold hover:underline">
                  Create a free account
                </Link>
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              {/* Email */}
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">Email or Username</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">✉️</span>
                  <input
                    type="text"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    required
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent focus:bg-white transition-all"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-4 py-3 pr-11 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent focus:bg-white transition-all"
                    placeholder="Enter your password"
                  />
                  <button type="button" onClick={() => setShowPassword((v) => !v)} tabIndex={-1}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-sm">
                    {showPassword ? '🙈' : '👁️'}
                  </button>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">{error}</div>
              )}

              {/* Role Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Login as</label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: 'student', icon: '🎓', label: 'Student', desc: 'Browse & register courses' },
                    { value: 'admin', icon: '🛡️', label: 'Admin', desc: 'Manage courses & approvals' },
                  ].map(({ value, icon, label, desc }) => (
                    <label key={value}
                      className={`relative flex flex-col items-center gap-1 p-4 rounded-2xl border-2 cursor-pointer transition-all duration-200 text-center ${
                        selectedRole === value
                          ? 'border-indigo-500 bg-indigo-50 shadow-lg shadow-indigo-100'
                          : 'border-slate-200 hover:border-indigo-300 hover:bg-slate-50'
                      }`}
                    >
                      <input type="radio" name="role" value={value} checked={selectedRole === value}
                        onChange={(e) => setSelectedRole(e.target.value)} className="sr-only" />
                      {selectedRole === value && (
                        <span className="absolute top-2 right-2 w-4 h-4 bg-indigo-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-[8px] font-black">✓</span>
                        </span>
                      )}
                      <span className="text-2xl">{icon}</span>
                      <span className="font-bold text-slate-800 text-sm">{label}</span>
                      <span className="text-[11px] text-slate-500 leading-tight">{desc}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Submit */}
              <button type="submit"
                className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-indigo-200 hover:shadow-indigo-300 hover:scale-[1.02] active:scale-100 transition-all duration-200 text-sm tracking-wide"
              >
                Sign In →
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
