import { useState } from 'react';
import { User, Lock, Eye, EyeOff } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts';
import { Button } from '@/components';

export function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('admin@m2phenom.com');
  const [password, setPassword] = useState('password123');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login('mock-jwt-token', {
      id: '1',
      email,
      firstName: 'Admin',
      lastName: 'User',
      role: 'ADMIN',
      createdAt: new Date().toISOString(),
    });
    navigate('/');
  };

  const handleGoogleAuth = () => {
    // Mock Google Login
    login('mock-jwt-token-google', {
      id: '2',
      email: 'user@gmail.com',
      firstName: 'Google',
      lastName: 'User',
      role: 'CLIENT',
      createdAt: new Date().toISOString(),
    });
    navigate('/');
  };

  return (
    <div className="w-full max-w-[460px] bg-[#1A1A1F] rounded-2xl p-8 lg:p-10 border border-white/5 relative shadow-2xl">
      {/* Top subtle glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-primary-500 to-transparent opacity-50" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-4 bg-primary-500/20 blur-2xl rounded-full pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col items-center mb-8 relative z-10">
        <div className="w-14 h-14 bg-brand-gradient rounded-full flex items-center justify-center mb-4 shadow-lg shadow-primary-500/20">
          <User className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Welcome Back</h2>
        <p className="text-sm text-gray-400">Sign in to access your M2 Phenom dashboard</p>
      </div>

      {/* Register Divider */}
      <div className="relative flex items-center justify-center mb-8">
        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10"></div></div>
        <div className="relative bg-[#1A1A1F] px-4 text-xs text-gray-500 font-medium">
          New here? <Link to="/auth/register" className="text-primary-500 hover:text-primary-400 transition-colors">Register</Link>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleLogin} className="space-y-5">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <User className="h-4 w-4 text-gray-500" />
          </div>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-[#111114] border border-white/10 rounded-lg text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-primary-500 transition-colors" 
            placeholder="Username or Email"
            required
          />
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Lock className="h-4 w-4 text-gray-500" />
          </div>
          <input 
            type={showPassword ? 'text' : 'password'} 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full pl-11 pr-11 py-3 bg-[#111114] border border-white/10 rounded-lg text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-primary-500 transition-colors" 
            placeholder="Password"
            required
          />
          <button 
            type="button" 
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-white transition-colors"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>

        <div className="flex items-center justify-between pt-1 pb-2">
          <label className="flex items-center gap-2 cursor-pointer group">
            <div className="w-3.5 h-3.5 rounded border border-white/20 flex items-center justify-center bg-[#111114] group-hover:border-primary-500 transition-colors relative overflow-hidden">
              <input type="checkbox" className="absolute inset-0 opacity-0 cursor-pointer" />
            </div>
            <span className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">Remember me</span>
          </label>
          <Link to="/auth/reset-password" className="text-xs text-primary-500 hover:text-primary-400 transition-colors">Forgot / Reset Password?</Link>
        </div>

        <Button type="submit" className="w-full h-12 bg-brand-gradient text-white font-bold tracking-wide border-0 shadow-lg shadow-primary-500/20 hover:shadow-primary-500/40 rounded-lg">
          LOGIN NOW
        </Button>
      </form>

      {/* Google Auth Divider */}
      <div className="relative flex items-center justify-center mt-6 mb-6">
        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10"></div></div>
        <div className="relative bg-[#1A1A1F] px-4 text-xs text-gray-500 font-medium uppercase tracking-wider">
          OR
        </div>
      </div>

      <button 
        type="button"
        onClick={handleGoogleAuth}
        className="w-full h-12 bg-[#111114] hover:bg-white/5 border border-white/10 rounded-lg flex items-center justify-center transition-colors group"
      >
        <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        </svg>
        <span className="text-sm font-medium text-white group-hover:text-primary-400 transition-colors">Continue with Google</span>
      </button>

      {/* Language Toggle */}
      <div className="mt-8 flex flex-col items-center">
        <div className="w-3/4 border-t border-white/10 relative flex justify-center mb-6">
          <span className="absolute -top-2 bg-[#1A1A1F] px-4 text-xs text-gray-500">Language</span>
        </div>
        <div className="flex gap-3">
          <button className="px-5 py-1.5 rounded-md bg-brand-gradient text-white text-xs font-bold shadow-sm hover:opacity-90 transition-opacity">EN</button>
          <button className="px-5 py-1.5 rounded-md bg-[#111114] border border-white/10 text-gray-400 text-xs font-bold hover:text-white hover:border-white/30 transition-colors">SP</button>
        </div>
      </div>
    </div>
  );
}
