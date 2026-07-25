import { useState } from 'react';
import { User, Lock, Eye, EyeOff, KeyRound, ArrowRight } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts';
import { Button } from '@/components';

export function ClientLogin() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login('mock-jwt-token', {
      id: '1',
      email: email || 'client@m2phenom.com',
      firstName: 'Client',
      lastName: 'User',
      role: 'CLIENT',
      createdAt: new Date().toISOString(),
    });
    navigate('/client/dashboard');
  };

  return (
    <div className="w-full max-w-[420px] bg-white rounded-2xl p-8 lg:p-10 border border-border relative shadow-[0_8px_30px_rgb(0,0,0,0.04)] mx-auto">
      {/* Header */}
      <div className="flex flex-col items-center mb-8 relative z-10 text-center">
        <div className="w-14 h-14 bg-primary-50 rounded-xl flex items-center justify-center mb-5 border border-primary-100">
          <KeyRound className="w-6 h-6 text-primary-600" />
        </div>
        <h2 className="text-2xl font-black text-gray-900 mb-2">Client Portal</h2>
        <p className="text-sm font-medium text-gray-500">Sign in to access your M2 Phenom account</p>
      </div>

      {/* Form */}
      <form onSubmit={handleLogin} className="space-y-5">
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-gray-700">Username or Email</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <User className="h-4 w-4 text-gray-400" />
            </div>
            <input 
              type="text" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-border rounded-lg text-gray-900 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all shadow-sm" 
              placeholder="Enter your username"
              required
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-gray-700">Password</label>
            <Link to="/client/auth/reset-password" className="text-xs font-bold text-primary-600 hover:text-primary-700 transition-colors">
              Forgot Password?
            </Link>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Lock className="h-4 w-4 text-gray-400" />
            </div>
            <input 
              type={showPassword ? 'text' : 'password'} 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-11 py-2.5 bg-white border border-border rounded-lg text-gray-900 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all shadow-sm" 
              placeholder="••••••••"
              required
            />
            <button 
              type="button" 
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <Button 
          type="submit" 
          className="w-full bg-brand-gradient text-white font-bold py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all group"
        >
          Sign In
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </form>

      {/* Register Divider */}
      <div className="mt-8 pt-6 border-t border-border text-center">
        <p className="text-sm font-medium text-gray-600">
          Don't have an account?{' '}
          <Link to="/client/auth/register" className="font-bold text-primary-600 hover:text-primary-700 transition-colors">
            Register Here
          </Link>
        </p>
      </div>
    </div>
  );
}
